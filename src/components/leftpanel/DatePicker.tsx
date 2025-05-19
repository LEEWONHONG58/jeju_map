//DatePicker.tsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface DatePickerProps {
  onDatesSelected: (dates: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  }) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDatesSelected }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>('10:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [open, setOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  useEffect(() => {
    setCurrentDateTime(new Date());
  }, []);

  const isDateTimeInPast = (date: Date, time: string): boolean => {
    if (!date) return false;
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    return selectedDateTime < currentDateTime;
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      toast.error('출발일과 도착일을 모두 선택해주세요');
      return;
    }
    if (endDate < startDate) {
      toast.error('도착일은 출발일 이후여야 합니다');
      return;
    }
    if (isDateTimeInPast(startDate, startTime)) {
      toast.error('과거 시간은 선택할 수 없습니다');
      return;
    }
    onDatesSelected({ startDate, endDate, startTime, endTime });
    setOpen(false);
    toast.success('일정이 설정되었습니다');
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      options.push(`${formattedHour}:00`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const formatDateRange = () => {
    if (startDate && endDate) {
      return (
        <div className="flex flex-col">
          <span>시작: {format(startDate, 'yyyy.MM.dd')} {startTime}</span>
          <span>종료: {format(endDate, 'yyyy.MM.dd')} {endTime}</span>
        </div>
      );
    }
    return '날짜 선택';
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full h-12 justify-between border-blue-300 bg-blue-50">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-blue-500 shrink-0" />
            <span className={cn("text-sm", (!startDate || !endDate) ? "text-gray-400" : "text-blue-800")}>
              {formatDateRange()}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass-panel" align="start">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">출발일</Label>
              <div className="border rounded-md overflow-hidden">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} disabled={isPastDate} initialFocus className="p-3 pointer-events-auto" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">도착일</Label>
              <div className="border rounded-md overflow-hidden">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} disabled={isPastDate} initialFocus className="p-3 pointer-events-auto" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">도착 비행기 시간</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger id="start-time">
                  <SelectValue placeholder="시작 시간" />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-60">
                  {timeOptions.map((time) => (
                    <SelectItem key={`start-${time}`} value={time} disabled={startDate && isDateTimeInPast(startDate, time)}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">돌아가는 비행기 시간</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger id="end-time">
                  <SelectValue placeholder="종료 시간" />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-60">
                  {timeOptions.map((time) => (
                    <SelectItem key={`end-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleConfirm}>확인</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
