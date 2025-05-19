
import React from 'react';
import DatePicker from './DatePicker';

interface PanelHeaderProps {
  onDateSelect: (dates: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  }) => void;
  onOpenRegionPanel: () => void;
  hasSelectedDates: boolean;
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ 
  onDateSelect, 
  onOpenRegionPanel, 
  hasSelectedDates 
}) => {
  return (
    <>
      <h1 className="text-xl font-semibold">제주도 여행 플래너</h1>
      <DatePicker onDatesSelected={onDateSelect} />
      <button
        onClick={() => {
          if (!hasSelectedDates) {
            alert("먼저 날짜를 선택해주세요.");
            return;
          }
          onOpenRegionPanel();
        }}
        className="w-full bg-blue-100 text-blue-800 rounded px-4 py-2 text-sm font-medium hover:bg-blue-200"
      >
        지역 선택
      </button>
    </>
  );
};

export default PanelHeader;
