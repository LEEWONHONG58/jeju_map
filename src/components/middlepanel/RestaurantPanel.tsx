
import React from 'react';
import BaseKeywordPanel from './common/BaseKeywordPanel';
import { KeywordOption } from '@/types/keyword';

const defaultKeywords: KeywordOption[] = [
  { eng: 'Good_value_for_money', kr: '가성비가 좋아요' },
  { eng: 'Great_for_group_gatherings', kr: '단체모임 하기 좋아요' },
  { eng: 'Spacious_store', kr: '매장이 넓어요' },
  { eng: 'Clean_store', kr: '매장이 청결해요' },
  { eng: 'Nice_view', kr: '뷰가 좋아요' },
  { eng: 'Large_portions', kr: '양이 푸짐해요' },
  { eng: 'Delicious_food', kr: '음식이 맛있어요' },
  { eng: 'Stylish_interior', kr: '인테리어가 멋져요' },
  { eng: 'Fresh_ingredients', kr: '재료가 신선해요' },
  { eng: 'Easy_parking', kr: '주차하기 편해요' },
  { eng: 'Friendly', kr: '친절해요' },
  { eng: 'Special_menu_available', kr: '특별한 메뉴가 있어요' },
  { eng: 'Good_for_solo_dining', kr: '혼밥하기 좋아요' },
];

const RestaurantPanel: React.FC<{
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
  directInputValue: string;
  onDirectInputChange: (value: string) => void;
  onConfirmRestaurant: (finalKeywords: string[]) => void;
  onClose: () => void;
}> = (props) => {
  return (
    <BaseKeywordPanel
      {...props}
      onConfirm={props.onConfirmRestaurant}
      categoryName="음식점"
      defaultKeywords={defaultKeywords}
    />
  );
};

export default RestaurantPanel;
