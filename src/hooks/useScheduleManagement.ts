
import { useScheduleGenerator as useScheduleGeneratorHook } from '@/hooks/use-schedule-generator';
import { useScheduleStateAndEffects } from './schedule/useScheduleStateAndEffects';
import { useScheduleGenerationRunner } from './schedule/useScheduleGenerationRunner';
import { SelectedPlace } from '@/types/supabase';
import { useEffect } from 'react'; // useEffect 추가

interface UseScheduleManagementProps {
  selectedPlaces: SelectedPlace[];
  dates: { startDate: Date; endDate: Date; startTime: string; endTime: string; } | null;
  startDatetime: string | null;
  endDatetime: string | null;
}

export const useScheduleManagement = ({
  selectedPlaces,
  dates,
  startDatetime,
  endDatetime,
}: UseScheduleManagementProps) => {
  const {
    itinerary,
    setItinerary,
    selectedDay,
    setSelectedDay,
    isLoadingState: isLoadingStateFromEffects, // 이름 변경하여 명확화
    setIsLoadingState,
    handleSelectDay,
  } = useScheduleStateAndEffects();

  const { isGenerating: isGeneratingFromGenerator } = useScheduleGeneratorHook(); // 이름 변경하여 명확화

  const { runScheduleGenerationProcess } = useScheduleGenerationRunner({
    selectedPlaces,
    dates,
    startDatetime,
    endDatetime,
    setItinerary,
    setSelectedDay,
    setIsLoadingState, // This setIsLoadingState is from useScheduleStateAndEffects
  });

  const combinedIsLoading = isGeneratingFromGenerator || isLoadingStateFromEffects;

  // Log all relevant states whenever they change
  useEffect(() => {
    console.log(`[useScheduleManagement] State Update:
      - isGenerating (from use-schedule-generator): ${isGeneratingFromGenerator}
      - isLoadingState (from useScheduleStateAndEffects): ${isLoadingStateFromEffects}
      - Combined isLoading for UI: ${combinedIsLoading}
      - Itinerary length: ${itinerary.length}
      - Selected Day: ${selectedDay}`);
  }, [isGeneratingFromGenerator, isLoadingStateFromEffects, combinedIsLoading, itinerary, selectedDay]);

  return {
    itinerary,
    selectedDay,
    isLoading: combinedIsLoading, // UI에 전달되는 최종 로딩 상태
    handleSelectDay,
    runScheduleGenerationProcess,
  };
};
