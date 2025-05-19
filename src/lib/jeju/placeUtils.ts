
export * from '@/types/travel';
export * from './dbMapping';
export * from './promptParser';
export * from './weightCalculator';
export * from './interfaces';

// Explicitly re-export PlaceResult to resolve ambiguity
export type { PlaceResult } from '@/types/travel';

// Re-export functions needed by components but not already exported from other files
export { calculatePlaceScore } from './placeScoring';
export { convertToPlaceResult } from './placeScoring';

// Add a normalizeField function directly here to avoid dependency on placeNormalizer
export function normalizeField(object: any, possibleFields: string[]): any {
  if (!object) return null;

  for (const field of possibleFields) {
    if (object[field] !== undefined) {
      return object[field];
    }
  }

  return null;
}

// Ensure all IDs are numeric
export function ensureNumericId(id: string | number): number {
  if (typeof id === 'string') {
    return parseInt(id, 10);
  }
  return id;
}

// Function to truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
