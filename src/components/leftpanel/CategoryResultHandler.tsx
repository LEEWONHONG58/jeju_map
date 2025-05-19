
import React from 'react';
import CategoryResultPanel from '../middlepanel/CategoryResultPanel';
import { Place } from '@/types/supabase';
import type { CategoryName } from '@/utils/categoryUtils';

interface CategoryResultHandlerProps {
  showCategoryResult: CategoryName | null;
  selectedRegions: string[];
  selectedKeywordsByCategory: Record<string, string[]>;
  onClose: () => void;
  onSelectPlace: (place: Place, checked: boolean, category: string | null) => void;
  selectedPlaces: Place[];
  onConfirmCategory?: (category: string, selectedPlaces: Place[], recommendedPlaces: Place[]) => void;
}

const CategoryResultHandler: React.FC<CategoryResultHandlerProps> = ({
  showCategoryResult,
  selectedRegions,
  selectedKeywordsByCategory,
  onClose,
  onSelectPlace,
  selectedPlaces,
  onConfirmCategory
}) => {
  if (!showCategoryResult) return null;
  
  const currentCategory = showCategoryResult;
  const selectedKeywords = selectedKeywordsByCategory[currentCategory] || [];
  const isPlaceSelected = (id: string | number) => 
    selectedPlaces.some(p => p.id === id);

  const handlePlaceSelection = (place: Place, checked: boolean) => {
    // 카테고리 정보를 함께 전달하여 장소 선택 처리
    onSelectPlace(place, checked, currentCategory);
  };

  const handleConfirm = (category: string, selectedPlaces: Place[], recommendedPlaces: Place[]) => {
    console.log(`[CategoryResultHandler] ${category} 카테고리 확인됨 및 자동 보완 시작, 선택된 장소: ${selectedPlaces.length}개`);
    if (onConfirmCategory) {
      onConfirmCategory(category, selectedPlaces, recommendedPlaces);
    }
  };

  return (
    <CategoryResultPanel
      isOpen={!!showCategoryResult}
      onClose={onClose}
      category={currentCategory}
      regions={selectedRegions}
      keywords={selectedKeywords}
      onSelectPlace={handlePlaceSelection}
      isPlaceSelected={isPlaceSelected}
      onConfirm={handleConfirm}
    />
  );
};

export default CategoryResultHandler;
