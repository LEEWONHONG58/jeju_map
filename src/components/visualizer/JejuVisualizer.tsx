
import React, { useEffect } from 'react';
import { useJejuMap } from '@/hooks/use-jeju-map';
import { useJejuBoundaryLayer } from './useJejuBoundaryLayer';
import { useJejuLandmarks } from './useJejuLandmarks';
import JejuInfoPanel from './JejuInfoPanel';
import JejuMapControls from './JejuMapControls';
import JejuLoadingState from './JejuLoadingState';

interface JejuVisualizerProps {
  className?: string;
}

const JejuVisualizer: React.FC<JejuVisualizerProps> = ({ className }) => {
  const {
    mapContainer,
    map,
    markers,
    polylines,
    infoWindows,
    isMapInitialized,
    isNaverLoaded,
    isMapError,
    activeMarker,
    setActiveMarker,
    showInfoPanel,
    setShowInfoPanel,
    clearMarkersAndInfoWindows
  } = useJejuMap();
  
  // 경계선 그리기
  useJejuBoundaryLayer(map, isMapInitialized, markers);
  
  // 제주도 랜드마크 추가
  useJejuLandmarks(map, isMapInitialized, markers, infoWindows, setActiveMarker);
  
  // 디버깅 목적의 상태 로그
  useEffect(() => {
    console.log("제주도 지도 상태:", { 
      isNaverLoaded, 
      isMapInitialized,
      isMapError,
      showInfoPanel
    });
  }, [isNaverLoaded, isMapInitialized, isMapError, showInfoPanel]);

  // 위치로 이동하는 함수
  const moveToLocation = (lat: number, lng: number, name: string) => {
    if (!map || !window.naver) return;
    
    const position = new window.naver.maps.LatLng(lat, lng);
    
    map.setCenter(position);
    map.setZoom(14);
    
    const markerIndex = JEJU_LANDMARKS.findIndex(lm => lm.name === name);
    if (markerIndex >= 0 && markers.current[markerIndex + 1]) {
      infoWindows.current.forEach(iw => iw.close());
      infoWindows.current[markerIndex].open(map, markers.current[markerIndex + 1]);
    }
  };

  // 지도 타입 변경
  const setMapType = (mapType: string) => {
    if (!map || !window.naver || !window.naver.maps) return;
    map.setMapTypeId(window.naver.maps.MapTypeId[mapType]);
  };

  // 로딩 상태 또는 에러 상태일 때
  if (!isNaverLoaded || isMapError) {
    return <JejuLoadingState isMapError={isMapError} className={className} />;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 지도 컨테이너 */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg overflow-hidden bg-blue-50" 
      />
      
      {/* 초기화 중 로딩 표시 */}
      {!isMapInitialized && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-medium">제주도 지도를 초기화하는 중...</p>
          </div>
        </div>
      )}
      
      {/* 정보 패널 */}
      {showInfoPanel && isMapInitialized && (
        <JejuInfoPanel onSelectLocation={moveToLocation} />
      )}
      
      {/* 지도 컨트롤 */}
      <JejuMapControls 
        onToggleInfoPanel={() => setShowInfoPanel(!showInfoPanel)}
        showInfoPanel={showInfoPanel}
        setMapType={setMapType}
        isNaverLoaded={isNaverLoaded}
      />
    </div>
  );
};

// Import here to avoid circular dependency
import { JEJU_LANDMARKS } from '@/utils/jejuMapStyles';

export default JejuVisualizer;
