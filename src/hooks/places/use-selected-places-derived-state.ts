
import { useMemo } from 'react';
import { SelectedPlace } from '@/types/supabase';
import { CategoryName, CATEGORIES } from '@/utils/categoryUtils';

interface UseSelectedPlacesDerivedStateProps {
  selectedPlaces: SelectedPlace[];
  tripDuration: number | null;
}

export const useSelectedPlacesDerivedState = ({
  selectedPlaces,
  tripDuration,
}: UseSelectedPlacesDerivedStateProps) => {
  const selectedPlacesByCategory = useMemo(() => {
    const grouped: Record<CategoryName, SelectedPlace[]> = {
      '숙소': [],
      '관광지': [],
      '음식점': [],
      '카페': [],
    };
    selectedPlaces.forEach(place => {
      if (place.category && CATEGORIES.includes(place.category as CategoryName)) {
        grouped[place.category as CategoryName].push(place);
      }
    });
    return grouped;
  }, [selectedPlaces]);

  const allCategoriesSelected = useMemo(() => {
    return CATEGORIES.every(category => {
      const placesInCat = selectedPlacesByCategory[category] || [];
      return placesInCat.length > 0;
    });
  }, [selectedPlacesByCategory]);

  const isAccommodationLimitReached = useMemo(() => {
    // n박 -> n개 숙소. 0박 (당일치기) -> 1개 숙소
    const maxAccommodations = tripDuration !== null && tripDuration >= 0 ? Math.max(tripDuration, 1) : 1;
    return (selectedPlacesByCategory['숙소']?.length || 0) >= maxAccommodations;
  }, [selectedPlacesByCategory, tripDuration]);

  return {
    selectedPlacesByCategory,
    allCategoriesSelected,
    isAccommodationLimitReached,
  };
};
