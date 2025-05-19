
import React, { useEffect } from 'react';
import { SelectedPlace } from '@/types/supabase';
import { toast } from 'sonner';
import ItineraryPanel from './ItineraryPanel';
import { ScheduleLoadingIndicator } from './ScheduleLoadingIndicator';
import { useScheduleManagement } from '@/hooks/useScheduleManagement';
import { Button } from '@/components/ui/button';

interface ScheduleGeneratorProps {
  selectedPlaces: SelectedPlace[];
  dates: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  } | null;
  startDatetimeLocal: string | null;
  endDatetimeLocal: string | null;
  onClose: () => void;
}

export const ScheduleGenerator: React.FC<ScheduleGeneratorProps> = ({
  selectedPlaces,
  dates,
  startDatetimeLocal,
  endDatetimeLocal,
  onClose
}) => {
  const {
    itinerary,
    selectedDay,
    isLoading, // This is combinedIsLoading from useScheduleManagement
    handleSelectDay,
    runScheduleGenerationProcess
  } = useScheduleManagement({
    selectedPlaces,
    dates,
    startDatetime: startDatetimeLocal,
    endDatetime: endDatetimeLocal,
  });

  useEffect(() => {
    if (!startDatetimeLocal || !endDatetimeLocal) {
      toast.error("여행 날짜와 시간 정보가 올바르지 않아 일정을 생성할 수 없습니다.");
      onClose();
      return;
    }

    if (selectedPlaces.length === 0) {
      toast.error("선택된 장소가 없습니다.");
      onClose();
      return;
    }
    
    console.log("[ScheduleGenerator] 일정 생성 프로세스 시작 (useEffect dependency changed or initial run)");
    runScheduleGenerationProcess();
  }, [startDatetimeLocal, endDatetimeLocal, selectedPlaces, onClose, runScheduleGenerationProcess]); // runScheduleGenerationProcess는 useCallback으로 memoized 되어있으므로, 의존성 변경 시에만 재실행됨

  if (isLoading) {
    console.log("[ScheduleGenerator] Rendering loading indicator because isLoading is true.");
    return <ScheduleLoadingIndicator text="일정을 생성하는 중..." subtext="잠시만 기다려주세요" />;
  }

  console.log("[ScheduleGenerator] isLoading is false. Proceeding to check itinerary.");

  if (!itinerary || itinerary.length === 0) {
    console.log("[ScheduleGenerator] Rendering empty state because itinerary is empty and isLoading is false.");
    return (
      <div className="h-full flex flex-col items-center justify-center p-4">
        <p className="text-lg font-medium text-center">일정이 생성되지 않았습니다.</p>
        <p className="text-sm text-muted-foreground mt-2 text-center">다른 장소나 날짜를 선택해보세요.</p>
        <Button onClick={onClose} variant="outline" className="mt-4">
          돌아가기
        </Button>
      </div>
    );
  }

  const panelStartDate = dates?.startDate || new Date();

  console.log("[ScheduleGenerator] Rendering ItineraryPanel:", { 
    itineraryLength: itinerary.length, 
    selectedDay: selectedDay 
  });

  return (
    <ItineraryPanel 
      itinerary={itinerary} 
      startDate={panelStartDate}
      onSelectDay={handleSelectDay}
      onClose={onClose}
      selectedDay={selectedDay}
    />
  );
};
