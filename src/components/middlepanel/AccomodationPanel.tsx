
import React, { useState } from 'react';
import BaseKeywordPanel from './common/BaseKeywordPanel';
import { KeywordOption } from '@/types/keyword';
import { Button } from '@/components/ui/button';
import { Hotel } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type AccommodationType = 'hotel' | 'pension' | null;
type HotelStarRating = '3star' | '4star' | '5star';

const defaultKeywords: KeywordOption[] = [
  { eng: 'kind_service', kr: '친절해요' },
  { eng: 'cleanliness', kr: '깨끗해요' },
  { eng: 'good_view', kr: '뷰가 좋아요' },
  { eng: 'quiet_and_relax', kr: '조용히 쉬기 좋아요' },
  { eng: 'good_bedding', kr: '침구가 좋아요' },
  { eng: 'stylish_interior', kr: '인테리어가 멋져요' },
  { eng: 'good_aircon_heating', kr: '냉난방이 잘돼요' },
  { eng: 'well_equipped_bathroom', kr: '화장실이 잘 되어 있어요' },
  { eng: 'good_breakfast', kr: '조식이 맛있어요' },
  { eng: 'easy_parking', kr: '주차하기 편해요' },
];

// 컴포넌트 이름을 AccommodationPanel로 수정 (철자 통일)
const AccommodationPanel: React.FC<{
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
  directInputValue: string;
  onDirectInputChange: (value: string) => void;
  onConfirmAccomodation: (finalKeywords: string[]) => void;
  onClose: () => void;
}> = ({
  selectedKeywords,
  onToggleKeyword,
  directInputValue,
  onDirectInputChange,
  onConfirmAccomodation,
  onClose,
}) => {
  const [selectedAccommodationType, setSelectedAccommodationType] = useState<AccommodationType>(null);
  const [selectedStarRatings, setSelectedStarRatings] = useState<HotelStarRating[]>([]);

  const handleAccommodationTypeSelect = (type: AccommodationType) => {
    setSelectedAccommodationType(type);
    if (type === 'pension') {
      setSelectedStarRatings([]);
    }
  };

  const handleStarRatingToggle = (rating: HotelStarRating) => {
    setSelectedStarRatings(prev => {
      if (prev.includes(rating)) {
        return prev.filter(r => r !== rating);
      }
      return [...prev, rating].sort();
    });
  };

  const handleConfirm = () => {
    const typeKeyword = selectedAccommodationType === 'hotel' ? 'hotel_type' : 'pension_type';
    const starKeywords = selectedStarRatings.map(rating => `star_${rating}`);
    const finalKeywords = [...selectedKeywords, typeKeyword, ...starKeywords];
    onConfirmAccomodation(finalKeywords);
  };

  return (
    <BaseKeywordPanel
      selectedKeywords={selectedKeywords}
      onToggleKeyword={onToggleKeyword}
      directInputValue={directInputValue}
      onDirectInputChange={onDirectInputChange}
      onConfirm={handleConfirm}
      onClose={onClose}
      categoryName="숙소"
      defaultKeywords={defaultKeywords}
      accommodationTypeUI={
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">숙소 유형 선택</h3>
          <div className="grid grid-cols-2 gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={selectedAccommodationType === 'hotel' ? 'default' : 'outline'}
                  onClick={() => handleAccommodationTypeSelect('hotel')}
                  className="w-full"
                >
                  <Hotel className="mr-2 h-4 w-4" />
                  호텔
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm mb-2">호텔 등급 선택</h4>
                  {['3star', '4star', '5star'].map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedStarRatings.includes(rating as HotelStarRating) ? 'default' : 'outline'}
                      onClick={() => handleStarRatingToggle(rating as HotelStarRating)}
                      className="w-full justify-start text-sm"
                    >
                      {rating === '3star' ? '3성급 이하' : `${rating[0]}성급`} 호텔
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button
              variant={selectedAccommodationType === 'pension' ? 'default' : 'outline'}
              onClick={() => handleAccommodationTypeSelect('pension')}
              className="w-full"
            >
              펜션
            </Button>
          </div>
        </div>
      }
    />
  );
}; 

export default AccommodationPanel;
