import React, { useEffect } from 'react';
import { useMapContext } from './MapContext';
import MapMarkers from './MapMarkers';
import MapLoadingOverlay from './MapLoadingOverlay';
import GeoJsonLayer from './GeoJsonLayer';
import MapControls from './MapControls';
import type { Place, ItineraryDay } from '@/types/core';
import { toast } from 'sonner';
import { useMapItineraryVisualization } from '@/hooks/map/useMapItineraryVisualization';
import DaySelectorMapOverlay from '@/components/map/DaySelector';

interface MapProps {
  places: Place[];
  selectedPlace: Place | null;
  itinerary: ItineraryDay[] | null;
  selectedDay: number | null;
  selectedPlaces?: Place[];
}

const Map: React.FC<MapProps> = ({ 
  places, 
  selectedPlace, 
  itinerary, 
  selectedDay,
  selectedPlaces = [] 
}) => {
  const {
    mapContainer,
    map,
    isMapInitialized,
    isNaverLoaded,
    isMapError,
    showGeoJson,
    toggleGeoJsonVisibility,
    handleGeoJsonLoaded,
    isGeoJsonLoaded,
    checkGeoJsonMapping,
    serverRoutesData,
    geoJsonNodes,
    geoJsonLinks
  } = useMapContext();

  const {
    itinerary: visualizedItinerary,
    currentDay: visualizedCurrentDay,
    totalDistance: visualizedTotalDistance,
    visualizeDayRoute,
    // clearAllVisualizations
  } = useMapItineraryVisualization(map, geoJsonNodes, geoJsonLinks);

  // GeoJSON이 로드되면 사용자에게 알림
  useEffect(() => {
    if (isGeoJsonLoaded && showGeoJson) {
      toast.success('경로 데이터가 지도에 표시됩니다');
    }
  }, [isGeoJsonLoaded, showGeoJson]);

  // 일정을 선택했을 때 GeoJSON 자동 활성화
  useEffect(() => {
    if (isGeoJsonLoaded && visualizedItinerary && visualizedItinerary.length > 0 && visualizedCurrentDay !== null) {
      console.log("시각화된 일정이 있습니다. GeoJSON 표시를 활성화합니다.");
      if (!showGeoJson) {
        toggleGeoJsonVisibility();
      }
    }
  }, [visualizedItinerary, visualizedCurrentDay, isGeoJsonLoaded, showGeoJson, toggleGeoJsonVisibility]);

  // 서버 경로 데이터가 변경될 때마다 로그 출력
  useEffect(() => {
    if (Object.keys(serverRoutesData).length > 0) {
      console.log("지도: 서버 경로 데이터가 업데이트됨:", {
        일수: Object.keys(serverRoutesData).length,
        첫날_노드: serverRoutesData[1]?.nodeIds?.length || 0,
        첫날_링크: serverRoutesData[1]?.linkIds?.length || 0,
        첫날_인터리브드: !!serverRoutesData[1]?.interleaved_route
      });
      
      if (isGeoJsonLoaded && !showGeoJson) {
        console.log("지도: 서버 경로 데이터가 있어 GeoJSON 표시를 활성화합니다.");
        toggleGeoJsonVisibility();
      }
    }
  }, [serverRoutesData, isGeoJsonLoaded, showGeoJson, toggleGeoJsonVisibility]);

  // 장소와 GeoJSON 매핑 검사
  useEffect(() => {
    if (isGeoJsonLoaded && places.length > 0 && isMapInitialized) {
      const timer = setTimeout(() => {
        const mappingResult = checkGeoJsonMapping(places);
        console.log('GeoJSON 매핑 결과:', mappingResult);
        
        if (mappingResult.success) {
          console.log(`✅ 장소-GeoJSON 매핑 성공: ${mappingResult.mappedPlaces}/${mappingResult.totalPlaces} 장소, 평균 거리: ${mappingResult.averageDistance}m`);
        } else {
          console.warn(`⚠️ 장소-GeoJSON 매핑 부족: ${mappingResult.mappingRate} 매핑됨, 평균 거리: ${mappingResult.averageDistance}m`);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isGeoJsonLoaded, places, isMapInitialized, checkGeoJsonMapping]);

  const handlePlaceClick = (place: Place, index: number) => {
    console.log(`장소 클릭됨: ${place.name} (${index + 1}번)`);
    // Potentially pan to place or show info
    // If part of visualized itinerary, could highlight segment, etc.
    // This might conflict or complement MapMarkers.tsx's handleMarkerClick
  };

  const isNewVisualizationActive = visualizedItinerary && visualizedItinerary.length > 0;

  return (
    <div ref={mapContainer} className="w-full h-full relative flex-grow">
      <MapMarkers
        places={places}
        selectedPlace={selectedPlace}
        itinerary={isNewVisualizationActive ? null : visualizedItinerary}
        selectedDay={isNewVisualizationActive ? null : visualizedCurrentDay}
        selectedPlaces={selectedPlaces}
        onPlaceClick={handlePlaceClick}
      />
      
      {map && (
        <GeoJsonLayer 
          map={map} 
          visible={showGeoJson} 
          isMapInitialized={isMapInitialized}
          isNaverLoaded={isNaverLoaded}
          onGeoJsonLoaded={handleGeoJsonLoaded}
        />
      )}
      
      {isMapInitialized && visualizedItinerary.length > 0 && (
        <DaySelectorMapOverlay
          itinerary={visualizedItinerary}
          currentDay={visualizedCurrentDay}
          onDaySelect={visualizeDayRoute}
          totalDistance={visualizedTotalDistance}
        />
      )}
      
      <MapControls
        showGeoJson={showGeoJson}
        onToggleGeoJson={toggleGeoJsonVisibility}
        isMapInitialized={isMapInitialized}
        isGeoJsonLoaded={isGeoJsonLoaded}
      />
      
      <MapLoadingOverlay
        isNaverLoaded={isNaverLoaded}
        isMapError={isMapError}
      />
    </div>
  );
};

export default Map;
