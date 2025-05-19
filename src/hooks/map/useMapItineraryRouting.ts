
import { useCallback, useRef, useState, useEffect } from 'react';
import { Place, ItineraryDay } from '@/types/supabase';
import { clearPolylines } from '@/utils/map/mapCleanup';
import { getCategoryColor, mapCategoryNameToKey } from '@/utils/categoryColors';
import { toast } from 'sonner';

// 날짜별 경로 색상 팔레트
const ROUTE_COLORS = [
  '#9b87f5', // Primary Purple
  '#F97316', // Bright Orange
  '#0EA5E9', // Ocean Blue
  '#D946EF', // Magenta Pink
  '#ea384c', // Red
  '#33C3F0', // Sky Blue
  '#8B5CF6'  // Vivid Purple
];

interface ItineraryRouteOptions {
  strokeWeight?: number;
  strokeOpacity?: number;
  strokeColor?: string;
  strokeStyle?: 'solid' | 'dashed';
  zIndex?: number;
}

export const useMapItineraryRouting = (map: any) => {
  const polylines = useRef<any[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [currentRoutes, setCurrentRoutes] = useState<any[]>([]);
  const [lastRenderedDay, setLastRenderedDay] = useState<number | null>(null);

  // 모든 경로 초기화
  const clearAllRoutes = useCallback(() => {
    if (polylines.current.length > 0) {
      clearPolylines(polylines.current);
      polylines.current = [];
      setCurrentRoutes([]);
    }
  }, []);

  // 두 좌표 사이의 거리 계산 (km)
  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 지구 반경 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return distance;
  }, []);

  // 일정 날짜에 해당하는 경로 그리기
  const renderDayRoute = useCallback((itineraryDay: ItineraryDay | null, options?: ItineraryRouteOptions) => {
    if (!map || !window.naver || !itineraryDay || itineraryDay.places.length < 2) {
      console.log("경로를 그릴 수 없습니다:", {
        맵존재: !!map, 
        네이버존재: !!window.naver, 
        일정존재: !!itineraryDay,
        장소개수: itineraryDay?.places?.length
      });
      return;
    }

    // 기존 경로 삭제
    clearAllRoutes();
    
    try {
      let calculatedDistance = 0;
      
      // 전체 순서대로 경로 생성 (기본 경로)
      const pathPoints = itineraryDay.places.map(place => {
        return new window.naver.maps.LatLng(place.y, place.x);
      });
      
      // 날짜에 따라 다른 색상 사용
      const dayIndex = (itineraryDay.day - 1) % ROUTE_COLORS.length;
      const strokeColor = options?.strokeColor || ROUTE_COLORS[dayIndex];
      
      // 경로 폴리라인 생성 (기본 경로)
      const mainPolyline = new window.naver.maps.Polyline({
        map: map,
        path: pathPoints,
        strokeColor: strokeColor,
        strokeWeight: options?.strokeWeight || 5,
        strokeOpacity: options?.strokeOpacity || 0.7,
        strokeStyle: options?.strokeStyle || 'solid',
        zIndex: options?.zIndex || 100,
      });
      
      polylines.current.push(mainPolyline);
      setCurrentRoutes([mainPolyline]);
      
      // 각 구간별 거리 계산
      let totalDist = 0;
      for (let i = 0; i < itineraryDay.places.length - 1; i++) {
        const current = itineraryDay.places[i];
        const next = itineraryDay.places[i + 1];
        
        if (current.x && current.y && next.x && next.y) {
          const segmentDist = calculateDistance(current.y, current.x, next.y, next.x);
          totalDist += segmentDist;
        }
      }
      
      setTotalDistance(totalDist);
      setLastRenderedDay(itineraryDay.day);
      
      console.log(`${itineraryDay.day}일차 경로가 성공적으로 렌더링되었습니다. (${itineraryDay.places.length}개 장소, 총 거리: ${totalDist.toFixed(2)}km)`);
      toast.success(`${itineraryDay.day}일차 경로가 지도에 표시되었습니다.`);
      
      return () => clearPolylines([mainPolyline]);
    } catch (error) {
      console.error("경로 렌더링 중 오류 발생:", error);
      toast.error("경로 표시 중 오류가 발생했습니다.");
    }
  }, [map, calculateDistance, clearAllRoutes]);

  // 특정 구간만 하이라이트 표시하는 함수
  const highlightSegment = useCallback((fromIndex: number, toIndex: number, itineraryDay: ItineraryDay) => {
    if (!map || !window.naver || !itineraryDay || !itineraryDay.places) {
      console.error("세그먼트 하이라이트 실패: 필수 데이터 누락");
      return;
    }
    
    try {
      // 해당 구간의 두 장소 가져오기
      const places = itineraryDay.places;
      
      if (fromIndex < 0 || fromIndex >= places.length || toIndex < 0 || toIndex >= places.length) {
        console.error("유효하지 않은 장소 인덱스:", fromIndex, toIndex);
        return;
      }
      
      // 기존 하이라이트 삭제 (기본 경로는 유지)
      const basePolyline = currentRoutes[0]; // 기본 경로는 보존
      
      // 나머지 하이라이트된 경로들만 삭제
      for (let i = 1; i < polylines.current.length; i++) {
        if (polylines.current[i]) {
          polylines.current[i].setMap(null);
        }
      }
      polylines.current = [basePolyline]; // 기본 경로만 남기기
      
      // 하이라이트할 구간 경로 생성
      const source = places[fromIndex];
      const target = places[toIndex];
      
      if (!source.x || !source.y || !target.x || !target.y) {
        console.error("장소에 좌표 정보가 없습니다");
        return;
      }
      
      // 직선 경로 하이라이트
      const segmentPath = [
        new window.naver.maps.LatLng(source.y, source.x),
        new window.naver.maps.LatLng(target.y, target.x)
      ];
      
      const highlightLine = new window.naver.maps.Polyline({
        map: map,
        path: segmentPath,
        strokeColor: '#FF0000', // 강조 색상 (빨간색)
        strokeWeight: 8,        // 더 굵게
        strokeOpacity: 0.9,     // 더 진하게
        strokeStyle: 'solid',
        zIndex: 200,           // 기존 경로보다 위에 표시
      });
      
      polylines.current.push(highlightLine);
      
      // 3초 후 하이라이트 제거
      setTimeout(() => {
        if (highlightLine) {
          highlightLine.setMap(null);
          polylines.current = polylines.current.filter(p => p !== highlightLine);
        }
      }, 3000);
      
      // 선택한 두 장소 사이를 지도 뷰에 맞춤
      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(source.y, source.x),
        new window.naver.maps.LatLng(target.y, target.x)
      );
      map.fitBounds(bounds, { padding: 100 });
      
      return highlightLine;
    } catch (error) {
      console.error("경로 구간 하이라이트 오류:", error);
    }
  }, [map, currentRoutes]);

  // 여러 일정에 대한 경로 한번에 그리기 (옵션)
  const renderMultiDayRoutes = useCallback((itinerary: ItineraryDay[] | null) => {
    if (!map || !window.naver || !itinerary || itinerary.length === 0) {
      return;
    }

    // 기존 경로 삭제
    clearAllRoutes();
    
    try {
      const newPolylines: any[] = [];
      
      itinerary.forEach((day, index) => {
        if (day.places.length < 2) return;
        
        const pathPoints = day.places.map(place => 
          new window.naver.maps.LatLng(place.y, place.x)
        );
        
        const dayIndex = index % ROUTE_COLORS.length;
        
        const polyline = new window.naver.maps.Polyline({
          map: map,
          path: pathPoints,
          strokeColor: ROUTE_COLORS[dayIndex],
          strokeWeight: 5,
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
          zIndex: 100 - index, // 앞쪽 일정이 위에 표시되도록
        });
        
        newPolylines.push(polyline);
      });
      
      polylines.current = newPolylines;
      setCurrentRoutes(newPolylines);
      
      console.log(`총 ${itinerary.length}일 경로가 렌더링되었습니다.`);
      
    } catch (error) {
      console.error("다중 경로 렌더링 중 오류 발생:", error);
    }
  }, [map, clearAllRoutes]);

  return {
    renderDayRoute,
    renderMultiDayRoutes,
    clearAllRoutes,
    totalDistance,
    highlightSegment,
    lastRenderedDay
  };
};
