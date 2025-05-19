
import React from 'react';

interface JejuInfoPanelProps {
  title?: string;
  content?: string;
}

const JejuInfoPanel: React.FC<JejuInfoPanelProps> = ({ title = "제주 정보", content = "제주도에 대한 기본 정보입니다." }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default JejuInfoPanel;
