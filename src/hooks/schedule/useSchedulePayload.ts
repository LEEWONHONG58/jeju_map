
import { useCallback } from 'react';
import { SelectedPlace } from '@/types/supabase';
import { SchedulePayload } from '@/types/schedule';

interface UseSchedulePayloadProps {
  selectedPlaces: SelectedPlace[];
  startDatetimeISO: string | null;
  endDatetimeISO: string | null;
}

export const useSchedulePayload = ({
  selectedPlaces,
  startDatetimeISO,
  endDatetimeISO,
}: UseSchedulePayloadProps) => {
  const preparePayload = useCallback((): SchedulePayload | null => {
    if (!startDatetimeISO || !endDatetimeISO) {
      console.error("[useSchedulePayload] Start or end datetime is missing.");
      return null;
    }

    const directlySelectedPlaces = selectedPlaces.filter(p => !p.isCandidate);
    const autoCompletedPlaces = selectedPlaces.filter(p => p.isCandidate);

    const selectedPlacesPayload = directlySelectedPlaces.map(p => ({
      id: typeof p.id === 'string' ? parseInt(p.id, 10) || p.id : p.id,
      name: p.name || 'Unknown Place',
    }));

    const candidatePlacesPayload = autoCompletedPlaces.map(p => ({
      id: typeof p.id === 'string' ? parseInt(p.id, 10) || p.id : p.id,
      name: p.name || 'Unknown Place',
    }));

    const payload: SchedulePayload = {
      selected_places: selectedPlacesPayload,
      candidate_places: candidatePlacesPayload,
      start_datetime: startDatetimeISO,
      end_datetime: endDatetimeISO,
    };

    console.log("📤 서버 요청 payload (from useSchedulePayload):", JSON.stringify(payload, null, 2));
    return payload;
  }, [selectedPlaces, startDatetimeISO, endDatetimeISO]);

  return { preparePayload };
};
