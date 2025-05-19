
import React from 'react';

interface JejuLoadingStateProps {
  isMapError: boolean;
  className?: string;
}

const JejuLoadingState: React.FC<JejuLoadingStateProps> = ({ isMapError, className }) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-medium mb-4">
        {isMapError ? "지도 로드 오류" : "제주도 지도를 불러오는 중..."}
      </h3>
      
      <div className="flex items-center justify-center mb-4">
        {isMapError ? (
          <div className="h-12 w-12 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
        ) : (
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
        {isMapError 
          ? "네이버 지도 로드 중 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요." 
          : "네이버 지도 API를 불러오는 중입니다. 잠시만 기다려주세요."
        }
      </p>

      {isMapError && (
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          새로고침
        </button>
      )}
    </div>
  );
};

export default JejuLoadingState;
