
import { supabase } from '@/lib/supabaseClient';
import { Place } from '@/types/supabase';

export interface PlaceResult {
  id: string;
  place_name: string;
  road_address: string;
  category: string;
  x: number;
  y: number;
  rating?: number;
  visitor_review_count?: number;
  naverLink?: string;
  instaLink?: string;
}

const categoryTableMap = {
  'accommodation': 'accomodation_information',
  'landmark': 'landmark_information',
  'restaurant': 'restaurant_information',
  'cafe': 'cafe_information'
};

const categoryRatingMap = {
  'accommodation': 'accomodation_rating',
  'landmark': 'landmark_rating',
  'restaurant': 'restaurant_rating',
  'cafe': 'cafe_rating'
};

const categoryLinkMap = {
  'accommodation': 'accomodation_link',
  'landmark': 'landmark_link',
  'restaurant': 'restaurant_link',
  'cafe': 'cafe_link'
};

// Helper function to parse rating value properly
const parseRatingValue = (rating: any): number => {
  if (typeof rating === 'number') return rating;
  if (typeof rating === 'string') {
    const parsed = parseFloat(rating);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Helper function to normalize field access regardless of case
const getFieldValue = (obj: any, fieldName: string): any => {
  // Try exact match first
  if (obj[fieldName] !== undefined) return obj[fieldName];
  
  // Try case-insensitive match
  const lowerFieldName = fieldName.toLowerCase();
  for (const key of Object.keys(obj)) {
    if (key.toLowerCase() === lowerFieldName) {
      return obj[key];
    }
  }
  
  return undefined;
};

// 여러 필드 이름 가능성을 검색하는 확장된 필드 조회 함수
const tryGetField = (obj: any, fieldNames: string[]): any => {
  for (const name of fieldNames) {
    const value = getFieldValue(obj, name);
    if (value !== undefined) return value;
  }
  return undefined;
};

export async function fetchWeightedResults(
  category: 'accommodation' | 'landmark' | 'restaurant' | 'cafe', 
  locations: string[], 
  keywords: string[]
): Promise<PlaceResult[]> {
  console.log(`Fetching ${category} data for locations: ${locations.join(', ')}`);
  console.log(`With keywords: ${keywords.join(', ')}`);
  
  try {
    // Basic query for information table
    let query = supabase
      .from(categoryTableMap[category])
      .select('*');

    // Filter by locations if provided
    if (locations.length > 0) {
      query = query.in('location', locations);
    }

    const { data: places, error: placesError } = await query;

    if (placesError) {
      console.error(`${category} places fetch error:`, placesError);
      return [];
    }

    console.log(`Found ${places?.length || 0} ${category} places`);
    
    if (!places || places.length === 0) {
      return [];
    }

    // Determine the ID field name based on the category and first entry
    const idField = determineIdFieldName(places[0]);
    console.log(`Using ID field: ${idField} for ${category}`);

    // Extract all place IDs - handle both string and number types
    const placeIds = places.map(p => {
      const id = getFieldValue(p, idField);
      return id !== undefined ? String(id) : null;
    }).filter(Boolean);
    
    // Fetch ratings - try both uppercase and lowercase table names
    let ratings = [];
    let ratingsError = null;
    
    try {
      const result = await supabase
        .from(categoryRatingMap[category])
        .select('*');
        
      if (result.error) {
        console.warn(`Error fetching from ${categoryRatingMap[category]}, trying uppercase...`);
        const uppercaseResult = await supabase
          .from(categoryRatingMap[category].toUpperCase())
          .select('*');
          
        if (uppercaseResult.error) {
          ratingsError = uppercaseResult.error;
        } else {
          ratings = uppercaseResult.data || [];
        }
      } else {
        ratings = result.data || [];
      }
    } catch (e) {
      console.error('Rating fetch error:', e);
      ratingsError = e;
    }

    if (ratingsError) {
      console.error(`${category} ratings fetch error:`, ratingsError);
      console.log('Continuing without ratings data');
    } else {
      console.log(`Successfully fetched ${ratings?.length || 0} ratings entries`);
      if (ratings && ratings.length > 0) {
        console.log('Sample rating entry:', ratings[0]);
        console.log('Rating fields:', Object.keys(ratings[0]));
      }
    }

    // Fetch links - use multiple possible table names
    let links = [];
    let linksError = null;
    
    try {
      const result = await supabase
        .from(categoryLinkMap[category])
        .select('*');
        
      if (result.error) {
        console.warn(`Error fetching from ${categoryLinkMap[category]}, trying alternatives...`);
        const altTable = `${category}_links`;
        const altResult = await supabase
          .from(altTable)
          .select('*');
          
        if (altResult.error) {
          linksError = altResult.error;
        } else {
          links = altResult.data || [];
        }
      } else {
        links = result.data || [];
      }
    } catch (e) {
      console.error('Links fetch error:', e);
      linksError = e;
    }

    if (linksError) {
      console.error(`${category} links fetch error:`, linksError);
      console.log('Continuing without link data');
    } else {
      console.log(`Successfully fetched ${links?.length || 0} link entries`);
      if (links && links.length > 0) {
        console.log('Sample link entry:', links[0]);
        console.log('Link fields:', Object.keys(links[0]));
      }
    }

    // Merge places with ratings and links
    const placesWithData = places.map(place => {
      const placeId = getFieldValue(place, idField);
      if (!placeId) {
        console.log('Warning: Place without ID found', place);
        return null;
      }
      
      // Find rating for this place by matching ID regardless of case
      const rating = ratings?.find(r => {
        // Try multiple ID field variations
        const ratingIdOptions = [idField, idField.toLowerCase(), idField.toUpperCase(), 'id', 'ID', 'Id'];
        for (const idOpt of ratingIdOptions) {
          const ratingId = getFieldValue(r, idOpt);
          if (ratingId !== undefined && String(ratingId) === String(placeId)) {
            return true;
          }
        }
        return false;
      });

      // Find link for this place by matching ID regardless of case
      const link = links?.find(l => {
        // Try multiple ID field variations
        const linkIdOptions = [idField, idField.toLowerCase(), idField.toUpperCase(), 'id', 'ID', 'Id'];
        for (const idOpt of linkIdOptions) {
          const linkId = getFieldValue(l, idOpt);
          if (linkId !== undefined && String(linkId) === String(placeId)) {
            return true;
          }
        }
        return false;
      });
      
      // Debug log
      if (rating) {
        console.log(`Found rating for place ID ${placeId}:`, {
          rating: tryGetField(rating, ['rating', 'Rating', 'RATING']),
          reviews: tryGetField(rating, ['visitor_review_count', 'Visitor_Review_Count', 'review_count', 'Review_Count'])
        });
      } else {
        console.log(`No rating found for place ID ${placeId}`);
      }
      
      // Extract road address and lot address, handling different field naming cases
      const roadAddressFields = ['Road_Address', 'road_address', 'ROAD_ADDRESS', 'roadAddress'];
      const lotAddressFields = ['Lot_Address', 'lot_address', 'LOT_ADDRESS', 'lotAddress'];
      
      const roadAddress = tryGetField(place, roadAddressFields);
      const lotAddress = tryGetField(place, lotAddressFields);
      const address = roadAddress || lotAddress || '';
      
      // Extract place name, handling different field naming cases
      const placeNameFields = ['Place_Name', 'place_name', 'PLACE_NAME', 'placeName', 'name', 'Name'];
      const placeName = tryGetField(place, placeNameFields) || '';
      
      // Extract longitude and latitude, handling different field naming cases
      const longitudeFields = ['Longitude', 'longitude', 'LONGITUDE', 'lng', 'x', 'X'];
      const latitudeFields = ['Latitude', 'latitude', 'LATITUDE', 'lat', 'y', 'Y'];
      
      const longitude = parseFloat(String(tryGetField(place, longitudeFields) || 0));
      const latitude = parseFloat(String(tryGetField(place, latitudeFields) || 0));

      // Extract rating and visitor_review_count, handling different field naming cases
      let ratingValue = null;
      let visitorReviewCount = null;
      
      if (rating) {
        const ratingFields = ['Rating', 'rating', 'RATING', 'rate', 'Rate'];
        const reviewCountFields = [
          'visitor_review_count', 'Visitor_Review_Count', 'VISITOR_REVIEW_COUNT', 
          'review_count', 'Review_Count', 'REVIEW_COUNT', 
          'reviews', 'Reviews', 'reviewCount'
        ];
        
        ratingValue = tryGetField(rating, ratingFields);
        visitorReviewCount = tryGetField(rating, reviewCountFields);
        
        // Direct debug of rating data
        console.log(`Rating data for ${placeId}:`, { 
          raw_rating: rating,
          extracted_rating: ratingValue,
          extracted_reviews: visitorReviewCount
        });
      } else {
        // Check if rating fields are in the place object itself (some datasets structure it this way)
        const ratingFields = ['Rating', 'rating', 'RATING', 'rate', 'Rate'];
        const reviewCountFields = [
          'visitor_review_count', 'Visitor_Review_Count', 'VISITOR_REVIEW_COUNT', 
          'review_count', 'Review_Count', 'REVIEW_COUNT',
          'reviews', 'Reviews', 'reviewCount'
        ];
        
        ratingValue = tryGetField(place, ratingFields);
        visitorReviewCount = tryGetField(place, reviewCountFields);
      }

      // Extract links, handling different field naming cases
      let naverLink = '';
      let instaLink = '';
      
      if (link) {
        const naverLinkFields = ['link', 'Link', 'naver_link', 'Naver_Link', 'naverLink'];
        const instaLinkFields = ['instagram', 'Instagram', 'insta_link', 'Insta_Link', 'instaLink'];
        
        naverLink = tryGetField(link, naverLinkFields) || '';
        instaLink = tryGetField(link, instaLinkFields) || '';
      }

      // Calculate basic weight (will be refined further)
      const weight = 0.5; // Default weight

      // Do not return places without valid coordinates
      if (!longitude || !latitude) {
        console.log(`Skipping place ${placeId} - missing coordinates`);
        return null;
      }

      return {
        id: placeId.toString(),
        place_name: placeName,
        road_address: address,
        category: category,
        x: longitude,
        y: latitude,
        rating: parseRatingValue(ratingValue),
        visitor_review_count: visitorReviewCount ? parseInt(String(visitorReviewCount)) : undefined,
        naverLink: naverLink,
        instaLink: instaLink,
        weight: weight // Basic weight for now
      };
    }).filter(Boolean); // Filter out null entries

    console.log(`Successfully processed ${placesWithData.length} ${category} places`);
    
    // Add final logging for verification
    if (placesWithData.length > 0) {
      console.log('Sample processed place data:', placesWithData[0]);
      
      // Log rating availability statistics
      const withRating = placesWithData.filter(p => p.rating !== undefined && p.rating > 0).length;
      const withReviews = placesWithData.filter(p => p.visitor_review_count !== undefined && p.visitor_review_count > 0).length;
      
      console.log(`Places with ratings: ${withRating}/${placesWithData.length} (${(withRating/placesWithData.length*100).toFixed(1)}%)`);
      console.log(`Places with review counts: ${withReviews}/${placesWithData.length} (${(withReviews/placesWithData.length*100).toFixed(1)}%)`);
    }
    
    return placesWithData as PlaceResult[];
  } catch (error) {
    console.error(`Error in fetchWeightedResults for ${category}:`, error);
    return [];
  }
}

// Helper function to determine ID field name
function determineIdFieldName(sampleObject: any): string {
  // Check for common ID field patterns
  const possibleFields = ['ID', 'id', 'Id', 'place_id', 'Place_ID'];
  
  for (const field of possibleFields) {
    if (sampleObject[field] !== undefined) return field;
  }
  
  // Fallback: try to find any field that contains "id" 
  for (const key of Object.keys(sampleObject)) {
    if (key.toLowerCase().includes('id')) {
      return key;
    }
  }
  
  // Default to 'id' if nothing else found
  console.warn('Could not determine ID field, defaulting to "id"');
  return 'id';
}
