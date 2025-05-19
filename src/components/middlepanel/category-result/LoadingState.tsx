
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="p-4 flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jeju-green mb-4 flex items-center justify-center">
        <Loader className="h-6 w-6 text-jeju-green" />
      </div>
      <p className="text-sm font-medium">장소 정보를 불러오는 중...</p>
      <p className="text-xs text-muted-foreground mt-2">키워드와 장소를 분석하는 데 시간이 걸릴 수 있습니다</p>
      <p className="text-xs text-muted-foreground mt-1">Supabase에서 데이터를 검색 중...</p>
      <div className="mt-3 text-xs text-jeju-green">연결 시도 중</div>
    </div>
  );
};

export default LoadingState;
