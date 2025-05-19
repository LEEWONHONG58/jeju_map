
import { useCallback } from 'react';
import { toast } from 'sonner';
import { CategoryName } from '@/utils/categoryUtils';
import { useMapContext } from '@/components/rightpanel/MapContext';

/**
 * 카테고리 관련 핸들러 훅
 */
export const useCategoryHandlers = () => {
  const { panTo } = useMapContext();
  
  // 카테고리 선택 핸들러
  const handleCategorySelect = useCallback((category: string, refetch: () => void) => {
    console.log(`카테고리 선택: ${category}`);
    refetch(); 
  }, []);

  // 결과 닫기 핸들러
  const handleCloseCategoryResult = useCallback((setShowCategoryResult: (value: string | null) => void) => {
    console.log("카테고리 결과 화면 닫기");
    setShowCategoryResult(null);
  }, []);
  
  // 카테고리 확인 핸들러
  const handleConfirmCategory = useCallback((selectedCategory: string | null) => {
    if (selectedCategory) {
      console.log(`${selectedCategory} 선택 완료`);
    }
    return true;
  }, []);

  // 카테고리별 확인 핸들러 생성
  const createHandleConfirmByCategory = (
    handleConfirmCategoryFn: (category: CategoryName, keywords: string[], clear?: boolean) => void, 
    setShowCategoryResult: (value: string | null) => void,
    selectedRegions: string[]
  ) => {
    return {
      'accommodation': (finalKeywords: string[]) => {
        console.log(`'숙소' 카테고리 확인, 키워드: ${finalKeywords.join(', ')}`);
        handleConfirmCategoryFn('숙소', finalKeywords, true);
        setShowCategoryResult('숙소');
        if (selectedRegions.length > 0) panTo(selectedRegions[0]);
        return true;
      },
      'landmark': (finalKeywords: string[]) => {
        console.log(`'관광지' 카테고리 확인, 키워드: ${finalKeywords.join(', ')}`);
        handleConfirmCategoryFn('관광지', finalKeywords, true);
        setShowCategoryResult('관광지');
        if (selectedRegions.length > 0) panTo(selectedRegions[0]);
        return true;
      },
      'restaurant': (finalKeywords: string[]) => {
        console.log(`'음식점' 카테고리 확인, 키워드: ${finalKeywords.join(', ')}`);
        handleConfirmCategoryFn('음식점', finalKeywords, true);
        setShowCategoryResult('음식점');
        if (selectedRegions.length > 0) panTo(selectedRegions[0]);
        return true;
      },
      'cafe': (finalKeywords: string[]) => {
        console.log(`'카페' 카테고리 확인, 키워드: ${finalKeywords.join(', ')}`);
        handleConfirmCategoryFn('카페', finalKeywords, true);
        setShowCategoryResult('카페');
        if (selectedRegions.length > 0) panTo(selectedRegions[0]);
        return true;
      }
    };
  };

  return {
    handleCategorySelect,
    handleCloseCategoryResult,
    handleConfirmCategory,
    createHandleConfirmByCategory
  };
};
