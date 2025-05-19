
import { useMemo } from 'react';
import { useTripDetails } from '../use-trip-details';

/**
 * 직접 입력 필드와 관련된 상태 및 핸들러를 관리하는 훅
 * @returns 직접 입력 값 및 변경 핸들러를 포함한 객체
 */
export const useInputHandlers = () => {
  const {
    accomodationDirectInput,
    setAccomodationDirectInput,
    landmarkDirectInput,
    setLandmarkDirectInput,
    restaurantDirectInput,
    setRestaurantDirectInput,
    cafeDirectInput,
    setCafeDirectInput,
  } = useTripDetails();

  // 직접 입력 값과 핸들러를 카테고리별로 그룹화
  const directInputValues = useMemo(() => ({
    accomodation: accomodationDirectInput,
    landmark: landmarkDirectInput,
    restaurant: restaurantDirectInput,
    cafe: cafeDirectInput
  }), [accomodationDirectInput, landmarkDirectInput, restaurantDirectInput, cafeDirectInput]);

  const onDirectInputChange = useMemo(() => ({
    accomodation: setAccomodationDirectInput,
    landmark: setLandmarkDirectInput,
    restaurant: setRestaurantDirectInput,
    cafe: setCafeDirectInput
  }), [setAccomodationDirectInput, setLandmarkDirectInput, setRestaurantDirectInput, setCafeDirectInput]);

  return {
    directInputValues,
    onDirectInputChange
  };
};
