
import React from 'react';

interface MapLoadingOverlayProps {
  isNaverLoaded: boolean;
  isMapError: boolean;
}

const MapLoadingOverlay: React.FC<MapLoadingOverlayProps> = ({ isNaverLoaded, isMapError }) => {
  if (isNaverLoaded && !isMapError) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {!isNaverLoaded && !isMapError && (
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-lg font-medium mb-2">지도를 불러오는 중...</div>
          <p className="text-sm text-gray-600">네이버 지도 API를 로드하고 있습니다.</p>
        </div>
      )}
      
      {isMapError && (
        <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-6 rounded-lg shadow-lg text-center">
          <div className="w-12 h-12 mx-auto mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-lg font-medium text-red-600 mb-2">지도 로딩 실패</div>
          <p className="text-sm text-gray-600 mb-4">지도를 불러오는 데 문제가 발생했습니다.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            새로고침
          </button>
        </div>
      )}
    </div>
  );
};

export default MapLoadingOverlay;
