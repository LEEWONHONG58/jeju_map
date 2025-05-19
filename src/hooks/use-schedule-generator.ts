import { useCallback, useState } from 'react';
import { SchedulePayload, NewServerScheduleResponse } from '@/types/schedule';
import { toast } from 'sonner';

// mockServerResponseData import removed

// USE_MOCK_DATA constant removed

export const useScheduleGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSchedule = useCallback(async (payload: SchedulePayload): Promise<NewServerScheduleResponse | null> => {
    console.log('[use-schedule-generator] Payload for server:', payload);
    setIsGenerating(true);

    // Removed USE_MOCK_DATA block

    // 서버 호출 로직
    try {
      // VITE_SCHEDULE_API 환경 변수를 사용하고 '/generate_schedule' 경로를 추가합니다.
      const baseApiUrl = import.meta.env.VITE_SCHEDULE_API;
      if (!baseApiUrl) {
        console.error('[use-schedule-generator] VITE_SCHEDULE_API 환경 변수가 설정되지 않았습니다.');
        toast.error('API 설정 오류. 관리자에게 문의하세요.');
        setIsGenerating(false);
        return null;
      }
      const API_URL = `${baseApiUrl}/generate_schedule`;

      console.log(`[use-schedule-generator] Sending request to: ${API_URL}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('[use-schedule-generator] Response status:', response.status);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('[use-schedule-generator] Server error response:', errorData);
        } catch (e) {
          const responseText = await response.text();
          console.error('[use-schedule-generator] Failed to parse error JSON, response text:', responseText);
          // Check if responseText is HTML (often indicates a proxy or infrastructure error page)
          if (responseText.trim().startsWith('<!doctype html>') || responseText.trim().startsWith('<html')) {
            errorData = { message: `서버 연결 오류가 발생했습니다. (응답이 HTML임) Status: ${response.status}` };
          } else {
            errorData = { message: `서버 응답 오류: ${response.status}` };
          }
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: NewServerScheduleResponse = await response.json();
      console.log('[use-schedule-generator] Data from server:', data);
      toast.success('서버로부터 일정을 성공적으로 생성했습니다.');
      return data;

    } catch (error) {
      console.error('[use-schedule-generator] Error in generateSchedule:', error);
      // 실패 시 null을 반환하여 fallback 로직이 실행되도록 합니다.
      // 이 부분은 useScheduleGenerationRunner에서 이미 toast 처리를 하고 있으므로 중복을 피할 수 있습니다.
      return null;
    } finally {
      console.log('[use-schedule-generator] Entering finally block. Attempting to set isGenerating to false.');
      setIsGenerating(false);
      console.log('[use-schedule-generator] setIsGenerating called with: false');
      console.log('[use-schedule-generator] setIsGenerating(false) has been called in finally block.');
    }
  }, []);

  return { generateSchedule, isGenerating };
};