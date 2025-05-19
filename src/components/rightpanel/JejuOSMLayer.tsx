
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface JejuOSMLayerProps {
  map: any;
}

const JejuOSMLayer: React.FC<JejuOSMLayerProps> = ({ map }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const layersRef = useRef<any[]>([]);
  const [isDrawingModuleReady, setIsDrawingModuleReady] = useState<boolean>(false);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // drawing 모듈이 준비되었는지 확인
  const checkDrawingModule = () => {
    return window.naver?.maps?.drawing && typeof window.naver.maps.drawing.JSONReader === 'function';
  };
  
  // 안전하게 drawing 모듈 사용
  const waitForDrawingModule = () => {
    // 이미 준비되었으면 바로 설정
    if (checkDrawingModule()) {
      setIsDrawingModuleReady(true);
      return;
    }
    
    console.log("JejuOSMLayer: drawing 모듈 준비 대기 시작");
    
    // 대기 중인 타이머가 있으면 제거
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
    
    // 300ms마다 확인 (최대 10초)
    pollIntervalRef.current = setInterval(() => {
      if (checkDrawingModule()) {
        console.log("JejuOSMLayer: drawing 모듈 준비 완료");
        clearInterval(pollIntervalRef.current!);
        pollIntervalRef.current = null;
        
        if (pollTimeoutRef.current) {
          clearTimeout(pollTimeoutRef.current);
          pollTimeoutRef.current = null;
        }
        
        setIsDrawingModuleReady(true);
      }
    }, 300);
    
    // 10초 후 타임아웃
    pollTimeoutRef.current = setTimeout(() => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      
      console.error("JejuOSMLayer: drawing 모듈 로드 타임아웃 - 10초 초과");
      toast.error("지도 레이어를 불러오는데 실패했습니다.");
      
      // 타임아웃 발생해도 일반 GeoJSON으로 시도
      tryFallbackMethod();
    }, 10000);
  };
  
  // drawing 모듈이 없을 때 대안 방법 시도
  const tryFallbackMethod = async () => {
    console.log("JejuOSMLayer: 대안 방법으로 GeoJSON 처리 시도");
    
    try {
      const [linkResponse, nodeResponse] = await Promise.all([
        fetch('/data/LINK_JSON.geojson'),
        fetch('/data/NODE_JSON.geojson')
      ]);
      
      if (!linkResponse.ok || !nodeResponse.ok) {
        throw new Error('GeoJSON 파일 로드 실패');
      }
      
      const [linkData, nodeData] = await Promise.all([
        linkResponse.json(),
        nodeResponse.json()
      ]);
      
      console.log("JejuOSMLayer: GeoJSON 파일 로드 완료, 직접 처리 시도");
      
      // 네이버 지도의 GeoJSON 처리 기능 사용
      if (window.naver?.maps?.Data) {
        const linkLayer = new window.naver.maps.Data();
        const nodeLayer = new window.naver.maps.Data();
        
        linkData.features.forEach((feature: any) => {
          linkLayer.add(feature);
        });
        
        nodeData.features.forEach((feature: any) => {
          nodeLayer.add(feature);
        });
        
        linkLayer.setMap(map);
        nodeLayer.setMap(map);
        
        linkLayer.setStyle({
          strokeColor: '#777',
          strokeWeight: 1.5,
          strokeOpacity: 0.5
        });
        
        nodeLayer.setStyle({
          fillColor: '#ff0000',
          fillOpacity: 0.1,
          radius: 2,
          strokeWeight: 0,
          strokeColor: 'transparent'
        });
        
        layersRef.current.push(linkLayer, nodeLayer);
        setIsLoaded(true);
      }
    } catch (error) {
      console.error("JejuOSMLayer: 대안 방법 실패", error);
      toast.error("지도 레이어를 불러올 수 없습니다.");
    }
  };
  
  useEffect(() => {
    if (!map || !window.naver || !window.naver.maps) return;
    
    // 이미 로드되었으면 중복 로드 방지
    if (isLoaded && layersRef.current.length > 0) {
      console.log("JejuOSMLayer: 레이어가 이미 로드되어 있음");
      return;
    }

    // drawing 모듈 준비 확인 및 대기
    waitForDrawingModule();
    
    // 클린업 함수
    return () => {
      // 폴링 타이머 정리
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      
      if (pollTimeoutRef.current) {
        clearTimeout(pollTimeoutRef.current);
        pollTimeoutRef.current = null;
      }
      
      // 모든 레이어 제거
      if (layersRef.current.length > 0) {
        console.log(`JejuOSMLayer: ${layersRef.current.length}개 레이어 제거`);
        layersRef.current.forEach(feature => {
          if (feature && typeof feature.setMap === 'function') {
            feature.setMap(null);
          }
        });
        layersRef.current = [];
        setIsLoaded(false);
      }
    };
  }, [map]);
  
  // drawing 모듈이 준비되면 GeoJSON 로드
  useEffect(() => {
    if (!isDrawingModuleReady || !map || isLoaded) return;
    
    const loadGeoJson = async (url: string, style: any) => {
      try {
        console.log(`JejuOSMLayer: ${url} 로드 시작`);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`GeoJSON 로딩 실패: ${response.status} ${response.statusText}`);
        }
        
        const geojson = await response.json();
        console.log(`JejuOSMLayer: ${url} 로드 완료, 특성 ${geojson.features?.length || 0}개`);
        
        if (!geojson.features || geojson.features.length === 0) {
          console.warn(`JejuOSMLayer: ${url}에 특성이 없음`);
          return;
        }
        
        try {
          // 네이버 지도 drawing 기능 사용해 GeoJSON 렌더링
          const reader = new window.naver.maps.drawing.JSONReader({
            type: 'FeatureCollection',
            features: geojson.features
          });
          
          const layer = reader.read(style);
          
          // 모든 객체를 지도에 추가
          layer.forEach((feature: any) => {
            if (feature) {
              feature.setMap(map);
              layersRef.current.push(feature);
            }
          });
          
          console.log(`JejuOSMLayer: ${url}의 ${layer.length}개 요소를 지도에 추가함`);
        } catch (error) {
          console.error(`JejuOSMLayer: GeoJSON 처리 오류 (${url}):`, error);
          // 오류 발생 시 대안 방법 시도
          tryFallbackMethod();
        }
      } catch (error) {
        console.error(`JejuOSMLayer: GeoJSON 파일(${url}) 로드 실패:`, error);
      }
    };

    // 스타일 정의
    const linkStyle = {
      strokeColor: '#777', // 더 연한 색상으로 변경
      strokeWeight: 1.5,   // 더 얇게
      strokeOpacity: 0.5,  // 더 투명하게
      clickable: false     // 클릭 이벤트 비활성화
    };

    const nodeStyle = {
      fillColor: '#ff0000',
      fillOpacity: 0.1,    // 매우 투명하게
      radius: 2,           // 더 작게
      strokeWeight: 0,     // 테두리 없애기
      strokeColor: 'transparent',
      clickable: false     // 클릭 이벤트 비활성화
    };

    // GeoJSON 로드
    loadGeoJson('/data/LINK_JSON.geojson', linkStyle);
    loadGeoJson('/data/NODE_JSON.geojson', nodeStyle);
    setIsLoaded(true);
    
  }, [isDrawingModuleReady, map, isLoaded]);

  return null;
};

export default JejuOSMLayer;
