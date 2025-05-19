/**
 * 제주도 여행 일정 자동 생성기 핵심 타입 정의
 * 
 * 이 파일은 프로젝트 전체에서 사용되는 핵심 타입을 정의합니다.
 * 모든 컴포넌트는 이 파일에서 타입을 import하여 사용해야 합니다.
 */

// CategoryName 타입을 직접 정의하고 export
export type CategoryName = '숙소' | '관광지' | '음식점' | '카페';

// 기본 장소 인터페이스
export interface Place {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: string; // 일반적인 카테고리 문자열
  description: string;
  rating: number;
  x: number;
  y: number;
  image_url: string;
  road_address: string;
  homepage: string;
  operationTimeData?: {
    [key: string]: number;
  };
  isSelected?: boolean;
  isRecommended?: boolean;
  geoNodeId?: string;
  geoNodeDistance?: number;
  weight?: number;
  isCandidate?: boolean;
  raw?: any;
  categoryDetail?: string;
  reviewCount?: number;
  naverLink?: string;
  instaLink?: string;
  operatingHours?: string;
}

// 선택된 장소 인터페이스
export interface SelectedPlace extends Place {
  category: CategoryName; // 엄격하게 CategoryName으로 제한
  isSelected: boolean;
  isCandidate: boolean;
}

// 서버로 전송할 장소 데이터 간소화 구조
export interface SchedulePlace {
  id: number | string;
  name: string;
}

// 여행 날짜와 시간
export interface TripDateTime {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

// 일정 생성 API 요청 페이로드
export interface SchedulePayload {
  selected_places: SchedulePlace[];
  candidate_places: SchedulePlace[];
  start_datetime: string; // ISO8601 타임스탬프
  end_datetime: string;   // ISO8601 타임스탬프
}

// 서버 스케줄 항목
export interface ServerScheduleItem {
  id?: number | string;
  time_block: string;
  place_name: string;
  place_type: string;
}

// 서버 경로 요약 항목
export interface ServerRouteSummaryItem {
  day: string;                   // "Tue", "Wed", "Thu", "Fri" 등
  status: string;                // "성공" 등
  total_distance_m: number;      // 미터 단위 총 거리
  places_routed?: string[];      // 경로에 포함된 장소 이름 배열 (optional)
  places_scheduled?: string[];   // 일정에 포함된 장소 이름 배열 (optional)
  interleaved_route: (string | number)[]; // NODE_ID와 LINK_ID가 번갈아 있는 배열 (string or number)
}

// 서버 응답 인터페이스
export interface NewServerScheduleResponse {
  total_reward?: number;
  schedule: ServerScheduleItem[];
  route_summary: ServerRouteSummaryItem[];
}

// 경로 데이터 인터페이스
export interface RouteData {
  nodeIds?: string[];
  linkIds?: string[];
  segmentRoutes?: SegmentRoute[];
}

// 세그먼트 경로 인터페이스
export interface SegmentRoute {
  fromIndex: number;
  toIndex: number;
  nodeIds: string[];
  linkIds: string[];
}

// 서버 경로 응답 (지도 표시에 사용될 수 있음)
export interface ServerRouteResponse {
  nodeIds: (string | number)[];
  linkIds: (string | number)[];
  interleaved_route?: (string | number)[];
}

// 일정 장소 인터페이스 (Place에 시간 정보 추가)
export interface ItineraryPlaceWithTime extends Place {
  arriveTime?: string;
  departTime?: string;
  stayDuration?: number; // 분 단위
  travelTimeToNext?: string; // 다음 장소까지 이동 시간 (예: "30분")
  timeBlock?: string; // "09:00 - 10:00" 형식 또는 "09:00 도착" 등
}

// 일정 일자 인터페이스
export interface ItineraryDay {
  day: number;
  places: ItineraryPlaceWithTime[];
  totalDistance: number; // km 단위
  routeData?: RouteData;
  interleaved_route?: (string | number)[];
  dayOfWeek: string; // 예: "Mon", "Tue"
  date: string;      // 예: "05/21" (MM/DD 형식)
}

// 서버 응답의 일관성을 위한 타입 정의 (사용자 플랜 파트 1용)
export interface PlannerServerRouteResponse {
  date: string;       // 예: '2025-05-21'
  nodeIds: number[];  // 예: [장소1_ID, 링크1_ID, 중간노드1_ID, 링크2_ID, ..., 장소N_ID]
}

// 경로 응답에서 추출한 파싱된 경로 세그먼트
export interface ParsedRouteData {
  day: number;
  segments: RouteSegment[];
  totalDistanceMeters: number;
}

// 새로운 인터페이스: 서버에서 받은 경로 데이터 파싱을 위한 인터페이스
export interface RouteSegment {
  from: string; // 출발 노드 ID
  to: string;   // 도착 노드 ID
  links: string[]; // 링크 ID 배열
}

// 클라이언트에서 파싱된 경로 세그먼트
export interface ParsedRoute {
  from: string | number;
  to: string | number;
  links: (string | number)[];
}

export interface ExtractedRouteData {
  nodeIds: string[];
  linkIds: string[];
}

// 타입 검사 함수
export function isNewServerScheduleResponse(obj: any): obj is NewServerScheduleResponse {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    Array.isArray(obj.schedule) &&
    Array.isArray(obj.route_summary) &&
    obj.route_summary.length > 0 &&
    obj.route_summary.every((item: any) =>
      item !== null &&
      typeof item === 'object' &&
      typeof item.day === 'string' &&
      item.hasOwnProperty('status') &&
      item.hasOwnProperty('total_distance_m') &&
      (item.places_scheduled === undefined || Array.isArray(item.places_scheduled)) &&
      (item.places_routed === undefined || Array.isArray(item.places_routed)) &&
      Array.isArray(item.interleaved_route)
    )
  );
}

// 서버 응답이 PlannerServerRouteResponse[] 타입인지 확인하는 타입 가드
export function isPlannerServerRouteResponseArray(
  response: any
): response is PlannerServerRouteResponse[] {
  return (
    Array.isArray(response) &&
    (response.length === 0 ||
      (response.length > 0 &&
        typeof response[0] === 'object' &&
        response[0] !== null &&
        typeof response[0].date === 'string' &&
        Array.isArray(response[0].nodeIds) &&
        response[0].nodeIds.every((id: any) => typeof id === 'number')))
  );
}

// 타입 변환 유틸리티 함수
export function convertPlannerResponseToNewResponse(
  plannerResponse: PlannerServerRouteResponse[]
): NewServerScheduleResponse {
  console.log('[convertPlannerResponseToNewResponse] 변환 시작:', plannerResponse);

  const routeSummaryItems: ServerRouteSummaryItem[] = plannerResponse.map(item => {
    const date = new Date(item.date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
    return {
      day: dayOfWeek,
      status: 'OK',
      total_distance_m: 0,
      interleaved_route: item.nodeIds,
      places_scheduled: [],
      places_routed: [],
    };
  });

  const scheduleItems: ServerScheduleItem[] = [];
  plannerResponse.forEach(dayData => {
    dayData.nodeIds.forEach((nodeId, index) => {
      if (index % 2 === 0 && typeof nodeId === 'number') {
        scheduleItems.push({
          id: nodeId,
          place_name: `장소 ${nodeId}`,
          place_type: 'unknown',
          time_block: '시간 정보 없음',
        });
      }
    });
  });
  
  const result: NewServerScheduleResponse = {
    schedule: scheduleItems,
    route_summary: routeSummaryItems,
  };
  console.log('[convertPlannerResponseToNewResponse] 변환 완료:', result);
  return result;
}
