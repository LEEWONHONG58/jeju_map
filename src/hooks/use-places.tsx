
import { useState } from 'react';
import { Place } from '@/types/supabase';
import { toast } from 'sonner';
import { fetchPlacesByCategory } from '@/services/restaurantService';

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [hasCategorySelected, setHasCategorySelected] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleCategoryClick = async (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setHasCategorySelected(true);
    
    try {
      const fetchedPlaces = await fetchPlacesByCategory(category);
      setPlaces(fetchedPlaces);
      setFilteredPlaces(fetchedPlaces);
      setCurrentPage(1);
      
      if (fetchedPlaces.length === 0) {
        toast.warning(`${category} 카테고리에 장소가 없습니다`);
      } else {
        toast.success(`${fetchedPlaces.length}개의 장소를 찾았습니다`);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      toast.error("장소를 불러오는데 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    
    // Toggle selection for itinerary
    const isAlreadySelected = selectedPlaces.some(p => p.id === place.id);
    
    if (isAlreadySelected) {
      setSelectedPlaces(selectedPlaces.filter(p => p.id !== place.id));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const handleSearch = (prompt: string, isDateSelected: boolean) => {
    if (!prompt.trim()) {
      toast.error('검색어를 입력해주세요');
      return;
    }
    
    if (!isDateSelected) {
      toast.error('날짜를 먼저 선택해주세요');
      return;
    }
    
    setLoading(true);
    
    // Simulate a search with all data loaded at once for simplicity
    setTimeout(() => {
      // For now, we'll use a simple simulation of search results
      // This would be replaced with actual API calls in production
      setHasSearched(true);
      setLoading(false);
      toast.success('검색 완료');
    }, 1000);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    places,
    filteredPlaces,
    selectedCategory,
    selectedPlace,
    selectedPlaces,
    loading,
    setLoading, // Expose setLoading to be used in Index.tsx
    hasSearched,
    hasCategorySelected,
    currentPage,
    handleCategoryClick,
    handlePlaceSelect,
    handleSearch,
    handlePageChange
  };
};
