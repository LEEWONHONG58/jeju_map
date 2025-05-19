
/**
 * Naver Maps API를 동적으로 로드하는 유틸리티 함수
 */

// 네이버 API 키를 환경 변수에서 가져오기
const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID || '';

// 네이버 지도 타입 정의
// 전역 window 객체에 naver 프로퍼티 추가
declare global {
  interface Window {
    naver?: any;
    N?: any;
  }
}

// 로드 상태 추적
let isLoading = false;
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

/**
 * Naver Maps API 로드 함수
 * 
 * @returns Promise<void> - API 로드 완료 시 resolve
 */
export const loadNaverMaps = (): Promise<void> => {
  // 이미 로드되었으면 바로 resolve
  if (isLoaded && window.naver && window.naver.maps) {
    return Promise.resolve();
  }

  // 로딩 중이면 기존 promise 반환
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  // 네이버 API 키가 없으면 오류
  if (!NAVER_CLIENT_ID) {
    console.error('Naver Client ID is missing');
    return Promise.reject(new Error('Naver Client ID is missing'));
  }

  // 로딩 상태로 변경
  isLoading = true;

  // 로드 Promise 생성
  loadPromise = new Promise<void>((resolve, reject) => {
    try {
      // Script 태그 생성
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}&submodules=drawing`;
      script.async = true;

      // 로드 완료 핸들러
      script.onload = () => {
        // API가 있는지 확인
        if (window.naver && window.naver.maps) {
          console.log('Naver Maps API loaded successfully');
          isLoaded = true;
          isLoading = false;
          resolve();
        } else {
          console.error('Naver Maps API failed to initialize');
          isLoading = false;
          reject(new Error('Naver Maps API failed to initialize'));
        }
      };

      // 로드 오류 핸들러
      script.onerror = () => {
        console.error('Failed to load Naver Maps API');
        isLoading = false;
        reject(new Error('Failed to load Naver Maps API'));
      };

      // 스크립트 삽입
      document.head.appendChild(script);

      // 타임아웃 설정 (10초)
      setTimeout(() => {
        if (!isLoaded) {
          console.error('Naver Maps API load timeout');
          isLoading = false;
          reject(new Error('Naver Maps API load timeout'));
        }
      }, 10000);
    } catch (error) {
      console.error('Error loading Naver Maps:', error);
      isLoading = false;
      reject(error);
    }
  });

  return loadPromise;
};

/**
 * 네이버 지도 API가 로드되었는지 확인하는 함수
 * 
 * @returns boolean - 로드 여부
 */
export const isNaverMapsLoaded = (): boolean => {
  return isLoaded && !!window.naver && !!window.naver.maps;
};

/**
 * 네이버 지도 API 로드 상태 확인 함수
 * 
 * @returns {Object} - 로드 상태 객체
 */
export const getNaverMapsLoadState = () => {
  return {
    isLoading,
    isLoaded,
    hasAPI: !!window.naver && !!window.naver.maps
  };
};
