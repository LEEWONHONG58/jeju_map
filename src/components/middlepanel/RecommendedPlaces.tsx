
import React from 'react';
import { Place } from '@/types/supabase';
import PlaceCard from './PlaceCard';
import { Skeleton } from '@/components/ui/skeleton';
import { sortByWeightDescending } from '@/lib/utils';

interface RecommendedPlacesProps {
  places: Place[];
  loading: boolean;
  selectedPlaces: Place[];
  onSelectPlace: (place: Place, checked: boolean) => void;
  onViewDetails: (place: Place) => void;
}

const RecommendedPlaces: React.FC<RecommendedPlacesProps> = ({
  places,
  loading,
  selectedPlaces,
  onSelectPlace,
  onViewDetails,
}) => {
  // 가중치(weight)를 기준으로 내림차순 정렬
  const sortedPlaces = sortByWeightDescending(places);

  if (loading) {
    return (
      <div className="p-4 space-y-2">
        <Skeleton className="w-1/2 h-5" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-24" />
        ))}
      </div>
    );
  }

  if (sortedPlaces.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-sm font-medium mb-3">추천 장소</h2>
        <p className="text-sm text-muted-foreground text-center py-4">
          추천 장소가 없습니다.<br />
          다른 키워드나 지역을 선택해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border-b">
      <h2 className="text-sm font-medium mb-3">🌟 추천 장소</h2>
      <div className="space-y-2">
        {sortedPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            isSelected={selectedPlaces.some(p => p.id === place.id)}
            onSelect={onSelectPlace}
            onViewDetails={() => onViewDetails(place)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
