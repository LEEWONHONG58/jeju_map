
import React from 'react';
import MapContainer from './MapContainer';
import { Place, ItineraryDay } from '@/types/supabase';

interface RightPanelProps {
  places: Place[];
  selectedPlace: Place | null;
  itinerary: ItineraryDay[] | null;
  selectedDay: number | null;
  selectedPlaces?: Place[];
}

const RightPanel: React.FC<RightPanelProps> = ({
  places,
  selectedPlace,
  itinerary,
  selectedDay,
  selectedPlaces = [],
}) => {
  return (
    <MapContainer
      places={places}
      selectedPlace={selectedPlace}
      itinerary={itinerary}
      selectedDay={selectedDay}
      selectedPlaces={selectedPlaces}
    />
  );
};

export default RightPanel;
