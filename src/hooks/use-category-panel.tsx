
import { useState } from 'react';
import { CategoryName } from '@/utils/categoryUtils';

export const useCategoryPanel = () => {
  const [activeMiddlePanelCategory, setActiveMiddlePanelCategory] = useState<CategoryName | null>(null);
  const [confirmedCategories, setConfirmedCategories] = useState<CategoryName[]>([]);

  const handleCategoryButtonClick = (categoryName: CategoryName) => {
    setActiveMiddlePanelCategory(categoryName);
  };

  const handlePanelBack = () => {
    setActiveMiddlePanelCategory(null);
  };

  return {
    activeMiddlePanelCategory,
    confirmedCategories,
    setConfirmedCategories,
    handleCategoryButtonClick,
    handlePanelBack,
  };
};
