
import { useEffect, useRef } from 'react';
import { JEJU_LANDMARKS } from '@/utils/jejuMapStyles';

export const useJejuLandmarks = (
  map: any,
  isInitialized: boolean,
  markers: React.MutableRefObject<any[]>,
  infoWindows: React.MutableRefObject<any[]>,
  setActiveMarker: (name: string | null) => void
) => {
  useEffect(() => {
    if (isInitialized && map) {
      addJejuLandmarks();
    }
    
    return () => {
      // Clean up will be handled by the main component
    };
  }, [isInitialized, map]);

  const addJejuLandmarks = () => {
    if (!map || !window.naver) return;
    
    try {
      JEJU_LANDMARKS.forEach((landmark, index) => {
        const position = new window.naver.maps.LatLng(landmark.lat, landmark.lng);
        
        const markerIcon = {
          content: `
            <div class="custom-marker" style="
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background-color: #FF7043;
              color: white;
              font-weight: bold;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid white;
              font-size: 14px;
            ">${index + 1}</div>
          `,
          size: new window.naver.maps.Size(36, 36),
          anchor: new window.naver.maps.Point(18, 18)
        };
        
        const marker = new window.naver.maps.Marker({
          position: position,
          map: map,
          title: landmark.name,
          icon: markerIcon,
          zIndex: 100
        });
        
        const contentString = `
          <div style="padding: 15px; border-radius: 8px; max-width: 250px;">
            <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">${landmark.name}</h3>
            <p style="font-size: 13px; color: #555; margin-bottom: 10px;">${landmark.description}</p>
          </div>
        `;
        
        const infoWindow = new window.naver.maps.InfoWindow({
          content: contentString,
          borderWidth: 0,
          disableAnchor: true,
          backgroundColor: "white",
          borderColor: "#ddd",
          pixelOffset: new window.naver.maps.Point(0, -5)
        });
        
        window.naver.maps.Event.addListener(marker, 'click', () => {
          infoWindows.current.forEach(iw => iw.close());
          infoWindow.open(map, marker);
          setActiveMarker(landmark.name);
        });
        
        markers.current.push(marker);
        infoWindows.current.push(infoWindow);
      });
    } catch (error) {
      console.error("Error adding Jeju landmarks:", error);
    }
  };
};
