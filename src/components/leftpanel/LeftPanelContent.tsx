
import React from 'react';
import PanelHeader from './PanelHeader';
import CategoryNavigation from './CategoryNavigation';
import CategoryPanels from './CategoryPanels';

interface LeftPanelContentProps {
  onDateSelect: (dates: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  }) => void;
  onOpenRegionPanel: () => void;
  hasSelectedDates: boolean;
  onCategoryClick: (category: string) => void;
  regionConfirmed: boolean;
  categoryStepIndex: number;
  activeMiddlePanelCategory: string | null;
  confirmedCategories: string[];
  selectedKeywordsByCategory: Record<string, string[]>;
  toggleKeyword: (category: string, keyword: string) => void;
  directInputValues: {
    accomodation: string;
    landmark: string;
    restaurant: string;
    cafe: string;
  };
  onDirectInputChange: {
    accomodation: (value: string) => void;
    landmark: (value: string) => void;
    restaurant: (value: string) => void;
    cafe: (value: string) => void;
  };
  onConfirmCategory: {
    accomodation: (finalKeywords: string[]) => void;
    landmark: (finalKeywords: string[]) => void;
    restaurant: (finalKeywords: string[]) => void;
    cafe: (finalKeywords: string[]) => void;
  };
  handlePanelBack: {
    accomodation: () => void;
    landmark: () => void;
    restaurant: () => void;
    cafe: () => void;
  };
  isCategoryButtonEnabled: (category: string) => boolean;
  isGenerating?: boolean; // 로딩 상태 prop 추가
}

const LeftPanelContent: React.FC<LeftPanelContentProps> = ({
  onDateSelect,
  onOpenRegionPanel,
  hasSelectedDates,
  onCategoryClick,
  regionConfirmed,
  categoryStepIndex,
  activeMiddlePanelCategory,
  confirmedCategories,
  selectedKeywordsByCategory,
  toggleKeyword,
  directInputValues,
  onDirectInputChange,
  onConfirmCategory,
  handlePanelBack,
  isCategoryButtonEnabled,
  isGenerating, // 이 prop은 현재 JSX 내에서 사용되지 않지만, 향후 UI 변경에 사용될 수 있습니다.
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
      <PanelHeader 
        onDateSelect={onDateSelect}
        onOpenRegionPanel={onOpenRegionPanel}
        hasSelectedDates={hasSelectedDates}
      />

      <CategoryNavigation
        categoryOrder={["숙소", "관광지", "음식점", "카페"]}
        currentCategoryIndex={categoryStepIndex}
        onCategoryClick={onCategoryClick}
        categorySelectionConfirmed={true} // 이 prop은 아마 regionConfirmed와 관련있을 수 있습니다. 확인 필요
        confirmedCategories={confirmedCategories}
        isCategoryButtonEnabled={() => true} // 이 로직은 isCategoryButtonEnabled prop으로 대체될 수 있습니다.
        activeMiddlePanelCategory={activeMiddlePanelCategory}
      />

      <CategoryPanels
        activeMiddlePanelCategory={activeMiddlePanelCategory}
        selectedKeywordsByCategory={selectedKeywordsByCategory}
        toggleKeyword={toggleKeyword}
        directInputValues={directInputValues}
        onDirectInputChange={onDirectInputChange}
        onConfirmCategory={onConfirmCategory}
        handlePanelBack={handlePanelBack}
      />
    </div>
  );
};

export default LeftPanelContent;
