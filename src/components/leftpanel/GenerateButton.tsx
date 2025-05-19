
import React from 'react';

interface GenerateButtonProps {
  categorySelectionConfirmed: boolean;
  categoryOrder: string[];
  currentCategoryIndex: number;
  promptKeywords: string[];
  onGenerateClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  categorySelectionConfirmed,
  categoryOrder,
  currentCategoryIndex,
  promptKeywords,
  onGenerateClick
}) => {
  if (!(categorySelectionConfirmed && categoryOrder.length === 4 && currentCategoryIndex >= categoryOrder.length)) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <button
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
        onClick={onGenerateClick}
      >
        장소 생성
      </button>
    </div>
  );
};

export default GenerateButton;
