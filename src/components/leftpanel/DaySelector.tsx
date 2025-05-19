import React from 'react';
import { Button } from '@/components/ui/button';
import { ItineraryDay } from '@/types/core';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DaySelectorProps {
  itinerary: ItineraryDay[] | null;
  selectedDay: number | null;
  onSelectDay: (day: number) => void;
  startDate?: Date;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  itinerary,
  selectedDay,
  onSelectDay,
  startDate = new Date(),
}) => {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  // 각 일자별 날짜 계산
  const getDayDate = (day: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + day - 1); // day는 1부터 시작하므로 -1 해줌
    return format(date, 'MM/dd(EEE)', { locale: ko });
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md">
      <div className="flex gap-2 overflow-x-auto px-2 py-1 max-w-[calc(100vw-2rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {itinerary.map((day) => (
          <Button
            key={day.day}
            variant={selectedDay === day.day ? "default" : "outline"}
            size="sm"
            className={`min-w-16 h-16 rounded-md flex flex-col items-center justify-center gap-0.5 px-3 ${
              selectedDay === day.day ? 'bg-primary text-primary-foreground' : ''
            }`}
            onClick={() => onSelectDay(day.day)}
          >
            <span className="font-bold text-sm">{day.day}일차</span>
            <span className="text-xs">{getDayDate(day.day)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
