
import { format, isWithinInterval, parse, addDays } from 'date-fns';

// 장소 인터페이스
interface Place {
  id: string;
  name: string;
  category: string;
  operationTimeData?: {
    [key: string]: number; // 요일_시간: 0(영업안함), 1(영업중), 999(정보없음)
  };
  x: number;
  y: number;
  nodeId?: string;
}

// 스케줄 테이블 인터페이스
interface ScheduleTable {
  [dayHour: string]: Place | null; // 요일_시간: Place 객체 또는 null
}

// 일정 점수 인터페이스
interface ItineraryScore {
  score: number;
  totalDistance: number;
  placesCount: number;
}

// 일정 일자 인터페이스
interface ItineraryDay {
  day: number;
  places: Place[];
  totalDistance: number;
}

/**
 * 빈 스케줄 테이블 생성
 * 
 * @param startDate 여행 시작 날짜
 * @param startTime 여행 시작 시간
 * @param endDate 여행 종료 날짜
 * @param endTime 여행 종료 시간
 * @returns 빈 스케줄 테이블
 */
export const createEmptyScheduleTable = (
  startDate: Date,
  startTime: string, 
  endDate: Date,
  endTime: string
): ScheduleTable => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 9); // 09시 ~ 21시
  const table: ScheduleTable = {};

  // 시작 시간과 종료 시간을 숫자로 변환
  const [startHour] = startTime.split(':').map(Number);
  const [endHour] = endTime.split(':').map(Number);
  
  // 시작 요일과 종료 요일 인덱스
  const startDayIndex = (startDate.getDay() + 6) % 7; // 월(0) ~ 일(6)로 변환
  const endDayIndex = (endDate.getDay() + 6) % 7;
  
  // 시작 요일과 종료 요일
  const startDay = days[startDayIndex];
  const endDay = days[endDayIndex];
  
  // 모든 요일과 시간 조합으로 테이블 생성
  for (let d = 0; d < 7; d++) {
    const dayName = days[d];
    
    for (let h of hours) {
      const dayHour = `${dayName}_${h}시`;
      
      // 시작 요일/시간 이전이나 종료 요일/시간 이후인 칸은 제외
      let shouldInclude = true;
      
      // 시작 요일인 경우, 시작 시간 이전은 제외
      if (dayName === startDay && h < startHour) {
        shouldInclude = false;
      }
      
      // 종료 요일인 경우, 종료 시간 이후는 제외
      if (dayName === endDay && h > endHour) {
        shouldInclude = false;
      }
      
      // 시작일부터 종료일 사이의 간격 계산
      const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // 시작일과 종료일 사이에 해당 요일이 없는 경우 제외
      // (구현 필요 - 현재는 간소화된 버전)
      
      // 조건에 맞는 경우에만 테이블에 추가
      if (shouldInclude) {
        table[dayHour] = null;
      }
    }
  }
  
  return table;
};

/**
 * 카테고리별 시간대 배정 조건 확인
 * 
 * @param category 장소 카테고리
 * @param hour 시간 (09 ~ 21)
 * @returns 해당 시간에 배치 가능 여부
 */
export const isCategoryTimeSlotCompatible = (category: string, hour: number): boolean => {
  switch (category) {
    case 'restaurant':
      // 식당: 12시 또는 13시, 18시 또는 19시에 배치
      return hour === 12 || hour === 13 || hour === 18 || hour === 19;
    
    case 'attraction':
      // 관광지: 09-11시, 14-17시, 20-21시에 배치
      return (hour >= 9 && hour <= 11) || 
             (hour >= 14 && hour <= 17) || 
             (hour >= 20 && hour <= 21);
    
    case 'cafe':
      // 카페: 13시 또는 14시에 배치
      return hour === 13 || hour === 14;
    
    case 'accommodation':
      // 숙소: 모든 시간 가능 (단, 실제 구현시 체크인/체크아웃 시간 고려 필요)
      return true;
    
    default:
      return true;
  }
};

/**
 * 장소의 영업 시간 체크
 * 
 * @param place 장소 객체
 * @param dayHour 요일_시간 형식의 문자열 (예: '월_12시')
 * @returns 해당 시간에 영업 중인지 여부
 */
export const isPlaceOpenAt = (place: Place, dayHour: string): boolean => {
  if (!place.operationTimeData) {
    return true; // 영업 시간 데이터가 없으면 항상 영업 중으로 간주
  }
  
  const operationStatus = place.operationTimeData[dayHour];
  
  // 0: 영업 안함, 1: 영업 중, 999: 정보 없음
  if (operationStatus === 0) {
    return false;
  }
  
  return true; // 1 또는 999인 경우
};

/**
 * 경로 거리 계산 (간단한 구현, OSM 데이터 통합 시 교체 필요)
 * 
 * @param places 경로에 포함된 장소 배열
 * @returns 총 이동 거리 (km)
 */
export const calculateRouteDistance = (places: Place[]): number => {
  if (places.length <= 1) return 0;
  
  let totalDistance = 0;
  
  for (let i = 0; i < places.length - 1; i++) {
    const p1 = places[i];
    const p2 = places[i + 1];
    
    // 두 지점 간 직선 거리 계산 (Haversine formula)
    const R = 6371; // 지구 반경 (km)
    const dLat = (p2.y - p1.y) * Math.PI / 180;
    const dLon = (p2.x - p1.x) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(p1.y * Math.PI / 180) * Math.cos(p2.y * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    totalDistance += distance;
  }
  
  return totalDistance;
};

/**
 * 일정 점수 계산
 * 
 * @param places 일정에 포함된 장소 배열
 * @returns 일정 점수 객체
 */
export const calculateItineraryScore = (places: Place[]): ItineraryScore => {
  // 모든 장소가 일정에 포함되면 기본 1000점
  const baseScore = 1000;
  
  // 총 이동 거리 계산
  const totalDistance = calculateRouteDistance(places);
  
  // 이동 거리에 따른 감점 (거리 km × -0.001)
  const distancePenalty = totalDistance * -0.001;
  
  // 최종 점수 계산
  const score = baseScore + distancePenalty;
  
  return {
    score,
    totalDistance,
    placesCount: places.length
  };
};

/**
 * 최적 일정 생성 (간단한 구현, 실제 강화학습 알고리즘은 통합 시 교체 필요)
 * 
 * @param places 장소 배열
 * @param startDate 여행 시작 날짜
 * @param endDate 여행 종료 날짜
 * @returns 최적화된 일정 일자 배열
 */
export const createOptimizedItinerary = (
  places: Place[],
  startDate: Date,
  endDate: Date,
  startTime: string,
  endTime: string
): ItineraryDay[] => {
  // 여행 일수 계산
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const numDays = Math.max(1, daysDiff);
  
  // 빈 스케줄 테이블 생성
  const scheduleTable = createEmptyScheduleTable(startDate, startTime, endDate, endTime);
  
  // 카테고리별 장소 분류
  const placesByCategory: Record<string, Place[]> = {
    restaurant: [],
    cafe: [],
    attraction: [],
    accommodation: []
  };
  
  places.forEach(place => {
    if (placesByCategory[place.category]) {
      placesByCategory[place.category].push(place);
    } else {
      placesByCategory[place.category] = [place];
    }
  });
  
  // 일자별 일정
  const itinerary: ItineraryDay[] = [];
  
  // 각 일자마다 일정 생성
  for (let day = 1; day <= numDays; day++) {
    const currentDate = addDays(startDate, day - 1);
    const dayPlaces: Place[] = [];
    
    // TODO: scheduleTable을 활용하여 각 카테고리별 조건에 맞게 장소 배치
    // 이 부분은 강화학습 알고리즘으로 최적화될 수 있음
    
    // 간단한 휴리스틱: 숙소 -> 관광지 -> 식당 -> 카페 -> 관광지 -> 식당 순으로 배치
    // (실제 구현에서는 영업시간과 카테고리별 시간대 제약 고려 필요)
    
    // 경로 거리 계산
    const totalDistance = calculateRouteDistance(dayPlaces);
    
    itinerary.push({
      day,
      places: dayPlaces,
      totalDistance
    });
  }
  
  return itinerary;
};

// 향후 HuggingFace LLM 모델과 통합할 주요 함수들
/**
 * HuggingFace LLM 모델을 사용하여 최적 장소 순서 생성
 * 
 * @param places 장소 배열
 * @param prompt 사용자 프롬프트
 * @returns 최적화된 장소 ID 배열
 */
export const generateOptimalPlaceOrder = async (
  places: Place[],
  prompt: string
): Promise<string[]> => {
  // TODO: 실제 HuggingFace LLM 모델 API 연동 구현
  // 현재는 임시 구현으로 원래 순서 반환
  return places.map(place => place.id);
};

/**
 * OSM 데이터를 활용한 최적 경로 생성
 * 
 * @param places 장소 배열 (순서 정렬됨)
 * @returns 최적화된 경로 정보
 */
export const generateOptimalRoute = (places: Place[]) => {
  // TODO: OSM node, link, turntype 데이터를 활용한 경로 생성 로직 구현
  // 현재는 임시 반환
  return {
    totalDistance: calculateRouteDistance(places),
    duration: places.length * 20 // 임시 소요 시간 (분)
  };
};
