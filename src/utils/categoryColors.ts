
type CategoryColors = {
  [key: string]: {
    bg: string; // Background color
    text: string; // Text color
    marker: string; // Marker color
  };
};

export const categoryColors: CategoryColors = {
  restaurant: {
    bg: 'bg-jeju-orange',
    text: 'text-white',
    marker: '#FF5252', // 빨강 - 음식점
  },
  cafe: {
    bg: 'bg-jeju-green',
    text: 'text-white',
    marker: '#9C27B0', // 보라 - 카페
  },
  attraction: {
    bg: 'bg-jeju-blue',
    text: 'text-white',
    marker: '#4CAF50', // 초록 - 관광지
  },
  accommodation: {
    bg: 'bg-purple-500',
    text: 'text-white',
    marker: '#2196F3', // 파랑 - 숙소
  },
};

export const getCategoryName = (category: string): string => {
  switch (category) {
    case 'restaurant':
      return '음식점';
    case 'cafe':
      return '카페';
    case 'attraction':
      return '관광지';
    case 'accommodation':
      return '숙소';
    default:
      return category;
  }
};

// 역방향 매핑 함수: 한글 카테고리명 -> 영문 키
export const mapCategoryNameToKey = (categoryName: string): string => {
  switch (categoryName) {
    case '음식점':
      return 'restaurant';
    case '카페':
      return 'cafe';
    case '관광지':
      return 'attraction';
    case '숙소':
      return 'accommodation';
    default:
      return 'attraction'; // 기본값
  }
};

export const getCategoryColor = (category: string): string => {
  return categoryColors[category]?.marker || '#1F1F1F';
};
