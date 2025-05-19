
/**
 * Normalizes field values by checking multiple possible field names
 * 
 * @param object The object to extract value from
 * @param possibleFields Array of possible field names to check
 * @returns The value if found, or null/undefined if not found
 */
export function normalizeField(object: any, possibleFields: string[]): any {
  if (!object) return null;

  for (const field of possibleFields) {
    if (object[field] !== undefined) {
      return object[field];
    }
  }

  return null;
}

/**
 * Normalizes place fields by finding values across different field naming conventions
 * 
 * @param place The place object to normalize
 * @returns A normalized place object
 */
export function normalizePlaceFields(place: any): any {
  return {
    id: normalizeField(place, ['id', 'ID']),
    placeName: normalizeField(place, ['place_name', 'Place_Name', 'name', 'Name']),
    roadAddress: normalizeField(place, ['road_address', 'Road_Address', 'address', 'Address']),
    lotAddress: normalizeField(place, ['lot_address', 'Lot_Address']),
    longitude: parseFloat(String(normalizeField(place, ['longitude', 'Longitude', 'x', 'X']) || 0)),
    latitude: parseFloat(String(normalizeField(place, ['latitude', 'Latitude', 'y', 'Y']) || 0))
  };
}
