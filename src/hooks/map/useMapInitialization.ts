
import { useState, useEffect, useRef } from 'react';
import { loadNaverMaps } from "@/utils/loadNaverMaps";
import { initializeNaverMap } from '@/utils/map/mapInitializer';
import { toast } from "sonner";

export const useMapInitialization = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  const [isNaverLoaded, setIsNaverLoaded] = useState<boolean>(false);
  const [isMapError, setIsMapError] = useState<boolean>(false);
  const [loadAttempts, setLoadAttempts] = useState<number>(0);
  const [map, setMap] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const toastShownRef = useRef<boolean>(false);

  // 지도 API 초기화 상태 확인 헬퍼 함수
  const checkMapInitialized = () => {
    return !!(window.naver?.maps?.Map);
  };
  
  const checkGeoJsonInitialized = () => {
    return !!(window.naver?.maps?.GeoJSON && typeof window.naver.maps.GeoJSON.read === 'function');
  };

  // 네이버 지도 API 로드
  useEffect(() => {
    const initNaverMaps = async () => {
      if (isNaverLoaded) return; // 이미 로드되었으면 중복 실행 방지
      if (isInitializing) return; // 이미 초기화 중이면 중복 실행 방지
      
      if (loadAttempts >= 3) {
        console.error("최대 로드 시도 횟수에 도달했습니다. 재시도를 중단합니다.");
        setIsMapError(true);
        toast.error("지도 로드에 실패했습니다. 페이지를 새로고침해주세요.");
        return;
      }

      setIsInitializing(true);

      try {
        console.log(`네이버 지도 API 로드 시도 (${loadAttempts + 1}/3)`);
        await loadNaverMaps();
        console.log("네이버 지도 API 로드 성공");
        setIsNaverLoaded(true);
        setIsInitializing(false);
      } catch (error) {
        console.error("네이버 지도 API 로드 실패:", error);
        setIsMapError(true);
        setIsInitializing(false);
        
        // 3초 후 재시도 설정
        setTimeout(() => {
          setLoadAttempts(prev => prev + 1);
          setIsMapError(false);
        }, 3000);
      }
    };
    
    if (!isNaverLoaded && !isMapError && !isInitializing) {
      initNaverMaps();
    }
  }, [loadAttempts, isNaverLoaded, isMapError, isInitializing]);

  // 지도 초기화
  useEffect(() => {
    if (!isNaverLoaded || !mapContainer.current || isMapInitialized) {
      return;
    }

    let initTimeout: number;

    try {
      console.log("지도 초기화 시작");
      
      // 지도 API가 실제로 완전히 로드되었는지 다시 한번 확인
      if (!checkMapInitialized()) {
        console.log("지도 API가 아직 준비되지 않았습니다. 1초 후 재시도합니다.");
        setTimeout(() => {
          setIsNaverLoaded(false); // 로드 시도 재개
        }, 1000);
        return;
      }
      
      const newMap = initializeNaverMap(mapContainer.current);
      
      if (newMap) {
        // 지도 초기화 이벤트 리스너 추가
        if (window.naver && window.naver.maps) {
          // 이벤트 리스너가 트리거되지 않을 경우를 대비한 타임아웃 설정
          initTimeout = window.setTimeout(() => {
            if (!isMapInitialized) {
              console.log("지도 초기화 타임아웃 후 완료 처리");
              setMap(newMap);
              setIsMapInitialized(true);
              // Show toast only once
              if (!toastShownRef.current) {
                toast.success("지도가 준비되었습니다");
                toastShownRef.current = true;
              }
            }
          }, 5000);
          
          window.naver.maps.Event.once(newMap, 'init_stylemap', () => {
            window.clearTimeout(initTimeout);
            console.log("지도 초기화 완료 이벤트 발생");
            setMap(newMap);
            setIsMapInitialized(true);
            // Show toast only once
            if (!toastShownRef.current) {
              toast.success("지도가 준비되었습니다");
              toastShownRef.current = true;
            }
          });
        } else {
          setMap(newMap);
          setIsMapInitialized(true);
          // Show toast only once
          if (!toastShownRef.current) {
            toast.success("지도가 준비되었습니다");
            toastShownRef.current = true;
          }
        }
      } else {
        throw new Error("지도 초기화 실패");
      }
    } catch (error) {
      console.error("지도 초기화 중 오류 발생:", error);
      setIsMapError(true);
      toast.error("지도 초기화에 실패했습니다.");
    }

    return () => {
      if (initTimeout) {
        window.clearTimeout(initTimeout);
      }
    };
  }, [isNaverLoaded, isMapInitialized]);

  return {
    map,
    mapContainer,
    isMapInitialized,
    isNaverLoaded,
    isMapError,
    isGeoJsonInitialized: checkGeoJsonInitialized()
  };
};
