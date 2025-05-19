
import React from 'react';
import { Place } from '@/types/supabase';
import PlaceCard from '@/components/middlepanel/PlaceCard';

interface PlaceListingViewProps {
  places: Place[];
  title: string;
  isLoading: boolean;
  // selectedPlaces prop removed as it's not used and can be derived if needed
  onSelectPlace: (place: Place, checked: boolean) => void;
  onViewOnMap: (place: Place) => void;
  isPlaceSelected: (id: string | number) => boolean;
}

const PlaceListingView: React.FC<PlaceListingViewProps> = ({
  places,
  title,
  isLoading,
  onSelectPlace,
  onViewOnMap,
  isPlaceSelected
}) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3">{title}</h3>
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-200 animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!places || places.length === 0) {
    return (
      <div className="p-4">
        <h3 className="text-lg font-medium mb-3">{title}</h3>
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <div className="space-y-4">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onSelect={onSelectPlace}
            onViewDetails={onViewOnMap}
            isSelected={isPlaceSelected(place.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaceListingView;
