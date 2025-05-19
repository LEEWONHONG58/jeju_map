
import { useState, useCallback } from 'react';
import { SelectedPlace } from '@/types/supabase';

export const usePlaceCoreState = () => {
  const [selectedPlaces, setSelectedPlaces] = useState<SelectedPlace[]>([]);
  const [candidatePlaces, setCandidatePlaces] = useState<SelectedPlace[]>([]);

  const handleRemovePlace = useCallback((id: string | number) => {
    setSelectedPlaces(prev => prev.filter(place => place.id !== id));
    setCandidatePlaces(prev => prev.filter(place => place.id !== id));
  }, []);

  const isPlaceSelected = useCallback((placeId: string | number): boolean => {
    return selectedPlaces.some(p => p.id === placeId && p.isSelected);
  }, [selectedPlaces]);

  return {
    selectedPlaces,
    setSelectedPlaces,
    candidatePlaces,
    setCandidatePlaces,
    handleRemovePlace,
    isPlaceSelected,
  };
};
