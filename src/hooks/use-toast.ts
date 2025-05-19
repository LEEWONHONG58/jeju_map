
// 재정의된 toast 훅
import { toast as sonnerToast, Toaster as SonnerToaster, type ToasterProps } from "sonner";
import * as React from "react";

export type ToastActionElement = React.ReactElement<{
  className?: string;
  altText?: string;
  onClick?: () => void;
}>;

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  duration?: number;
}

// 변환 함수: 이전 toast 형식을 sonner 형식으로 변환
const convertToSonnerProps = (props: ToastProps) => {
  const { variant, ...rest } = props;
  
  // sonner는 variant를 직접 지원하지 않으므로 타입에 따라 다른 함수 사용
  if (variant === "destructive") {
    return { ...rest, className: "destructive" };
  }
  
  return rest;
};

export const toast = (props: ToastProps | string) => {
  if (typeof props === "string") {
    return sonnerToast(props);
  }
  
  // Fix the type error by directly passing props to sonnerToast
  // sonnerToast accepts ReactNode which is more general than our specific ToastProps
  return sonnerToast(props.title || "", {
    description: props.description,
    action: props.action,
    duration: props.duration,
    className: props.variant === "destructive" ? "destructive" : undefined
  });
};

// useToast 훅은 toast 함수를 반환
export const useToast = () => {
  return {
    toast
  };
};
