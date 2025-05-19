
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAVER_CLIENT_ID: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_SCHEDULE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend window with Naver Maps
interface Window {
  naver?: any;
  initMap?: () => void;
  geoJsonLayer?: {
    renderRoute: (nodeIds: string[], linkIds: string[], style?: any) => any[];
    clearDisplayedFeatures: () => void;
    getNodeById: (id: string) => any;
    getLinkById: (id: string) => any;
  };
}
