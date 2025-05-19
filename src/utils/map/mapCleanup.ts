
export const clearMarkers = (markers: any[]) => {
  markers.forEach(marker => {
    if (marker && typeof marker.setMap === 'function') {
      try {
        marker.setMap(null);
      } catch (error) {
        console.error("Error clearing marker:", error);
      }
    }
  });
  return [];
};

export const clearInfoWindows = (infoWindows: any[]) => {
  infoWindows.forEach(infoWindow => {
    if (infoWindow && typeof infoWindow.close === 'function') {
      try {
        infoWindow.close();
      } catch (error) {
        console.error("Error closing infoWindow:", error);
      }
    }
  });
  return [];
};

export const clearPolylines = (polylines: any[]) => {
  polylines.forEach(polyline => {
    if (polyline && typeof polyline.setMap === 'function') {
      try {
        polyline.setMap(null);
      } catch (error) {
        console.error("Error clearing polyline:", error);
      }
    }
  });
  return [];
};
