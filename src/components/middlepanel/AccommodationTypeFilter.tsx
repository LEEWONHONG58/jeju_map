
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type AccommodationType = 'all' | 'hotel' | 'pension';
type HotelStarRating = '3star' | '4star' | '5star';

interface AccommodationTypeFilterProps {
  selectedType: AccommodationType;
  onTypeChange: (type: AccommodationType) => void;
  selectedStarRatings: HotelStarRating[];
  onStarRatingChange: (rating: HotelStarRating) => void;
}

const AccommodationTypeFilter: React.FC<AccommodationTypeFilterProps> = ({
  selectedType,
  onTypeChange,
  selectedStarRatings,
  onStarRatingChange
}) => {
  return (
    <div className="mb-5 space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">숙소 유형</h4>
        <ToggleGroup type="single" value={selectedType} onValueChange={(value) => value && onTypeChange(value as AccommodationType)}>
          <ToggleGroupItem value="all" className="text-sm">
            모두
          </ToggleGroupItem>
          <ToggleGroupItem value="hotel" className="text-sm">
            호텔
          </ToggleGroupItem>
          <ToggleGroupItem value="pension" className="text-sm">
            펜션
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {selectedType === 'hotel' && (
        <div>
          <h4 className="text-sm font-medium mb-2">호텔 등급</h4>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="3star"
                checked={selectedStarRatings.includes('3star')}
                onCheckedChange={() => onStarRatingChange('3star')}
              />
              <Label htmlFor="3star">3성급 이하</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="4star"
                checked={selectedStarRatings.includes('4star')}
                onCheckedChange={() => onStarRatingChange('4star')}
              />
              <Label htmlFor="4star">4성급</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                id="5star"
                checked={selectedStarRatings.includes('5star')}
                onCheckedChange={() => onStarRatingChange('5star')}
              />
              <Label htmlFor="5star">5성급</Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccommodationTypeFilter;
