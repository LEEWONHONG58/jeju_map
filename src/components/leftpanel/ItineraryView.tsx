import React, { useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { categoryColors, getCategoryName } from '@/utils/categoryColors';
import type { ItineraryDay, ItineraryPlaceWithTime } from '@/types/core';
import ScheduleViewer from './ScheduleViewer';

interface ItineraryViewProps {
  itinerary: ItineraryDay[]; // Using ItineraryDay from the local scope or an imported one
  startDate: Date;
  onSelectDay: (day: number) => void;
  selectedDay: number | null;
  onClose?: () => void; // Added onClose prop
  debug?: { // Added debug prop
    itineraryLength: number;
    selectedDay: number | null;
    showItinerary: boolean;
  };
}

const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  startDate,
  onSelectDay,
  selectedDay,
  onClose, // Added onClose
  debug 
}) => {
  useEffect(() => {
    console.log("ItineraryView 마운트/업데이트:", {
      itineraryLength: itinerary?.length || 0,
      selectedDay,
      startDate: startDate?.toISOString(),
      debugInfo: debug
    });
    
    if (itinerary?.length > 0 && selectedDay === null && onSelectDay) {
      console.log("ItineraryView: 첫 번째 날짜 자동 선택:", itinerary[0].day);
      onSelectDay(itinerary[0].day);
    }
  }, [itinerary, selectedDay, onSelectDay, startDate, debug]);

  const handleDayClick = (day: number) => {
    console.log(`ItineraryView: 일자 선택: ${day}일차`);
    onSelectDay(day);
  };

  const getDateForDay = (day: number) => {
    const date = addDays(new Date(startDate), day - 1);
    return format(date, 'yyyy년 MM월 dd일');
  };

  const getDayOfWeek = (day: number) => {
    const date = addDays(new Date(startDate), day - 1);
    return format(date, 'EEEE', { locale: ko });
  };

  if (!itinerary || itinerary.length === 0) {
    console.warn("ItineraryView: 일정 데이터가 없습니다.");
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>일정이 생성되지 않았습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">생성된 여행 일정</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:underline"
          >
            ← 뒤로
          </button>
        )}
      </div>
      
      {/* 날짜 버튼 UI */}
      <div className="flex overflow-x-auto pb-2 p-4 gap-2 border-b">
        {itinerary.map((dayItem) => {
          const dayDate = new Date(startDate);
          // Ensure dayItem.day is a number before using in addDays or setDate
          const currentDayNumber = typeof dayItem.day === 'number' ? dayItem.day : parseInt(String(dayItem.day), 10);
          if (isNaN(currentDayNumber)) {
            console.error("Invalid day number in itinerary:", dayItem);
            return null; 
          }
          dayDate.setDate(startDate.getDate() + currentDayNumber - 1);
          const formattedDate = format(dayDate, 'MM/dd(EEE)', { locale: ko });
          
          return (
            <Button
              key={currentDayNumber}
              variant={selectedDay === currentDayNumber ? "default" : "outline"}
              className="flex flex-col h-16 min-w-16 whitespace-nowrap"
              onClick={() => handleDayClick(currentDayNumber)}
            >
              <span className="font-bold text-sm">{currentDayNumber}일차</span>
              <span className="text-xs">{formattedDate}</span>
            </Button>
          );
        })}
      </div>
      
      {/* 선택된 날짜의 일정 표시 via ScheduleViewer */}
      <ScheduleViewer
        schedule={itinerary}
        selectedDay={selectedDay}
        onDaySelect={onSelectDay}
        startDate={startDate}
        itineraryDay={selectedDay !== null ? itinerary.find(d => d.day === selectedDay) : null}
      />
    </div>
  );
};

export default ItineraryView;
