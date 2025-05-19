
import React, { useState } from 'react';
import LeftPanel from '@/components/leftpanel/LeftPanel';
import RightPanel from '@/components/rightpanel/RightPanel';
import RegionSlidePanel from '@/components/middlepanel/RegionSlidePanel';
import { useItinerary } from '@/hooks/use-itinerary';
import { useSelectedPlaces } from '@/hooks/use-selected-places';

const Index: React.FC = () => {
  const [showRegionPanel, setShowRegionPanel] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const toggleRegion = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const { selectedPlaces, allCategoriesSelected } = useSelectedPlaces();
  
  const {
    itinerary,
    selectedItineraryDay,
    showItinerary,
    setShowItinerary,
    generateItinerary
  } = useItinerary();

  // selectedCategoriesCount 상태 추가하여 디버그
  console.log('모든 카테고리 선택 여부:', allCategoriesSelected);

  return (
    <div className="flex h-screen overflow-hidden bg-jeju-light-gray relative">
      {/* 왼쪽 패널 */}
      <LeftPanel />

      {/* 오른쪽 지도 패널 */}
      <RightPanel
        places={selectedPlaces}
        selectedPlace={null}
        itinerary={itinerary}
        selectedDay={selectedItineraryDay}
      />

      {/* 오른쪽에 붙는 지역 슬라이드 패널 */}
      <RegionSlidePanel
        open={showRegionPanel}
        onClose={() => setShowRegionPanel(false)}
        selectedRegions={selectedRegions}
        onToggle={toggleRegion}
        onConfirm={() => setShowRegionPanel(false)}
      />
    </div>
  );
};

export default Index;
