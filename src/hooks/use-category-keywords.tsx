
import { useState } from 'react';
import { CategoryName, CategoryKeywords } from '@/utils/categoryUtils';

export const useCategoryKeywords = () => {
  const [selectedKeywordsByCategory, setSelectedKeywordsByCategory] = useState<CategoryKeywords>({
    '숙소': [],
    '관광지': [],
    '음식점': [],
    '카페': [],
  });

  const toggleKeyword = (category: CategoryName, keyword: string) => {
    setSelectedKeywordsByCategory(prev => {
      const keywordsForCategory = prev[category] || [];
      
      if (keywordsForCategory.includes(keyword)) {
        return {
          ...prev,
          [category]: keywordsForCategory.filter(kw => kw !== keyword)
        };
      } else {
        return {
          ...prev,
          [category]: [...keywordsForCategory, keyword]
        };
      }
    });
  };

  return {
    selectedKeywordsByCategory,
    setSelectedKeywordsByCategory,
    toggleKeyword,
  };
};
