import React from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import DatePicker from '@/components/leftpanel/DatePicker';
import PlaceList from '@/components/middlepanel/PlaceList';
import ItineraryView from '@/components/leftpanel/ItineraryView';
import DaySelector from '@/components/leftpanel/DaySelector';
import type { Place, ItineraryDay } from '@/types/core';
import Map from '@/components/rightpanel/Map';
import { categoryColors, getCategoryName } from '@/utils/categoryColors';
import PlaceDetailDialog from '@/components/places/PlaceDetailDialog';

interface MobileStepViewProps {
  mobileStep: number;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
    startTime: string;
    endTime: string;
  };
  promptText: string;
  selectedCategory: string | null;
  filteredPlaces: Place[];
  loading: boolean;
  selectedPlace: Place | null;
  currentPage: number;
  totalPages: number;
  itinerary: ItineraryDay[] | null;
  selectedItineraryDay: number | null;
  isPanelHidden: boolean;
  isDateSelectionComplete: boolean;
  isSearchComplete: boolean;
  isPlaceListReady: boolean;
  onDatesSelected: (dates: any) => void;
  onPromptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCategoryClick: (category: string) => void;
  onSelectPlace: (place: Place) => void;
  onPageChange: (page: number) => void;
  onSearch: () => void;
  onCreateItinerary: () => void;
  onSelectItineraryDay: (day: number) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  togglePanel: () => void;
}

const MobileStepView: React.FC<MobileStepViewProps> = ({
  mobileStep,
  dateRange,
  promptText,
  selectedCategory,
  filteredPlaces,
  loading,
  selectedPlace,
  currentPage,
  totalPages,
  itinerary,
  selectedItineraryDay,
  isPanelHidden,
  isDateSelectionComplete,
  isSearchComplete,
  isPlaceListReady,
  onDatesSelected,
  onPromptChange,
  onCategoryClick,
  onSelectPlace,
  onPageChange,
  onSearch,
  onCreateItinerary,
  onSelectItineraryDay,
  goToNextStep,
  goToPrevStep,
  togglePanel
}) => {
  const [viewingPlace, setViewingPlace] = React.useState<Place | null>(null);

  const handleViewDetails = (place: Place) => {
    setViewingPlace(place);
  };

  const getMobileStepContent = () => {
    switch (mobileStep) {
      case 1: // Date selection
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm h-full">
            <h2 className="text-lg font-medium mb-4">날짜 선택</h2>
            <DatePicker onDatesSelected={onDatesSelected} />
            <div className="mt-4">
              <Button 
                className="w-full"
                onClick={goToNextStep}
                disabled={!isDateSelectionComplete}
              >
                다음 단계로
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 2: // Prompt search
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={goToPrevStep} className="p-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              <h2 className="text-lg font-medium">검색 프롬프트</h2>
              <div className="w-10"></div>
            </div>
            
            <Textarea
              placeholder="검색 프롬프트를 입력하세요"
              className="min-h-24 text-sm flex-grow"
              value={promptText}
              onChange={onPromptChange}
              disabled={!isDateSelectionComplete}
            />
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1"
                onClick={onSearch}
                disabled={loading || !isDateSelectionComplete || !promptText.trim()}
              >
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button 
                className="flex-1"
                onClick={goToNextStep}
                disabled={!isSearchComplete}
              >
                다음
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 3: // Category and place list selection
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={goToPrevStep} className="p-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              <h2 className="text-lg font-medium">카테고리 및 장소</h2>
              <div className="w-10"></div>
            </div>
            
            {/* CategorySelector component inline for simplicity */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['restaurant', 'cafe', 'attraction', 'accommodation'].map((category) => (
                <Button
                  key={category}
                  variant="category"
                  className={`${
                    selectedCategory === category 
                      ? categoryColors[category].bg + ' ' + categoryColors[category].text 
                      : 'bg-jeju-gray text-jeju-black hover:bg-jeju-gray/80'
                  } ${!isSearchComplete ? 'opacity-50 pointer-events-none' : ''}`}
                  onClick={() => onCategoryClick(category)}
                  disabled={!isSearchComplete}
                >
                  {getCategoryName(category)}
                </Button>
              ))}
            </div>
            
            <div className="flex-1 overflow-hidden flex flex-col">
              <ScrollArea className="flex-1 mb-2">
                <PlaceList
                  places={filteredPlaces}
                  loading={loading}
                  onSelectPlace={onSelectPlace}
                  selectedPlace={selectedPlace}
                  page={currentPage}
                  onPageChange={onPageChange}
                  totalPages={totalPages}
                  onViewDetails={handleViewDetails}
                />
              </ScrollArea>
            </div>
            
            <div className="flex gap-2 mt-auto sticky bottom-0 bg-white pt-2">
              <Button 
                className="flex-1"
                onClick={onCreateItinerary}
                disabled={!isPlaceListReady}
              >
                일정 생성
              </Button>
              <Button 
                className="flex-1"
                onClick={goToNextStep}
                disabled={!itinerary}
              >
                다음
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      
      case 4: // Itinerary view
        return (
          <div className="p-4 bg-white rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={goToPrevStep} className="p-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                이전
              </Button>
              <h2 className="text-lg font-medium">일정 확인</h2>
              <div className="w-10"></div>
            </div>
            
            {itinerary && dateRange.startDate && (
              <div className="flex-1 overflow-auto">
                <ScrollArea className="h-full">
                  <ItineraryView
                    itinerary={itinerary}
                    startDate={dateRange.startDate}
                    onSelectDay={onSelectItineraryDay}
                    selectedDay={selectedItineraryDay}
                  />
                </ScrollArea>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-jeju-light-gray relative">
      <div className="absolute inset-0 z-0">
        <Map
          places={filteredPlaces}
          selectedPlace={selectedPlace}
          itinerary={itinerary}
          selectedDay={selectedItineraryDay}
          selectedPlaces={[]}
        />
      </div>
      
      <div 
        className="fixed top-0 left-0 right-0 z-20 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-b-lg shadow-sm"
        onClick={togglePanel}
      >
        {isPanelHidden ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isPanelHidden && itinerary && (
        <DaySelector 
          itinerary={itinerary}
          selectedDay={selectedItineraryDay}
          onSelectDay={onSelectItineraryDay}
        />
      )}
      
      <div 
        className={`fixed left-0 right-0 z-10 transition-all duration-300 ease-in-out 
          bg-jeju-light-gray/95 backdrop-blur-sm rounded-b-xl shadow-lg
          ${isPanelHidden ? 'h-0 opacity-0 pointer-events-none' : 'h-[60vh] max-h-[60vh] opacity-100 overflow-auto'}`}
        style={{ top: '40px' }}
      >
        {getMobileStepContent()}
      </div>

      {viewingPlace && (
        <PlaceDetailDialog
          place={viewingPlace}
          onClose={() => setViewingPlace(null)}
        />
      )}
    </div>
  );
};

export default MobileStepView;
