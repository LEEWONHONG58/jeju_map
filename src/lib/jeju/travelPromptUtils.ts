
export * from '@/types/travel';
export * from './dbMapping';
export * from './promptParser';
export * from './weightCalculator';
export * from './interfaces';

// Explicitly re-export PlaceResult to resolve ambiguity
export type { PlaceResult } from '@/types/travel';

// Re-export functions needed by components
export { calculatePlaceScore } from './placeScoring';
export { fetchWeightedResults } from './promptParser';

// Add the missing convertToPlace function with proper ID handling
export function convertToPlace(placeResult: any) {
  console.log('🔄 [Convert] Place 객체로 변환 중:', placeResult.place_name || placeResult.id || '이름 없음');
  
  // Ensure ID is numeric
  const id = typeof placeResult.id === 'string' ? parseInt(placeResult.id, 10) : placeResult.id;
  
  const place = {
    id: id,
    name: placeResult.place_name || '',
    address: placeResult.road_address || '',
    category: placeResult.category || '',
    categoryDetail: placeResult.categoryDetail || '',
    x: parseFloat(String(placeResult.x || 0)),
    y: parseFloat(String(placeResult.y || 0)),
    rating: parseFloat(String(placeResult.rating || 0)),
    reviewCount: parseInt(String(placeResult.visitor_review_count || 0), 10),
    weight: parseFloat(String(placeResult.visitor_norm || 0)),
    naverLink: placeResult.naverLink || '',
    instaLink: placeResult.instaLink || '',
    operatingHours: placeResult.operatingHours || ''
  };
  
  console.log('✅ [Convert] 변환 완료:', { 
    id: place.id, 
    이름: place.name, 
    주소: place.address.substring(0, 20) + (place.address.length > 20 ? '...' : ''),
    평점: place.rating
  });
  
  return place;
}
