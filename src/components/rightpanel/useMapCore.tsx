import { useMapInitialization } from '@/hooks/map/useMapInitialization';
import { useMapNavigation } from '@/hooks/map/useMapNavigation';
import { useMapMarkers } from '@/hooks/map/useMapMarkers';
import { useMapItineraryRouting } from '@/hooks/map/useMapItineraryRouting';
import { useGeoJsonState } from '@/hooks/map/useGeoJsonState';
import { useServerRoutes } from '@/hooks/map/useServerRoutes';
import { useMapFeatures } from '@/hooks/map/useMapFeatures';
import { Place, ItineraryDay } from '@/types/supabase';
import { ServerRouteResponse } from '@/types/schedule';

/**
 * 지도 핵심 기능 통합 훅
 */
const useMapCore = () => {
  // 지도 초기화 및 상태 관리
  const { 
    map, 
    mapContainer, 
    isMapInitialized, 
    isNaverLoaded,
    isMapError
  } = useMapInitialization();
  
  // 지도 마커 관리
  const { 
    addMarkers, 
    clearMarkersAndUiElements,
    calculateRoutes
  } = useMapMarkers(map);
  
  // 지도 네비게이션 기능
  const { 
    panTo 
  } = useMapNavigation(map);

  // useMapItineraryRouting에서 renderDayRoute (폴백용) 가져오기
  const { 
    renderDayRoute: renderDayRouteFallback, // 이름 변경하여 폴백 명시
    // renderMultiDayRoutes, // 필요시 사용
    clearAllRoutes, // 모든 경로(polyline) 제거 함수
    highlightSegment // 특정 구간 하이라이트 (아직 interleaved 기반 아닐 수 있음)
  } = useMapItineraryRouting(map); // Naver Polyline 직접 그리는 훅

  // GeoJSON 상태 관리
  const {
    showGeoJson,
    isGeoJsonLoaded,
    geoJsonNodes,
    geoJsonLinks,
    toggleGeoJsonVisibility,
    handleGeoJsonLoaded,
    checkGeoJsonMapping
  } = useGeoJsonState();

  // 서버 경로 데이터 관리
  const {
    serverRoutesData, // Record<number, ServerRouteResponse>
    setServerRoutes: setServerRoutesBase
  } = useServerRoutes();

  // 지도 특성(마커, 경로 등) 관리
  const {
    renderGeoJsonRoute, // GeoJSON nodes/links를 받아 경로 그림
    renderItineraryRoute: renderItineraryRouteUsingFeatures, // interleaved_route 우선 처리
    clearPreviousHighlightedPath,
    showRouteForPlaceIndex: showRouteForPlaceIndexBase
  } = useMapFeatures(map);

  // 서버 경로 데이터 설정 함수 (기존 유지)
  const setServerRoutes = (dayRoutes: Record<number, ServerRouteResponse>) => {
    setServerRoutesBase(dayRoutes, showGeoJson, toggleGeoJsonVisibility);
  };

  // 일정 경로 렌더링 함수 - useMapFeatures의 함수 사용
  const renderItineraryRoute = (itineraryDay: ItineraryDay) => { // 타입 명시
    // renderItineraryRouteUsingFeatures는 serverRoutesData를 내부적으로 참조하지 않고,
    // itineraryDay.interleaved_route 또는 itineraryDay.routeData를 사용.
    // serverRoutesData는 setServerRoutes를 통해 MapContext에 저장되어 있고,
    // useScheduleManagement에서 itineraryDay 객체를 만들 때 이 데이터를 포함시킴.
    renderItineraryRouteUsingFeatures(itineraryDay, serverRoutesData, renderDayRouteFallback, clearAllRoutes);
  };

  // 특정 장소 인덱스의 경로 하이라이트 (useMapFeatures의 함수 사용)
  const showRouteForPlaceIndex = (placeIndex: number, itineraryDay: ItineraryDay) => { // 타입 명시
    showRouteForPlaceIndexBase(placeIndex, itineraryDay, serverRoutesData);
  };

  // 간단화된 mapPlacesWithGeoNodes 함수
  const mapPlacesWithGeoNodes = (places: Place[]) => places; // 단순 반환 유지

  return {
    // 지도 기본 속성
    map,
    mapContainer,
    isMapInitialized,
    isNaverLoaded,
    isMapError,
    
    // 지도 마커 및 네비게이션
    addMarkers,
    calculateRoutes,
    clearMarkersAndUiElements,
    panTo,
    
    // GeoJSON 관련
    showGeoJson,
    toggleGeoJsonVisibility,
    isGeoJsonLoaded,
    geoJsonNodes,
    geoJsonLinks,
    handleGeoJsonLoaded,
    checkGeoJsonMapping,
    
    // 경로 렌더링
    renderItineraryRoute, // 수정된 함수
    clearAllRoutes,
    highlightSegment,
    clearPreviousHighlightedPath,
    showRouteForPlaceIndex, // 수정된 함수
    renderGeoJsonRoute, // GeoJSON 직접 렌더링 함수
    
    // 장소-노드 매핑
    mapPlacesWithGeoNodes,
    
    // 서버 경로
    serverRoutesData,
    setServerRoutes
  };
};

export default useMapCore;
