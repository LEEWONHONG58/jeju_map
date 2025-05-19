import { useState, useEffect } from 'react';
import { Place } from '@/types/supabase'; // Assuming Place from supabase is compatible or use Place from @/types
import { 
    ItineraryDay as GlobalItineraryDay, 
    ItineraryPlaceWithTime as GlobalItineraryPlaceWithTime,
    RouteData // Import RouteData
} from '@/types'; // Use the global type from index.ts
import { useItineraryCreator, ItineraryDay as CreatorItineraryDay } from './use-itinerary-creator'; // This is from the read-only file
import { toast } from 'sonner';

// Export the global types so other files use the consistent definition
export type ItineraryDay = GlobalItineraryDay;
export type ItineraryPlaceWithTime = GlobalItineraryPlaceWithTime;

// Helper to get day of week string (e.g., "Mon")
const getDayOfWeekString = (date: Date): string => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
};

// Helper to get date string (e.g., "05/21")
const getDateStringMMDD = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${month}/${day}`;
};

export const useItinerary = () => {
  const [itinerary, setItinerary] = useState<GlobalItineraryDay[] | null>(null);
  const [selectedItineraryDay, setSelectedItineraryDay] = useState<number | null>(null);
  const [showItinerary, setShowItinerary] = useState<boolean>(false);
  const [isItineraryCreated, setIsItineraryCreated] = useState<boolean>(false); // Added state
  const { createItinerary } = useItineraryCreator();

  const handleSelectItineraryDay = (day: number) => {
    setSelectedItineraryDay(day);
  };

  const generateItinerary = (
    placesToUse: Place[], // Ensure this Place type is compatible
    startDate: Date,
    endDate: Date,
    startTime: string,
    endTime: string
  ): GlobalItineraryDay[] => {
    try {
      if (placesToUse.length === 0) {
        toast.error("선택된 장소가 없습니다.");
        return [];
      }

      // createItinerary returns CreatorItineraryDay[]
      const creatorItineraryResult: CreatorItineraryDay[] = createItinerary(
        placesToUse,
        startDate,
        endDate,
        startTime,
        endTime
      );

      if (!creatorItineraryResult || creatorItineraryResult.length === 0) {
        toast.error("일정을 생성할 수 없습니다. 더 많은 장소를 선택해주세요.");
        return [];
      }

      // Map CreatorItineraryDay[] to GlobalItineraryDay[]
      const mappedItinerary: GlobalItineraryDay[] = creatorItineraryResult.map((creatorDay, index) => {
        const currentDayDate = new Date(startDate);
        currentDayDate.setDate(startDate.getDate() + index); // Assuming days are sequential from startDate

        // Map places if their structure differs or needs type assertion
        const mappedPlaces = creatorDay.places.map(p => ({
          ...p,
          // Ensure all properties of GlobalItineraryPlaceWithTime are present
          // If Creator's Place type is different, map properties here
        })) as GlobalItineraryPlaceWithTime[];

        return {
          ...creatorDay, // Spread properties from CreatorItineraryDay
          places: mappedPlaces, // Use mapped places
          // Add/ensure missing properties required by GlobalItineraryDay
          dayOfWeek: (creatorDay as any).dayOfWeek || getDayOfWeekString(currentDayDate),
          date: (creatorDay as any).date || getDateStringMMDD(currentDayDate),
          routeData: (creatorDay as any).routeData || { nodeIds: [], linkIds: [], segmentRoutes: [] },
          interleaved_route: (creatorDay as any).interleaved_route || [],
        };
      });

      setItinerary(mappedItinerary);
      setIsItineraryCreated(true); // Set created flag
      setSelectedItineraryDay(1); // Default to day 1
      setShowItinerary(true);

      console.log("일정 생성 완료 (useItinerary):", {
        일수: mappedItinerary.length,
        총장소수: mappedItinerary.reduce((sum, day) => sum + day.places.length, 0),
        첫날장소: mappedItinerary[0]?.places.map(p => p.name).join(', ')
      });

      return mappedItinerary;
    } catch (error) {
      console.error("일정 생성 오류 (useItinerary):", error);
      toast.error("일정 생성 중 오류가 발생했습니다.");
      return [];
    }
  };

  // 서버 응답 처리 함수 - 개선된 로직
  const handleServerItineraryResponse = (serverItinerary: GlobalItineraryDay[]) => {
    console.log("서버 일정 응답 처리 시작 (useItinerary):", {
      일수: serverItinerary?.length || 0,
      첫날장소수: serverItinerary?.[0]?.places?.length || 0
    });

    if (!serverItinerary || serverItinerary.length === 0) {
      console.warn("[useItinerary] handleServerItineraryResponse: 빈 일정이 전달되었습니다.");
      setItinerary([]); // Set to empty array instead of returning
      setShowItinerary(false); // Hide itinerary panel if empty
      setIsItineraryCreated(false); // Reset created flag
      return []; // Return empty array for consistency
    }

    try {
      setItinerary(serverItinerary);
      setIsItineraryCreated(true); // Set created flag
      
      console.log("[useItinerary] handleServerItineraryResponse: 일정 패널 표시 활성화");
      setShowItinerary(true);
      
      if (serverItinerary.length > 0) {
        console.log(`[useItinerary] handleServerItineraryResponse: 첫 번째 일자(${serverItinerary[0].day}) 선택`);
        setSelectedItineraryDay(serverItinerary[0].day);
      }

      setTimeout(() => {
        console.log("[useItinerary] handleServerItineraryResponse: forceRerender 이벤트 발생");
        window.dispatchEvent(new Event('forceRerender'));
        
        const event = new CustomEvent('itineraryWithCoordinatesReady', {
          detail: { itinerary: serverItinerary }
        });
        console.log("[useItinerary] handleServerItineraryResponse: itineraryWithCoordinatesReady 이벤트 발생");
        window.dispatchEvent(event);

        const itineraryCreatedEvent = new CustomEvent('itineraryCreated', {
          detail: { 
            itinerary: serverItinerary,
            selectedDay: serverItinerary.length > 0 ? serverItinerary[0].day : null
          }
        });
        console.log("[useItinerary] handleServerItineraryResponse: itineraryCreated 이벤트 발생");
        window.dispatchEvent(itineraryCreatedEvent);
      }, 100);

      return serverItinerary;
    } catch (error) {
      console.error("[useItinerary] handleServerItineraryResponse ��리 중 오류:", error);
      setIsItineraryCreated(false); // Reset on error
      return serverItinerary; // Or handle error by returning empty array
    }
  };

  // Debugging function within useItinerary
  const createDebugItinerary = (startDateInput: Date): GlobalItineraryDay[] => {
    const result: GlobalItineraryDay[] = [];
    const startDate = startDateInput || new Date(); // Fallback if startDate is null
    
    for (let i = 0; i < 3; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const places: GlobalItineraryPlaceWithTime[] = [];
      for (let j = 0; j < 3 + Math.floor(Math.random() * 2); j++) {
        const placeIdNum = 4060000000 + i * 10000 + j * 100;
        const placeIdStr = String(placeIdNum);
        places.push({
          // Base Place properties
          id: placeIdStr, // Assuming id is string in GlobalItineraryPlaceWithTime
          name: `디버깅 장소 ${i+1}-${j+1}`,
          address: '제주특별자치도',
          phone: 'N/A',
          category: ['attraction', 'restaurant', 'cafe', 'accommodation'][j % 4],
          description: '디버그용 장소 설명',
          rating: 4.0 + Math.random(),
          x: 126.5 + (Math.random() * 0.5 - 0.25),
          y: 33.4 + (Math.random() * 0.5 - 0.25),
          image_url: '',
          road_address: '제주특별자치도 도로명',
          homepage: '',
          // ItineraryPlaceWithTime specific properties
          timeBlock: `${(9 + j * 2).toString().padStart(2, '0')}:00`, // Example time block
          geoNodeId: placeIdStr, // Assuming geoNodeId is string
          // Optional properties
          arriveTime: `${(9 + j * 2).toString().padStart(2, '0')}:00`,
          departTime: `${(9 + j * 2 + 1).toString().padStart(2, '0')}:00`,
          stayDuration: 60,
          travelTimeToNext: "15분",
        });
      }
      
      const nodeIdsNum = places.map(p => Number(p.id));
      const linkIdsNum: number[] = [];
      for (let j = 0; j < nodeIdsNum.length - 1; j++) {
        linkIdsNum.push(5060000000 + i * 10000 + j * 100);
      }
      
      const interleavedRouteNum: number[] = [];
      for (let j = 0; j < nodeIdsNum.length; j++) {
        interleavedRouteNum.push(nodeIdsNum[j]);
        if (j < linkIdsNum.length) {
          interleavedRouteNum.push(linkIdsNum[j]);
        }
      }

      result.push({
        day: i + 1,
        places: places,
        totalDistance: parseFloat((10 + Math.random() * 20).toFixed(2)),
        routeData: {
          nodeIds: nodeIdsNum.map(String),
          linkIds: linkIdsNum.map(String),
          segmentRoutes: [] // Add segmentRoutes if needed
        },
        interleaved_route: interleavedRouteNum, // Keep as (string | number)[] if mixed, or number[] if consistent
        dayOfWeek: getDayOfWeekString(currentDate),
        date: getDateStringMMDD(currentDate),
      });
    }
    return result;
  };

  // useEffect for itineraryCreated event listener
  useEffect(() => {
    const handleItineraryCreated = (event: Event) => {
      const customEvent = event as CustomEvent<{ itinerary: GlobalItineraryDay[], selectedDay: number | null }>;
      console.log("[useItinerary] 'itineraryCreated' 이벤트 수신:", customEvent.detail);
      
      if (customEvent.detail.itinerary && Array.isArray(customEvent.detail.itinerary)) {
        if (customEvent.detail.itinerary.length === 0) {
          console.warn("[useItinerary] 수신된 일정 데이터가 비어 있습니다.");
          // toast.warning("생성된 일정이 없습니다. 다시 시도해 주세요."); // Avoid toast here if handled by caller
          setItinerary([]);
          setShowItinerary(false);
          setIsItineraryCreated(false);
          return;
        }
        
        const validItinerary = customEvent.detail.itinerary.filter(day => 
          day && typeof day.day === 'number' && day.places && Array.isArray(day.places) // Minimal validation
        );
        
        if (validItinerary.length === 0) {
          console.warn("[useItinerary] 유효한 일정 데이터가 없습니다:", customEvent.detail.itinerary);
          // toast.warning("유효한 일정 데이터가 없습니다. 다시 시도해 주세요.");
          setItinerary([]);
          setShowItinerary(false);
          setIsItineraryCreated(false);
          return;
        }
        
        console.log("[useItinerary] 유효한 일정 데이터로 상태 업데이트:", validItinerary);
        setItinerary(validItinerary);
        setIsItineraryCreated(true);
        setShowItinerary(true);
        
        const dayToSelect = customEvent.detail.selectedDay !== null && validItinerary.find(d => d.day === customEvent.detail.selectedDay)
          ? customEvent.detail.selectedDay
          : (validItinerary.length > 0 ? validItinerary[0].day : null);
        
        setSelectedItineraryDay(dayToSelect);
        
        console.log("[useItinerary] 이벤트에서 상태 업데이트 완료:", {
          일정길이: validItinerary.length,
          선택된일자: dayToSelect,
          일정패널표시: true,
          일정생성됨: true
        });
        
        setTimeout(() => {
          console.log("[useItinerary] 강제 리렌더링 이벤트 발생 (itineraryCreated)");
          window.dispatchEvent(new Event('forceRerender'));
        }, 0); // Dispatch immediately after state updates
      } else {
        console.error("[useItinerary] 이벤트에 유효한 일정 데이터가 없습니다:", customEvent.detail);
        setItinerary([]);
        setShowItinerary(false);
        setIsItineraryCreated(false);
      }
    };
    
    window.addEventListener('itineraryCreated', handleItineraryCreated);
    
    return () => {
      window.removeEventListener('itineraryCreated', handleItineraryCreated);
    };
  }, [setItinerary, setSelectedItineraryDay, setShowItinerary, setIsItineraryCreated]);

  return {
    itinerary,
    selectedItineraryDay,
    showItinerary,
    isItineraryCreated, // expose this state
    setItinerary,
    setSelectedItineraryDay,
    setShowItinerary,
    setIsItineraryCreated, // expose setter
    handleSelectItineraryDay,
    generateItinerary,
    handleServerItineraryResponse,
    createDebugItinerary // expose for debugging if needed
  };
};
