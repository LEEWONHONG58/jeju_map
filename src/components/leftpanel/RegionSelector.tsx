import React from 'react';

interface RegionSelectorProps {
  selectedRegions: string[];
  onToggle: (region: string) => void;
  onClose: () => void;
  onConfirm: (groupedRegion: string) => void; // 그룹화된 지역 문자열을 전달
}

const REGION_GROUPS = [
  {
    title: '제주시',
    regions: ['제주시내', '애월', '조천', '구좌', '한경/한림'],
  },
  {
    title: '서귀포시',
    regions: ['서귀포시내', '중문', '안덕/대정', '남원/표선', '성산'],
  },
];

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegions,
  onToggle,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="space-y-6 p-4 bg-white border rounded-md shadow-inner">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-md font-semibold">지역 선택</h2>
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">
          닫기
        </button>
      </div>

      <p className="text-xs text-gray-500 mb-4">중복 선택 가능</p>

      {REGION_GROUPS.map((group) => (
        <div key={group.title}>
          <h4 className="text-xs font-medium text-gray-500 mb-1">{group.title}</h4>
          <div className="flex flex-col gap-1">
            {group.regions.map((region) => {
              const isSelected = selectedRegions.includes(region);
              return (
                <button
                  key={region}
                  onClick={() => onToggle(region)}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded border transition ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-end pt-2">
        <button
          onClick={() => {
            if (selectedRegions.length > 0) {
              // 그룹화된 지역 문자열 생성: "지역[지역1,지역2,...]"
              const groupedRegion = `지역[${selectedRegions.join(',')}]`;
              onConfirm(groupedRegion);
            } else {
              alert('지역을 선택해주세요.');
            }
          }}
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-xs"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default RegionSelector;
