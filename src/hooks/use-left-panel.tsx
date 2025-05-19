import { useState, useEffect, useCallback } from 'react';
import { useSelectedPlaces } from './use-selected-places';
import { useTripDetails } from './use-trip-details';
import { useCategoryResults } from './use-category-results';
import { useItinerary, ItineraryDay } from './use-itinerary'; // ItineraryDay should now be correctly exported
import { useRegionSelection } from './use-region-selection';
import { useCategorySelection } from './use-category-selection';
import { useCategoryHandlers } from './left-panel/use-category-handlers';
import { useItineraryHandlers } from './left-panel/use-itinerary-handlers';
import { useInputState } from './left-panel/use-input-state';
import { Place, SelectedPlace } from '@/types'; // Using Place and SelectedPlace from @/types
import { CategoryName } from '@/utils/categoryUtils';
import { toast } from 'sonner';

/**
 * 왼쪽 패널 기능 통합 훅
 */
export const useLeftPanel = () => {
  // 지역 및 카테고리 선택 기능
  const regionSelection = useRegionSelection();
  const categorySelection = useCategorySelection();
  const tripDetails = useTripDetails();
  
  // 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPanel, setCurrentPanel] = useState<'region' | 'date' | 'category' | 'itinerary'>('region');
  const [showCategoryResult, setShowCategoryResult] = useState<CategoryName | null>(null);
  
  // 입력값 관리
  const { directInputValues, onDirectInputChange } = useInputState();

  // 키워드 및 입력 관련 기능
  const keywordsAndInputs = {
    directInputValues,
    onDirectInputChange,
    handleConfirmCategory: (category: string, finalKeywords: string[], clearSelection: boolean = false) => {
      categorySelection.handleConfirmCategory(category as CategoryName, finalKeywords, clearSelection);
      if (clearSelection) {
        setShowCategoryResult(category as CategoryName);
      }
    }
  };

  // 장소 관리 기능
  const {
    selectedPlaces,
    candidatePlaces,
    selectedPlacesByCategory,
    handleSelectPlace,
    handleRemovePlace,
    handleViewOnMap,
    allCategoriesSelected,
    prepareSchedulePayload, // This function is used in handleCreateItinerary
    isAccommodationLimitReached,
    handleAutoCompletePlaces,
    isPlaceSelected
  } = useSelectedPlaces();

  const placesManagement = {
    selectedPlaces,
    candidatePlaces,
    selectedPlacesByCategory,
    handleSelectPlace,
    handleRemovePlace,
    handleViewOnMap,
    allCategoriesSelected,
    isAccommodationLimitReached,
    prepareSchedulePayload,
    handleAutoCompletePlaces,
    isPlaceSelected
  };

  // 일정 관리 기능 (from useItinerary)
  const { 
    itinerary,
    selectedItineraryDay,
    showItinerary,
    isItineraryCreated, // consume this
    setItinerary, 
    setSelectedItineraryDay,
    setShowItinerary,
    setIsItineraryCreated, // consume this
    handleSelectItineraryDay,
    generateItinerary // This is the client-side fallback generator
  } = useItinerary();

  const itineraryManagement = {
    itinerary,
    selectedItineraryDay,
    setItinerary, 
    setSelectedItineraryDay,
    handleSelectItineraryDay,
    generateItinerary, // Keep client-side generator for fallback
    isItineraryCreated,
    setIsItineraryCreated
  };

  // UI 가시성 관리
  const uiVisibility = {
    showItinerary,
    setShowItinerary,
    showCategoryResult,
    setShowCategoryResult
  };

  // 카테고리 결과 관리
  const { 
    isLoading: isCategoryLoading,
    error: categoryError,
    recommendedPlaces,
    normalPlaces,
    refetch
  } = useCategoryResults(showCategoryResult, 
    showCategoryResult ? categorySelection.selectedKeywordsByCategory[showCategoryResult] || [] : [], 
    regionSelection.selectedRegions);

  const categoryResults = {
    recommendedPlaces: recommendedPlaces || [],
    normalPlaces: normalPlaces || []
  };

  // 카테고리 핸들러
  const categoryHandlers = useCategoryHandlers();
  const handleCategorySelect = (category: string) => categoryHandlers.handleCategorySelect(category, refetch);
  const handleCloseCategoryResult = () => categoryHandlers.handleCloseCategoryResult(
    (value: CategoryName | null) => setShowCategoryResult(value)
  );
  const handleConfirmCategoryFromButton = () => categoryHandlers.handleConfirmCategory(selectedCategory);

  // 일정 핸들러
  const itineraryHandlers = useItineraryHandlers(); 
  
  // This is the function called by the "경로 생성하기" button
  const handleInitiateItineraryCreation = useCallback(async () => {
    console.log('[useLeftPanel] handleInitiateItineraryCreation 호출됨');
    
    // Ensure tripDetails and selectedPlaces are valid before calling
    if (!tripDetails.dates || !tripDetails.startDatetime || !tripDetails.endDatetime) {
      toast.error("여행 날짜와 시간을 먼저 설정해주세요.");
      return false;
    }
    if (placesManagement.selectedPlaces.length === 0) {
      toast.error("선택된 장소가 없습니다. 장소를 선택해주세요.");
      return false;
    }

    // Call the server-side itinerary creation logic from useItineraryHandlers
    // This function now primarily calls the server. Client fallback is inside it.
    const success = await itineraryHandlers.handleCreateItinerary(
      tripDetails, // TripDetailsForItinerary
      placesManagement.selectedPlaces as Place[], // Ensure Place[] type
      placesManagement.prepareSchedulePayload, // (places, startISO, endISO) => SchedulePayload | null
      itineraryManagement.generateItinerary,  // Client-side fallback: (places, startDate, endDate, startTime, endTime) => ItineraryDay[] | null
      uiVisibility.setShowItinerary,          // (show: boolean) => void
      (panel: 'region' | 'date' | 'category' | 'itinerary') => setCurrentPanel(panel) // (panel: string) => void
    );
    
    // If server call was successful (or client fallback worked),
    // the 'itineraryCreated' event should be dispatched by the respective logic paths.
    // useItinerary hook listens to this event and updates its state.
    // The UI should react to changes in useItinerary's state (itinerary, showItinerary, etc.)

    if (success) {
      console.log('[useLeftPanel] Itinerary creation process initiated (server or client). Waiting for itineraryCreated event.');
      // No direct setShowItinerary(true) here; let the event handler in useItinerary do it.
    } else {
      console.log('[useLeftPanel] Itinerary creation process failed to initiate or complete.');
      // Ensure loading states are properly reset if failure happens early.
    }
    
    return success;
  }, [
      tripDetails, 
      placesManagement, 
      itineraryManagement.generateItinerary, // Pass client generator as fallback
      itineraryHandlers, 
      uiVisibility.setShowItinerary, 
      setCurrentPanel
  ]);
  
  const handleCloseItineraryPanel = () => { // Renamed to avoid confusion
    itineraryHandlers.handleCloseItinerary(
      uiVisibility.setShowItinerary, 
      (panel: 'region' | 'date' | 'category' | 'itinerary') => setCurrentPanel(panel)
    );
    itineraryManagement.setItinerary(null); // Clear itinerary data
    itineraryManagement.setIsItineraryCreated(false); // Reset created flag
  };

  useEffect(() => {
    // This effect responds to changes triggered by 'itineraryCreated' event inside useItinerary
    if (itineraryManagement.isItineraryCreated && itineraryManagement.itinerary && itineraryManagement.itinerary.length > 0) {
      if (!uiVisibility.showItinerary) {
         console.log("useLeftPanel: Itinerary created, ensuring panel is visible.");
         uiVisibility.setShowItinerary(true);
      }
      if (currentPanel !== 'itinerary') {
        setCurrentPanel('itinerary');
      }
    }
  }, [itineraryManagement.isItineraryCreated, itineraryManagement.itinerary, uiVisibility.showItinerary, currentPanel]);

  const [, setForceUpdate] = useState(0);
  useEffect(() => {
    const forceRerenderListener = () => {
      console.log("[useLeftPanel] 'forceRerender' event caught, updating dummy state.");
      setForceUpdate(prev => prev + 1);
    };
    window.addEventListener('forceRerender', forceRerenderListener);
    return () => {
      window.removeEventListener('forceRerender', forceRerenderListener);
    };
  }, []);

  // `showCategoryResultScreen` 상태가 사용되지 않는 것으로 보여 주석 처리했으므로, 반환 객체에서도 제거합니다.
  // 만약 필요하다면 복원해야 합니다.
  return {
    regionSelection,
    categorySelection,
    keywordsAndInputs,
    placesManagement,
    tripDetails,
    uiVisibility,
    itineraryManagement: { // Pass through from useItinerary
        itinerary: itineraryManagement.itinerary,
        selectedItineraryDay: itineraryManagement.selectedItineraryDay,
        handleSelectItineraryDay: itineraryManagement.handleSelectItineraryDay,
        // generateItinerary is not directly called by LeftPanel, but by handleInitiateItineraryCreation as fallback
    },
    handleCreateItinerary: handleInitiateItineraryCreation, // This is the main action button call
    selectedCategory,
    // showCategoryResultScreen, 
    currentPanel,
    isCategoryLoading,
    categoryError,
    categoryResults,
    handleCategorySelect,
    handleCloseCategoryResult,
    handleConfirmCategory: handleConfirmCategoryFromButton, 
    handleCloseItinerary: handleCloseItineraryPanel, // Use renamed
    isGeneratingItinerary: itineraryHandlers.isGenerating, // Pass through loading state
  };
};
