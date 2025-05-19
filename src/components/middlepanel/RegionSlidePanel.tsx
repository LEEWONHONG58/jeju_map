
// RegionSlidePanel.tsx
import React from 'react';
import RegionSelector from '../leftpanel/RegionSelector';

interface RegionSlidePanelProps {
  open: boolean;
  onClose: () => void;
  selectedRegions: string[];
  onToggle: (region: string) => void;
  onConfirm: () => void;
}

const RegionSlidePanel: React.FC<RegionSlidePanelProps> = ({
  open,
  onClose,
  selectedRegions,
  onToggle,
  onConfirm,
}) => {
  if (!open) return null; // 초기 렌더 방지

  return (
    <div
      className="absolute top-0 left-[300px] w-[300px] h-full bg-white border-l shadow-md z-40 transition-transform duration-300 ease-in-out" // z-50로 변경됨
      style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <RegionSelector
        selectedRegions={selectedRegions}
        onToggle={onToggle}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default RegionSlidePanel;
