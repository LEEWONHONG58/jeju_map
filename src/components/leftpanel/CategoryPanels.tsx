
import React from 'react';
import AccomodationPanel from '../middlepanel/AccomodationPanel';
import LandmarkPanel from '../middlepanel/LandmarkPanel';
import RestaurantPanel from '../middlepanel/RestaurantPanel';
import CafePanel from '../middlepanel/CafePanel';

interface CategoryPanelsProps {
  activeMiddlePanelCategory: string | null;
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
}

const CategoryPanels: React.FC<CategoryPanelsProps> = ({
  activeMiddlePanelCategory,
  selectedKeywordsByCategory,
  toggleKeyword,
  directInputValues,
  onDirectInputChange,
  onConfirmCategory,
  handlePanelBack,
}) => {
  return (
    <>
      {activeMiddlePanelCategory === '숙소' && (
        <AccomodationPanel
          selectedKeywords={selectedKeywordsByCategory['숙소'] || []}
          onToggleKeyword={(kw) => toggleKeyword('숙소', kw)}
          directInputValue={directInputValues.accomodation}
          onDirectInputChange={onDirectInputChange.accomodation}
          onConfirmAccomodation={(kw) => onConfirmCategory.accomodation(kw)}
          onClose={() => handlePanelBack.accomodation()}
        />
      )}

      {activeMiddlePanelCategory === '관광지' && (
        <LandmarkPanel
          selectedKeywords={selectedKeywordsByCategory['관광지'] || []}
          onToggleKeyword={(kw) => toggleKeyword('관광지', kw)}
          directInputValue={directInputValues.landmark}
          onDirectInputChange={onDirectInputChange.landmark}
          onConfirmLandmark={(kw) => onConfirmCategory.landmark(kw)}
          onClose={() => handlePanelBack.landmark()}
        />
      )}

      {activeMiddlePanelCategory === '음식점' && (
        <RestaurantPanel
          selectedKeywords={selectedKeywordsByCategory['음식점'] || []}
          onToggleKeyword={(kw) => toggleKeyword('음식점', kw)}
          directInputValue={directInputValues.restaurant}
          onDirectInputChange={onDirectInputChange.restaurant}
          onConfirmRestaurant={(kw) => onConfirmCategory.restaurant(kw)}
          onClose={() => handlePanelBack.restaurant()}
        />
      )}

      {activeMiddlePanelCategory === '카페' && (
        <CafePanel
          selectedKeywords={selectedKeywordsByCategory['카페'] || []}
          onToggleKeyword={(kw) => toggleKeyword('카페', kw)}
          directInputValue={directInputValues.cafe}
          onDirectInputChange={onDirectInputChange.cafe}
          onConfirmCafe={(kw) => onConfirmCategory.cafe(kw)}
          onClose={() =>handlePanelBack.cafe()}
        />
      )}
    </>
  );
};

export default CategoryPanels;
