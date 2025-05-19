
import React from 'react';
import { Button } from '@/components/ui/button';
import { Layers, Map, BarChart, Route } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MapControlsProps {
  showGeoJson: boolean;
  onToggleGeoJson: () => void;
  isMapInitialized?: boolean;
  isGeoJsonLoaded?: boolean;
}

const MapControls: React.FC<MapControlsProps> = ({ 
  showGeoJson, 
  onToggleGeoJson,
  isMapInitialized = true,
  isGeoJsonLoaded = false
}) => {
  return (
    <div className="absolute right-4 bottom-28 flex flex-col gap-2 z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showGeoJson ? "default" : "outline"}
              size="icon"
              onClick={onToggleGeoJson}
              disabled={!isMapInitialized}
              className={`h-10 w-10 rounded-full shadow-md ${
                showGeoJson ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white'
              } ${!isGeoJsonLoaded && 'opacity-70'}`}
            >
              {isGeoJsonLoaded ? (
                <Route size={20} className={showGeoJson ? "text-white" : "text-gray-600"} />
              ) : (
                <div className="h-5 w-5 relative flex items-center justify-center">
                  <Route size={20} className="text-gray-400" />
                  {!isGeoJsonLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            {isGeoJsonLoaded 
              ? showGeoJson ? "경로 숨기기" : "경로 표시하기" 
              : "경로 데이터 로드 중..."}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MapControls;
