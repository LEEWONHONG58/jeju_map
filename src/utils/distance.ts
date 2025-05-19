
import { Place } from '@/types/supabase';

export const calculateDistance = (p1: Place, p2: Place): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy) * 111;
};

export const calculateTotalDistance = (places: Place[]): number => {
  if (places.length <= 1) return 0;
  let totalDistance = 0;
  
  for (let i = 0; i < places.length - 1; i++) {
    totalDistance += calculateDistance(places[i], places[i + 1]);
  }
  
  // Add distance back to starting point if there are multiple places
  if (places.length > 1) {
    totalDistance += calculateDistance(places[places.length - 1], places[0]);
  }
  
  return totalDistance;
};
