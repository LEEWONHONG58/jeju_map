
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { KeywordOption } from '@/types/keyword';

interface KeywordRankingProps {
  ranking: string[];
  onDragEnd: (result: DropResult) => void;
  onRemove: (keyword: string) => void;
  defaultKeywords: KeywordOption[];
}

const KeywordRanking: React.FC<KeywordRankingProps> = ({
  ranking,
  onDragEnd,
  onRemove,
  defaultKeywords,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold mb-2">키워드 순위 (최대 3개)</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="ranking">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col space-y-2">
              {ranking.map((kw, index) => {
                const item = defaultKeywords.find((i) => i.eng === kw);
                const displayText = item ? item.kr : kw;
                return (
                  <Draggable key={kw} draggableId={kw} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-2 p-2 border rounded border-dashed border-gray-300"
                      >
                        <span className="text-xs text-gray-500">{index + 1}순위:</span>
                        <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis">
                          {displayText}
                        </span>
                        <button
                          type="button"
                          onClick={() => onRemove(kw)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          취소
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KeywordRanking;
