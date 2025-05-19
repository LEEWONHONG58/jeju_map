
import React, { createContext, useContext, useRef } from 'react';
import { Place, ItineraryDay } from '@/types/supabase';
import useMapCore from './useMapCore';
import { ServerRouteSummaryItem, ServerRouteResponse } from '@/types/schedule';

interface MapContextType {
  map: any;
  mapContainer: React.RefObject<HTMLDivElement>;
  isMapInitialized: boolean;
  isNaverLoaded: boolean;
  isMapError: boolean;
  addMarkers: (places: Place[], opts?: { 
    highlight?: boolean; 
    isItinerary?: boolean; 
    useRecommendedStyle?: boolean;
    useColorByCategory?: boolean;
    onClick?: (place: Place, index: number) => void;
  }) => any[];
  calculateRoutes: (places: Place[]) => void;
  clearMarkersAndUiElements: () => void;
  panTo: (locationOrCoords: string | {lat: number, lng: number}) => void;
  showGeoJson: boolean;
  toggleGeoJsonVisibility: () => void;
  renderItineraryRoute: (itineraryDay: ItineraryDay | null) => void;
  clearAllRoutes: () => void;
  handleGeoJsonLoaded: (nodes: any[], links: any[]) => void;
  highlightSegment: (fromIndex: number, toIndex: number, itineraryDay?: ItineraryDay) => void;
  clearPreviousHighlightedPath: () => void;
  isGeoJsonLoaded: boolean;
  checkGeoJsonMapping: (places: Place[]) => {
    totalPlaces: number;
    mappedPlaces: number;
    mappingRate: string;
    averageDistance: number | string;
    success: boolean;
    message: string;
  };
  mapPlacesWithGeoNodes: (places: Place[]) => Place[];
  showRouteForPlaceIndex: (placeIndex: number, itineraryDay: ItineraryDay) => void;
  renderGeoJsonRoute: (nodeIds: string[], linkIds: string[], style?: any) => any[];
  geoJsonNodes: any[];
  geoJsonLinks: any[];
  // 서버 경로 관련 기능 수정 - Aligning with error message for useMapCore's provided type
  setServerRoutes: (
    dayRoutes: Record<number, ServerRouteResponse> | 
               ((prevRoutes: Record<number, ServerRouteResponse>) => Record<number, ServerRouteResponse>)
  ) => void;
  serverRoutesData: Record<number, ServerRouteResponse>; // Align data type as well
}

const defaultContext: MapContextType = {
  map: null,
  mapContainer: { current: null } as React.RefObject<HTMLDivElement>,
  isMapInitialized: false,
  isNaverLoaded: false,
  isMapError: false,
  addMarkers: () => [],
  calculateRoutes: () => {},
  clearMarkersAndUiElements: () => {},
  panTo: () => {},
  showGeoJson: false,
  toggleGeoJsonVisibility: () => {},
  renderItineraryRoute: () => {},
  clearAllRoutes: () => {},
  handleGeoJsonLoaded: () => {},
  highlightSegment: () => {},
  clearPreviousHighlightedPath: () => {},
  isGeoJsonLoaded: false,
  checkGeoJsonMapping: () => ({ 
    totalPlaces: 0, 
    mappedPlaces: 0, 
    mappingRate: '0%', 
    averageDistance: 0,
    success: false,
    message: '초기화되지 않음'
  }),
  mapPlacesWithGeoNodes: (places) => places,
  showRouteForPlaceIndex: () => {},
  renderGeoJsonRoute: () => [],
  geoJsonNodes: [],
  geoJsonLinks: [],
  setServerRoutes: () => {},
  serverRoutesData: {}
};

const MapContext = createContext<MapContextType>(defaultContext);

export const useMapContext = () => useContext(MapContext);

// Create a provider component that uses the useMapCore hook
export const MapProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const mapCore = useMapCore();
  
  return (
    <MapContext.Provider value={mapCore}>
      {children}
    </MapContext.Provider>
  );
};
