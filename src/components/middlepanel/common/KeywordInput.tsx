
import React, { KeyboardEvent } from 'react';

interface KeywordInputProps {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ value, onChange, onAdd }) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
      onAdd();
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">직접 입력</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="키워드를 입력하세요"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={value.trim() === ''}
          className={`px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs ${
            value.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default KeywordInput;
