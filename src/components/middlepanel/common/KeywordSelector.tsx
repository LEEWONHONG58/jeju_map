
import React from 'react';
import { KeywordOption } from '@/types/keyword';

interface KeywordSelectorProps {
  keywords: KeywordOption[];
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
}

const KeywordSelector: React.FC<KeywordSelectorProps> = ({
  keywords,
  selectedKeywords,
  onToggleKeyword,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {keywords.map((keyword) => {
        const isSelected = selectedKeywords.includes(keyword.eng);
        return (
          <button
            type="button"
            key={keyword.eng}
            onClick={() => onToggleKeyword(keyword.eng)}
            className={`px-2 py-1 rounded border text-sm transition-colors duration-150 whitespace-nowrap overflow-hidden text-ellipsis ${
              isSelected
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {keyword.kr}
          </button>
        );
      })}
    </div>
  );
};

export default KeywordSelector;
