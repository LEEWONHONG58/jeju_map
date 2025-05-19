
import { useCallback, useRef } from 'react';
import { Place, ItineraryDay, ItineraryPlaceWithTime } from '@/types/supabase';
import { ServerRouteResponse, ExtractedRouteData } from '@/types/schedule';
import { extractAllNodesFromRoute, extractAllLinksFromRoute, parseInterleavedRoute } from '@/utils/routeParser';

/**
 * 지도 특성(마커, 경로 등) 관리 훅
 */
export const useMapFeatures = (map: any) => {
  // 노드 ID로부터 링크 ID 추출 (서버 응답 형식에 따라 조정 필요)
  const extractNodeAndLinkIds = useCallback((response: ServerRouteResponse): ExtractedRouteData => {
    // This function might be less relevant if interleaved_route is primary
    if (response.linkIds && response.linkIds.length > 0 && response.nodeIds && response.nodeIds.length > 0) {
      return {
        nodeIds: response.nodeIds.map(id => id.toString()),
        linkIds: response.linkIds.map(id => id.toString())
      };
    }
    if (response.interleaved_route && response.interleaved_route.length > 0) {
        return {
            nodeIds: extractAllNodesFromRoute(response.interleaved_route).map(String),
            linkIds: extractAllLinksFromRoute(response.interleaved_route).map(String),
        }
    }
    return { nodeIds: [], linkIds: [] };
  }, []);

  // 하이라이트된 경로 참조
  const highlightedPathRef = useRef<any[]>([]);

  // 이전 하이라이트된 경로 제거
  const clearPreviousHighlightedPath = useCallback(() => {
    if (highlightedPathRef.current && highlightedPathRef.current.length > 0) {
      highlightedPathRef.current.forEach(feature => {
        if (feature && typeof feature.setMap === 'function') {
          feature.setMap(null);
        }
      });
      highlightedPathRef.current = [];
    }
  }, []);

  // GeoJSON 노드와 링크를 사용하여 경로 렌더링 (기존 함수 활용)
  const renderGeoJsonRoute = useCallback((nodeIds: string[], linkIds: string[], style: any = {}): any[] => {
    if (!map || !window.geoJsonLayer || typeof window.geoJsonLayer.renderRoute !== 'function') {
      console.warn('GeoJSON 렌더링 레이어를 찾을 수 없습니다. (useMapFeatures)');
      return [];
    }
    console.log(`[useMapFeatures] Rendering GeoJSON route with ${nodeIds.length} nodes, ${linkIds.length} links.`);
    return window.geoJsonLayer.renderRoute(nodeIds, linkIds, style);
  }, [map]);

  // 일정 경로 렌더링 함수 - 서버 데이터 활용 (interleaved_route 우선)
  const renderItineraryRoute = useCallback((
    itineraryDay: ItineraryDay | null, 
    serverRoutesData: Record<number, ServerRouteResponse>, // 이 인자는 이제 itineraryDay.interleaved_route로 대체 가능
    renderDayRouteFallback: (day: ItineraryDay) => void, // 기존 폴백 함수
    clearAllRoutes: () => void
  ) => {
    if (!map || !itineraryDay) {
      clearAllRoutes();
      return;
    }
    
    clearAllRoutes();
    
    const dayData = itineraryDay; // serverRoutesData[itineraryDay.day] 대신 itineraryDay 자체 사용

    // 요청사항 4, 5: interleaved_route 우선 사용
    if (window.geoJsonLayer && dayData.interleaved_route && dayData.interleaved_route.length > 0) {
      console.log(`[useMapFeatures] 서버 기반 GeoJSON 경로 렌더링 시도 (interleaved): 일자 ${dayData.day}`);
      
      const nodeIds = extractAllNodesFromRoute(dayData.interleaved_route).map(String);
      const linkIds = extractAllLinksFromRoute(dayData.interleaved_route).map(String);
      
      console.log("🗺️ [useMapFeatures] 시각화 대상 노드/링크 ID (interleaved):", { nodeIds, linkIds });

      renderGeoJsonRoute(
        nodeIds, 
        linkIds,
        {
          strokeColor: '#3366FF', // 파란색 경로
          strokeWeight: 5,
          strokeOpacity: 0.8
        }
      );
      // 장소 마커 표시는 MapMarkers.tsx 또는 MapContext에서 담당할 수 있음
      // 또는 여기서 itineraryDay.places를 기반으로 마커를 추가하는 로직 필요
      return;
    } else if (window.geoJsonLayer && dayData.routeData?.nodeIds && dayData.routeData?.linkIds) {
      // 기존 nodeIds, linkIds 방식 (폴백)
      console.log(`[useMapFeatures] 서버 기반 GeoJSON 경로 렌더링 시도 (nodeIds/linkIds): 일자 ${dayData.day}`);
      renderGeoJsonRoute(
        dayData.routeData.nodeIds,
        dayData.routeData.linkIds,
        {
          strokeColor: '#FF8C00', // 주황색 경로 (폴백 표시)
          strokeWeight: 5,
          strokeOpacity: 0.7
        }
      );
      return;
    }
    
    // 폴백: Naver Polyline 직접 사용 (renderDayRouteFallback)
    console.warn(`[useMapFeatures] GeoJSON 경로 데이터 부족, 폴백 경로 렌더링: 일자 ${dayData.day}`);
    renderDayRouteFallback(itineraryDay);
  }, [map, renderGeoJsonRoute, /* extractNodeAndLinkIds -> 이제 직접 파싱 */]);
  
  // 특정 장소 인덱스의 경로 하이라이트
  const showRouteForPlaceIndex = useCallback((placeIndex: number, itineraryDay: ItineraryDay, serverRoutesData: Record<number, ServerRouteResponse>) => {
    if (!map || !itineraryDay || !itineraryDay.places || !window.geoJsonLayer) return;
    
    if (placeIndex < 0 || placeIndex >= itineraryDay.places.length) {
      console.log('유효하지 않은 장소 인덱스:', placeIndex);
      return;
    }

    // 기존 하이라이트 제거
    clearPreviousHighlightedPath();

    // interleaved_route를 사용하여 특정 구간의 노드/링크 추출
    if (itineraryDay.interleaved_route) {
        const parsedSegments = parseInterleavedRoute(itineraryDay.interleaved_route);
        // placeIndex가 itineraryDay.places에서의 인덱스라고 가정
        // parsedSegments는 장소-장소 간의 세그먼트
        // placeIndex가 0이면 첫번째 장소이므로, 0->1 구간은 없음. 1이면 0->1 구간
        if (placeIndex === 0) return; // 첫 장소는 이전 경로 없음

        const targetSegmentIndex = placeIndex -1;
        if (targetSegmentIndex < parsedSegments.length) {
            const segment = parsedSegments[targetSegmentIndex];
            const segmentNodes = extractAllNodesFromRoute([segment.from, ...segment.links, segment.to].filter(Boolean)).map(String);
            const segmentLinks = segment.links.map(String);
            
            console.log(`${itineraryDay.places[placeIndex-1].name}에서 ${itineraryDay.places[placeIndex].name}까지의 경로 하이라이트`);
            const renderedFeatures = renderGeoJsonRoute(
                segmentNodes,
                segmentLinks,
                { strokeColor: '#FF3B30', strokeWeight: 6, strokeOpacity: 0.9, zIndex: 200 }
            );
            highlightedPathRef.current = renderedFeatures;

            setTimeout(() => {
                clearPreviousHighlightedPath();
            }, 3000);
        } else {
            console.warn(`세그먼트 인덱스 ${targetSegmentIndex}가 범위를 벗어났습니다. (세그먼트 수: ${parsedSegments.length})`);
        }
    } else {
        // Fallback if no interleaved_route
        console.warn("interleaved_route가 없어 구간 하이라이트를 할 수 없습니다.");
        // 기존 로직 (전체 경로 중 일부 표시 시도 등)
        const serverRouteData = serverRoutesData[itineraryDay.day];
        if (serverRouteData) {
            const { nodeIds, linkIds } = extractNodeAndLinkIds(serverRouteData);
            // 이 방식으로는 특정 "구간"만 정확히 추출하기 어려움
            // 전체 경로를 다시 그리고, 해당 장소로 panTo 하는 것이 나을 수 있음
             const renderedFeatures = renderGeoJsonRoute(
                nodeIds, // 전체 노드
                linkIds, // 전체 링크
                { strokeColor: '#FF3B30', strokeWeight: 6, strokeOpacity: 0.9, zIndex: 200 }
            );
            highlightedPathRef.current = renderedFeatures;
            setTimeout(() => { clearPreviousHighlightedPath(); }, 3000);
        }
    }
  }, [map, extractNodeAndLinkIds, clearPreviousHighlightedPath, renderGeoJsonRoute]);

  return {
    renderGeoJsonRoute,
    renderItineraryRoute,
    clearPreviousHighlightedPath,
    showRouteForPlaceIndex,
    extractNodeAndLinkIds
  };
};
