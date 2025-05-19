
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Place } from '@/types/supabase';
import { ExternalLink, Map, Instagram, Clock, MapPin, Star, Info } from 'lucide-react';

interface JejuInfoPanelProps {
  place?: Place | null;
  onClose?: () => void;
  onSelectLocation?: (lat: number, lng: number, name: string) => void;
}

const JejuInfoPanel: React.FC<JejuInfoPanelProps> = ({ place, onClose, onSelectLocation }) => {
  if (place) {
    const hasWeight = place.weight !== undefined && place.weight !== null && place.weight > 0;
    
    return (
      <Card className="shadow-lg animate-fade-in">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{place.name}</span>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
            )}
          </CardTitle>
          <CardDescription>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{place.address}</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {hasWeight && (
            <div className="bg-blue-50 p-2 rounded-md text-sm">
              <div className="flex items-center gap-1">
                <Info className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-medium">추천 점수: {(place.weight * 100).toFixed(1)}%</span>
              </div>
            </div>
          )}
          
          {place.operatingHours && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{place.operatingHours}</span>
            </div>
          )}
          
          {place.rating && (
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-amber-500" />
              <span className="font-medium">{place.rating.toFixed(1)}</span>
              {place.reviewCount && (
                <span className="text-sm text-gray-500">({place.reviewCount})</span>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {place.naverLink && (
            <Button variant="outline" size="sm" onClick={() => window.open(place.naverLink, '_blank')}>
              <Map className="h-3.5 w-3.5 mr-1" />
              네이버 지도
            </Button>
          )}
          {place.instaLink && (
            <Button variant="outline" size="sm" onClick={() => window.open(place.instaLink, '_blank')}>
              <Instagram className="h-3.5 w-3.5 mr-1" />
              인스타그램
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md w-80 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">제주도 명소</h3>
      <ul className="space-y-3">
        {[
          { name: '성산일출봉', lat: 33.458, lng: 126.942, description: '유네스코 세계자연유산' },
          { name: '한라산', lat: 33.362, lng: 126.533, description: '제주의 상징, 대한민국 최고봉' },
          { name: '우도', lat: 33.501, lng: 126.952, description: '소가 누워있는 모양의 섬' },
          { name: '천지연폭포', lat: 33.246, lng: 126.554, description: '아름다운 폭포와 야경' },
        ].map((landmark) => (
          <li key={landmark.name} className="hover:bg-blue-50 p-2 rounded-md transition-colors">
            <button 
              className="w-full text-left" 
              onClick={() => onSelectLocation && onSelectLocation(landmark.lat, landmark.lng, landmark.name)}
            >
              <p className="font-medium">{landmark.name}</p>
              <p className="text-sm text-gray-600">{landmark.description}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JejuInfoPanel;
