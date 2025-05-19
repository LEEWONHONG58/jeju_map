
export type TravelCategory = 'accommodation' | 'landmark' | 'restaurant' | 'cafe';

export interface ParsedPrompt {
  category: TravelCategory;
  locations: string[];
  rankedKeywords: string[];
  unrankedKeywords: string[];
  dateRange?: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

export interface PlaceResult {
  id: string;
  place_name: string;
  road_address: string;
  category: string;
  categoryDetail?: string;
  x: number;
  y: number;
  rating?: number;
  visitor_review_count?: number;
  visitor_norm?: number;
  naverLink?: string;
  instaLink?: string;
  operatingHours?: string;
  score?: number;
}
