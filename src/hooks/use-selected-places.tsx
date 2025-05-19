
import { useCallback, useEffect } from 'react';
import { Place } from '@/types/supabase';
import { useTripDetails } from './use-trip-details';

import { usePlaceCoreState } from './places/use-place-core-state';
import { usePlaceSelectionLogic } from './places/use-place-selection-logic';
import { useSelectedPlacesDerivedState } from './places/use-selected-places-derived-state';
import { usePlaceAutoCompletion } from './places/use-place-auto-completion';
import { useSchedulePayloadBuilder } from './places/use-schedule-payload-builder';

export const useSelectedPlaces = () => {
  const { tripDuration } = useTripDetails();

  const {
    selectedPlaces,
    setSelectedPlaces,
    candidatePlaces,
    setCandidatePlaces,
    handleRemovePlace,
    isPlaceSelected,
  } = usePlaceCoreState();

  const {
    selectedPlacesByCategory,
    allCategoriesSelected,
    isAccommodationLimitReached,
  } = useSelectedPlacesDerivedState({ selectedPlaces, tripDuration });

  const { handleSelectPlace } = usePlaceSelectionLogic({
    setSelectedPlaces,
    tripDuration,
  });
  
  const { handleAutoCompletePlaces } = usePlaceAutoCompletion({
    selectedPlaces,
    candidatePlaces,
    setCandidatePlaces,
    selectedPlacesByCategory,
    tripDuration,
  });

  const { prepareSchedulePayload: buildSchedulePayload } = useSchedulePayloadBuilder();
  
  // Wrapper for prepareSchedulePayload to maintain original signature if needed,
  // or adjust callers to pass candidatePlaces directly.
  // The original prepareSchedulePayload took selectedPlaces and implicitly used candidatePlaces from state.
  // The new one takes both explicitly.
  const prepareSchedulePayload = useCallback(
    (
      userSelectedPlacesInput: Place[], // Original type was SelectedPlace[]
      startDatetimeISO: string | null,
      endDatetimeISO: string | null
    ) => {
      // The `userSelectedPlacesInput` here is the combined list of selected and candidate places
      // from the perspective of who calls this (e.g. useLeftPanel -> handleCreateItinerary).
      // However, our new buildSchedulePayload expects `selectedPlaces` (non-candidates) and `candidatePlaces` separately.
      // The `selectedPlaces` state from `usePlaceCoreState` are the non-candidate ones.
      // The `candidatePlaces` state from `usePlaceCoreState` are the candidate ones.
      return buildSchedulePayload(selectedPlaces, candidatePlaces, startDatetimeISO, endDatetimeISO);
    },
    [selectedPlaces, candidatePlaces, buildSchedulePayload]
  );


  const handleViewOnMap = useCallback((place: Place) => {
    console.log("지도에서 보기:", place);
    // Placeholder for map view functionality
  }, []);

  useEffect(() => {
    console.log("[SelectedPlaces Hook] 선택된 장소 변경됨 (사용자 선택):", selectedPlaces);
    console.log("[SelectedPlaces Hook] 후보 장소 변경됨 (자동 보완):", candidatePlaces);
    console.log("[SelectedPlaces Hook] 현재 여행 기간(박):", tripDuration);
  }, [selectedPlaces, candidatePlaces, tripDuration]);

  return {
    selectedPlaces, // from usePlaceCoreState
    candidatePlaces, // from usePlaceCoreState
    selectedPlacesByCategory, // from useSelectedPlacesDerivedState
    handleSelectPlace, // from usePlaceSelectionLogic
    handleRemovePlace, // from usePlaceCoreState
    handleViewOnMap, // kept here
    allCategoriesSelected, // from useSelectedPlacesDerivedState
    isAccommodationLimitReached, // from useSelectedPlacesDerivedState
    isPlaceSelected, // from usePlaceCoreState
    handleAutoCompletePlaces, // from usePlaceAutoCompletion
    prepareSchedulePayload, // refactored wrapper
    // Exposing setters for advanced use cases or if other hooks need them,
    // though generally direct manipulation should be through handlers.
    setCandidatePlaces, // from usePlaceCoreState
    setSelectedPlaces, // from usePlaceCoreState
  };
};
