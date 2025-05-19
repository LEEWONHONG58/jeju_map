
import { useCategoryOrder } from './use-category-order';
import { useCategoryPanel } from './use-category-panel';
import { useCategoryKeywords } from './use-category-keywords';
import type { CategoryName } from '@/utils/categoryUtils';

export const useCategorySelection = () => {
  const {
    categoryOrder,
    categorySelectionConfirmed,
    setCategorySelectionConfirmed,
    stepIndex,
    setStepIndex,
    handleCategoryClick,
  } = useCategoryOrder();

  const {
    activeMiddlePanelCategory,
    confirmedCategories,
    setConfirmedCategories,
    handleCategoryButtonClick,
    handlePanelBack,
  } = useCategoryPanel();

  const {
    selectedKeywordsByCategory,
    setSelectedKeywordsByCategory,
    toggleKeyword,
  } = useCategoryKeywords();

  const handleConfirmCategory = (
    categoryName: CategoryName, 
    finalKeywords: string[],
    clearSelection: boolean = false
  ) => {
    if (clearSelection) {
      setSelectedKeywordsByCategory(prev => ({
        ...prev,
        [categoryName]: []
      }));
    }
    
    if (!confirmedCategories.includes(categoryName)) {
      setConfirmedCategories([...confirmedCategories, categoryName]);
      
      const currentIndex = categoryOrder.indexOf(categoryName);
      if (currentIndex + 1 < categoryOrder.length) {
        setStepIndex(currentIndex + 1);
      }
    }
    
    handlePanelBack();
  };

  const isCategoryButtonEnabled = (category: CategoryName) => {
    return confirmedCategories.includes(category) || categoryOrder[stepIndex] === category;
  };

  return {
    categoryOrder,
    categorySelectionConfirmed,
    setCategorySelectionConfirmed,
    stepIndex,
    activeMiddlePanelCategory,
    confirmedCategories,
    selectedKeywordsByCategory,
    handleCategoryClick,
    handleCategoryButtonClick,
    toggleKeyword,
    handlePanelBack,
    handleConfirmCategory,
    isCategoryButtonEnabled
  };
};
