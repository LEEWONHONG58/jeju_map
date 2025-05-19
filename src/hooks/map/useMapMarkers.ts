
import { useRef, useCallback } from 'react';
import { Place } from '@/types/supabase';
import { getCategoryColor, mapCategoryNameToKey } from '@/utils/categoryColors';

type MarkerOptions = {
  highlight?: boolean;
  isItinerary?: boolean;
  useRecommendedStyle?: boolean;
  useColorByCategory?: boolean;
  onClick?: (place: Place, index: number) => void;
};

export const useMapMarkers = (map: any) => {
  const markers = useRef<any[]>([]);
  const infoWindows = useRef<any[]>([]);
  const polylines = useRef<any[]>([]);

  // 모든 UI 요소 지우기
  const clearMarkersAndUiElements = useCallback(() => {
    // 마커 제거
    if (markers.current && markers.current.length > 0) {
      markers.current.forEach(marker => {
        if (marker && typeof marker.setMap === 'function') {
          marker.setMap(null);
        }
      });
      markers.current = [];
    }

    // 정보창 닫기
    if (infoWindows.current && infoWindows.current.length > 0) {
      infoWindows.current.forEach(infoWindow => {
        if (infoWindow && typeof infoWindow.close === 'function') {
          infoWindow.close();
        }
      });
      infoWindows.current = [];
    }

    // 폴리라인 제거
    if (polylines.current && polylines.current.length > 0) {
      polylines.current.forEach(polyline => {
        if (polyline && typeof polyline.setMap === 'function') {
          polyline.setMap(null);
        }
      });
      polylines.current = [];
    }
  }, []);

  // 마커 추가
  const addMarkers = useCallback((places: Place[], opts: MarkerOptions = {}) => {
    if (!map || !window.naver || !places || places.length === 0) return [];

    const { highlight = false, isItinerary = false, useRecommendedStyle = false, useColorByCategory = false, onClick } = opts;
    const createdMarkers: any[] = [];

    places.forEach((place, index) => {
      if (!place.x || !place.y) {
        console.warn(`Place missing coordinates: ${place.name || 'Unknown'}`);
        return;
      }

      const position = new window.naver.maps.LatLng(place.y, place.x);

      // 장소 카테고리에 따른 색상 결정
      const categoryColor = useColorByCategory && place.category 
        ? getCategoryColor(mapCategoryNameToKey(place.category)) 
        : (highlight ? '#FF3B30' : '#4CD964');

      // 마커 스타일 결정
      let markerIcon;
      if (isItinerary) {
        // 일정 마커는 순서 번호가 포함된 원형 마커
        markerIcon = {
          content: `
            <div class="custom-marker" style="
              width: 36px; height: 36px; border-radius: 50%; 
              background-color: ${categoryColor};
              color: white; font-weight: bold; display: flex;
              align-items: center; justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 2px solid white;
              font-size: 14px;
            ">${index + 1}</div>
          `,
          size: new window.naver.maps.Size(36, 36),
          anchor: new window.naver.maps.Point(18, 18)
        };
      } else if (useRecommendedStyle) {
        // 추천 장소 마커 스타일
        markerIcon = {
          content: `
            <div class="custom-marker" style="
              width: 32px; height: 32px; border-radius: 50%;
              background-color: ${categoryColor};
              color: white; font-weight: bold; display: flex;
              align-items: center; justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3); border: 2px solid white;
              font-size: 12px; display: flex; align-items: center; justify-content: center;
            ">⭐</div>
          `,
          size: new window.naver.maps.Size(32, 32),
          anchor: new window.naver.maps.Point(16, 16)
        };
      } else {
        // 기본 마커 스타일
        markerIcon = {
          content: `
            <div class="custom-marker" style="
              width: 24px; height: 24px; border-radius: 50%;
              background-color: ${categoryColor};
              border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            "></div>
          `,
          size: new window.naver.maps.Size(24, 24),
          anchor: new window.naver.maps.Point(12, 12)
        };
      }

      // 마커 생성
      const marker = new window.naver.maps.Marker({
        position: position,
        map: map,
        title: place.name,
        icon: markerIcon,
        zIndex: highlight ? 100 : isItinerary ? 90 - index : 50
      });

      // 클릭 시 정보창 표시
      const contentString = `
        <div style="padding: 10px; max-width: 200px; font-size: 13px;">
          <h3 style="font-weight: bold; margin-bottom: 5px;">${place.name}</h3>
          ${place.address ? `<p style="color: #666; margin: 4px 0;">${place.address}</p>` : ''}
          ${place.category ? `<p style="color: ${categoryColor}; margin: 4px 0; font-size: 12px;">${place.category}</p>` : ''}
          ${place.rating ? `<p style="color: #FF9500; margin: 4px 0;">⭐ ${place.rating.toFixed(1)}</p>` : ''}
          ${isItinerary ? `<strong style="color: ${categoryColor}; font-size: 14px;">방문 순서: ${index + 1}</strong>` : ''}
        </div>
      `;

      const infoWindow = new window.naver.maps.InfoWindow({
        content: contentString,
        maxWidth: 220,
        backgroundColor: "white",
        borderColor: "#ddd",
        borderWidth: 1,
        anchorSize: new window.naver.maps.Size(10, 10),
        pixelOffset: new window.naver.maps.Point(0, -5)
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        // 열려있는 정보창 모두 닫기
        infoWindows.current.forEach(iw => iw.close());
        
        // 새로운 정보창 열기
        infoWindow.open(map, marker);
        
        // 커스텀 onClick 핸들러가 있으면 호출
        if (onClick) {
          onClick(place, index);
        }
      });

      markers.current.push(marker);
      infoWindows.current.push(infoWindow);
      createdMarkers.push(marker);
    });
    
    return createdMarkers;
  }, [map]);

  // 경로 계산 및 표시
  const calculateRoutes = useCallback((places: Place[]) => {
    if (!map || !window.naver || places.length <= 1) return;

    // 경로를 나타낼 선 그리기
    for (let i = 0; i < places.length - 1; i++) {
      const currentPlace = places[i];
      const nextPlace = places[i + 1];
      
      if (!currentPlace.x || !currentPlace.y || !nextPlace.x || !nextPlace.y) {
        console.warn('Missing coordinates for route calculation');
        continue;
      }

      const path = [
        new window.naver.maps.LatLng(currentPlace.y, currentPlace.x),
        new window.naver.maps.LatLng(nextPlace.y, nextPlace.x)
      ];

      const polyline = new window.naver.maps.Polyline({
        map: map,
        path: path,
        strokeColor: '#007AFF',
        strokeWeight: 3,
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polylines.current.push(polyline);
    }
  }, [map]);

  return {
    addMarkers,
    clearMarkersAndUiElements,
    calculateRoutes
  };
};
