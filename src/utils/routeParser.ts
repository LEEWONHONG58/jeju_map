
import { ParsedRoute } from '@/types/schedule';

/**
 * 서버에서 받은 interleaved_route 배열에서 장소 간 경로 세그먼트를 추출
 * @param interleavedRoute 서버에서 받은 노드-링크-노드-... 배열
 * @returns 출발지-도착지-링크 형태로 구성된 세그먼트 배열
 */
export function parseInterleavedRoute(interleavedRoute?: (string | number)[]): ParsedRoute[] {
  if (!interleavedRoute || interleavedRoute.length < 3) {
    console.warn("파싱할 경로 데이터가 없거나 불완전합니다.");
    return [];
  }
  
  const segments: ParsedRoute[] = [];
  let currentSegment: ParsedRoute = {
    from: interleavedRoute[0],
    to: "",
    links: []
  };
  
  let i = 1;
  // 노드-링크-노드-링크-... 패턴에서 각 세그먼트 추출
  while (i < interleavedRoute.length - 1) {
    // 링크 추가 (홀수 인덱스)
    if (i % 2 === 1) {
      currentSegment.links.push(interleavedRoute[i]);
    } 
    // 다음 노드가 새로운 세그먼트의 시작인 경우 (짝수 인덱스)
    else {
      currentSegment.to = interleavedRoute[i];
      segments.push({...currentSegment});
      
      // 새 세그먼트 시작 (현재 노드가 다음 세그먼트의 출발지)
      currentSegment = {
        from: interleavedRoute[i],
        to: "",
        links: []
      };
    }
    i++;
  }
  
  // 마지막 세그먼트 완성 (있는 경우)
  if (i === interleavedRoute.length - 1) {
    currentSegment.to = interleavedRoute[i];
    segments.push(currentSegment);
  }
  
  console.log(`[경로 파싱] ${segments.length}개의 경로 세그먼트 추출 완료`);
  return segments;
}

/**
 * 특정 날짜의 경로 데이터에서 모든 링크 ID를 추출
 * 지도 시각화에 필요한 모든 링크 배열 반환
 */
export function extractAllLinksFromRoute(interleavedRoute?: (string | number)[]): (string | number)[] {
  if (!interleavedRoute || interleavedRoute.length < 3) {
    return [];
  }
  
  const allLinks: (string | number)[] = [];
  
  // 홀수 인덱스는 모두 링크 ID
  for (let i = 1; i < interleavedRoute.length; i += 2) {
    allLinks.push(interleavedRoute[i]);
  }
  
  return allLinks;
}

/**
 * 특정 날짜의 경로 데이터에서 모든 노드 ID를 추출
 * 지도 시각화에 필요한 모든 노드 배열 반환
 */
export function extractAllNodesFromRoute(interleavedRoute?: (string | number)[]): (string | number)[] {
  if (!interleavedRoute || interleavedRoute.length < 1) {
    return [];
  }
  
  const allNodes: (string | number)[] = [];
  
  // 짝수 인덱스는 모두 노드 ID
  for (let i = 0; i < interleavedRoute.length; i += 2) {
    allNodes.push(interleavedRoute[i]);
  }
  
  return allNodes;
}
