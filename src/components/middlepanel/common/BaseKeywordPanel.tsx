
import React, { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { KeywordPanelProps } from '@/types/keyword';
import KeywordSelector from './KeywordSelector';
import KeywordInput from './KeywordInput';
import KeywordRanking from './KeywordRanking';
import { toast } from 'sonner';

const BaseKeywordPanel: React.FC<KeywordPanelProps & { accommodationTypeUI?: React.ReactNode }> = ({
  selectedKeywords,
  onToggleKeyword,
  directInputValue,
  onDirectInputChange,
  onConfirm,
  onClose,
  categoryName,
  defaultKeywords,
  accommodationTypeUI,
}) => {
  const [ranking, setRanking] = useState<string[]>([]);
  
  // 패널이 열릴 때 이미 선택된 키워드를 우선순위로 설정하기 위한 초기화 로직
  useEffect(() => {
    // 필요 시 여기에 랭킹 정보 초기화 로직 추가 가능
  }, []);

  const addToRanking = (keyword: string) => {
    if (!ranking.includes(keyword) && ranking.length < 3) {
      setRanking([...ranking, keyword]);
    }
  };

  const removeFromRanking = (keyword: string) => {
    setRanking((prev) => prev.filter((item) => item !== keyword));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newRank = Array.from(ranking);
    const [removed] = newRank.splice(result.source.index, 1);
    newRank.splice(result.destination.index, 0, removed);
    setRanking(newRank);
  };

  const handleAddDirectInput = () => {
    if (directInputValue.trim() !== '') {
      onToggleKeyword(directInputValue.trim());
      onDirectInputChange('');
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const allKeywords: string[] = [];
    if (ranking.length > 0) {
      const rankedString = `{${ranking.join(',')}}`;
      allKeywords.push(rankedString);
    }

    const unrankedKeywords = selectedKeywords.filter((kw) => !ranking.includes(kw));
    allKeywords.push(...unrankedKeywords);

    if (directInputValue.trim() !== '') {
      allKeywords.push(directInputValue.trim());
    }

    if (allKeywords.length === 0) {
      toast.warning("키워드를 최소 1개 이상 선택해주세요.");
      return;
    }

    console.log("키워드 확인:", `${categoryName}[${allKeywords.join(',')}]`);
    
    // clearSelection을 true로 설정하여 패널을 닫고 결과를 표시하도록 합니다
    onConfirm(allKeywords, true);
    
    // 우선순위 목록 초기화
    setRanking([]);
    onDirectInputChange('');
    
    // 성공 메시지 표시
    toast.success(`${categoryName} 키워드가 적용되었습니다. 추천 결과를 확인하세요.`);
  };

  // 닫기 버튼 클릭 시 패널만 닫도록 수정
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setRanking([]);
    onDirectInputChange('');
    onClose();
  };

  return (
    <div className="fixed top-0 left-[300px] w-[300px] h-full bg-white border-l border-r border-gray-200 z-40 shadow-md p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{categoryName} 키워드 선택</h2>
        <button type="button" onClick={handleClose} className="text-sm text-blue-600 hover:underline">
          닫기
        </button>
      </div>

      {/* 숙소 유형 선택 UI - 숙소 카테고리일 때만 표시 */}
      {accommodationTypeUI}

      <KeywordSelector
        keywords={defaultKeywords}
        selectedKeywords={selectedKeywords}
        onToggleKeyword={onToggleKeyword}
      />

      <KeywordInput
        value={directInputValue}
        onChange={onDirectInputChange}
        onAdd={handleAddDirectInput}
      />

      {selectedKeywords.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">선택된 키워드 (순위 추가)</h3>
          <div className="flex flex-wrap gap-2">
            {selectedKeywords.map((kw) => {
              const item = defaultKeywords.find((i) => i.eng === kw);
              const displayText = item ? item.kr : kw;
              return (
                <div key={kw} className="flex items-center gap-1">
                  <span className="px-2 py-1 bg-gray-200 rounded text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {displayText}
                  </span>
                  {!ranking.includes(kw) && ranking.length < 3 && (
                    <button
                      type="button"
                      onClick={() => addToRanking(kw)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      순위 추가
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <KeywordRanking
        ranking={ranking}
        onDragEnd={onDragEnd}
        onRemove={removeFromRanking}
        defaultKeywords={defaultKeywords}
      />

      <button
        type="button"
        onClick={handleConfirm}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
      >
        확인
      </button>
    </div>
  );
};

export default BaseKeywordPanel;
