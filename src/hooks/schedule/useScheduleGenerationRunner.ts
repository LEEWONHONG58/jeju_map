
import { useCallback } from 'react';
import { toast } from 'sonner';
import { SelectedPlace } from '@/types/supabase';
import { NewServerScheduleResponse, ServerRouteResponse, isNewServerScheduleResponse } from '@/types/schedule';
import { useScheduleGenerator as useScheduleGeneratorHook } from '@/hooks/use-schedule-generator';
import { useItineraryCreator, ItineraryDay as CreatorItineraryDay } from '@/hooks/use-itinerary-creator';
import { useMapContext } from '@/components/rightpanel/MapContext';
import { useSchedulePayload } from './useSchedulePayload';
import { useScheduleParser, updateItineraryWithCoordinates } from './useScheduleParser';
import { extractAllNodesFromRoute, extractAllLinksFromRoute } from '@/utils/routeParser';

const DEBUG_MODE = true;

function debugLog(message: string, data?: any) {
  if (DEBUG_MODE) {
    console.log(`[DEBUG] %c${message}`, 'color: blue; font-weight: bold;', data !== undefined ? data : '');
  }
}

interface UseScheduleGenerationRunnerProps {
  selectedPlaces: SelectedPlace[];
  dates: { startDate: Date; endDate: Date; startTime: string; endTime: string; } | null;
  startDatetime: string | null;
  endDatetime: string | null;
  setItinerary: (itinerary: CreatorItineraryDay[]) => void;
  setSelectedDay: (day: number | null) => void;
  setIsLoadingState: (loading: boolean) => void;
}

export const useScheduleGenerationRunner = ({
  selectedPlaces,
  dates,
  startDatetime, 
  endDatetime,   
  setItinerary,
  setSelectedDay,
  setIsLoadingState,
}: UseScheduleGenerationRunnerProps) => {
  const { generateSchedule: generateScheduleViaHook } = useScheduleGeneratorHook();
  const { createItinerary } = useItineraryCreator();
  const { setServerRoutes, geoJsonNodes } = useMapContext();
  
  const { preparePayload } = useSchedulePayload({ 
    selectedPlaces, 
    startDatetimeISO: startDatetime, 
    endDatetimeISO: endDatetime 
  });
  const { parseServerResponse } = useScheduleParser({ currentSelectedPlaces: selectedPlaces });

  const runScheduleGenerationProcess = useCallback(async () => {
    console.log("[useScheduleGenerationRunner] runScheduleGenerationProcess started. Setting isLoadingState to true.");
    setIsLoadingState(true);
    
    let finalItineraryForEvent: CreatorItineraryDay[] = [];
    
    try {
      const payload = preparePayload();
      debugLog('Server request payload (useScheduleGenerationRunner):', payload);
      
      if (!payload) {
        toast.error("일정 생성에 필요한 정보가 부족합니다.");
        setIsLoadingState(false);
        return;
      }

      // 서버에 일정 생성 요청을 보내고 응답을 받습니다
      const serverResponse = await generateScheduleViaHook(payload);
      console.log('[useScheduleGenerationRunner] 서버 원본 응답:', serverResponse);
      debugLog('Raw server response (useScheduleGenerationRunner):', serverResponse);
      
      // 서버 응답 상세 정보 로깅
      console.log('[useScheduleGenerationRunner] 서버 응답 타입 분석:', {
        응답존재: !!serverResponse,
        객체타입: typeof serverResponse === 'object',
        배열여부: Array.isArray(serverResponse),
        schedule존재: !!serverResponse?.schedule,
        route_summary존재: !!serverResponse?.route_summary,
        schedule길이: serverResponse?.schedule?.length || 0,
        route_summary길이: serverResponse?.route_summary?.length || 0,
        places_routed속성: !!serverResponse?.route_summary?.[0]?.places_routed,
        isNewResponse: isNewServerScheduleResponse(serverResponse)
      });

      // 서버 응답 검증 로직 추가 - 더 명확하고 강력하게
      if (serverResponse && 
          typeof serverResponse === 'object' && 
          !Array.isArray(serverResponse) &&
          Array.isArray(serverResponse.schedule) && 
          Array.isArray(serverResponse.route_summary) &&
          serverResponse.route_summary.length > 0) {
        
        console.log('[useScheduleGenerationRunner] 서버 응답이 유효합니다. 일정 파싱을 시작합니다.');
        
        // 저장해둔 서버 응답을 ItineraryDay 배열로 변환
        let parsedItinerary = parseServerResponse(serverResponse, dates?.startDate || new Date());
        console.log("[useScheduleGenerationRunner] 파싱된 일정 (좌표 업데이트 전):", JSON.parse(JSON.stringify(parsedItinerary)));
        
        // 유효성 검사: 빈 일정이 아닌지 확인
        if (parsedItinerary.length === 0) {
          console.error('[useScheduleGenerationRunner] 서버 응답 파싱 결과가 빈 배열입니다.');
          toast.error('서버 응답을 처리할 수 없습니다. 다시 시도해 주세요.');
          
          // 대체 일정 생성 로직
          if (dates && selectedPlaces.length > 0) {
            const fallbackItinerary = createItinerary(
              selectedPlaces,
              dates.startDate,
              dates.endDate,
              dates.startTime,
              dates.endTime
            );
            
            if (fallbackItinerary.length > 0) {
              // 대체 일정 저장 및 이벤트 발생을 위한 설정
              setItinerary(fallbackItinerary);
              finalItineraryForEvent = fallbackItinerary;
              setSelectedDay(fallbackItinerary[0].day);
              toast.info('클라이언트에서 대체 일정을 생성했습니다.');
            }
          }
          
          setIsLoadingState(false);
          return;
        }
        
        // GeoJSON에서 좌표 정보 추가
        const itineraryWithCoords = updateItineraryWithCoordinates(parsedItinerary, geoJsonNodes as any);
        console.log("[useScheduleGenerationRunner] 좌표가 추가된 일정:", JSON.parse(JSON.stringify(itineraryWithCoords)));
        
        // 상태에 일정 데이터를 저장
        setItinerary(itineraryWithCoords);
        finalItineraryForEvent = itineraryWithCoords;
        
        // MapContext에 경로 데이터 전달
        const routesForMapContext: Record<number, ServerRouteResponse> = {};
        
        itineraryWithCoords.forEach(dayWithCoords => {
            // 각 일자마다 MapContext에 서버 경로 데이터 설정
            routesForMapContext[dayWithCoords.day] = {
                nodeIds: dayWithCoords.routeData?.nodeIds || [],
                linkIds: dayWithCoords.routeData?.linkIds || [],
                interleaved_route: dayWithCoords.interleaved_route,
            };
        });
        
        console.log("[useScheduleGenerationRunner] 지도 콘텍스트에 경로 데이터 설정:", routesForMapContext);
        setServerRoutes(routesForMapContext);
        
        // 첫 날짜 선택 및 성공 메시지
        if (itineraryWithCoords.length > 0) {
          setSelectedDay(itineraryWithCoords[0].day);
          toast.success(`${itineraryWithCoords.length}일 일정이 성공적으로 생성되었습니다!`);
        }
      } else {
        console.error('[useScheduleGenerationRunner] 서버 응답이 필요한 형식을 충족하지 않습니다:', serverResponse);
        toast.error("서버 응답 형식이 올바르지 않습니다. 다시 시도해 주세요.");
        
        // 대체 일정 생성
        if (dates && selectedPlaces.length > 0) {
            const fallbackItinerary = createItinerary(
              selectedPlaces,
              dates.startDate,
              dates.endDate,
              dates.startTime,
              dates.endTime
            );
            
            setItinerary(fallbackItinerary);
            finalItineraryForEvent = fallbackItinerary;
            
            if (fallbackItinerary.length > 0) {
              setSelectedDay(fallbackItinerary[0].day);
              toast.info("클라이언트에서 기본 일정이 생성되었습니다.");
            }
        }
      }
    } catch (error) {
      console.error("일정 생성 중 오류 발생 (useScheduleGenerationRunner):", error);
      toast.error("일정 생성 중 오류가 발생했습니다.");
      
      // 에러 발생 시 대체 일정 생성
      if (dates && selectedPlaces.length > 0) {
        const fallbackItinerary = createItinerary(
          selectedPlaces,
          dates.startDate,
          dates.endDate,
          dates.startTime,
          dates.endTime
        );
        
        setItinerary(fallbackItinerary);
        finalItineraryForEvent = fallbackItinerary;
        
        if (fallbackItinerary.length > 0) {
          setSelectedDay(fallbackItinerary[0].day);
          toast.info("오류 발생으로 인해 기본 일정을 생성했습니다.");
        }
      }
    } finally {
      console.log("[useScheduleGenerationRunner] finally 블록 진입. isLoadingState를 false로 설정합니다.");
      
      // 로딩 상태 해제는 이벤트 발생 후에 하도록 지연시킵니다
      // 일정 생성 이벤트 발생
      if (finalItineraryForEvent.length > 0) {
        console.log("[useScheduleGenerationRunner] 'itineraryCreated' 이벤트 발생:", JSON.parse(JSON.stringify(finalItineraryForEvent)));
        
        const event = new CustomEvent('itineraryCreated', { 
          detail: { 
            itinerary: finalItineraryForEvent,
            selectedDay: finalItineraryForEvent.length > 0 ? finalItineraryForEvent[0].day : null
          } 
        });
        window.dispatchEvent(event);
        
        // 일정 데이터 보존을 확인한 후 로딩 상태 해제
        setTimeout(() => {
          console.log("[useScheduleGenerationRunner] 'forceRerender' 이벤트 발생");
          window.dispatchEvent(new Event('forceRerender'));
          
          // 좌표가 포함된 일정 이벤트 발생
          const coordsEvent = new CustomEvent('itineraryWithCoordinatesReady', {
            detail: { itinerary: finalItineraryForEvent }
          });
          console.log("[useScheduleGenerationRunner] 'itineraryWithCoordinatesReady' 이벤트 발생");
          window.dispatchEvent(coordsEvent);
          
          // 이벤트 발생 후 로딩 상태를 해제
          setIsLoadingState(false);
        }, 100);
      } else {
        console.log("[useScheduleGenerationRunner] 'itineraryCreated' 이벤트 발생 (빈 일정)");
        const event = new CustomEvent('itineraryCreated', {
          detail: {
            itinerary: [],
            selectedDay: null
          }
        });
        window.dispatchEvent(event);
        
        // 이벤트 발생 후 로딩 상태를 해제
        setTimeout(() => {
          setIsLoadingState(false);
        }, 100);
      }
    }
  }, [
    preparePayload,
    generateScheduleViaHook,
    parseServerResponse,
    geoJsonNodes,
    selectedPlaces,
    setServerRoutes,
    dates,
    createItinerary,
    setItinerary,
    setSelectedDay,
    setIsLoadingState,
  ]);

  return { 
    runScheduleGenerationProcess,
  };
};
