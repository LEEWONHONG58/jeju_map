
import { PlaceResult } from '@/types/travel';
import { KeywordWeight } from './interfaces';
import { normalizeField } from './placeUtils';

export function calculatePlaceScore(
  place: any,
  keywordWeights: KeywordWeight[],
  reviewNorm: number
): number {
  let totalScore = 0;
  let foundKeywords = 0;
  let matchedKeywords: { keyword: string; value: number }[] = [];

  console.log(`장소 가중치 계산 시작 (리뷰 정규화: ${reviewNorm})`);
  console.log('장소 객체 속성:', Object.keys(place));

  keywordWeights.forEach(({ keyword, weight }) => {
    // 키워드가 직접 컬럼명과 매칭되는지 확인
    if (place[keyword] !== undefined) {
      const keywordValue = parseFloat(String(place[keyword] || 0));
      
      // 키워드 가중치 계산: 키워드 값 × 키워드 가중치 × visitor_norm
      if (keywordValue > 0) {
        foundKeywords++;
        const keywordScore = keywordValue * weight * reviewNorm;
        matchedKeywords.push({ 
          keyword, 
          value: keywordScore
        });
        console.log(`  - 키워드 '${keyword}' 값: ${keywordValue}, 가중치: ${weight.toFixed(3)}, visitor_norm: ${reviewNorm}, 결과: ${keywordScore.toFixed(3)}`);
        totalScore += keywordScore;
      } else {
        console.log(`  - 키워드 '${keyword}' 값: 없음 (0)`);
      }
    } else {
      console.log(`  - 키워드 '${keyword}' 매칭되는 컬럼 없음`);
    }
  });

  if (foundKeywords === 0 && keywordWeights.length > 0) {
    console.log(`  - 일치하는 키워드가 없습니다. 점수 0 반환`);
    return 0;
  }

  console.log('가중치 계산 결과:', {
    place_name: place.place_name || '이름 없음',
    matched_keywords: matchedKeywords,
    total_score: totalScore,
    final_score: totalScore
  });

  return totalScore;
}

export function convertToPlaceResult(place: any, ratings: any[], categories: any[], links: any[], reviews: any[]): PlaceResult {
  const id = place.id;
  
  const rating = ratings.find(r => r.id === id);
  const category = categories.find(c => c.id === id);
  const link = links.find(l => l.id === id);
  const review = reviews.find(r => r.id === id);
  
  let ratingValue = 0;
  let reviewCount = 0;
  
  if (rating) {
    ratingValue = parseFloat(String(rating.rating || '0'));
    reviewCount = parseInt(String(rating.visitor_review_count || '0'));
  }
  
  let visitorNorm = 1;
  if (review?.visitor_norm !== undefined) {
    visitorNorm = parseFloat(String(review.visitor_norm || '1'));
  }

  const categoryDetail = category ? 
    (category.categories_details || '') : '';

  const naverLink = link ? (link.link || '') : '';
  const instaLink = link ? (link.instagram || '') : '';

  return {
    id: String(id),
    place_name: place.place_name || '',
    road_address: place.road_address || place.lot_address || "",
    category: place.category || '',
    x: parseFloat(String(place.longitude || 0)),
    y: parseFloat(String(place.latitude || 0)),
    rating: ratingValue,
    visitor_review_count: reviewCount,
    visitor_norm: visitorNorm,
    naverLink,
    instaLink,
    categoryDetail
  };
}
