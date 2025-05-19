
import React from 'react';
import { Place } from '@/types/supabase';
import { cn } from '@/lib/utils';
import { MapPin, Star, ExternalLink, Instagram, Info } from 'lucide-react';
import { truncateText } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  onSelect: (place: Place, checked: boolean) => void;
  onClick?: () => void;
  onViewDetails: (place: Place) => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected,
  onSelect,
  onClick,
  onViewDetails,
}) => {
  // Ensure place ID is always treated as a string
  const normalizedPlace = {
    ...place,
    id: typeof place.id === 'number' ? String(place.id) : place.id
  };

  const handleRadioChange = (value: string) => {
    // RadioGroup always passes the new value
    // If the value is the place ID, it means it's selected
    const isChecked = value === normalizedPlace.id;
    onSelect(normalizedPlace, isChecked);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (onClick) {
      onClick();
    }
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(normalizedPlace);
  };

  // Extract weight percentage if available
  const weightPercent = place.weight ? Math.round(place.weight * 100) : null;

  return (
    <div 
      className={cn(
        "bg-white p-3 rounded-md border cursor-pointer hover:shadow-md transition-shadow relative",
        isSelected ? "border-primary" : "border-gray-200"
      )}
      onClick={handleCardClick}
    >
      {/* "자세히" 버튼을 우측 상단에 배치 */}
      <div className="absolute top-2 right-2">
        <button
          onClick={handleViewDetailsClick}
          className="text-xs text-blue-500 hover:underline"
        >
          자세히
        </button>
      </div>
      
      <div className="flex items-start gap-3">
        {/* 라디오 버튼 변경 - RadioGroup 사용 */}
        <RadioGroup 
          value={isSelected ? normalizedPlace.id : ""} 
          onValueChange={handleRadioChange}
          className="mt-1 flex"
        >
          <RadioGroupItem 
            value={normalizedPlace.id as string} 
            id={`radio-${normalizedPlace.id}`}
            onClick={(e) => e.stopPropagation()}
          />
        </RadioGroup>
        
        <div className="flex-1">
          <h4 className="font-medium text-sm">{place.name}</h4>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{truncateText(place.address, 22)}</span>
          </div>
          
          {place.rating > 0 && (
            <div className="flex items-center gap-1 text-xs mt-1">
              <Star className="h-3 w-3 text-amber-500 flex-shrink-0" />
              <span>{place.rating.toFixed(1)}</span>
              {place.reviewCount > 0 && (
                <span className="text-muted-foreground">
                  ({place.reviewCount})
                </span>
              )}
            </div>
          )}

          {/* 네이버 링크와 인스타그램 링크 - 하단에 배치 */}
          <div className="flex mt-2 gap-2">
            {place.naverLink && (
              <a 
                href={place.naverLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs flex items-center text-blue-500 hover:underline"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                네이버
              </a>
            )}

            {place.instaLink && (
              <a 
                href={place.instaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs flex items-center text-pink-500 hover:underline"
              >
                <Instagram className="h-3 w-3 mr-1" />
                인스타
              </a>
            )}
          </div>
          {/* 키워드 매칭 정도를 표시 */}
          {weightPercent !== null && (
            <div className="flex items-center gap-1 text-xs mt-1 text-blue-600">
              <Info className="h-3 w-3 flex-shrink-0" />
              <span>선택하신 키워드와 {weightPercent}% 일치합니다</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
