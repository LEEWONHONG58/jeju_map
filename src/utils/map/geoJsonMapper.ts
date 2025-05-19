
/**
 * GeoJSON 노드와 장소 간의 매핑을 처리하는 유틸리티 함수들
 */

import { Place } from "@/types/supabase";

/**
 * 주어진 좌표와 가장 가까운 GeoJSON 노드를 찾습니다
 * @param nodes GeoJSON 노드 배열
 * @param lng 경도
 * @param lat 위도
 * @param maxDistance 최대 검색 거리 (미터 단위)
 * @returns 가장 가까운 노드 또는 null
 */
export const findNearestNode = (nodes: any[], lng: number, lat: number, maxDistance: number = 100): any | null => {
  if (!nodes || nodes.length === 0) {
    console.warn('GeoJSON 노드가 없습니다');
    return null;
  }

  let nearestNode = null;
  let minDistance = Number.MAX_VALUE;

  // 노드 순회
  for (const node of nodes) {
    try {
      // 노드의 좌표
      const nodeLng = node.geometry?.coordinates?.[0];
      const nodeLat = node.geometry?.coordinates?.[1];

      // 좌표 확인
      if (!nodeLng || !nodeLat) continue;

      // 거리 계산
      const distance = calculateHaversineDistance(
        lat, lng, 
        nodeLat, nodeLng
      );

      // 더 가까운 노드 발견하면 갱신
      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = node;
      }
    } catch (error) {
      console.error('노드 처리 중 오류:', error);
    }
  }

  // 최대 거리 내에 있는 노드만 반환
  return minDistance <= maxDistance ? nearestNode : null;
};

/**
 * 장소 목록에 가장 가까운 GeoJSON 노드 ID를 추가합니다
 * @param places 장소 배열
 * @param nodes GeoJSON 노드 배열
 * @returns 노드 ID가 추가된 장소 배열
 */
export const mapPlacesToNodes = (places: Place[], nodes: any[]): Place[] => {
  if (!nodes || nodes.length === 0) {
    console.warn('GeoJSON 노드가 없어 매핑을 진행할 수 없습니다');
    return places;
  }

  console.log(`${places.length}개 장소와 ${nodes.length}개 GeoJSON 노드 매핑 시작`);

  return places.map(place => {
    // x와 y 좌표가 있는지 확인
    if (typeof place.x !== 'number' || typeof place.y !== 'number') {
      console.warn(`장소 ${place.name}의 좌표가 유효하지 않습니다`, place);
      return place;
    }

    const nearestNode = findNearestNode(nodes, place.x, place.y);
    
    return {
      ...place,
      geoNodeId: nearestNode?.properties?.node_id || null,
      geoNodeDistance: nearestNode ? calculateHaversineDistance(place.y, place.x, 
        nearestNode.geometry.coordinates[1], 
        nearestNode.geometry.coordinates[0]) : null
    };
  });
};

/**
 * 하버사인 공식을 사용하여 두 좌표 사이의 거리를 계산합니다 (미터 단위)
 * @param lat1 첫 번째 위치의 위도
 * @param lng1 첫 번째 위치의 경도
 * @param lat2 두 번째 위치의 위도
 * @param lng2 두 번째 위치의 경도
 * @returns 미터 단위의 거리
 */
export const calculateHaversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371000; // 지구 반지름 (미터)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // 미터 단위 거리
};

/**
 * 너비 우선 탐색(BFS)을 사용하여 두 GeoJSON 노드 사이의 경로를 찾습니다
 * @param startNodeId 시작 노드 ID
 * @param endNodeId 종료 노드 ID
 * @param nodes 노드 배열
 * @param links 링크 배열
 * @returns 경로 노드 ID 배열
 */
export const findPathBetweenNodes = (
  startNodeId: string,
  endNodeId: string,
  nodes: any[],
  links: any[]
): string[] => {
  // 시작 노드와 종료 노드가 동일한 경우
  if (startNodeId === endNodeId) {
    return [startNodeId];
  }

  console.log(`${startNodeId}에서 ${endNodeId}까지의 경로 탐색 시작`);

  // 노드 연결 정보 구성
  const nodeConnections: Record<string, string[]> = {};
  
  // 링크 정보 구성 및 연결 지도 생성
  links.forEach(link => {
    try {
      const fromNode = link.properties?.from_node;
      const toNode = link.properties?.to_node;
      
      if (fromNode && toNode) {
        // 연결 정보 기록
        if (!nodeConnections[fromNode]) nodeConnections[fromNode] = [];
        if (!nodeConnections[toNode]) nodeConnections[toNode] = [];
        
        nodeConnections[fromNode].push(toNode);
        nodeConnections[toNode].push(fromNode); // 양방향 연결
      }
    } catch (error) {
      console.error('링크 처리 중 오류:', error);
    }
  });

  // 경로가 존재하는지 확인
  if (!nodeConnections[startNodeId] || !nodeConnections[endNodeId]) {
    console.warn(`출발 또는 도착 노드가 연결되지 않았습니다: ${startNodeId}, ${endNodeId}`);
    return [startNodeId, endNodeId]; // 연결 없음, 직접 연결로 가정
  }

  // BFS 탐색을 위한 큐
  const queue: string[] = [startNodeId];
  const visited: Record<string, boolean> = { [startNodeId]: true };
  const parent: Record<string, string> = {};
  
  // BFS 수행
  let pathFound = false;
  
  while (queue.length > 0 && !pathFound) {
    const currentNodeId = queue.shift()!;
    
    // 현재 노드의 연결된 노드들을 탐색
    for (const neighborId of nodeConnections[currentNodeId] || []) {
      // 방문하지 않은 노드라면
      if (!visited[neighborId]) {
        visited[neighborId] = true;
        parent[neighborId] = currentNodeId;
        queue.push(neighborId);
        
        // 목적지에 도달했다면 탐색 종료
        if (neighborId === endNodeId) {
          pathFound = true;
          break;
        }
      }
    }
  }
  
  // 경로 재구성
  if (pathFound) {
    const path: string[] = [endNodeId];
    let current = endNodeId;
    
    while (current !== startNodeId) {
      current = parent[current];
      path.unshift(current);
    }
    
    console.log(`경로 찾음 (${path.length} 노드): ${path.join(' -> ')}`);
    return path;
  } else {
    console.warn(`${startNodeId}에서 ${endNodeId}까지 경로를 찾을 수 없습니다.`);
    return [startNodeId, endNodeId]; // 경로가 없으면 직접 연결
  }
};

/**
 * 특정 장소 간의 경로를 시각화하기 위한 GeoJSON 링크 배열을 반환합니다
 */
export const getLinksForPath = (path: string[], links: any[]): any[] => {
  if (path.length < 2) return [];
  
  const pathLinks: any[] = [];
  
  // 경로의 각 인접한 노드 쌍 처리
  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = path[i];
    const toNode = path[i + 1];
    
    // 해당 노드 쌍을 연결하는 링크 찾기
    const link = links.find(l => 
      (l.properties?.from_node === fromNode && l.properties?.to_node === toNode) ||
      (l.properties?.from_node === toNode && l.properties?.to_node === fromNode)
    );
    
    if (link) {
      // 중복 방지를 위해 이미 추가된 링크인지 확인
      const isDuplicate = pathLinks.some(existingLink => 
        existingLink.properties?.link_id === link.properties?.link_id
      );
      
      if (!isDuplicate) {
        pathLinks.push(link);
      }
    }
  }
  
  console.log(`경로용 링크 ${pathLinks.length}개 찾음, 노드 경로 길이: ${path.length}`);
  return pathLinks;
};

/**
 * 특정 경로 강조를 위한 스타일 생성
 * @param isHighlighted 강조 여부
 */
export const createPathStyle = (isHighlighted: boolean = false) => {
  return {
    strokeColor: isHighlighted ? '#FF3B30' : '#4CD964',
    strokeWeight: isHighlighted ? 5 : 3,
    strokeOpacity: isHighlighted ? 0.9 : 0.7
  };
};

/**
 * 여러 장소를 지나는 전체 경로를 구성합니다
 * @param places 노드 ID가 매핑된 장소 배열
 * @param nodes GeoJSON 노드 배열
 * @param links GeoJSON 링크 배열
 */
export const buildItineraryPath = (
  places: Place[], 
  nodes: any[], 
  links: any[]
): { paths: string[][], allLinks: any[] } => {
  // 노드 ID가 있는 장소만 필터링
  const validPlaces = places.filter(p => p.geoNodeId);
  
  if (validPlaces.length < 2) {
    console.warn('경로 구성을 위한 유효한 장소가 2개 이상 필요합니다.');
    return { paths: [], allLinks: [] };
  }

  const paths: string[][] = [];
  const allLinks: any[] = [];
  
  // 각 연속된 장소 쌍에 대해 경로 찾기
  for (let i = 0; i < validPlaces.length - 1; i++) {
    const startNodeId = validPlaces[i].geoNodeId!;
    const endNodeId = validPlaces[i + 1].geoNodeId!;
    
    // 두 노드 사이의 경로 찾기
    const path = findPathBetweenNodes(startNodeId, endNodeId, nodes, links);
    paths.push(path);
    
    // 경로에 대한 링크 찾기
    const pathLinks = getLinksForPath(path, links);
    
    // 중복 제거하며 모든 링크 추가
    pathLinks.forEach(link => {
      const isDuplicate = allLinks.some(existingLink => 
        existingLink.properties?.link_id === link.properties?.link_id
      );
      
      if (!isDuplicate) {
        allLinks.push(link);
      }
    });
  }
  
  console.log(`일정 경로 구성 완료: ${paths.length}개 구간, ${allLinks.length}개 링크`);
  return { paths, allLinks };
};
