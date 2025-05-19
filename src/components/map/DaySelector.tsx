
import React from 'react';
import { ItineraryDay } from '@/types/supabase';
import { Button } from '@/components/ui/button'; // Using shadcn Button for consistency
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // For better scrolling on many days

interface DaySelectorProps {
  itinerary: ItineraryDay[];
  currentDay: number | null;
  onDaySelect: (day: ItineraryDay) => void;
  totalDistance: number; // Added to display total distance from the hook
}

const DaySelector: React.FC<DaySelectorProps> = ({ 
  itinerary, 
  currentDay, 
  onDaySelect,
  totalDistance
}) => {
  if (!itinerary || itinerary.length === 0) return null;
  
  const handleShowDetails = () => {
    if (currentDay === null) return;
    const event = new CustomEvent('showItineraryInLeftPanel', {
      detail: { day: currentDay }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl z-[1000] w-auto max-w-[calc(100vw-2rem)]">
      <h3 className="text-sm font-semibold mb-2 text-gray-700 text-center">생성된 여행 일정</h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 pb-2">
          {itinerary.map((day) => (
            <Button
              key={day.day}
              variant={currentDay === day.day ? "default" : "outline"}
              size="sm"
              className={`flex flex-col items-center justify-center h-16 min-w-[70px] px-3 py-1.5 rounded-md transition-all duration-150 ease-in-out
                ${currentDay === day.day 
                  ? 'bg-primary text-primary-foreground shadow-md scale-105' 
                  : 'bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              onClick={() => onDaySelect(day)}
            >
              <span className="font-bold text-xs">{day.day}일차</span>
              <span className="text-[10px] mt-0.5 text-gray-600 dark:text-gray-400">
                {day.date || ''}
                {day.dayOfWeek ? `(${day.dayOfWeek.substring(0, 1)})` : ''}
              </span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {currentDay !== null && (
        <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xs text-gray-600">
            총 이동거리: {totalDistance.toFixed(1)} km
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:text-primary/80"
            onClick={handleShowDetails}
          >
            일정 상세보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
