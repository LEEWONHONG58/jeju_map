
// 제주도 시각화를 위한 스타일 및 좌표 정보

// 제주도 중심 좌표
export const JEJU_CENTER = { lat: 33.3846216, lng: 126.5311884 };

// 제주도 경계 좌표 (정확한 해안선 형태를 위한 상세 좌표)
export const JEJU_BOUNDARY = [
  { lat: 33.5427, lng: 126.5426 }, // 제주시
  { lat: 33.4996, lng: 126.5312 }, // 조천읍
  { lat: 33.4841, lng: 126.4831 }, // 애월읍
  { lat: 33.4567, lng: 126.3387 }, // 한림읍
  { lat: 33.3936, lng: 126.2422 }, // 한경면
  { lat: 33.2905, lng: 126.1638 }, // 대정읍
  { lat: 33.2500, lng: 126.2853 }, // 안덕면
  { lat: 33.2482, lng: 126.4155 }, // 중문
  { lat: 33.2439, lng: 126.5631 }, // 서귀포시
  { lat: 33.2510, lng: 126.6224 }, // 남원읍
  { lat: 33.3183, lng: 126.7446 }, // 표선면
  { lat: 33.3825, lng: 126.8284 }, // 성산읍
  { lat: 33.4943, lng: 126.8369 }, // 구좌읍
  { lat: 33.5427, lng: 126.6597 }, // 우도면
  { lat: 33.5427, lng: 126.5426 }  // 다시 제주시 (폐곡선을 위해)
];

// 제주도 주요 명소 위치
export const JEJU_LANDMARKS = [
  { name: '한라산', lat: 33.3616, lng: 126.5292, description: '제주도의 중앙에 위치한 한라산은 제주의 상징이자 대한민국에서 가장 높은 산입니다.' },
  { name: '성산일출봉', lat: 33.4592, lng: 126.9425, description: '유네스코 세계자연유산으로 등재된 성산일출봉은 아름다운 일출로 유명합니다.' },
  { name: '만장굴', lat: 33.5284, lng: 126.7711, description: '만장굴은 제주도에 있는 용암동굴로, 세계에서 가장 큰 용암동굴 중 하나입니다.' },
  { name: '우도', lat: 33.5032, lng: 126.9541, description: '소가 누워있는 형상을 닮았다고 하여 이름 붙여진 우도는 아름다운 해변으로 유명합니다.' },
  { name: '중문관광단지', lat: 33.2496, lng: 126.4124, description: '중문관광단지는 아름다운 해변과 다양한 관광시설이 있는 제주의 대표적인 관광지입니다.' },
];

// 내비게이션 마커 스타일
export const createMarkerIcon = (color: string, text: string) => {
  return {
    content: `<div style="padding: 10px; background-color: ${color}; border-radius: 50%; color: white; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-size: 14px; text-align: center; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">${text}</div>`,
    size: [40, 40],
    anchor: [20, 20]
  };
};

export const createLabelIcon = (text: string) => {
  return {
    content: `<div style="padding: 8px 12px; background-color: rgba(255,255,255,0.9); border-radius: 20px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 14px;">${text}</div>`,
    anchor: [30, 16]
  };
};

// 제주도 지역별 색상 맵
export const JEJU_REGION_COLORS = {
  제주시: '#4285F4',
  서귀포시: '#EA4335',
  조천읍: '#FBBC05',
  애월읍: '#34A853',
  한림읍: '#4285F4',
  한경면: '#EA4335',
  대정읍: '#FBBC05',
  안덕면: '#34A853',
  중문: '#4285F4',
  남원읍: '#EA4335',
  표선면: '#FBBC05',
  성산읍: '#34A853',
  구좌읍: '#4285F4',
  우도면: '#EA4335'
};
