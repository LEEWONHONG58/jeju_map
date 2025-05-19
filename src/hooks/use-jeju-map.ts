
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import { loadNaverMaps } from "@/utils/loadNaverMaps";
import { JEJU_CENTER } from '@/utils/jejuMapStyles';

export const useJejuMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const polylines = useRef<any[]>([]);
  const infoWindows = useRef<any[]>([]);
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  const [isNaverLoaded, setIsNaverLoaded] = useState<boolean>(false);
  const [isMapError, setIsMapError] = useState<boolean>(false);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(true);
  const [loadAttempts, setLoadAttempts] = useState<number>(0);
  const toastShownRef = useRef<boolean>(false);

  useEffect(() => {
    const initNaverMaps = async () => {
      if (loadAttempts >= 3) {
        console.error("Maximum load attempts reached for Jeju map");
        setIsMapError(true);
        toast.error("지도 로드에 실패했습니다.");
        return;
      }
      
      try {
        console.log(`제주 지도 API 로드 시도 (${loadAttempts + 1}/3)`);
        await loadNaverMaps();
        setIsNaverLoaded(true);
        console.log("Naver Maps loaded successfully for Jeju visualization");
      } catch (error) {
        console.error("Failed to load Naver Maps:", error);
        setIsMapError(true);
        
        setTimeout(() => {
          setLoadAttempts(prev => prev + 1);
          setIsMapError(false);
        }, 3000);
      }
    };
    
    if (!isNaverLoaded && !isMapError) {
      initNaverMaps();
    }
    
    return () => {
      clearMarkersAndInfoWindows();
    };
  }, [loadAttempts, isNaverLoaded, isMapError]);

  useEffect(() => {
    if (!isNaverLoaded || !mapContainer.current) return;
    
    initializeJejuMap();
  }, [isNaverLoaded]);

  const clearMarkersAndInfoWindows = () => {
    if (markers.current && markers.current.length > 0) {
      markers.current.forEach(marker => {
        if (marker && typeof marker.setMap === 'function') {
          try {
            marker.setMap(null);
          } catch (error) {
            console.error("Error clearing marker:", error);
          }
        }
      });
    }
    markers.current = [];
    
    if (infoWindows.current && infoWindows.current.length > 0) {
      infoWindows.current.forEach(infoWindow => {
        if (infoWindow && typeof infoWindow.close === 'function') {
          try {
            infoWindow.close();
          } catch (error) {
            console.error("Error closing infoWindow:", error);
          }
        }
      });
    }
    infoWindows.current = [];
    
    if (polylines.current && polylines.current.length > 0) {
      polylines.current.forEach(polyline => {
        if (polyline && typeof polyline.setMap === 'function') {
          try {
            polyline.setMap(null);
          } catch (error) {
            console.error("Error clearing polyline:", error);
          }
        }
      });
    }
    polylines.current = [];
  };

  const initializeJejuMap = () => {
    if (!mapContainer.current || !window.naver || !window.naver.maps) {
      console.error("Cannot initialize Jeju map");
      return;
    }
    
    try {
      const options = {
        center: new window.naver.maps.LatLng(JEJU_CENTER.lat, JEJU_CENTER.lng),
        zoom: 10,
        minZoom: 8,
        maxZoom: 18,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT
        },
        mapTypeControl: true,
        scaleControl: true,
        mapTypeId: window.naver.maps.MapTypeId.TERRAIN
      };

      console.log("Creating Jeju Map instance");
      map.current = new window.naver.maps.Map(mapContainer.current, options);
      
      window.naver.maps.Event.once(map.current, 'init_stylemap', function() {
        console.log("Jeju map initialized");
        setIsMapInitialized(true);
        // Show toast only once
        if (!toastShownRef.current) {
          // Remove toast to prevent duplication
          // toast.success("제주도 지도가 로드되었습니다");
          toastShownRef.current = true;
        }
      });
      
      window.naver.maps.Event.addListener(map.current, 'zoom_changed', (zoom: number) => {
        console.log('Zoom changed to:', zoom);
        
        if (zoom < 9) {
          setShowInfoPanel(true);
        }
      });
      
    } catch (error) {
      console.error("Failed to initialize Jeju map:", error);
      setIsMapError(true);
      toast.error("제주도 지도 초기화에 실패했습니다");
    }
  };

  return {
    map: map.current,
    mapContainer,
    markers,
    polylines,
    infoWindows,
    isMapInitialized,
    isNaverLoaded,
    isMapError,
    activeMarker,
    setActiveMarker,
    showInfoPanel,
    setShowInfoPanel,
    clearMarkersAndInfoWindows
  };
};
