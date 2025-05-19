import React from 'react';
import DatePicker from '@/components/leftpanel/DatePicker';

interface SearchSectionProps {
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
    startTime: string;
    endTime: string;
  };
  onDatesSelected: (dates: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  }) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  dateRange,
  onDatesSelected
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 animate-fade-in">
      <h2 className="text-lg font-medium mb-4">제주도 여행 날짜 선택</h2>
      <DatePicker onDatesSelected={onDatesSelected} />
    </div>
  );
};

export default SearchSection;
