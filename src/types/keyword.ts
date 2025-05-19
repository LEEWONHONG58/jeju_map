
export interface KeywordOption {
  eng: string;
  kr: string;
}

export interface KeywordPanelProps {
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
  directInputValue: string;
  onDirectInputChange: (value: string) => void;
  onConfirm: (finalKeywords: string[], clearSelection?: boolean) => void;
  onClose: () => void;
  categoryName: string;
  defaultKeywords: KeywordOption[];
}
