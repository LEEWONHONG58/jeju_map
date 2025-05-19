
import { useCallback } from 'react';
import { Place, SelectedPlace } from '@/types/supabase';
import { CategoryName, CATEGORIES } from '@/utils/categoryUtils';
import { toast } from 'sonner';

interface UsePlaceSelectionLogicProps {
  setSelectedPlaces: React.Dispatch<React.SetStateAction<SelectedPlace[]>>;
  tripDuration: number | null;
}

export const usePlaceSelectionLogic = ({
  setSelectedPlaces,
  tripDuration,
}: UsePlaceSelectionLogicProps) => {
  const handleSelectPlace = useCallback((place: Place, checked: boolean, categoryOverride?: CategoryName) => {
    const placeCategory = categoryOverride || place.category as CategoryName;

    if (!placeCategory || !CATEGORIES.includes(placeCategory)) {
      console.warn(`[장소 선택] 유효하지 않은 카테고리 (${placeCategory}) 또는 장소 정보 부족:`, place);
      toast.error("장소 정보에 오류가 있어 선택할 수 없습니다.");
      return;
    }

    setSelectedPlaces(prev => {
      const newSelectedPlace: SelectedPlace = {
        ...place,
        category: placeCategory,
        isSelected: checked,
        isCandidate: false,
      };

      if (checked) {
        if (placeCategory === '숙소') {
          const currentAccommodations = prev.filter(p => p.category === '숙소');
          // n박 -> n개 숙소. 0박 (당일치기) -> 1개 숙소
          const maxAccommodations = tripDuration !== null && tripDuration >= 0 ? Math.max(tripDuration, 1) : 1;

          if (currentAccommodations.length >= maxAccommodations) {
            toast.info(`숙소는 최대 ${maxAccommodations}개까지 선택할 수 있습니다. 기존 숙소를 변경하려면 먼저 삭제해주세요.`);
            return prev;
          }
        }
        if (!prev.find(p => p.id === place.id)) {
          return [...prev, newSelectedPlace];
        }
        return prev;
      } else {
        return prev.filter(p => p.id !== place.id);
      }
    });
  }, [setSelectedPlaces, tripDuration]);

  return {
    handleSelectPlace,
  };
};
