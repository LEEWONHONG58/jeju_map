
import { useCallback } from 'react';
import { Place, SelectedPlace } from '@/types/supabase';
import { CategoryName, MINIMUM_RECOMMENDATION_COUNT } from '@/utils/categoryUtils';
import { toast } from 'sonner';
import { sortByWeightDescending } from '@/lib/utils';

interface UsePlaceAutoCompletionProps {
  selectedPlaces: SelectedPlace[];
  candidatePlaces: SelectedPlace[];
  setCandidatePlaces: React.Dispatch<React.SetStateAction<SelectedPlace[]>>;
  selectedPlacesByCategory: Record<CategoryName, SelectedPlace[]>;
  tripDuration: number | null;
}

export const usePlaceAutoCompletion = ({
  selectedPlaces,
  candidatePlaces,
  setCandidatePlaces,
  selectedPlacesByCategory,
  tripDuration,
}: UsePlaceAutoCompletionProps) => {
  const handleAutoCompletePlaces = useCallback(
    (
      category: CategoryName,
      recommendedPool: Place[],
      travelDays: number | null // Note: This is actual travel days (nights + 1)
    ) => {
      let currentTravelDays = travelDays;
      // This fallback for currentTravelDays might be redundant if travelDays is always passed correctly.
      // The caller (LeftPanel) calculates actualTravelDays = tripDuration + 1.
      if (currentTravelDays === null && tripDuration !== null && tripDuration >= 0) {
        currentTravelDays = tripDuration + 1; 
      }

      console.log(
        `[자동 보완 시작] 카테고리: ${category}, 총 여행일수: ${currentTravelDays}, 추천 풀 크기: ${recommendedPool.length}`
      );

      if (currentTravelDays === null || currentTravelDays <= 0) {
        console.warn(`[자동 보완] 유효한 여행 기간(총 ${currentTravelDays}일)이 없어 자동 보완을 실행할 수 없습니다. 카테고리: ${category}`);
        toast.error("여행 기간 정보가 올바르지 않아 장소를 자동 보완할 수 없습니다. 날짜를 확인해주세요.");
        return;
      }
      
      const minCountConfig = MINIMUM_RECOMMENDATION_COUNT(currentTravelDays);
      const minimumCountForCategory = minCountConfig[category];
      const currentSelectedInCategory = selectedPlacesByCategory[category]?.filter(p => !p.isCandidate).length || 0;
      
      let shortfall = Math.max(0, minimumCountForCategory - currentSelectedInCategory);
      console.log(`[자동 보완] ${category}: 최소 필요 ${minimumCountForCategory}개, 현재 선택 ${currentSelectedInCategory}개, 부족분 ${shortfall}개`);

      if (category === '숙소') {
        console.log('[자동 보완] 숙소는 자동 보완을 하지 않습니다. 사용자가 선택한 숙소만 포함됩니다.');
        // n박 -> n개 숙소. 0박 (당일치기) -> 1개 숙소
        const maxAccommodations = tripDuration !== null && tripDuration >= 0 ? Math.max(tripDuration, 1) : 1;
        if (currentSelectedInCategory < maxAccommodations) {
             toast.warning(`숙소는 ${maxAccommodations}개가 필요합니다. 현재 ${currentSelectedInCategory}개가 선택되어 있습니다.`);
        } else if (currentSelectedInCategory > maxAccommodations) {
             toast.error(`숙소 선택 개수(${currentSelectedInCategory}개)가 최대 허용치(${maxAccommodations}개)를 초과했습니다.`);
        }
        return;
      }

      if (shortfall === 0) {
        console.log(`[자동 보완] ${category}: 이미 최소 개수(${minimumCountForCategory}개)를 충족하여 추가 보완하지 않습니다.`);
        return;
      }

      const allCurrentlySelectedOrCandidateIds = new Set([
        ...selectedPlaces.map(p => p.id),
        ...candidatePlaces.map(p => p.id)
      ]);

      const availableToRecommend = sortByWeightDescending(
        recommendedPool.filter(p => !allCurrentlySelectedOrCandidateIds.has(p.id))
      );
      
      console.log(`[자동 보완] ${category}: 추천 풀에서 선택 가능한 장소 ${availableToRecommend.length}개`);

      const placesToAutoAddAsCandidates: Place[] = [];
      for (const place of availableToRecommend) {
        if (shortfall === 0) break;
        placesToAutoAddAsCandidates.push(place);
        shortfall--;
      }
      
      if (placesToAutoAddAsCandidates.length > 0) {
        const newCandidatesToAddState = placesToAutoAddAsCandidates.map(place => ({
          ...place,
          category: category, 
          isSelected: true, 
          isCandidate: true
        }));
        
        setCandidatePlaces(prevCandidates => {
          const newCandidateIds = new Set(newCandidatesToAddState.map(p => p.id));
          const filteredPrevCandidates = prevCandidates.filter(p => !newCandidateIds.has(p.id));
          return [...filteredPrevCandidates, ...newCandidatesToAddState];
        });
        
        console.log(`[자동 보완] ${category}: ${placesToAutoAddAsCandidates.length}개 장소 자동 추가 완료 (후보 목록에).`);
      } else if (shortfall > 0) {
        toast.error(`${category}: 추천할 장소가 부족하여 ${shortfall}개를 더 채우지 못했습니다.`);
        console.log(`[자동 보완] ${category}: 추천 장소 부족으로 ${shortfall}개 미보완.`);
      }
    },
    [
      selectedPlaces,
      candidatePlaces,
      setCandidatePlaces,
      selectedPlacesByCategory,
      tripDuration
    ] 
  );

  return { handleAutoCompletePlaces };
};
