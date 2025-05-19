
import { Place } from "@/types/supabase";
import { fetchRestaurants } from "./restaurants/restaurantService";
import { fetchCafes } from "./cafes/cafeService";
import { fetchAccommodations } from "./accommodations/accommodationService";
import { fetchLandmarks } from "./landmarks/landmarkService";

// Utility function to fetch all place data by category
export const fetchPlacesByCategory = async (category: string): Promise<Place[]> => {
  switch(category) {
    case "restaurant":
      return fetchRestaurants();
    case "cafe":
      return fetchCafes();
    case "attraction":
      return fetchLandmarks();
    case "accommodation":
      return fetchAccommodations();
    default:
      return [];
  }
};

// Re-export individual fetch functions for direct use
export {
  fetchRestaurants,
  fetchCafes,
  fetchAccommodations,
  fetchLandmarks
};
