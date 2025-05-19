
interface KeywordWeight {
  keyword: string;
  weight: number;
}

export function calculateWeights(
  rankedKeywords: string[],
  unrankedKeywords: string[],
): KeywordWeight[] {
  const weights: KeywordWeight[] = [];
  
  // 순위별 가중치 (1순위: 0.4, 2순위: 0.3, 3순위: 0.2)
  const rankedWeightValues = [0.4, 0.3, 0.2];
  
  // 랭크된 키워드에 가중치 할당
  rankedKeywords.forEach((keyword, index) => {
    if (index < rankedWeightValues.length) {
      weights.push({
        keyword,
        weight: rankedWeightValues[index]
      });
    }
  });

  // 남은 가중치 계산
  const usedWeight = weights.reduce((sum, item) => sum + item.weight, 0);
  const remainingWeight = Math.max(0, 1 - usedWeight);
  
  // 순위 없는 키워드들에 동일한 가중치 분배
  if (unrankedKeywords.length > 0) {
    const equalWeight = remainingWeight / unrankedKeywords.length;
    unrankedKeywords.forEach(keyword => {
      weights.push({
        keyword,
        weight: equalWeight
      });
    });
  }

  // 가중치 계산 로그
  console.log('가중치 계산 결과:');
  weights.forEach(w => {
    console.log(`- ${w.keyword}: ${w.weight.toFixed(3)} (${(w.weight * 100).toFixed(1)}%)`);
  });

  return weights;
}

/**
 * calculatePlaceScore 함수를 여기서는 제거하고 placeScoring.ts에서만 유지
 */
