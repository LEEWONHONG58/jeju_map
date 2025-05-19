
import { useState } from 'react';

/**
 * 입력값 관리 훅
 */
export const useInputState = () => {
  // 직접 입력 상태 관리
  const [accommodationDirectInput, setAccommodationDirectInput] = useState('');
  const [landmarkDirectInput, setLandmarkDirectInput] = useState('');
  const [restaurantDirectInput, setRestaurantDirectInput] = useState('');
  const [cafeDirectInput, setCafeDirectInput] = useState('');

  // 직접 입력값 관리 객체
  const directInputValues = {
    'accommodation': accommodationDirectInput,
    'landmark': landmarkDirectInput,
    'restaurant': restaurantDirectInput,
    'cafe': cafeDirectInput
  };

  // 직접 입력값 변경 핸들러
  const onDirectInputChange = (category: string, value: string) => {
    switch (category) {
      case 'accommodation':
        setAccommodationDirectInput(value);
        break;
      case 'landmark':
        setLandmarkDirectInput(value);
        break;
      case 'restaurant':
        setRestaurantDirectInput(value);
        break;
      case 'cafe':
        setCafeDirectInput(value);
        break;
    }
  };

  return {
    directInputValues,
    onDirectInputChange
  };
};
