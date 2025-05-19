
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ExternalLink, Clock, Info, Shield } from 'lucide-react';
import { Place } from '@/types/supabase';
import { cn } from '@/lib/utils';

interface PlaceDetailDialogProps {
  place: Place;
  onClose: () => void;
}

const PlaceDetailDialog: React.FC<PlaceDetailDialogProps> = ({ place, onClose }) => {
  // 데이터 유효성 확인
  const hasRating = place.rating !== undefined && place.rating !== null && place.rating > 0;
  const hasReviews = place.reviewCount !== undefined && place.reviewCount !== null && place.reviewCount > 0;
  const hasWeight = place.weight !== undefined && place.weight !== null && place.weight > 0;
  
  // 카테고리 한글 변환
  const categoryMap: Record<string, string> = {
    'accommodation': '숙소',
    'restaurant': '음식점',
    'cafe': '카페',
    'landmark': '관광지',
    'attraction': '관광지'
  };

  // 카테고리 별 색상
  const categoryColorMap: Record<string, string> = {
    'accommodation': 'bg-blue-50 text-blue-800',
    'restaurant': 'bg-orange-50 text-orange-800',
    'cafe': 'bg-green-50 text-green-800',
    'landmark': 'bg-purple-50 text-purple-800',
    'attraction': 'bg-purple-50 text-purple-800'
  };
  
  // 카테고리 한글명
  const categoryName = categoryMap[place.category || ''] || place.category;
  const categoryColor = categoryColorMap[place.category || ''] || 'bg-gray-50 text-gray-800';

  // 디버깅용 로깅
  console.log("Place detail data:", {
    id: place.id,
    name: place.name,
    category: place.category,
    rating: place.rating,
    reviewCount: place.reviewCount,
    weight: place.weight,
    raw: place
  });

  return (
    <Dialog open={!!place} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md" aria-describedby="place-detail-description">
        <DialogHeader>
          <DialogTitle className="text-lg">{place.name}</DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("text-xs px-2 py-1 rounded-full font-medium", categoryColor)}>
              {categoryName}
            </span>
            {place.categoryDetail && (
              <span className="text-xs text-gray-500 ml-2">{place.categoryDetail}</span>
            )}
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-2" id="place-detail-description">
          {/* 가중치 점수 표시 */}
          {hasWeight && (
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                <span className="font-medium">추천 점수</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                이 장소는 선택하신 키워드와 {(place.weight * 100).toFixed(1)}% 일치합니다
              </p>
            </div>
          )}

          {/* Rating and Reviews */}
          {hasRating && (
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium text-lg">
                {typeof place.rating === 'number' ? place.rating.toFixed(1) : place.rating}
              </span>
              {hasReviews && (
                <span className="text-sm text-gray-500">({place.reviewCount} 리뷰)</span>
              )}
            </div>
          )}
          
          {/* Address */}
          {place.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="text-sm text-gray-700">{place.address}</div>
            </div>
          )}

          {/* Operating Hours */}
          {place.operatingHours && (
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="text-sm text-gray-700">{place.operatingHours}</div>
            </div>
          )}
          
          {/* 데이터 없을 때 안내 메시지 */}
          {!hasWeight && !hasRating && !hasReviews && (
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-500" />
                <span className="font-medium">정보 부족</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">
                이 장소에 대한 평점 및 리뷰 정보가 부족합니다.
              </p>
            </div>
          )}
          
          {/* External Links */}
          <div className="flex gap-3 mt-6">
            {place.naverLink && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  window.open(place.naverLink, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4" />
                네이버 지도
              </Button>
            )}
            
            {place.instaLink && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  window.open(place.instaLink, '_blank');
                }}
              >
                <ExternalLink className="h-4 w-4" />
                인스타그램
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceDetailDialog;
