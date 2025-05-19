
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 텍스트를 지정된 길이로 자르고 필요시 말줄임표를 추가합니다.
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * 가중치(weight)를 기준으로 내림차순 정렬합니다.
 */
export function sortByWeightDescending<T extends { weight?: number | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    // weight값이 없으면 가장 뒤로
    if (a.weight === undefined || a.weight === null) return 1;
    if (b.weight === undefined || b.weight === null) return -1;
    return b.weight - a.weight;
  });
}

/**
 * 배열을 페이지 단위로 나눕니다.
 */
export function paginateArray<T>(array: T[], pageSize: number, page: number): T[] {
  const startIndex = (page - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

/**
 * 총 페이지 수를 계산합니다.
 */
export function calculateTotalPages(itemCount: number, pageSize: number): number {
  return Math.ceil(itemCount / pageSize);
}
