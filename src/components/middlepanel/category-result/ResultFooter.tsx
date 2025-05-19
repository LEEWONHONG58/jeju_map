import React from 'react';
import { Button } from '@/components/ui/button';

interface ResultFooterProps {
  onClose: () => void;
}

// This component is no longer used as we've consolidated the buttons
// Keep an empty implementation for now to avoid breaking imports
const ResultFooter = ({ onClose }: ResultFooterProps) => {
  return null;
};

export default ResultFooter;
