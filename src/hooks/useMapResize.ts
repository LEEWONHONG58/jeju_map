
import { useEffect } from 'react';

export const useMapResize = (map: any) => {
  useEffect(() => {
    const handleResize = () => {
      if (map && window.naver) {
        console.log("Window resized, triggering map resize");
        window.naver.maps.Event.trigger(map, 'resize');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);
};
