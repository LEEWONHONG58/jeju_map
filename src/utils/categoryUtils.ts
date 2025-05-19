
export type CategoryName = '숙소' | '관광지' | '음식점' | '카페';

// 카테고리 별 키워드 타입 정의 추가
export type CategoryKeywords = {
  '숙소': string[];
  '관광지': string[];
  '음식점': string[];
  '카페': string[];
};

export const categoryKeywords = {
  '숙소': ['ocean_view', 'breakfast', 'pool'],
  '관광지': ['nature', 'culture', 'history'],
  '음식점': ['seafood', 'korean', 'vegetarian'],
  '카페': ['coffee', 'cake', 'view']
};

export const categoryToEnglish = (koreanName: CategoryName): string => {
  const mapping: Record<CategoryName, string> = {
    '숙소': 'accommodation',
    '관광지': 'attraction',
    '음식점': 'restaurant',
    '카페': 'cafe'
  };
  
  return mapping[koreanName] || 'other';
};

export const englishToKorean = (englishName: string): CategoryName | null => {
  switch(englishName.toLowerCase()) {
    case 'accommodation': return '숙소';
    case 'attraction': return '관광지';
    case 'restaurant': return '음식점';
    case 'cafe': return '카페';
    default: return null;
  }
};

// Add missing constants
export const CATEGORIES: CategoryName[] = ['숙소', '관광지', '음식점', '카페'];

// 카테고리별 최소 추천 개수 계산 함수
export const getMinimumRecommendationsByCategory = (days: number) => {
  return {
    '숙소': days > 1 ? days - 1 : 1,
    '관광지': Math.max(4, Math.ceil(4 * days)),
    '음식점': Math.max(3, Math.ceil(3 * days)),
    '카페': Math.max(3, Math.ceil(3 * days))
  };
};

// Export with alias for backwards compatibility
export const MINIMUM_RECOMMENDATION_COUNT = getMinimumRecommendationsByCategory;

// 카테고리별 시간대 추천 가중치
export const timeOfDayWeights = {
  '숙소': {
    morning: 0.2,
    afternoon: 0.3,
    evening: 1.0,
    night: 0.8
  },
  '관광지': {
    morning: 1.0,
    afternoon: 0.9,
    evening: 0.5,
    night: 0.2
  },
  '음식점': {
    morning: 0.7,
    afternoon: 0.3,
    evening: 1.0,
    night: 0.6
  },
  '카페': {
    morning: 0.8,
    afternoon: 1.0,
    evening: 0.8,
    night: 0.4
  }
};
