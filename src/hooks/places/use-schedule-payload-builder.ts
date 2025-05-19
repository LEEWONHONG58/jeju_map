
import { toast } from 'sonner';
import { SelectedPlace, SchedulePlace, SchedulePayload } from '@/types'; // Import from @/types

interface UseSchedulePayloadBuilderProps {
  // No props needed for the hook itself, but for the returned function
}

export const useSchedulePayloadBuilder = (/* props: UseSchedulePayloadBuilderProps */) => {
  const prepareSchedulePayload = (
    userSelectedPlacesInput: SelectedPlace[], 
    candidatePlacesInput: SelectedPlace[], 
    startDatetimeISO: string | null, 
    endDatetimeISO: string | null
  ): SchedulePayload | null => { // Use SchedulePayload from @/types
    console.log('[prepareSchedulePayload] 함수 호출됨, 인자:', {
      userSelectedPlacesCount: userSelectedPlacesInput.length,
      candidatePlacesCount: candidatePlacesInput.length,
      startDatetimeISO,
      endDatetimeISO
    });
    
    if (!startDatetimeISO || !endDatetimeISO) {
      console.warn('[prepareSchedulePayload] 날짜/시간 정보 누락');
      toast.error("날짜 및 시간을 먼저 선택해주세요.");
      return null;
    }
    
    // Filter out candidate places from userSelectedPlacesInput if they are handled separately
    // Assuming userSelectedPlacesInput are places explicitly chosen by user for the main list
    const directlySelectedPlaces = userSelectedPlacesInput.filter(p => !p.isCandidate);

    // Prepare selected_places for payload
    const selectedPlacesForPayload: SchedulePlace[] = directlySelectedPlaces.map(p => ({ // Use SchedulePlace from @/types
      id: typeof p.id === 'string' ? parseInt(p.id, 10) || p.id : p.id,
      name: p.name || 'Unknown Place'
    }));
    
    // Prepare candidate_places for payload
    const candidatePlacesForPayload: SchedulePlace[] = candidatePlacesInput.map(p => ({ // Use SchedulePlace from @/types
      id: typeof p.id === 'string' ? parseInt(p.id, 10) || p.id : p.id,
      name: p.name || 'Unknown Place'
    }));
        
    const payload: SchedulePayload = { // Use SchedulePayload from @/types
      selected_places: selectedPlacesForPayload, // This property exists on SchedulePayload from @/types
      candidate_places: candidatePlacesForPayload, // This property also exists
      start_datetime: startDatetimeISO,
      end_datetime: endDatetimeISO
    };

    console.log("[일정 생성] 최종 Payload 준비 완료 (useSchedulePayloadBuilder):", JSON.stringify(payload, null, 2));
    return payload;
  };

  return { prepareSchedulePayload };
};
