
import { TravelCategory } from '@/types/travel';

type TableMapping = {
  [key in TravelCategory]: string;
};

export const categoryTableMap: TableMapping = {
  'accommodation': 'accommodation_information',
  'landmark': 'landmark_information',
  'restaurant': 'restaurant_information',
  'cafe': 'cafe_information',
};

export const categoryRatingMap: TableMapping = {
  'accommodation': 'accommodation_rating',
  'landmark': 'landmark_rating',
  'restaurant': 'restaurant_rating',
  'cafe': 'cafe_rating',
};
