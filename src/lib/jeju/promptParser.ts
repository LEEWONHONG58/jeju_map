
import { TravelCategory, PlaceResult } from '@/types/travel';
import { fetchPlaceData } from '@/services/placeService';
import { calculatePlaceScore } from './placeScoring';
import { convertToPlaceResult } from './placeScoring';
import { normalizeField } from './placeUtils';
import { KeywordWeight } from './interfaces';

// 프롬프트 파싱 함수
export function parsePrompt(prompt: string) {
  try {
    const regex = /일정\[(.*?)\](?:,\s*)?지역\[(.*?)\](?:,\s*)?([숙소|관광지|음식점|카페])\[(.*?)\]/;
    const match = prompt.match(regex);

    if (!match) {
      console.warn("프롬프트 형식이 올바르지 않습니다.");
      return null;
    }

    const [, dateRangeStr, locationsStr, category, keywordsStr] = match;

    // 1. 날짜 범위 파싱
    const dateRangeMatch = dateRangeStr.match(/(\d{2}\.\d{2},\d{2}:\d{2}),(\d{2}\.\d{2},\d{2}:\d{2})/);
    const dateRange = dateRangeMatch ? {
      startDate: dateRangeMatch[1].replace(',', ' '),
      endDate: dateRangeMatch[2].replace(',', ' ')
    } : undefined;

    // 2. 지역 파싱
    const locations = locationsStr.split(',').map(s => s.trim());

    // 3. 카테고리 확인 (정규 표현식에 의해 이미 확인됨)

    // 4. 키워드 파싱
    const keywordsMatch = keywordsStr.match(/\{(.*?)\}(?:,\s*)?(.*)/);
    let rankedKeywords: string[] = [];
    let unrankedKeywords: string[] = [];

    if (keywordsMatch) {
      rankedKeywords = keywordsMatch[1].split(',').map(s => s.trim());
      unrankedKeywords = keywordsMatch[2]?.split(',').map(s => s.trim()).filter(s => s !== "") || [];
    } else {
      unrankedKeywords = keywordsStr.split(',').map(s => s.trim());
    }

    const parsedPrompt = {
      category: category.trim() as TravelCategory,
      locations: locations,
      rankedKeywords: rankedKeywords,
      unrankedKeywords: unrankedKeywords,
      dateRange: dateRange
    };

    console.log("프롬프트 파싱 결과:", parsedPrompt);
    return parsedPrompt;

  } catch (error) {
    console.error("프롬프트 파싱 중 오류 발생:", error);
    return null;
  }
}

// 가중치 계산 함수
function calculateWeights(keywords: string[]): KeywordWeight[] {
  const weights: KeywordWeight[] = [];
  const rankedKeywords: string[] = [];
  const unrankedKeywords: string[] = [];

  // 순위 키워드와 비순위 키워드 분리
  keywords.forEach(keyword => {
    if (keyword.includes('(')) {
      rankedKeywords.push(keyword.replace(/[\(\)]/g, '')); // 괄호 제거
    } else {
      unrankedKeywords.push(keyword);
    }
  });

  const totalRanked = rankedKeywords.length;
  const totalUnranked = unrankedKeywords.length;

  // 순위 키워드 가중치 계산
  rankedKeywords.forEach((keyword, index) => {
    const weight = (totalRanked - index) / totalRanked;
    weights.push({ keyword, weight });
  });

  // 비순위 키워드 가중치 계산
  const unrankedWeight = totalRanked > 0 ? (1 / (totalUnranked + 1)) : 1;
  unrankedKeywords.forEach(keyword => {
    weights.push({ keyword, weight: unrankedWeight });
  });

  return weights;
}

// 가중치를 적용한 장소 결과 가져오기
export async function fetchWeightedResults(
  category: TravelCategory,
  locations: string[],
  keywords: string[]
): Promise<PlaceResult[]> {
  console.log('📊 [Prompt] 가중치 검색 시작:', { 카테고리: category, 키워드수: keywords.length, 지역수: locations.length });
  
  try {
    console.log(`🔍 [Prompt] ${category} 테이블 조회 중...`);
    // 1. 해당 카테고리의 장소 데이터 가져오기
    const { places, ratings, categories, links, reviews } = await fetchPlaceData(category, locations);
    
    if (!places || places.length === 0) {
      console.log('❌ [Prompt] 장소 데이터가 없습니다');
      return [];
    }
    
    console.log(`✅ [Prompt] ${places.length}개 장소 데이터 로드 완료`);
    
    // 2. 키워드 가중치 계산
    console.log('🧮 [Prompt] 키워드 가중치 계산 중...');
    const keywordWeights = calculateWeights(keywords);
    console.log('📈 [Prompt] 계산된 키워드 가중치:', keywordWeights);
    
    // 리뷰 정규화 기준값 계산 (최대값 또는 평균값)
    const reviewValues = reviews.map(r => r.visitor_review_count || 0);
    const maxReviewCount = Math.max(...reviewValues, 1);  // 0으로 나누기 방지
    
    console.log(`📊 [Prompt] 리뷰 정규화 기준값: ${maxReviewCount}`);
    
    // 3. 각 장소에 대한 점수 계산 및 결과 변환
    console.log('🔢 [Prompt] 장소 점수 계산 중...');
    const scoredPlaces = places.map(place => {
      // ID로 관련 데이터 찾기
      const placeId = normalizeField(place, ['id']);
      const rating = ratings.find(r => Number(normalizeField(r, ['id'])) === placeId);
      const category = categories.find(c => Number(normalizeField(c, ['id'])) === placeId);
      const link = links.find(l => Number(normalizeField(l, ['id'])) === placeId);
      const review = reviews.find(r => Number(normalizeField(r, ['id'])) === placeId);
      
      // 리뷰 정규화 값 (리뷰 수 / 최대 리뷰 수)
      const reviewNorm = review ? 
        (review.visitor_norm || ((review.visitor_review_count || 0) / maxReviewCount)) : 0.1;
      
      // 키워드 기반 점수 계산
      const score = calculatePlaceScore(place, keywordWeights, reviewNorm);
      
      // 수정: 각 인자를 배열로 감싸서 전달
      const result = convertToPlaceResult(
        place,
        rating ? [rating] : [],
        category ? [category] : [],
        link ? [link] : [],
        review ? [review] : []
      );
      
      // 계산된 점수 추가
      return { ...result, score };
    });
    
    // 4. 점수에 따라 정렬
    const sortedResults = scoredPlaces
      .filter(p => p.score > 0)  // 점수가 0보다 큰 결과만 포함
      .sort((a, b) => b.score - a.score);  // 높은 점수 순으로 정렬
    
    console.log(`✅ [Prompt] 점수 계산 완료: ${sortedResults.length}개 관련 장소 찾음`);
    
    if (sortedResults.length > 0) {
      console.log('🥇 [Prompt] 최고 점수 장소:', { 
        이름: sortedResults[0].place_name,
        점수: sortedResults[0].score,
        평점: sortedResults[0].rating
      });
    }
    
    return sortedResults;
  } catch (error) {
    console.error('❌ [Prompt] 가중치 검색 오류:', error);
    return [];
  }
}
