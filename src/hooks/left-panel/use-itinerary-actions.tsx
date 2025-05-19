import { useState } from 'react';
import { Place, SchedulePayload, ItineraryPlaceWithTime, CategoryName } from '@/types/supabase';
import { useItineraryCreator, ItineraryDay } from '../use-itinerary-creator';
import { useScheduleGenerator } from '../use-schedule-generator';
import { toast } from 'sonner';
import { NewServerScheduleResponse, isNewServerScheduleResponse, ServerScheduleItem } from '@/types/schedule';

export const useItineraryActions = () => {
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [selectedItineraryDay, setSelectedItineraryDay] = useState<number | null>(null);
  const [showItinerary, setShowItinerary] = useState<boolean>(false);
  const { createItinerary } = useItineraryCreator();
  const { generateSchedule, isGenerating } = useScheduleGenerator();

  const handleSelectItineraryDay = (day: number) => {
    console.log('일정 일자 선택:', day);
    setSelectedItineraryDay(day);
  };

  const generateItinerary = (
    placesToUse: Place[],
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string
  ) => {
    try {
      if (placesToUse.length === 0) {
        toast.error("선택된 장소가 없습니다.");
        return null;
      }
    
      console.log('일정 생성 시작', {
        장소수: placesToUse.length,
        시작일: startDate,
        종료일: endDate,
        시작시간: startTime,
        종료시간: endTime
      });
      
      const generatedItinerary = createItinerary(
        placesToUse,
        startDate,
        endDate,
        startTime,
        endTime
      );
      
      if (generatedItinerary.length === 0) {
        toast.error("일정을 생성할 수 없습니다. 더 많은 장소를 선택해주세요.");
        return null;
      }
      
      setItinerary(generatedItinerary);
      setSelectedItineraryDay(1); // 항상 첫 번째 일차를 기본으로 선택
      setShowItinerary(true);
      
      console.log("일정 생성 완료:", {
        일수: generatedItinerary.length,
        총장소수: generatedItinerary.reduce((sum, day) => sum + day.places.length, 0),
        첫날장소: generatedItinerary[0]?.places.map(p => p.name).join(', ')
      });
      
      return generatedItinerary;
    } catch (error) {
      console.error("일정 생성 오류:", error);
      toast.error("일정 생성 중 오류가 발생했습니다.");
      return null;
    }
  };

  // 서버로 일정 생성 요청하는 함수
  const handleServerItineraryCreation = async (payload: SchedulePayload, tripStartDate: Date) => {
    try {
      toast.loading("서버에 일정 생성 요청 중...");
      
      const serverResponse = await generateSchedule(payload); // This now returns NewServerScheduleResponse | null
      
      // 타입 가드를 사용하여 안전하게 필드 접근
      if (!serverResponse || !isNewServerScheduleResponse(serverResponse) || 
          !serverResponse.schedule || serverResponse.schedule.length === 0 || 
          !serverResponse.route_summary || serverResponse.route_summary.length === 0) {
        toast.error("서버에서 일정을 받아오지 못했거나, 내용이 비어있습니다.");
        console.warn("[handleServerItineraryCreation] Invalid server response:", serverResponse);
        return null;
      }
      
      const dayOfWeekMap: { [key: string]: number } = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      const tripStartDayOfWeek = tripStartDate.getDay();

      // serverResponse is NewServerScheduleResponse
      const formattedItinerary: ItineraryDay[] = serverResponse.route_summary.map(summary => {
        const routeDayOfWeekString = summary.day.substring(0, 3); // "Mon", "Tue", etc.
        const routeDayOfWeek = dayOfWeekMap[routeDayOfWeekString];
        
        let tripDayNumber = routeDayOfWeek - tripStartDayOfWeek + 1;
        if (tripDayNumber <= 0) tripDayNumber += 7;
        
        // serverResponse.schedule is ServerScheduleItem[]
        // 해당 날짜의 장소만 필터링 (선택적: 서버가 이미 날짜별로 구분된 스케줄을 제공하지 않는다면)
        // 여기서는 일단 모든 스케줄 아이템을 해당 날짜와 연관된 것으로 간주하거나,
        // 또는 route_summary의 interleaved_route에 있는 장소 ID와 매칭되는 schedule item을 찾아야 함.
        // 현재 ServerScheduleItem에는 ID가 옵셔널이라, place_name 기반으로 찾거나, ID가 있다면 ID 기반.
        // 단순화를 위해, 서버에서 온 schedule을 모두 포함시키고, 클라이언트에서 필요시 필터링한다고 가정.
        // 또는, 서버가 route_summary의 순서와 schedule의 순서를 일치시켜준다고 가정.
        // 여기서는 summary.interleaved_route의 장소 노드 ID를 사용하여 schedule에서 매칭되는 장소를 찾아봅니다.
        const placeNodeIdsInRoute = summary.interleaved_route
            .filter((id, index) => index % 2 === 0) // 노드는 짝수 인덱스
            .map(id => String(id));

        const dayPlaces = serverResponse.schedule
            .filter(item => {
                // item.id가 숫자나 문자열일 수 있고, placeNodeIdsInRoute는 문자열 배열
                const itemIdStr = item.id !== undefined ? String(item.id) : null;
                return itemIdStr && placeNodeIdsInRoute.includes(itemIdStr);
            })
            .map((item: ServerScheduleItem) => ({ // item is ServerScheduleItem
                id: item.id?.toString() || item.place_name,
                name: item.place_name,
                category: item.place_type as CategoryName, 
                timeBlock: item.time_block,
                // Default values for properties not present in ServerScheduleItem, to satisfy ItineraryPlaceWithTime
                x:0, y:0, address:'', phone:'', description:'', rating:0, image_url:'', road_address:'', homepage:'',
                isSelected: false, isCandidate: false, 
            } as ItineraryPlaceWithTime)); // Cast to ItineraryPlaceWithTime

        // 만약 dayPlaces가 비어있다면, 모든 장소를 해당일에 할당하는 이전 로직을 임시로 사용할 수 있지만,
        // 장기적으로는 서버 응답이나 매칭 로직을 개선해야 함.
        // For now, if no places specifically match node IDs in route for this day, it will be empty. This might be desired.

        return {
          day: tripDayNumber,
          places: dayPlaces, // These are ItineraryPlaceWithTime[]
          totalDistance: summary.total_distance_m / 1000,
          interleaved_route: summary.interleaved_route,
          routeData: { 
            nodeIds: placeNodeIdsInRoute, // Use already filtered node IDs
            linkIds: summary.interleaved_route.filter((_, idx) => idx % 2 !== 0).map(String),
          }
        };
      });
      
      console.log("서버로부터 일정 수신 완료 (useItineraryActions):", {
        일수: formattedItinerary.length,
      });
      
      setItinerary(formattedItinerary);
      if (formattedItinerary.length > 0) {
        setSelectedItineraryDay(formattedItinerary[0].day as number);
      }
      
      toast.success(`${formattedItinerary.length}일 일정이 생성되었습니다!`);
      return formattedItinerary;
    } catch (error) {
      console.error("서버 일정 생성 오류 (useItineraryActions):", error);
      toast.error("서버에서 일정을 생성하는데 실패했습니다.");
      return null;
    }
  };

  // 경로 생성 핸들러
  const handleCreateItinerary = (
    selectedPlaces: Place[], 
    dates: {
      startDate: Date;
      endDate: Date;
      startTime: string;
      endTime: string;
    } | null,
    payload?: SchedulePayload
  ) => {
    if (!dates) {
      console.error('경로 생성 실패: 날짜 정보가 없습니다.');
      toast.error("여행 날짜를 설정해주세요!");
      return null;
    }
    
    if (selectedPlaces.length === 0) {
      console.error('경로 생성 실패: 선택된 장소가 없습니다.');
      toast.error("장소를 먼저 선택해주세요!");
      return null;
    }
    
    console.log("경로 생성 시작:", {
      장소수: selectedPlaces.length,
      날짜: dates
    });
    
    // 서버 API를 통한 일정 생성
    if (payload && dates?.startDate) {
      console.log("서버 API를 통한 일정 생성 시도 (useItineraryActions)");
      // return handleServerItineraryCreation(payload, dates.startDate); // This returns Promise
      // To keep it simple for now, let's make it async or handle promise if needed by caller
      // For now, just calling it. The caller (useItinerary) doesn't seem to await this.
      // This needs careful review of how useItinerary and useLeftPanel use this.
      // For now, let's assume the primary generation path is via ScheduleGenerator -> useScheduleManagement.
      // This path might be for a different button/flow.
       handleServerItineraryCreation(payload, dates.startDate).then(result => {
         if (result) {
           setShowItinerary(true); // Ensure UI updates if server call is successful
         }
       });
       return null; // Or return a promise if the caller expects it
    }
    
    // 로컬 알고리즘을 통한 일정 생성 (기존 방식, 폴백)
    console.log("로컬 알고리즘을 통한 일정 생성 (폴백)");
    const result = generateItinerary(
      selectedPlaces,
      dates.startDate,
      dates.endDate,
      dates.startTime,
      dates.endTime
    );
    
    if (result) {
      toast.success("일정이 성공적으로 생성되었습니다!");
      setShowItinerary(true); // 명시적으로 일정 패널을 표시하도록 설정
    }
    
    return result;
  };

  return {
    itinerary,
    selectedItineraryDay,
    showItinerary,
    setItinerary,
    setSelectedItineraryDay,
    setShowItinerary,
    handleSelectItineraryDay,
    handleCreateItinerary,
    isGenerating
  };
};
