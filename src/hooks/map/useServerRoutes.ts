
import { useState, useCallback } from 'react';
import { ServerRouteResponse } from '@/types/schedule';

/**
 * 서버 경로 데이터 관리 훅
 */
export const useServerRoutes = () => {
  // 서버 응답 경로 데이터 저장
  const [serverRoutesData, setServerRoutesData] = useState<Record<number, ServerRouteResponse>>({});

  // 서버에서 받은 경로 데이터 저장
  const setServerRoutes = useCallback((dayRoutes: Record<number, ServerRouteResponse>, showGeoJson: boolean, setShowGeoJson: (show: boolean) => void) => {
    setServerRoutesData(dayRoutes);
    console.log('서버 경로 데이터 설정:', dayRoutes);
    
    // 경로 데이터를 받으면 GeoJSON 표시 활성화
    if (!showGeoJson && Object.keys(dayRoutes).length > 0) {
      setShowGeoJson(true);
    }
  }, []);

  return {
    serverRoutesData,
    setServerRoutes
  };
};
