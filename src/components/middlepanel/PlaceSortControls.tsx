
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlaceSortControlsProps {
  sortOption: string;
  onSortChange: (value: string) => void;
  totalPlaces: number;
}

const PlaceSortControls: React.FC<PlaceSortControlsProps> = ({
  sortOption,
  onSortChange,
  totalPlaces,
}) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="text-[10px] text-muted-foreground">
        검색 결과: {totalPlaces}개의 장소
      </div>
      <div className="flex items-center gap-2">
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-[130px] h-7 text-xs">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommendation" className="text-xs">추천순</SelectItem>
            <SelectItem value="rating" className="text-xs">별점순</SelectItem>
            <SelectItem value="reviews" className="text-xs">리뷰순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PlaceSortControls;
