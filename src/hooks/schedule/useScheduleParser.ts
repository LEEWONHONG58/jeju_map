
import { useCallback } from 'react';
import { SelectedPlace, ItineraryDay, ItineraryPlaceWithTime, CategoryName } from '@/types/supabase';
import { NewServerScheduleResponse, ServerScheduleItem, ServerRouteSummaryItem } from '@/types/schedule';
import { extractAllNodesFromRoute, extractAllLinksFromRoute } from '@/utils/routeParser';

interface UseScheduleParserProps {
  currentSelectedPlaces: SelectedPlace[];
}

// Helper interface for GeoJSON nodes expected from MapContext
interface MapContextGeoNode {
  id: string; // This should be the NODE_ID
  coordinates: [number, number]; // [longitude, latitude]
}

// Function to find coordinates from MapContext's GeoJSON nodes
export const findCoordinatesFromMapContextNodes = (
  nodeIdToFind: string | number,
  mapContextGeoNodes: MapContextGeoNode[] | null
): [number, number] | null => {
  if (!mapContextGeoNodes) return null;
  const nodeIdStr = String(nodeIdToFind);
  const foundNode = mapContextGeoNodes.find(node => String(node.id) === nodeIdStr);
  
  if (foundNode && foundNode.coordinates) {
    return foundNode.coordinates; // [longitude, latitude]
  }
  console.warn(`[findCoordinatesFromMapContextNodes] Coordinates not found for NODE_ID: ${nodeIdStr}`);
  return null;
};

// Function to update itinerary places with coordinates
export const updateItineraryWithCoordinates = (
  itineraryDays: ItineraryDay[],
  mapContextGeoNodes: MapContextGeoNode[] | null
): ItineraryDay[] => {
  if (!mapContextGeoNodes || !itineraryDays.length) {
    if (!mapContextGeoNodes) console.warn("[updateItineraryWithCoordinates] mapContextGeoNodes is null or empty.");
    if (!itineraryDays.length) console.warn("[updateItineraryWithCoordinates] itineraryDays is empty.");
    return itineraryDays;
  }
  console.log("[updateItineraryWithCoordinates] Starting coordinate update. GeoNodes available:", mapContextGeoNodes.length > 0);

  return itineraryDays.map(day => {
    const updatedPlaces = day.places.map(place => {
      const coordinates = findCoordinatesFromMapContextNodes(place.id, mapContextGeoNodes);
      if (coordinates) {
        return {
          ...place,
          x: coordinates[0], // longitude
          y: coordinates[1], // latitude
          geoNodeId: String(place.id),
        };
      }
      return place;
    });
    return { ...day, places: updatedPlaces };
  });
};

export const useScheduleParser = ({ currentSelectedPlaces }: UseScheduleParserProps) => {
  const parseServerResponse = useCallback((
    response: NewServerScheduleResponse,
    tripStartDate: Date | null
  ): ItineraryDay[] => {
    console.log('[useScheduleParser] Processing server response:', response);
    if (!response || !response.schedule || !response.route_summary) {
      console.error('[useScheduleParser] Invalid server response structure received:', response);
      return [];
    }
    if (!tripStartDate) {
      console.error("[useScheduleParser] Trip start date is required to parse server response days.");
      return [];
    }

    const { schedule, route_summary } = response;
    
    const dayOfWeekMap: { [key: string]: number } = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const tripStartDayOfWeekIndex = tripStartDate.getDay(); // 0 for Sun, 1 for Mon, ...

    const formatDateForDisplay = (date: Date): string => {
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    };
    const dayIndexToDayNameAbbrev = (index: number): string => {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[index % 7];
    };

    // 이제 route_summary 배열로부터 ItineraryDay 객체 배열을 생성합니다.
    const itineraryDays: ItineraryDay[] = route_summary.map((summaryItem: ServerRouteSummaryItem, index: number) => {
      // 요일 계산 로직: Tue, Wed 등의 요일 문자열을 0부터 시작하는 요일 인덱스로 변환
      const routeDayAbbrev = summaryItem.day.substring(0, 3); 
      const routeDayOfWeekIndex = dayOfWeekMap[routeDayAbbrev];

      // 여행 시작일로부터의 날짜 오프셋 계산
      let dayNumberOffset = routeDayOfWeekIndex - tripStartDayOfWeekIndex;
      if (dayNumberOffset < 0) dayNumberOffset += 7; 

      // 해당 일자의 날짜 계산
      const currentTripDate = new Date(tripStartDate);
      currentTripDate.setDate(tripStartDate.getDate() + dayNumberOffset);
      
      // 여행 날짜 (1일차, 2일차, ...)
      // 서버 응답 순서대로 1, 2, 3, 4로 설정 (대신 응답에서 day 필드를 활용)
      const tripDayNumber = index + 1; 

      // interleaved_route에서 장소 노드 ID 추출
      const placeNodeIdsInRoute = summaryItem.places_routed || [];
      const interleaved_route = summaryItem.interleaved_route || [];

      // 이 날의 장소 정보 생성
      const placesForThisDay: ItineraryPlaceWithTime[] = [];
      
      // places_routed와 schedule를 연결하여 각 장소에 대한 상세 정보 생성
      const placesForDay = summaryItem.places_routed || [];
      
      placesForDay.forEach((placeName, placeIndex) => {
        // 해당 장소 이름과 일치하는 schedule 항목 찾기
        const matchingScheduleItems = schedule.filter(sItem => 
          sItem.place_name === placeName && sItem.time_block.startsWith(summaryItem.day)
        );
        
        if (matchingScheduleItems.length > 0) {
          const matchingScheduleItem = matchingScheduleItems[0]; // 첫 번째 일치하는 항목 사용
          
          // 현재 선택된 장소들에서 추가 정보 찾기 (좌표, 주소 등)
          const existingPlaceInfo = currentSelectedPlaces.find(p => p.name === matchingScheduleItem.place_name);
          
          // 시간 블록에서 시간 정보 추출 (예: 'Wed_09'에서 '09' 추출)
          const timeBlockParts = matchingScheduleItem.time_block.split('_');
          const timeStr = timeBlockParts.length > 1 ? timeBlockParts[1] : '';
          // 시간은 그대로 유지 (시작/끝 특별 처리)
          const formattedTime = timeStr === '시작' || timeStr === '끝' ? timeStr : timeStr;
          
          // 노드 ID 생성 (실제 ID가 없으면 인덱스 기반 임시 ID 사용)
          const nodeId = placeIndex.toString(); // 일단 인덱스로 ID 설정
          
          // 각 장소에 대한 정보를 생성하여 배열에 추가
          placesForThisDay.push({
            id: nodeId, // 임시 ID
            name: matchingScheduleItem.place_name,
            category: (matchingScheduleItem.place_type || 'unknown') as CategoryName,
            timeBlock: formattedTime,
            x: existingPlaceInfo?.x || 0,
            y: existingPlaceInfo?.y || 0,
            address: existingPlaceInfo?.address || '',
            phone: existingPlaceInfo?.phone || '',
            description: existingPlaceInfo?.description || '',
            rating: existingPlaceInfo?.rating || 0,
            image_url: existingPlaceInfo?.image_url || '',
            road_address: existingPlaceInfo?.road_address || '',
            homepage: existingPlaceInfo?.homepage || '',
            isSelected: !!existingPlaceInfo?.isSelected,
            isCandidate: !!existingPlaceInfo?.isCandidate,
          });
        } else {
          console.warn(`[useScheduleParser] No schedule item found for place: ${placeName} in day ${summaryItem.day}.`);
          // 일치하는 스케줄 항목이 없는 경우 플레이스홀더 추가
          placesForThisDay.push({
            id: placeIndex.toString(), // 임시 ID
            name: placeName,
            category: 'unknown' as CategoryName,
            timeBlock: '',
            x: 0, y: 0, address: '', phone: '', description: '', rating: 0, image_url: '', road_address: '', homepage: '',
            isSelected: false, isCandidate: false,
          });
        }
      });
      
      // ItineraryDay 객체 생성
      return {
        day: tripDayNumber, // 1, 2, 3, 4 등으로 할당
        places: placesForThisDay,
        totalDistance: summaryItem.total_distance_m / 1000, // m에서 km로 변환
        interleaved_route: interleaved_route, // 원본 interleaved_route 보존
        routeData: {
          nodeIds: extractAllNodesFromRoute(interleaved_route).map(String),
          linkIds: extractAllLinksFromRoute(interleaved_route).map(String),
        },
        dayOfWeek: dayIndexToDayNameAbbrev(currentTripDate.getDay()),
        date: formatDateForDisplay(currentTripDate),
      };
    });

    // 일자순으로 정렬
    itineraryDays.sort((a, b) => a.day - b.day);
    
    console.log('[useScheduleParser] Processed itinerary days (before coord update):', JSON.parse(JSON.stringify(itineraryDays)));
    return itineraryDays;
  }, [currentSelectedPlaces]);

  return { parseServerResponse };
};
