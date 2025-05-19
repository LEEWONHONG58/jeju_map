
// GeoJSON 노드/링크 타입 정의
export interface GeoCoordinates {
  0: number; // 경도 (longitude)
  1: number; // 위도 (latitude)
}

export interface GeoJsonGeometry {
  type: string;
  coordinates: GeoCoordinates | GeoCoordinates[] | GeoCoordinates[][];
}

export interface GeoJsonNodeProperties {
  NODE_ID: number;
  NODE_TYPE: string;
  NODE_NAME: string;
  [key: string]: any;
}

export interface GeoJsonLinkProperties {
  LINK_ID: number;
  F_NODE: number;
  T_NODE: number;
  LENGTH: number;
  [key: string]: any;
}

export interface GeoJsonFeature {
  type: string;
  properties: GeoJsonNodeProperties | GeoJsonLinkProperties;
  geometry: GeoJsonGeometry;
}

export interface GeoJsonCollection {
  type: string;
  features: GeoJsonFeature[];
}

// 노드와 링크를 위한 기본 타입 정의
export interface GeoNode {
  id: string;
  type: 'node';
  geometry: GeoJsonGeometry;
  properties: GeoJsonNodeProperties;
  coordinates: GeoCoordinates;
  adjacentLinks: string[];
  adjacentNodes: string[];
  naverMarker?: any;
  setStyles: (styles: RouteStyle) => void;
}

export interface GeoLink {
  id: string;
  type: 'link';
  geometry: GeoJsonGeometry;
  properties: GeoJsonLinkProperties;
  coordinates: GeoCoordinates[];
  fromNode: string;
  toNode: string;
  length: number;
  naverPolyline?: any;
  setStyles: (styles: RouteStyle) => void;
}

// 특정 노드나 링크에 적용할 스타일
export interface RouteStyle {
  strokeColor: string;
  strokeWeight: number;
  strokeOpacity: number;
  fillColor?: string;
  fillOpacity?: number;
  zIndex?: number;
}

// GeoJson 레이어 참조를 위한 타입
export interface GeoJsonLayerRef {
  renderRoute: (nodeIds: string[], linkIds: string[], style?: any) => any[];
  clearDisplayedFeatures: () => void;
  getNodeById: (id: string) => any;
  getLinkById: (id: string) => any;
}

// GeoJSON 레이어 속성
export interface GeoJsonLayerProps {
  map: any;
  visible: boolean;
  isMapInitialized: boolean;
  isNaverLoaded: boolean;
  onGeoJsonLoaded?: (nodes: GeoNode[], links: GeoLink[]) => void;
}
