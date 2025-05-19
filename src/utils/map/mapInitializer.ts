
import { toast } from "sonner";

// Jeju Island center coordinates
export const JEJU_CENTER = { lat: 33.3617, lng: 126.5292 };

export const initializeNaverMap = (mapContainer: HTMLDivElement | null) => {
  if (!mapContainer) {
    console.error("Map container is not available");
    return null;
  }
  
  if (!window.naver || !window.naver.maps) {
    console.error("Naver Maps API is not loaded");
    return null;
  }

  try {
    const mapOptions = {
      center: new window.naver.maps.LatLng(JEJU_CENTER.lat, JEJU_CENTER.lng),
      zoom: 10,
      minZoom: 9,
      maxZoom: 18,
      zoomControl: true,
      zoomControlOptions: {
        position: window.naver.maps.Position.TOP_RIGHT
      }
    };

    console.log("Creating new Naver Map instance");
    const map = new window.naver.maps.Map(mapContainer, mapOptions);
    
    // Event listener for debugging map initialization - remove toast message
    window.naver.maps.Event.once(map, 'init_stylemap', () => {
      console.log("지도 초기화 완료 이벤트 발생");
      // Toast removed to prevent duplication
    });
    
    return map;
  } catch (error) {
    console.error("Error initializing map:", error);
    toast.error("지도 초기화에 실패했습니다.");
    return null;
  }
};

// GeoJSON 노드 ID와 좌표 간 매핑 디버깅 함수
export const debugGeoJsonMapping = (nodeIds: string[], nodes: any[]) => {
  if (!nodeIds || nodeIds.length === 0) {
    console.warn("디버깅: nodeIds가 비어 있습니다.");
    return;
  }
  
  if (!nodes || nodes.length === 0) {
    console.warn("디버깅: GeoJSON 노드 데이터가 비어 있습니다.");
    return;
  }
  
  // 주요 정보 로깅
  console.log(`디버깅: nodeIds 배열 길이 = ${nodeIds.length}, 노드 배열 길이 = ${nodes.length}`);
  
  // 첫 5개 nodeId에 대한 매핑 확인
  const sampleNodeIds = nodeIds.slice(0, 5);
  
  console.log("디버깅: ID 매핑 샘플");
  sampleNodeIds.forEach(id => {
    const foundNode = nodes.find(node => node.id === id || node.getId() === id);
    console.log(`ID ${id}: ${foundNode ? '매칭됨' : '매칭 실패'}`);
    
    if (foundNode) {
      const coords = foundNode.coordinates || [];
      console.log(`좌표: [${coords.join(', ')}]`);
    }
  });
};
