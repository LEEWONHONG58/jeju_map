
import { supabase } from '@/lib/supabaseClient';
import { TravelCategory } from '@/types/travel';
import { categoryTableMap, categoryRatingMap } from '@/lib/jeju/dbMapping';
import { calculatePlaceScore } from '@/lib/jeju/placeScoring';

// 필드명을 유연하게 찾는 함수
export function normalizeField(obj: any, possibleFields: string[]): any {
  if (!obj) return null;
  
  for (const field of possibleFields) {
    if (obj[field] !== undefined) {
      return obj[field];
    }
  }
  
  return null;
}

export async function fetchPlaceData(
  category: TravelCategory,
  locations: string[]
) {
  if (!categoryTableMap[category] || !categoryRatingMap[category]) {
    console.error(`Invalid category: ${category}`);
    return { places: [], ratings: [], categories: [], links: [], reviews: [] };
  }

  const infoTable = categoryTableMap[category];
  const ratingTable = categoryRatingMap[category];
  const reviewTable = `${category}_review`;
  const linkTable = `${category}_link`;
  const categoryDetailTable = `${category}_categories`;

  console.log(`🔍 [Supabase] 조회 시작: ${category} 카테고리`);
  console.log(`📊 [Supabase] 테이블 정보:`, { 
    정보: infoTable, 
    평점: ratingTable, 
    리뷰: reviewTable,
    링크: linkTable,
    분류: categoryDetailTable
  });

  try {
    // 1. 장소 기본 정보 가져오기
    let query = supabase.from(infoTable).select('*');
    if (locations.length > 0) {
      query = query.in('location', locations);
    }
    const { data: places, error: placesError } = await query;

    if (placesError) {
      console.error('Places fetch error:', placesError);
      return { places: [], ratings: [], categories: [], links: [], reviews: [] };
    }
    if (!places || places.length === 0) {
      console.log(`❌ [Supabase] ${category}: 검색 조건에 맞는 장소가 없습니다`);
      return { places: [], ratings: [], categories: [], links: [], reviews: [] };
    }

    console.log(`✅ [Supabase] ${category} 정보 로드 완료: ${places.length}개 장소`);
    console.log(`📝 [Supabase] ${category} 샘플 데이터:`, places[0]);

    // 2. id 리스트 만들기 (가공 없이 숫자형 그대로)
    const placeIds = places
      .map(p => p.id)
      .filter(id => id !== undefined);
    
    console.log(`🔢 [Supabase] ${category} ID 목록: ${placeIds.length}개`);

    // 3. 추가 데이터 병렬로 가져오기
    console.log(`🔄 [Supabase] ${category} 관련 데이터 로딩 중...`);
    const [ratingsResult, linksResult, categoriesResult, reviewsResult] = await Promise.all([
      supabase.from(ratingTable).select('*').in('id', placeIds),
      supabase.from(linkTable).select('*').in('id', placeIds),
      supabase.from(categoryDetailTable).select('*').in('id', placeIds),
      supabase.from(reviewTable).select('*').in('id', placeIds),
    ]);

    const ratings = ratingsResult.data || [];
    const links = linksResult.data || [];
    const categories = categoriesResult.data || [];
    const reviews = reviewsResult.data || [];

    console.log(`✅ [Supabase] ${category} 관련 데이터 로드 완료:`, {
      평점: `${ratings.length}개`,
      링크: `${links.length}개`,
      분류: `${categories.length}개`,
      리뷰: `${reviews.length}개`
    });

    if (ratings.length > 0) console.log(`📊 [Supabase] ${category} 평점 샘플:`, ratings[0]);
    if (links.length > 0) console.log(`🔗 [Supabase] ${category} 링크 샘플:`, links[0]);
    if (categories.length > 0) console.log(`🏷️ [Supabase] ${category} 분류 샘플:`, categories[0]);
    if (reviews.length > 0) console.log(`📝 [Supabase] ${category} 리뷰 샘플:`, reviews[0]);

    // 4. 최종 데이터 반환
    return {
      places,
      ratings,
      categories,
      links,
      reviews
    };
  } catch (error) {
    console.error(`❌ [Supabase] ${category} 데이터 로딩 오류:`, error);
    return { places: [], ratings: [], categories: [], links: [], reviews: [] };
  }
}

// 데이터 처리 함수 - 가중치 계산 로직 적용
export function processPlaceData(info: any, ratings: any[], categories: any[], links: any[], reviews: any[], keywords: { keyword: string, weight: number }[] = []) {
  const id = typeof info.id === 'string' ? parseInt(info.id, 10) : info.id;

  const ratingInfo = ratings.find((r: any) => r.id === id);
  const categoryInfo = categories.find((c: any) => c.id === id);
  const linkInfo = links.find((l: any) => l.id === id);
  const reviewInfo = reviews.find((rev: any) => rev.id === id);

  // 기본 데이터 추출
  const rating = ratingInfo ? parseFloat(String(ratingInfo.rating || '0')) : 0;
  const reviewCount = ratingInfo ? parseInt(String(ratingInfo.visitor_review_count || '0'), 10) : 0;
  const categoryDetail = categoryInfo ? (categoryInfo.categories_details || '') : '';
  const naverLink = linkInfo ? (linkInfo.link || '') : '';
  const instaLink = linkInfo ? (linkInfo.instagram || '') : '';
  
  // visitor_norm 값 추출 (리뷰 정규화 값)
  const visitorNorm = reviewInfo?.visitor_norm !== undefined ? 
    parseFloat(String(reviewInfo.visitor_norm)) : 1;
  
  // 가중치 계산
  let weight = 0;
  
  // 키워드가 제공된 경우, 가중치 계산 적용
  if (keywords.length > 0 && reviewInfo) {
    // 가중치 계산 로직
    weight = calculatePlaceScore(reviewInfo, keywords, visitorNorm);
  } else {
    // 키워드가 없는 경우 기본 가중치 설정 (평점 기반)
    weight = rating * 0.2;
  }

  return {
    rating,
    reviewCount,
    categoryDetail,
    naverLink,
    instaLink,
    weight,
    visitorNorm
  };
}
