
import { useEffect, useRef } from 'react';
import { JEJU_BOUNDARY, JEJU_CENTER, createLabelIcon } from '@/utils/jejuMapStyles';

export const useJejuBoundaryLayer = (map: any, isInitialized: boolean, markers: React.MutableRefObject<any[]>) => {
  useEffect(() => {
    if (isInitialized && map) {
      drawJejuBoundary();
    }
    
    return () => {
      // Clean up if needed
    };
  }, [isInitialized, map]);

  const drawJejuBoundary = () => {
    if (!map || !window.naver) return;
    
    try {
      const jejuBoundaryPath = JEJU_BOUNDARY.map(coord => 
        new window.naver.maps.LatLng(coord.lat, coord.lng)
      );
      
      const polygon = new window.naver.maps.Polygon({
        map: map,
        paths: jejuBoundaryPath,
        strokeWeight: 3,
        strokeColor: '#5EAEFF',
        strokeOpacity: 0.8,
        fillColor: '#6CCEA0',
        fillOpacity: 0.2
      });
      
      const jejuLabel = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(JEJU_CENTER.lat, JEJU_CENTER.lng),
        map: map,
        icon: createLabelIcon('제주도'),
        clickable: false
      });
      
      markers.current.push(jejuLabel);
    } catch (error) {
      console.error("Error drawing Jeju boundary:", error);
    }
  };
};
