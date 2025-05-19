
import { Place } from '@/types/supabase';

export interface PlaceWithUsedFlag extends Place {
  usedInItinerary?: boolean;
}

export const createEmptyScheduleTable = (
  startDate: Date,
  startTime: string,
  endDate: Date,
  endTime: string
): Record<string, Place | null> => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  const table: Record<string, Place | null> = {};

  const [startHour] = startTime.split(':').map(Number);
  const [endHour] = endTime.split(':').map(Number);
  
  days.forEach(day => {
    hours.forEach(hour => {
      const key = `${day}_${hour}시`;
      table[key] = null;
    });
  });
  
  return table;
};

export const findNearestPlace = (
  currentPlace: Place,
  remainingPlaces: PlaceWithUsedFlag[],
  calculateDistance: (p1: Place, p2: Place) => number
): PlaceWithUsedFlag | null => {
  if (remainingPlaces.length === 0) return null;
  
  const availablePlaces = remainingPlaces.filter(p => !p.usedInItinerary);
  if (availablePlaces.length === 0) return null;
  
  let nearestPlace = availablePlaces[0];
  let minDistance = calculateDistance(currentPlace, nearestPlace);
  
  for (let i = 1; i < availablePlaces.length; i++) {
    const distance = calculateDistance(currentPlace, availablePlaces[i]);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPlace = availablePlaces[i];
    }
  }
  
  return nearestPlace;
};

export const categorizeAndFlagPlaces = (places: Place[]): Record<string, PlaceWithUsedFlag[]> => {
  const placesByCategory: Record<string, PlaceWithUsedFlag[]> = {};
  
  places.forEach(place => {
    const category = place.category || '';
    if (!placesByCategory[category]) {
      placesByCategory[category] = [];
    }
    placesByCategory[category].push({ ...place, usedInItinerary: false });
  });
  
  return placesByCategory;
};
