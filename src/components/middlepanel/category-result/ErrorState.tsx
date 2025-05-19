
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="p-4">
      <div className="bg-red-50 text-red-600 p-4 rounded flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium">데이터 연결 오류</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-1">Supabase 연결 또는 필드 매핑에 문제가 있습니다</p>
          </div>
        </div>
        
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            className="self-center mt-2"
            onClick={onRetry}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
