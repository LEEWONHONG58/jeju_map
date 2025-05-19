
import { useCallback } from 'react';
import { Place } from '@/types/supabase';
import { clearPolylines } from '@/utils/map/mapCleanup';

export const useMapRouting = (map: any) => {
  const calculateRoutes = useCallback((placesToRoute: Place[]) => {
    if (!map || !window.naver || placesToRoute.length < 2) return;
    
    const polylines: any[] = [];
    const path = placesToRoute.map(place => new window.naver.maps.LatLng(place.y, place.x));
    
    const polyline = new window.naver.maps.Polyline({
      map: map,
      path: path,
      strokeColor: '#22c55e',
      strokeOpacity: 0.7,
      strokeWeight: 5
    });
    
    polylines.push(polyline);

    return clearPolylines(polylines);
  }, [map]);

  return { calculateRoutes };
};
