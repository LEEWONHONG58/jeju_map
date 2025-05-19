
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Place } from '@/types/supabase';
import axios from 'axios';
import { fetchAccommodations } from '@/services/accommodations/accommodationService';
import { fetchLandmarks } from '@/services/landmarks/landmarkService';
import { fetchRestaurants } from '@/services/restaurants/restaurantService';
import { fetchCafes } from '@/services/cafes/cafeService';
import { useDebounceEffect } from './use-debounce-effect';

export const useCategoryResults = (
  category: '숙소' | '관광지' | '음식점' | '카페' | null,
  keywords: string[],
  regions: string[] = []
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedPlaces, setRecommendedPlaces] = useState<Place[]>([]);
  const [normalPlaces, setNormalPlaces] = useState<Place[]>([]);

  // 지역 필터링 함수
  const filterByRegion = (places: Place[], selectedRegions: string[]): Place[] => {
    if (!selectedRegions || selectedRegions.length === 0) {
      return places;
    }

    return places.filter(place => {
      // 주소 필드가 없으면 포함시키지 않음
      if (!place.address) return false;
      
      // 선택된 지역 중 하나라도 주소에 포함되면 결과에 포함
      return selectedRegions.some(region => 
        place.address.includes(region)
      );
    });
  };

  // 키워드 기반 가중치 계산
  const calculateKeywordScore = (place: Place, keywords: string[]): number => {
    if (!keywords || keywords.length === 0) return 0;
    
    // 기본 점수는 place.weight 또는 0
    let score = place.weight || 0;
    
    // 키워드 매칭 점수 계산 (최대 5점)
    const keywordBonus = keywords.reduce((bonus, keyword) => {
      // 기본 검색 대상: 이름, 카테고리 상세, 주소
      const matchesName = place.name.toLowerCase().includes(keyword.toLowerCase());
      const matchesCategoryDetail = place.categoryDetail?.toLowerCase().includes(keyword.toLowerCase()) || false;
      const matchesAddress = place.address.toLowerCase().includes(keyword.toLowerCase());
      
      // 가중치 부여: 이름(3점), 카테고리 상세(2점), 주소(1점)
      if (matchesName) bonus += 3;
      if (matchesCategoryDetail) bonus += 2;
      if (matchesAddress) bonus += 1;
      
      return bonus;
    }, 0);
    
    // 최대 5점까지 키워드 보너스 제한
    const normalizedBonus = Math.min(5, keywordBonus);
    
    // 최종 점수 = 기존 가중치 + 키워드 보너스
    return score + normalizedBonus;
  };

  const fetchCategoryData = async () => {
    if (!category) {
      console.log('[useCategoryResults] 카테고리가 지정되지 않았습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(`[useCategoryResults] 카테고리 '${category}' 데이터 가져오기, 키워드: ${keywords.join(', ')}, 지역: ${regions.join(', ')}`);

      let data: Place[] = [];
      
      // 카테고리에 따라 적절한 서비스 함수 호출
      switch (category) {
        case '숙소':
          data = await fetchAccommodations();
          break;
        case '관광지':
          data = await fetchLandmarks();
          break;
        case '음식점':
          data = await fetchRestaurants();
          break;
        case '카페':
          data = await fetchCafes();
          break;
        default:
          throw new Error('지원하지 않는 카테고리입니다.');
      }

      // 지역으로 필터링
      data = filterByRegion(data, regions);
      
      console.log(`[useCategoryResults] ${data.length}개의 장소 로드됨. 지역 필터링 후.`);
      
      // 키워드 매칭 점수 계산 및 할당
      if (keywords && keywords.length > 0) {
        data = data.map(place => ({
          ...place,
          weight: calculateKeywordScore(place, keywords)
        }));
        
        console.log(`[useCategoryResults] 키워드 매칭 점수 적용 완료. 키워드: ${keywords.join(', ')}`);
      }

      // weight 기준으로 정렬
      const sortedData = [...data].sort((a, b) => {
        const weightA = a.weight || 0;
        const weightB = b.weight || 0;
        return weightB - weightA;
      });

      // 상위 20%는 추천 장소로, 나머지는 일반 장소로 분류
      const cutoff = Math.max(1, Math.floor(sortedData.length * 0.2));
      const recommendedData = sortedData.slice(0, cutoff);
      const normalData = sortedData.slice(cutoff);
      
      // 결과 로깅
      console.log(`[useCategoryResults] 추천 장소: ${recommendedData.length}개, 일반 장소: ${normalData.length}개`);
      console.log(`[useCategoryResults] 샘플 추천 장소 (최대 3개):`, 
        recommendedData.slice(0, 3).map(p => ({ 
          이름: p.name, 
          가중치: p.weight, 
          매칭키워드: keywords.filter(k => 
            p.name.toLowerCase().includes(k.toLowerCase()) || 
            p.categoryDetail?.toLowerCase().includes(k.toLowerCase()) || 
            p.address.toLowerCase().includes(k.toLowerCase())
          ) 
        }))
      );

      setRecommendedPlaces(recommendedData);
      setNormalPlaces(normalData);

    } catch (err) {
      console.error('장소 데이터 로드 중 오류 발생:', err);
      setError(err instanceof Error ? err.message : '장소 데이터를 가져오지 못했습니다.');
      toast.error(`${category} 데이터를 불러오는 데 실패했습니다.`);
    } finally {
      setIsLoading(false);
    }
  };

  // 디바운스 효과로 검색 요청 최적화
  useDebounceEffect(() => {
    fetchCategoryData();
  }, [category, keywords.join(','), regions.join(',')], 300);

  return {
    isLoading,
    error,
    recommendedPlaces,
    normalPlaces,
    refetch: fetchCategoryData
  };
};
