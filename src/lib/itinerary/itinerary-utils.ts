
import { Place } from '@/types/supabase';

/**
 * 카테고리별 최소 추천 개수 계산
 */
export const getMinimumRecommendationCount = (nDays: number) => ({
  attraction: 4 * nDays,    // 관광지
  restaurant: 3 * nDays,    // 음식점
  cafe: 3 * nDays,          // 카페
  accommodation: 1          // 숙소 (기본 1개)
});

/**
 * 선택된 장소 목록에 추천 장소를 추가하여 보완합니다
 */
export const completeWithRecommendedPlaces = async (
  selectedPlaces: Place[],
  recommendedPlaces: Record<string, Place[]>,
  travelDays: number
): Promise<Place[]> => {
  if (!travelDays || travelDays < 1) {
    console.warn('여행 기간 정보가 없어 후보 장소를 자동 보완할 수 없습니다.');
    return selectedPlaces;
  }

  // 최종 장소 목록 (선택된 장소 + 자동 보완된 후보 장소)
  const finalPlaces: Place[] = [...selectedPlaces];
  const addedCandidates: Place[] = [];
  
  // 카테고리별 최소 필요 개수
  const minimumCounts = getMinimumRecommendationCount(travelDays);
  
  // 카테고리별 현재 선택된 장소 수 집계
  const selectedCountsByCategory: Record<string, Place[]> = {
    attraction: [],
    restaurant: [],
    cafe: [],
    accommodation: []
  };
  
  // 선택된 장소들을 카테고리별로 분류
  selectedPlaces.forEach(place => {
    const category = place.category;
    if (category && selectedCountsByCategory[category]) {
      selectedCountsByCategory[category].push(place);
    }
  });
  
  // 각 카테고리별로 부족한 개수만큼 추천 장소에서 보완
  Object.entries(minimumCounts).forEach(([category, minCount]) => {
    const currentCount = selectedCountsByCategory[category]?.length || 0;
    const shortage = Math.max(0, minCount - currentCount);
    
    if (shortage > 0) {
      console.log(`${category} 카테고리 부족 개수: ${shortage}개`);
      
      // 해당 카테고리의 추천 장소 목록에서 상위 N개 가져오기
      const categoryRecommendations = recommendedPlaces[category] || [];
      
      // 이미 선택된 장소는 제외하고 필요한 만큼만 추가
      const candidatesToAdd = categoryRecommendations
        .filter(rp => !selectedPlaces.some(sp => sp.id === rp.id))
        .slice(0, shortage);
        
      if (candidatesToAdd.length > 0) {
        console.log(`${category} 카테고리에 ${candidatesToAdd.length}개 장소 자동 추가:`, 
          candidatesToAdd.map(p => p.name).join(', '));
        
        // 후보 장소에 isCandidate 속성 추가
        const markedCandidates = candidatesToAdd.map(p => ({
          ...p,
          isCandidate: true // 자동 추가된 후보 장소임을 표시
        }));
        
        finalPlaces.push(...markedCandidates);
        addedCandidates.push(...markedCandidates);
      } else {
        console.warn(`${category} 카테고리의 추천 장소가 부족합니다.`);
      }
    }
  });
  
  if (addedCandidates.length > 0) {
    console.log(`총 ${addedCandidates.length}개의 장소가 자동으로 추가되었습니다.`);
  }
  
  return finalPlaces;
};
