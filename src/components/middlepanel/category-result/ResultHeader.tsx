
import React from 'react';

interface ResultHeaderProps {
  category: string;
  onClose: () => void;
}

const ResultHeader = ({ category, onClose }: ResultHeaderProps) => {
  return (
    <header className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
      <h3 className="text-lg font-semibold">{category} 추천 목록</h3>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        닫기
      </button>
    </header>
  );
};

export default ResultHeader;
