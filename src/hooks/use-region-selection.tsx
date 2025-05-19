
import { useState } from 'react';

export const useRegionSelection = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [regionConfirmed, setRegionConfirmed] = useState(false);
  const [regionSlidePanelOpen, setRegionSlidePanelOpen] = useState(false);

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const isRegionSelected = selectedRegions.length > 0;

  const handleRegionChange = (regions: string[]) => {
    setSelectedRegions(regions);
  };

  const confirmRegionSelection = () => {
    if (selectedRegions.length > 0) {
      setRegionConfirmed(true);
    }
  };

  const resetRegions = () => {
    setSelectedRegions([]);
    setRegionConfirmed(false);
  };

  const getRegionDisplayName = () => {
    if (selectedRegions.length === 0) return '지역 선택';
    if (selectedRegions.length === 1) return selectedRegions[0];
    return `${selectedRegions[0]} 외 ${selectedRegions.length - 1}개 지역`;
  };

  return {
    selectedRegions,
    setSelectedRegions,
    regionConfirmed,
    setRegionConfirmed,
    regionSlidePanelOpen,
    setRegionSlidePanelOpen,
    handleRegionToggle,
    isRegionSelected,
    handleRegionChange,
    confirmRegionSelection,
    resetRegions,
    getRegionDisplayName
  };
};
