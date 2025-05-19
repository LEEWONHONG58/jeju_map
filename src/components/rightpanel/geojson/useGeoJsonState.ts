
import { useState, useCallback, useRef } from 'react';
import { GeoNode, GeoLink, RouteStyle, GeoJsonLayerRef } from './GeoJsonTypes';

// 기본 경로 스타일 정의
const defaultRouteStyle: RouteStyle = {
  strokeColor: '#2196F3', // 파란색 기본 선 색상
  strokeWeight: 5,
  strokeOpacity: 0.8,
  fillColor: '#FF5722',   // 주황색 기본 채우기 색상 (주로 마커용)
  fillOpacity: 1,        // 기본 채우기 투명도 (주로 마커용)
  zIndex: 100,
};

const useGeoJsonState = (map: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [nodes, setNodes] = useState<GeoNode[]>([]);
  const [links, setLinks] = useState<GeoLink[]>([]);
  
  // 활성화된 마커와 폴리라인을 추적하는 refs
  const activeMarkersRef = useRef<any[]>([]);
  const activePolylinesRef = useRef<any[]>([]);
  
  const nodeMapRef = useRef<Map<string, GeoNode>>(new Map());
  const linkMapRef = useRef<Map<string, GeoLink>>(new Map());
  
  // 데이터 로딩 성공 처리
  const handleLoadSuccess = useCallback((loadedNodes: GeoNode[], loadedLinks: GeoLink[]) => {
    setIsLoading(false);
    setIsLoaded(true);
    setNodes(loadedNodes);
    setLinks(loadedLinks);
    
    const nodeMap = new Map<string, GeoNode>();
    const linkMap = new Map<string, GeoLink>();
    
    loadedNodes.forEach(node => nodeMap.set(node.id, node));
    loadedLinks.forEach(link => linkMap.set(link.id, link));
    
    nodeMapRef.current = nodeMap;
    linkMapRef.current = linkMap;
    
    console.log('GeoJSON 상태 초기화 완료:', {
      노드: loadedNodes.length,
      링크: loadedLinks.length
    });
  }, []);
  
  const handleLoadError = useCallback((loadError: Error) => {
    setIsLoading(false);
    setError(loadError);
    console.error('GeoJSON 데이터 로드 실패:', loadError);
  }, []);
  
  const handleDisplayedFeaturesChange = useCallback((markers: any[], polylines: any[]) => {
    activeMarkersRef.current = markers;
    activePolylinesRef.current = polylines;
  }, []);
  
  const clearDisplayedFeatures = useCallback(() => {
    activeMarkersRef.current.forEach(marker => {
      if (marker && typeof marker.setMap === 'function') {
        marker.setMap(null);
      }
    });
    activeMarkersRef.current = [];
    
    activePolylinesRef.current.forEach(polyline => {
      if (polyline && typeof polyline.setMap === 'function') {
        polyline.setMap(null);
      }
    });
    activePolylinesRef.current = [];
  }, []);
  
  const getNodeById = useCallback((id: string): GeoNode | undefined => {
    return nodeMapRef.current.get(id);
  }, []);
  
  const getLinkById = useCallback((id: string): GeoLink | undefined => {
    return linkMapRef.current.get(id);
  }, []);
  
  // 경로 렌더링 함수
  const renderRoute = useCallback((nodeIds: string[], linkIds: string[], style: RouteStyle = defaultRouteStyle): any[] => {
    if (!map) return [];
    
    // 기존에 표시된 피처 제거
    clearDisplayedFeatures();
    
    const renderedFeatures: any[] = [];
    
    // 링크 렌더링
    linkIds.forEach(linkId => {
      const link = getLinkById(linkId);
      if (!link) {
        console.warn(`링크 ID ${linkId}를 찾을 수 없습니다.`);
        return;
      }
      
      // naver.maps.Polyline을 사용하여 링크 렌더링
      if (window.naver && window.naver.maps) {
        try {
          const path = link.coordinates.map(coord => 
            new window.naver.maps.LatLng(coord[1], coord[0])
          );
          
          const polyline = new window.naver.maps.Polyline({
            map,
            path,
            strokeColor: style.strokeColor,
            strokeWeight: style.strokeWeight,
            strokeOpacity: style.strokeOpacity,
            zIndex: style.zIndex || 100 // zIndex가 RouteStyle에 optional일 수 있으므로 기본값 제공
          });
          
          renderedFeatures.push(polyline);
          activePolylinesRef.current.push(polyline);
          if (link) { // link가 undefined가 아닐 때만 할당
            (link as any).naverPolyline = polyline; // GeoLink 타입에 naverPolyline 추가 필요할 수 있음
          }
        } catch (e) {
          console.error(`링크 ${linkId} 렌더링 중 오류:`, e);
        }
      }
    });
    
    // 노드 렌더링
    nodeIds.forEach(nodeId => {
      const node = getNodeById(nodeId);
      if (!node) {
        console.warn(`노드 ID ${nodeId}를 찾을 수 없습니다.`);
        return;
      }
      
      // naver.maps.Marker를 사용하여 노드 렌더링
      if (window.naver && window.naver.maps) {
        try {
          const position = new window.naver.maps.LatLng(
            node.coordinates[1],
            node.coordinates[0]
          );
          
          const marker = new window.naver.maps.Marker({
            map,
            position,
            icon: {
              content: `<div style="
                width: 8px;
                height: 8px;
                background-color: ${style.fillColor || defaultRouteStyle.fillColor}; 
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
              "></div>`,
              anchor: new window.naver.maps.Point(4, 4)
            },
            zIndex: (style.zIndex || defaultRouteStyle.zIndex || 100) + 1 // zIndex 우선순위 및 기본값
          });
          
          renderedFeatures.push(marker);
          activeMarkersRef.current.push(marker);
          if (node) { // node가 undefined가 아닐 때만 할당
             (node as any).naverMarker = marker; // GeoNode 타입에 naverMarker 추가 필요할 수 있음
          }
        } catch (e) {
          console.error(`노드 ${nodeId} 렌더링 중 오류:`, e);
        }
      }
    });
    
    return renderedFeatures;
  }, [map, clearDisplayedFeatures, getLinkById, getNodeById]);
  
  // 전역 인터페이스 등록
  const registerGlobalInterface = useCallback(() => {
    const layerInterface: GeoJsonLayerRef = {
      renderRoute,
      clearDisplayedFeatures,
      getNodeById,
      getLinkById
    };
    
    (window as any).geoJsonLayer = layerInterface;
    
    return () => {
      clearDisplayedFeatures();
      if ((window as any).geoJsonLayer === layerInterface) {
        delete (window as any).geoJsonLayer;
      }
    };
  }, [renderRoute, clearDisplayedFeatures, getNodeById, getLinkById]);
  
  return {
    isLoading,
    error,
    isLoaded,
    nodes,
    links,
    handleLoadSuccess,
    handleLoadError,
    handleDisplayedFeaturesChange,
    clearDisplayedFeatures,
    getNodeById,
    getLinkById,
    renderRoute,
    registerGlobalInterface
  };
};

export default useGeoJsonState;

