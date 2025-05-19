import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ItineraryDay, ItineraryPlaceWithTime } from '@/types/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Clock, Navigation } from 'lucide-react';

interface ScheduleViewerProps {
  schedule?: ItineraryDay[];
  selectedDay?: number | null;
  onDaySelect?: (day: number) => void;
  onClose?: () => void;
  startDate?: Date;
  itineraryDay?: ItineraryDay | null;
}

const ScheduleViewer: React.FC<ScheduleViewerProps> = ({
  schedule,
  selectedDay,
  onDaySelect,
  onClose,
  startDate = new Date(),
  itineraryDay
}) => {
  useEffect(() => {
    console.log("ScheduleViewer 마운트/업데이트:", {
      scheduleLength: schedule?.length || 0,
      selectedDay,
      itineraryDayPresent: !!itineraryDay,
      startDate: startDate.toISOString()
    });
  }, [schedule, selectedDay, itineraryDay, startDate]);

  const categoryToKorean = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'accommodation': '숙소',
      'attraction': '관광지',
      'restaurant': '음식점',
      'cafe': '카페'
    };
    
    return categoryMap[category] || category;
  };

  // If itineraryDay is provided, use it. Otherwise, find from schedule if schedule and selectedDay are present.
  const currentDayToDisplay = itineraryDay || 
    (selectedDay !== null && schedule && schedule.length > 0 ? 
      schedule.find(d => d.day === selectedDay) : null);

  if (!currentDayToDisplay && selectedDay !== null) {
    // This log is helpful if a day is selected but no data is found for it
    console.warn(`ScheduleViewer: 선택된 날짜(${selectedDay})에 해당하는 일정 데이터가 없습니다.`, {
      scheduleAvailable: !!schedule,
      scheduleDays: schedule?.map(d => d.day)
    });
  }

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1">
        {currentDayToDisplay ? (
          <div className="p-4">
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">{currentDayToDisplay.day}일차 일정</h3>
              <div className="text-sm text-muted-foreground mb-4">
                총 이동 거리: {currentDayToDisplay.totalDistance ? currentDayToDisplay.totalDistance.toFixed(2) : 'N/A'} km
              </div>
            </div>
            
            <div className="space-y-4 relative">
              <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200 z-0"></div>
              
              {currentDayToDisplay.places.map((place, idx) => (
                <div key={place.id || `place-${idx}`} className="flex relative z-10">
                  <div className="h-12 w-12 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center border-2 border-white shadow-md z-10">
                    {idx + 1}
                  </div>
                  
                  <div className="ml-4 flex-1 border rounded-lg p-3 bg-white">
                    <div className="font-medium">{place.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {categoryToKorean(place.category)}
                    </div>
                    
                    {place.timeBlock && (
                      <div className="flex items-center mt-2 text-xs text-gray-600">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{place.timeBlock}</span>
                      </div>
                    )}
                    
                    {(place as ItineraryPlaceWithTime).travelTimeToNext && (place as ItineraryPlaceWithTime).travelTimeToNext !== "-" && (
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Navigation className="w-3 h-3 mr-1" />
                        <span>다음 장소까지: {(place as ItineraryPlaceWithTime).travelTimeToNext}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            {selectedDay ? `선택된 ${selectedDay}일차의 일정을 불러오는 중이거나 데이터가 없습니다.` : '일자를 선택해주세요'}
          </div>
        )}
      </ScrollArea>
      {/* 디버깅용 상태 표시 (개발 중에만 사용) */}
      {process.env.NODE_ENV === 'development' && !currentDayToDisplay && selectedDay !== null && (
        <div className="p-4 bg-yellow-100 text-yellow-800 text-sm">
          디버깅 (ScheduleViewer): 선택된 날짜({selectedDay})에 해당하는 일정 데이터가 없습니다.<br />
          schedule prop: {schedule ? `${schedule.length}일 (${schedule.map(d=>d.day).join(',')})` : 'undefined'}<br />
          itineraryDay prop: {itineraryDay ? '제공됨' : '제공되지 않음'}
        </div>
      )}
    </div>
  );
};

export default ScheduleViewer;
