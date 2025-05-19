
import React from 'react';
import BaseKeywordPanel from './common/BaseKeywordPanel';
import { KeywordOption } from '@/types/keyword';

const defaultKeywords: KeywordOption[] = [
  { eng: 'Many_Attractions', kr: '볼거리가 많아요' },
  { eng: 'Photogenic_Spot', kr: '사진이 잘 나와요' },
  { eng: 'Easy_Parking', kr: '주차하기 편해요' },
  { eng: 'Well_Maintained_Walking_Trails', kr: '산책로가 잘 되어있어요' },
  { eng: 'Kid_Friendly', kr: '아이와 가기 좋아요' },
  { eng: 'Great_View', kr: '뷰가 좋아요' },
  { eng: 'Reasonable_Pricing', kr: '가격이 합리적이에요' },
  { eng: 'Diverse_Experience_Programs', kr: '체험 프로그램이 다양해요' },
  { eng: 'Large_Scale', kr: '규모가 커요' },
  { eng: 'Friendly_Staff', kr: '설명이 잘 되어있어요' },
];

const LandmarkPanel: React.FC<{
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
  directInputValue: string;
  onDirectInputChange: (value: string) => void;
  onConfirmLandmark: (finalKeywords: string[]) => void;
  onClose: () => void;
}> = (props) => {
  return (
    <BaseKeywordPanel
      {...props}
      onConfirm={props.onConfirmLandmark}
      categoryName="관광지"
      defaultKeywords={defaultKeywords}
    />
  );
};

export default LandmarkPanel;
