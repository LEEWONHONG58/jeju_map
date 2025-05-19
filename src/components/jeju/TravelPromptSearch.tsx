
import React, { useState } from 'react';
import { useMapContext } from '@/components/rightpanel/MapContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import PlaceList from '@/components/middlepanel/PlaceList';
import PlaceDetailDialog from '@/components/places/PlaceDetailDialog';
import { Place } from '@/types/supabase';
import { 
  parsePrompt, 
  fetchWeightedResults, 
  convertToPlace,
} from '@/lib/jeju/travelPromptUtils';

interface TravelPromptSearchProps {
  onPlacesFound?: (places: Place[], category: string) => void;
}

// PlaceResult 인터페이스 추가
interface PlaceResult {
  id: string | number;
  name?: string;
  address?: string;
  category?: string;
  categoryDetail?: string;
  x?: number;
  y?: number;
  rating?: number;
  reviewCount?: number;
  weight?: number;
  naverLink?: string;
  instaLink?: string;
  operatingHours?: string;
}

const TravelPromptSearch: React.FC<TravelPromptSearchProps> = ({ onPlacesFound }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("recommendation");
  const mapCtx = useMapContext();
  
  const totalPages = Math.ceil(places.length / 10); // 10 items per page
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSelectedPlace(null);
    mapCtx.clearMarkersAndUiElements();
    
    try {
      // 1. Parse the prompt
      const parsed = parsePrompt(prompt);
      if (!parsed) {
        toast.error("입력 형식 오류: 올바른 형식으로 입력해주세요.");
        setLoading(false);
        return;
      }
      
      // 2. Show toast with keywords
      const allKeywords = [...parsed.rankedKeywords, ...parsed.unrankedKeywords];
      toast(`${parsed.category} 키워드: ${parsed.rankedKeywords.length > 0 ? 
          `순위: ${parsed.rankedKeywords.join(', ')}` : ''}
          ${parsed.unrankedKeywords.length > 0 ? 
          `추가: ${parsed.unrankedKeywords.join(', ')}` : ''}`);
      
      // 3. Fetch places
      const placeResults = await fetchWeightedResults(
        parsed.category, 
        parsed.locations, 
        allKeywords
      );
      
      // 4. Convert to Place type with all required fields
      const convertedPlaces = placeResults.map((result: PlaceResult) => ({
        id: String(result.id),
        name: result.name || '',
        address: result.address || '',
        phone: '',  // Set default values for required fields
        category: result.category || '',
        description: '',  // Set default values for required fields
        rating: result.rating || 0,
        x: result.x || 0,
        y: result.y || 0,
        image_url: '',  // Set default values for required fields
        road_address: '',  // Set default values for required fields
        homepage: '',  // Set default values for required fields
        categoryDetail: result.categoryDetail || '',
        reviewCount: result.reviewCount || 0,
        weight: result.weight || 0,
        naverLink: result.naverLink || '',
        instaLink: result.instaLink || '',
        operatingHours: result.operatingHours || ''
      }));
      
      setPlaces(convertedPlaces as Place[]);
      setCurrentPage(1);
      
      // 5. Add markers to map
      if (convertedPlaces.length && mapCtx) {
        const recommended = convertedPlaces.slice(0, 4) as Place[];
        const others = convertedPlaces.slice(4) as Place[];
        mapCtx.addMarkers(recommended, { highlight: true });
        mapCtx.addMarkers(others, { highlight: false });
        
        if (convertedPlaces[0]) {
          mapCtx.panTo({ lat: convertedPlaces[0].y, lng: convertedPlaces[0].x });
        } else if (parsed.locations.length > 0) {
          mapCtx.panTo(parsed.locations[0]);
        }
      }
      
      // 6. Call callback if provided
      if (onPlacesFound && convertedPlaces.length > 0) {
        onPlacesFound(convertedPlaces as Place[], parsed.category);
      }
      
      if (placeResults.length === 0) {
        toast.error("검색 결과 없음: 검색 조건에 맞는 장소를 찾을 수 없습니다.");
      } else {
        toast.success(`검색 완료: ${placeResults.length}개의 장소를 찾았습니다.`);
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("검색 오류: 검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    // Sort logic would be implemented here
  };

  const handleViewDetails = (place: Place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col h-full">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="mb-2">
          <h2 className="text-lg font-medium mb-2">여행 프롬프트 검색</h2>
          <p className="text-sm text-muted-foreground mb-2">
            형식: 일정[MM.DD,HH:mm,MM.DD,HH:mm], 지역[지역1,지역2], 카테고리[{"{"}키워드1,키워드2{"}"}, 키워드3]
          </p>
          <Textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="예: 일정[04.23,10:00,04.29,18:00], 지역[조천,애월], 숙소[{good_bedding,냉난방,good_breakfast}, quiet_and_relax]"
            rows={4}
            required
            className="mb-2"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? '검색 중...' : '장소 검색'}
          </Button>
        </div>
      </form>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        {places.length > 0 && (
          <PlaceList
            places={places}
            loading={loading}
            onSelectPlace={setSelectedPlace}
            selectedPlace={selectedPlace}
            page={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
            onViewDetails={handleViewDetails}
          />
        )}
      </div>
      
      {selectedPlace && (
        <PlaceDetailDialog place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </div>
  );
};

export default TravelPromptSearch;
