
import { useState } from 'react';
import { usePanelVisibility } from '../use-panel-visibility';
import { useMapContext } from '@/components/rightpanel/MapContext';
import type { CategoryName } from '@/utils/categoryUtils';

export const usePanelHandlers = () => {
  // Panel visibility functionality
  const {
    showItinerary,
    setShowItinerary,
    showCategoryResult,
    setShowCategoryResult,
  } = usePanelVisibility();

  const [isItineraryMode, setIsItineraryMode] = useState(false);
  const { panTo } = useMapContext();

  // Result close handler
  const handleResultClose = () => {
    setShowCategoryResult(null);
  };

  // Generate category-specific confirmation handlers
  const handleConfirmByCategory = {
    accomodation: (finalKeywords: string[], clearSelection: boolean = false) => {
      handleConfirmCategory('숙소', finalKeywords, clearSelection);
      setShowCategoryResult('숙소');
      if (selectedRegions.length > 0) panTo(selectedRegions[0]);
    },
    landmark: (finalKeywords: string[], clearSelection: boolean = false) => {
      handleConfirmCategory('관광지', finalKeywords, clearSelection);
      setShowCategoryResult('관광지');
      if (selectedRegions.length > 0) panTo(selectedRegions[0]);
    },
    restaurant: (finalKeywords: string[], clearSelection: boolean = false) => {
      handleConfirmCategory('음식점', finalKeywords, clearSelection);
      setShowCategoryResult('음식점');
      if (selectedRegions.length > 0) panTo(selectedRegions[0]);
    },
    cafe: (finalKeywords: string[], clearSelection: boolean = false) => {
      handleConfirmCategory('카페', finalKeywords, clearSelection);
      setShowCategoryResult('카페');
      if (selectedRegions.length > 0) panTo(selectedRegions[0]);
    }
  };

  // Panel back handlers by category
  const handlePanelBackByCategory = {
    accomodation: () => handlePanelBack(),
    landmark: () => handlePanelBack(),
    restaurant: () => handlePanelBack(),
    cafe: () => handlePanelBack()
  };

  // 일정 모드 설정 함수
  const setItineraryMode = (value: boolean) => {
    setIsItineraryMode(value);
    
    // 일정 모드가 활성화되면 일정 화면을 자동으로 표시
    if (value && !showItinerary) {
      setShowItinerary(true);
    }
  };

  // These functions will be provided by props from use-left-panel
  let selectedRegions: any[] = [];
  let handleConfirmCategory = (category: CategoryName, keywords: string[], clear?: boolean) => {};
  let handlePanelBack = () => {};

  // Setup function to inject dependencies from parent hook
  const setup = (
    regions: any[],
    confirmCategoryFn: (category: CategoryName, keywords: string[], clear?: boolean) => void,
    panelBackFn: () => void
  ) => {
    selectedRegions = regions;
    handleConfirmCategory = confirmCategoryFn;
    handlePanelBack = panelBackFn;
  };

  return {
    uiVisibility: {
      showItinerary,
      setShowItinerary,
      showCategoryResult,
      setShowCategoryResult,
      handleResultClose,
    },
    handleConfirmByCategory,
    handlePanelBackByCategory,
    setItineraryMode,
    isItineraryMode,
    setup
  };
};
