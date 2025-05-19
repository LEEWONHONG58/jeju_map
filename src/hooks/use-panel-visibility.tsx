
import { useState } from 'react';

export const usePanelVisibility = () => {
  const [showItinerary, setShowItinerary] = useState(false);
  const [regionSlidePanelOpen, setRegionSlidePanelOpen] = useState(false);
  const [showCategoryResult, setShowCategoryResult] = useState<null | '숙소' | '관광지' | '음식점' | '카페'>(null);

  return {
    showItinerary,
    setShowItinerary,
    regionSlidePanelOpen,
    setRegionSlidePanelOpen,
    showCategoryResult,
    setShowCategoryResult,
  };
};
