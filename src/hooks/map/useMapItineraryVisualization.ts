
import { useCallback, useEffect, useRef, useState } from 'react';
import { ItineraryDay, ItineraryPlaceWithTime } from '@/types/supabase'; // Ensure ItineraryPlaceWithTime is imported
import { toast } from 'sonner';

// Note: ROUTE_COLORS are defined but overridden for "연두색 Polyline" requirement below.
// If day-specific colors are needed later, the logic can be reverted.
const ROUTE_COLORS = [
  '#9b87f5', // Primary Purple
  '#F97316', // Bright Orange
  '#0EA5E9', // Ocean Blue
  '#D946EF', // Magenta Pink
  '#ea384c', // Red
  '#33C3F0', // Sky Blue
  '#8B5CF6'  // Vivid Purple
];

interface MapVisualizationOptions {
  strokeWeight?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: 'solid' | 'dashed';
  zIndex?: number;
}

export const useMapItineraryVisualization = (map: any, nodeData: any, linkData: any) => {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);
  
  const clearAllVisualizations = useCallback(() => {
    if (markersRef.current.length > 0) {
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
    }
    
    if (polylinesRef.current.length > 0) {
      polylinesRef.current.forEach(polyline => {
        if (polyline) polyline.setMap(null);
      });
      polylinesRef.current = [];
    }
  }, []);
  
  const findNodeCoordinates = useCallback((nodeId: string | number) => {
    if (!nodeData || !nodeData.features) return null;
    const nodeIdStr = String(nodeId);
    const feature = nodeData.features.find((f: any) => String(f.properties.NODE_ID) === nodeIdStr);
    
    if (feature && feature.geometry && feature.geometry.coordinates) {
      const [longitude, latitude] = feature.geometry.coordinates;
      return { lng: longitude, lat: latitude };
    }
    return null;
  }, [nodeData]);
  
  const findLinkCoordinates = useCallback((linkId: string | number) => {
    if (!linkData || !linkData.features) return null;
    const linkIdStr = String(linkId);
    const feature = linkData.features.find((f: any) => String(f.properties.LINK_ID) === linkIdStr);
    
    if (feature && feature.geometry && feature.geometry.coordinates) {
      return feature.geometry.coordinates.map((coord: [number, number]) => {
        return { lng: coord[0], lat: coord[1] };
      });
    }
    return null;
  }, [linkData]);
  
  const visualizeDayRoute = useCallback((day: ItineraryDay, options?: MapVisualizationOptions) => {
    if (!map || !window.naver || !day || !day.interleaved_route || day.interleaved_route.length === 0) {
      console.error('[visualizeDayRoute] Cannot visualize route:', {
        mapExists: !!map,
        naverExists: !!window.naver,
        dayExists: !!day,
        routeExists: !!(day?.interleaved_route?.length)
      });
      return false;
    }
    
    clearAllVisualizations();
    
    try {
      const newMarkers: any[] = [];
      day.places.forEach((place, index) => {
        let position = null;
        if (place.x && place.y) {
          position = new window.naver.maps.LatLng(place.y, place.x);
        } else if (place.geoNodeId) {
          const coords = findNodeCoordinates(place.geoNodeId);
          if (coords) {
            position = new window.naver.maps.LatLng(coords.lat, coords.lng);
          }
        }

        if (position) {
          const marker = new window.naver.maps.Marker({
            position: position,
            map: map,
            title: place.name,
            icon: {
              content: `
                <div style="
                  background-color: #FF5A5A; /* Red marker */
                  color: white;
                  border-radius: 50%;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-weight: bold;
                  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                ">
                  ${index + 1}
                </div>
              `,
              anchor: new window.naver.maps.Point(15, 15)
            },
            zIndex: 100 
          });
          newMarkers.push(marker);
        }
      });
      markersRef.current = newMarkers;
      
      const newPolylines: any[] = [];
      const { interleaved_route } = day;
      const linkIds = interleaved_route.filter((_, i) => i % 2 === 1);
      
      // Use lime green for polylines as requested
      const strokeColor = options?.strokeColor || '#65A30D'; // Lime green (Tailwind lime-600)
      
      linkIds.forEach((linkId) => {
        const linkCoords = findLinkCoordinates(linkId);
        if (linkCoords && linkCoords.length > 0) {
          const path = linkCoords.map(coord => new window.naver.maps.LatLng(coord.lat, coord.lng));
          const polyline = new window.naver.maps.Polyline({
            map: map,
            path: path,
            strokeColor: strokeColor,
            strokeWeight: options?.strokeWeight || 5,
            strokeOpacity: options?.strokeOpacity || 0.8,
            strokeStyle: options?.strokeStyle || 'solid',
            zIndex: options?.zIndex || 90 
          });
          newPolylines.push(polyline);
        }
      });
      polylinesRef.current = newPolylines;
      
      if (newMarkers.length > 0) {
        const bounds = new window.naver.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds, { top: 70, right: 70, bottom: 70, left: 70 }); // Added padding
      }
      
      setCurrentDay(day.day);
      setTotalDistance(day.totalDistance || 0);
      
      console.log(`[visualizeDayRoute] ${day.day}일차 경로가 성공적으로 시각화되었습니다.`);
      if (newMarkers.length > 0 || newPolylines.length > 0) {
        toast.success(`${day.day}일차 경로가 지도에 표시되었습니다.`);
      } else {
        toast.info(`${day.day}일차에 표시할 경로 정보가 충분하지 않습니다.`);
      }
      
      return true;
    } catch (error) {
      console.error('[visualizeDayRoute] 경로 시각화 중 오류 발생:', error);
      toast.error('경로 시각화 중 오류가 발생했습니다.');
      return false;
    }
  }, [map, nodeData, linkData, findNodeCoordinates, findLinkCoordinates, clearAllVisualizations]);
  
  const setItineraryData = useCallback((newItinerary: ItineraryDay[]) => {
    if (!newItinerary || newItinerary.length === 0) {
      setItinerary([]);
      clearAllVisualizations(); // Clear map if new itinerary is empty
      return;
    }
    
    setItinerary(newItinerary);
    console.log('[setItineraryData] 일정 데이터가 설정되었습니다:', newItinerary);
    
    if (newItinerary.length > 0) {
      visualizeDayRoute(newItinerary[0]);
    }
  }, [visualizeDayRoute, clearAllVisualizations]);
  
  useEffect(() => {
    const handleItineraryReady = (event: CustomEvent) => {
      const { itinerary: newItinerary } = event.detail;
      if (newItinerary) { // Allow empty array to clear itinerary
        setItineraryData(newItinerary);
      }
    };
    
    window.addEventListener('itineraryWithCoordinatesReady', handleItineraryReady as EventListener);
    
    return () => {
      window.removeEventListener('itineraryWithCoordinatesReady', handleItineraryReady as EventListener);
    };
  }, [setItineraryData]);
  
  return {
    itinerary,
    currentDay,
    totalDistance,
    visualizeDayRoute,
    clearAllVisualizations
  };
};
