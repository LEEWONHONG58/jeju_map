
import React from 'react';
import { Check, MapPin, X, Star, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Place } from '@/types/supabase';

interface PlaceCartProps {
  selectedPlaces: Place[];
  onRemovePlace: (placeId: string) => void;
  onViewOnMap: (place: Place) => void;
}

const PlaceCart: React.FC<PlaceCartProps> = ({ 
  selectedPlaces, 
  onRemovePlace,
  onViewOnMap
}) => {
  if (selectedPlaces.length === 0) {
    return (
      <div className="border rounded-md p-3 bg-white mt-4">
        <p className="text-sm text-muted-foreground text-center">
          선택된 장소가 없습니다
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded-md bg-white mt-4">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h3 className="text-sm font-medium">선택한 장소 ({selectedPlaces.length})</h3>
        <div className="text-xs text-muted-foreground">
          <Check className="h-3 w-3 inline mr-1" />
          선택됨
        </div>
      </div>
      
      <ScrollArea className="h-[400px] px-2">
        <div className="space-y-2 py-2">
          {selectedPlaces.map(place => (
            <div 
              key={place.id} 
              className="flex flex-col border rounded-md p-2 text-sm bg-muted/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <p className="font-medium text-xs line-clamp-1">{place.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {place.address || place.categoryDetail || place.category}
                  </p>
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5" 
                    onClick={() => onViewOnMap(place)}
                    title="지도에서 보기"
                  >
                    <MapPin className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 text-destructive hover:text-destructive" 
                    onClick={() => onRemovePlace(String(place.id))}
                    title="선택 취소"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {/* 평점 및 리뷰 정보 표시 */}
              {place.rating > 0 && (
                <div className="flex items-center mt-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{place.rating.toFixed(1)}</span>
                  {place.reviewCount > 0 && (
                    <span className="text-muted-foreground ml-1">({place.reviewCount})</span>
                  )}
                </div>
              )}
              
              {/* 링크 정보 */}
              {(place.naverLink || place.instaLink) && (
                <div className="mt-1 flex items-center text-xs">
                  <ExternalLink className="h-3 w-3 mr-1 text-blue-500" />
                  <a 
                    href={place.naverLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline truncate"
                    onClick={(e) => e.stopPropagation()}
                  >
                    네이버 지도
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PlaceCart;
