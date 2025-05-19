
import { 
  NewServerScheduleResponse, 
  PlannerServerRouteResponse, 
  ServerScheduleItem, 
  ServerRouteSummaryItem,
  isNewServerScheduleResponse,
  isPlannerServerRouteResponseArray,
  // convertPlannerResponseToNewResponse // 실제 사용 시 주석 해제
} from '@/types/schedule';

/**
 * 타입 안전성 테스트 함수
 * 이 함수는 실행되지 않고, 타입 체크만을 위한 것입니다.
 * 실제 앱에서는 호출하지 마세요.
 */
export function testTypesSafety() {
  // 올바른 NewServerScheduleResponse 객체
  const validResponse: NewServerScheduleResponse = {
    schedule: [
      {
        time_block: '09:00-10:00',
        place_type: 'restaurant',
        place_name: '테스트 장소',
        id: 1
      }
    ],
    route_summary: [
      {
        day: 'Mon',
        status: 'success',
        total_distance_m: 1000,
        interleaved_route: [1, 2, 3, 4] // 숫자와 문자열 혼합 가능 가정
      }
    ]
  };
  
  // 타입 가드 테스트
  if (isNewServerScheduleResponse(validResponse)) {
    console.log('validResponse.schedule 길이:', validResponse.schedule.length);
    console.log('validResponse.route_summary 길이:', validResponse.route_summary.length);
    
    // ServerScheduleItem 필드 접근 테스트
    const firstScheduleItem: ServerScheduleItem = validResponse.schedule[0];
    console.log('첫 번째 스케줄 아이템 이름:', firstScheduleItem.place_name);

    // ServerRouteSummaryItem 필드 접근 테스트
    const firstRouteSummaryItem: ServerRouteSummaryItem = validResponse.route_summary[0];
    console.log('첫 번째 경로 요약 일자:', firstRouteSummaryItem.day);

  }
  
  // 잘못된 형식의 응답 (객체이지만 필수 필드 누락)
  const invalidResponseMissingFields = {
    schedule: [{ place_name: 'test' }], // route_summary 누락
  };
  
  if (isNewServerScheduleResponse(invalidResponseMissingFields)) {
    // 이 코드는 실행되지 않아야 함
    console.error('오류: invalidResponseMissingFields가 NewServerScheduleResponse로 잘못 판단됨');
  } else {
    console.log('올바르게 잘못된 형식(필수 필드 누락) 감지: invalidResponseMissingFields');
  }

  // 잘못된 형식의 응답 (배열)
  const invalidResponseArray = [
    { date: '2023-01-01', nodeIds: [1,2,3]}
  ];

  if (isNewServerScheduleResponse(invalidResponseArray)) {
    // 이 코드는 실행되지 않아야 함
    console.error('오류: invalidResponseArray가 NewServerScheduleResponse로 잘못 판단됨');
  } else {
    console.log('올바르게 잘못된 형식(배열) 감지: invalidResponseArray');
  }

  // PlannerServerRouteResponse 배열
  const plannerResponseArray: PlannerServerRouteResponse[] = [
    {
      date: '2025-05-21',
      nodeIds: [101, 201, 102, 202]
    },
    {
      date: '2025-05-22',
      nodeIds: [103, 203, 104]
    }
  ];
  
  if(isPlannerServerRouteResponseArray(plannerResponseArray)) {
    console.log('plannerResponseArray는 PlannerServerRouteResponse[] 타입입니다.');
    // 변환 함수 테스트 (실제 convertPlannerResponseToNewResponse 함수가 구현되어 있다고 가정)
    // const converted = convertPlannerResponseToNewResponse(plannerResponseArray);
    // if (isNewServerScheduleResponse(converted)) {
    //   console.log('PlannerServerRouteResponse[]에서 NewServerScheduleResponse로 변환 성공:', converted);
    // } else {
    //   console.error('PlannerServerRouteResponse[]에서 NewServerScheduleResponse로 변환 실패');
    // }
  } else {
     console.error('오류: plannerResponseArray가 PlannerServerRouteResponse[]로 잘못 판단됨');
  }

  // 빈 배열 테스트
  const emptyPlannerResponseArray: PlannerServerRouteResponse[] = [];
  if(isPlannerServerRouteResponseArray(emptyPlannerResponseArray)) {
    console.log('빈 plannerResponseArray는 PlannerServerRouteResponse[] 타입입니다.');
  } else {
    console.error('오류: 빈 plannerResponseArray가 PlannerServerRouteResponse[]로 잘못 판단됨');
  }

  console.log('타입 안전성 테스트 함수 실행 완료 (콘솔 로그 확인용)');
}

// 이 함수를 어디선가 호출해야 콘솔 로그를 볼 수 있습니다.
// 예를 들어, 개발 중에 App.tsx 같은 곳에서 한 번 호출해볼 수 있습니다.
// testTypesSafety(); // 실제 운영 코드에서는 이 호출을 제거해야 합니다.

