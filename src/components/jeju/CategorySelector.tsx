import React from 'react';
import { Button } from '@/components/ui/button';
import { categoryColors, getCategoryName } from '@/utils/categoryColors';

// ✅ Props 정의: 선택된 카테고리, 검색 완료 여부, 카테고리 클릭 핸들러
interface CategorySelectorProps {
  selectedCategory: string | null;
  isSearchComplete: boolean;
  onCategoryClick: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  isSearchComplete,
  onCategoryClick
}) => {
  // ✅ 카테고리 리스트 정의
  const categories = ['restaurant', 'cafe', 'attraction', 'accommodation'];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 animate-fade-in">
      <h3 className="text-base font-medium mb-2">카테고리 선택</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="category"
            className={`$ {
              selectedCategory === category
                ? categoryColors[category].bg + ' ' + categoryColors[category].text
                : 'bg-jeju-gray text-jeju-black hover:bg-jeju-gray/80'
            } $ {!isSearchComplete ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => onCategoryClick(category)}
            disabled={!isSearchComplete}
          >
            {getCategoryName(category)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
