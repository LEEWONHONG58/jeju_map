
import { useState, useMemo } from 'react';

interface TripDetails {
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
}

// Utility function to format date and time into an ISO-like local string
const formatLocalDateTime = (date: Date | null, time: string): string | null => {
  if (!date || !time) return null;
  if (typeof time !== 'string') {
    console.warn(`[formatLocalDateTime] Invalid time value: ${time}. Expected string.`);
    return null;
  }
  const parts = time.split(':');
  if (parts.length !== 2) {
    console.warn(`[formatLocalDateTime] Invalid time format: ${time}. Expected HH:MM.`);
    return null;
  }
  const [hh, mm] = parts;

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}T${hh}:${mm}:00`;
};

export const useTripDetails = () => {
  const [details, setDetails] = useState<TripDetails>({
    startDate: null,
    endDate: null,
    startTime: '10:00',
    endTime: '22:00',
  });

  // 여행 기간 계산 (n박)
  const tripDuration = useMemo(() => {
    if (!details.startDate || !details.endDate) return null;
    
    const diffTime = details.endDate.getTime() - details.startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  }, [details.startDate, details.endDate]);

  // 요청사항 1, 3: 로컬 시간 기준 문자열 생성
  const startDatetimeLocal = useMemo(() => formatLocalDateTime(details.startDate, details.startTime), [details.startDate, details.startTime]);
  const endDatetimeLocal = useMemo(() => formatLocalDateTime(details.endDate, details.endTime), [details.endDate, details.endTime]);

  const setStartDate = (date: Date | null) => {
    setDetails((prev) => ({ ...prev, startDate: date }));
  };

  const setEndDate = (date: Date | null) => {
    setDetails((prev) => ({ ...prev, endDate: date }));
  };

  const setStartTime = (time: string) => {
    setDetails((prev) => ({ ...prev, startTime: time }));
  };

  const setEndTime = (time: string) => {
    setDetails((prev) => ({ ...prev, endTime: time }));
  };

  const setDates = (dates: TripDetails) => {
    setDetails(dates);
  };

  // Adding direct input state that's referenced in use-left-panel.tsx
  const [accomodationDirectInput, setAccomodationDirectInput] = useState('');
  const [landmarkDirectInput, setLandmarkDirectInput] = useState('');
  const [restaurantDirectInput, setRestaurantDirectInput] = useState('');
  const [cafeDirectInput, setCafeDirectInput] = useState('');


  return {
    startDate: details.startDate,
    endDate: details.endDate,
    startTime: details.startTime,
    endTime: details.endTime,
    tripDuration,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setDates,
    dates: details,
    startDatetime: startDatetimeLocal, // Export new local datetime string
    endDatetime: endDatetimeLocal,   // Export new local datetime string
    // Ensure old startDatetime/endDatetime are aliased or removed if no longer needed
    // For now, replacing them. If old ISOString (UTC) format is needed elsewhere, this might be a breaking change.
    // Original 'startDatetime' and 'endDatetime' (which used to be ISO UTC) are now local time strings.
    accomodationDirectInput,
    setAccomodationDirectInput,
    landmarkDirectInput,
    setLandmarkDirectInput,
    restaurantDirectInput,
    setRestaurantDirectInput,
    cafeDirectInput,
    setCafeDirectInput,
  };
};
