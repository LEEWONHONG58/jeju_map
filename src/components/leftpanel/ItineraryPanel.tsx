
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ItineraryDay } from '@/types/supabase';
import DaySelector from './DaySelector';
import ScheduleViewer from './ScheduleViewer';

interface ItineraryPanelProps {
  itinerary: ItineraryDay[];
  startDate: Date;
  onSelectDay: (day: number) => void;
  onClose: () => void;
  selectedDay: number | null;
}

const ItineraryPanel: React.FC<ItineraryPanelProps> = ({
  itinerary,
  startDate,
  onSelectDay,
  onClose,
  selectedDay
}) => {
  const currentDayItinerary = selectedDay !== null && selectedDay !== undefined
    ? itinerary.find(day => day.day === selectedDay) 
    : null;

  return (
    <div className="min-h-full w-full flex flex-col divide-y">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">생성된 일정</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <DaySelector
          itinerary={itinerary}
          selectedDay={selectedDay}
          onSelectDay={onSelectDay}
          startDate={startDate}
        />
        
        <div className="p-4 pt-2">
          <ScheduleViewer 
            schedule={itinerary}
            selectedDay={selectedDay}
            onDaySelect={onSelectDay}
            startDate={startDate}
            itineraryDay={currentDayItinerary}
          />
        </div>
      </div>
    </div>
  );
};

export default ItineraryPanel;
