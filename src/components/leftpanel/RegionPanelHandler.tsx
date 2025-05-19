
import React from 'react';
import RegionSlidePanel from '../middlepanel/RegionSlidePanel';

interface RegionPanelHandlerProps {
  open: boolean;
  onClose: () => void;
  selectedRegions: string[];
  onToggle: (region: string) => void;
  onConfirm: () => void;
}

const RegionPanelHandler: React.FC<RegionPanelHandlerProps> = ({
  open,
  onClose,
  selectedRegions,
  onToggle,
  onConfirm
}) => {
  return (
    <RegionSlidePanel
      open={open}
      onClose={onClose}
      selectedRegions={selectedRegions}
      onToggle={onToggle}
      onConfirm={onConfirm}
    />
  );
};

export default RegionPanelHandler;
