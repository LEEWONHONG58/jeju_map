import React, { useState, useEffect } from 'react';
import { Place } from '@/types/supabase';
import { useMapContext } from '../rightpanel/MapContext';
import PlaceDetailDialog from '../places/PlaceDetailDialog';
import { useCategoryResults } from '@/hooks/use-category-results';
import PlaceListingView from '../places/PlaceListingView';
import ResultHeader from './category-result/ResultHeader';
import LoadingState from './category-result/LoadingState';
import ErrorState from './category-result/ErrorState';
import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

interface CategoryResultPanelProps {
  category: '숙소' | '관광지' | '음식점' | '카페';
  regions: string[];
  keywords: string[];
  onClose: () => void;
  onSelectPlace: (place: Place, checked: boolean) => void;
  isPlaceSelected: (id: string | number) => boolean;
  isOpen: boolean;
  onConfirm?: (category: string, selectedPlaces: Place[], recommendedPlaces: Place[]) => void;
}

const CategoryResultPanel: React.FC<CategoryResultPanelProps> = ({
  category,
  regions,
  keywords,
  onClose,
  onSelectPlace,
  isPlaceSelected,
  isOpen,
  onConfirm
}) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const { panTo, addMarkers, clearMarkersAndUiElements } = useMapContext();
  const [userSelectedPlaces, setUserSelectedPlaces] = useState<Place[]>([]);
  
  // 안전하게 regions 배열을 처리 - regions가 undefined일 경우 빈 배열 사용
  const safeRegions = Array.isArray(regions) ? regions : [];
  
  // useCategoryResults에 regions 대신 safeRegions 전달
  const { isLoading, error, recommendedPlaces, normalPlaces } = useCategoryResults(category, keywords, safeRegions);

  useEffect(() => {
    clearMarkersAndUiElements();
    
    if (recommendedPlaces.length > 0) {
      console.log(`[CategoryResultPanel] 장소 표시: ${recommendedPlaces.length}개 추천 장소 (지역: ${safeRegions.join(', ')})`);
      
      // 첫번째 장소가 있으면 지도 중앙을 해당 위치로 이동
      if (recommendedPlaces[0] && recommendedPlaces[0].x && recommendedPlaces[0].y) {
        panTo({ lat: recommendedPlaces[0].y, lng: recommendedPlaces[0].x });
      } else if (safeRegions.length > 0) {
        // 장소가 없으면 선택된 지역으로 이동
        panTo(safeRegions[0]);
      }
      
      addMarkers(recommendedPlaces, { useRecommendedStyle: true });
      
      // Log successful places loaded
      console.log(`장소 로딩 완료: 추천 장소 ${recommendedPlaces.length}개, 주변 장소 ${normalPlaces.length}개`);
    }
  }, [recommendedPlaces, normalPlaces, safeRegions, clearMarkersAndUiElements, panTo, addMarkers]);

  useEffect(() => {
    // Keep track of selected places when isPlaceSelected changes
    const selected = [...recommendedPlaces, ...normalPlaces].filter(
      place => isPlaceSelected(place.id)
    );
    setUserSelectedPlaces(selected);
  }, [recommendedPlaces, normalPlaces, isPlaceSelected]);

  const handleViewDetails = (place: Place) => {
    setSelectedPlace(place);
    if (place.x && place.y) {
      clearMarkersAndUiElements();
      addMarkers([place], { highlight: true });
      panTo({ lat: place.y, lng: place.x });
    }
  };

  const handlePlaceSelect = (place: Place, checked: boolean) => {
    // Track locally selected places to pass to confirmation handler
    if (checked) {
      setUserSelectedPlaces(prev => [...prev, place]);
    } else {
      setUserSelectedPlaces(prev => prev.filter(p => p.id !== place.id));
    }
    
    // Call the parent handler
    onSelectPlace(place, checked);
  };

  const handleConfirm = () => {
    console.log(`[카테고리 확인] ${category} 카테고리 선택 완료 및 자동 보완 시작: ${userSelectedPlaces.length}개 장소`);
    
    if (onConfirm) {
      // Pass the category, user-selected places, and all recommended places for auto-completion
      onConfirm(category, userSelectedPlaces, recommendedPlaces);
    }
    
    // Close the panel after confirmation
    onClose();
  };

  return (
    <div className="fixed top-0 left-[300px] w-[300px] h-full bg-white border-l border-r border-gray-200 z-40 shadow-md">
      <div className="h-full flex flex-col">
        <ResultHeader category={category} onClose={onClose} />

        <div className="flex-1 overflow-auto">
          {isLoading && <LoadingState />}
          
          {error && <ErrorState error={error} />}

          {!error && !isLoading && (
            <>
              <PlaceListingView
                places={recommendedPlaces}
                title={`🌟 추천 장소 (${safeRegions.join(', ')})`}
                isLoading={isLoading}
                // selectedPlaces prop 제거
                onSelectPlace={handlePlaceSelect}
                onViewOnMap={handleViewDetails}
                isPlaceSelected={isPlaceSelected}
              />
              
              {normalPlaces.length > 0 && (
                <PlaceListingView
                  places={normalPlaces}
                  title="📍 주변 장소"
                  isLoading={isLoading}
                  // selectedPlaces prop 제거
                  onSelectPlace={handlePlaceSelect}
                  onViewOnMap={handleViewDetails}
                  isPlaceSelected={isPlaceSelected}
                />
              )}
            </>
          )}
        </div>

        {/* Replace "Select Complete" and "Confirm" buttons with a single "Confirm" button */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            onClick={handleConfirm}
            className="w-full" 
            variant="default"
          >
            <CheckIcon className="mr-2 h-4 w-4" /> 확인
          </Button>
        </div>
      </div>

      {selectedPlace && (
        <PlaceDetailDialog
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
};

export default CategoryResultPanel;
