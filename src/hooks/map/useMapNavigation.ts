
import { useCallback } from 'react';
import { JEJU_CENTER } from '@/utils/map/mapInitializer';

export const useMapNavigation = (map: any) => {
  const panTo = useCallback((locationOrCoords: string | {lat: number, lng: number}) => {
    if (!map || !window.naver) return;
    
    try {
      let coords;
      
      if (typeof locationOrCoords === 'string') {
        const locationMap: Record<string, {lat: number, lng: number}> = {
          '서귀포': {lat: 33.2542, lng: 126.5581},
          '제주': {lat: 33.4996, lng: 126.5312},
          '애월': {lat: 33.4630, lng: 126.3319},
          '조천': {lat: 33.5382, lng: 126.6435},
        };
        
        coords = locationMap[locationOrCoords] || JEJU_CENTER;
      } else {
        coords = locationOrCoords;
      }
      
      map.setCenter(new window.naver.maps.LatLng(coords.lat, coords.lng));
      map.setZoom(11);
    } catch (error) {
      console.error("Error panning map to location:", error);
    }
  }, [map]);

  return { panTo };
};
