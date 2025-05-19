
import React, { useState } from 'react';
import { toast } from 'sonner';

interface ItineraryButtonProps {
  allCategoriesSelected: boolean;
  onCreateItinerary: () => boolean; // 반환 타입을 boolean으로 변경
}

const ItineraryButton: React.FC<ItineraryButtonProps> = ({
  allCategoriesSelected,
  onCreateItinerary
}) => {
  const [isCreating, setIsCreating] = useState(false);
  
  // 테스트 직접 API 호출 함수
  const testDirectFetch = async () => {
    console.log('테스트 직접 fetch 호출 시작');
    const payload = {
      selected_places: [{ id: 1536, name: "테스트 장소" }],
      candidate_places: [{ id: 10067, name: "테스트 후보 장소" }],
      start_datetime: "2025-05-20T10:00:00",
      end_datetime: "2025-05-23T18:00:00"
    };
    
    const apiUrl = `${import.meta.env.VITE_SCHEDULE_API}/generate_schedule`;
    console.log('테스트 API URL:', apiUrl);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      console.log('테스트 응답 상태:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('테스트 응답 데이터:', data);
        toast.success('테스트 API 호출 성공!');
      } else {
        const errorText = await response.text();
        console.error('테스트 응답 오류:', errorText);
        toast.error('테스트 API 호출 실패: ' + response.status);
      }
    } catch (error) {
      console.error('테스트 API 호출 오류:', error);
      toast.error('테스트 API 호출 중 오류 발생');
    }
  };
  
  const handleClick = () => {
    if (!allCategoriesSelected) {
      toast.error("모든 카테고리에서 최소 1개 이상의 장소를 선택해주세요");
      return;
    }
    
    setIsCreating(true);
    
    // 디버깅용 로그 추가
    console.log('경로 생성 버튼 클릭됨, 경로 생성 함수 호출');
    
    try {
      const result = onCreateItinerary();
      if (!result) {
        console.log('경로 생성 결과 없음');
        setIsCreating(false);
      } else {
        console.log('경로 생성 성공!', result);
        // 성공 시에는 setIsCreating(false)를 호출하지 않음
        // 일정 화면으로 전환되기 때문에 버튼이 보이지 않게 됨
      }
    } catch (error) {
      console.error('경로 생성 중 오류 발생', error);
      setIsCreating(false);
      toast.error("경로 생성 중 오류가 발생했습니다");
    }
  };

  // 디버깅을 위한 로깅 추가
  console.log('경로 생성 버튼 활성화 상태:', allCategoriesSelected);

  return (
    <>
      <div className="mt-4">
        <button
          onClick={handleClick}
          className={`w-full py-2 rounded flex items-center justify-center transition-colors ${
            isCreating 
              ? "bg-gray-500 text-white cursor-wait" 
              : allCategoriesSelected 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!allCategoriesSelected || isCreating}
        >
          {isCreating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>일정 생성 중...</span>
            </>
          ) : (
            <span className="mr-1">경로 생성</span>
          )}
        </button>
      </div>
      
      {/* 테스트 버튼 (개발 중에만 사용) */}
      <div className="mt-2">
        <button
          onClick={testDirectFetch}
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          API 테스트 호출
        </button>
      </div>
    </>
  );
};

export default ItineraryButton;
