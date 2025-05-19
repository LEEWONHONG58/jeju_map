
import React from 'react';

interface JejuMapControlsProps {
  onToggleInfoPanel: () => void;
  showInfoPanel: boolean;
  setMapType: (mapType: string) => void;
  isNaverLoaded: boolean;
}

const JejuMapControls: React.FC<JejuMapControlsProps> = ({ 
  onToggleInfoPanel, 
  showInfoPanel,
  setMapType,
  isNaverLoaded
}) => {
  return (
    <>
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-md shadow-md overflow-hidden">
          {isNaverLoaded && window.naver && window.naver.maps ? (
            <>
              <button 
                className="px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors" 
                onClick={() => setMapType('NORMAL')}
              >
                일반
              </button>
              <button 
                className="px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors" 
                onClick={() => setMapType('TERRAIN')}
              >
                지형
              </button>
              <button 
                className="px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors" 
                onClick={() => setMapType('SATELLITE')}
              >
                위성
              </button>
              <button 
                className="px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors" 
                onClick={() => setMapType('HYBRID')}
              >
                하이브리드
              </button>
            </>
          ) : (
            <div className="px-3 py-1.5 text-sm text-gray-400">지도 로딩 중...</div>
          )}
        </div>
      </div>
      
      <button 
        className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md shadow-md z-10 text-sm hover:bg-blue-50 transition-colors"
        onClick={onToggleInfoPanel}
      >
        {showInfoPanel ? '정보 패널 숨기기' : '정보 패널 보기'}
      </button>
    </>
  );
};

export default JejuMapControls;
