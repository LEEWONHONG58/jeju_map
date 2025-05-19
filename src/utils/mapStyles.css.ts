
// 지도 컴포넌트 스타일

// 기본 맵 스타일
export const MapStyles = `
  width: 100%;
  height: 100%;
  position: relative;
`;

// 경로 스타일
export const RouteStyles = {
  default: {
    strokeColor: '#3366FF',
    strokeWeight: 4,
    strokeOpacity: 0.8,
    zIndex: 100
  },
  highlight: {
    strokeColor: '#FF3B30',
    strokeWeight: 6,
    strokeOpacity: 0.9,
    zIndex: 200
  },
  alternative: {
    strokeColor: '#5856D6',
    strokeWeight: 3,
    strokeOpacity: 0.7,
    zIndex: 90
  }
};

// 노드 스타일
export const NodeStyles = {
  default: {
    fillColor: '#3366FF',
    fillOpacity: 0.5,
    strokeWeight: 1,
    strokeColor: '#FFFFFF',
    radius: 4
  },
  highlight: {
    fillColor: '#FF3B30',
    fillOpacity: 0.8,
    strokeWeight: 2,
    strokeColor: '#FFFFFF',
    radius: 6
  }
};
