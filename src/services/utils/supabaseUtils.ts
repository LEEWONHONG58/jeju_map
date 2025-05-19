
import { supabase } from "@/lib/supabaseClient";

interface CategoryData {
  places: any[];
  links?: any[];
  categories?: any[];
  ratings?: any[];
  reviews?: any[];
}

export async function fetchCategoryData(
  informationTable: string,
  linkTable: string,
  categoryTable: string,
  ratingTable: string,
  reviewTable?: string
): Promise<CategoryData> {
  try {
    // Fetch place information
    const { data: places, error: placesError } = await supabase
      .from(informationTable as any)
      .select('*');

    if (placesError) {
      console.error(`Error fetching ${informationTable}:`, placesError);
      throw placesError;
    }

    // Fetch links
    const { data: links, error: linksError } = await supabase
      .from(linkTable as any)
      .select('*');

    if (linksError) {
      console.error(`Error fetching ${linkTable}:`, linksError);
    }

    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from(categoryTable as any)
      .select('*');

    if (categoriesError) {
      console.error(`Error fetching ${categoryTable}:`, categoriesError);
    }

    // Fetch ratings
    const { data: ratings, error: ratingsError } = await supabase
      .from(ratingTable as any)
      .select('*');

    if (ratingsError) {
      console.error(`Error fetching ${ratingTable}:`, ratingsError);
    }

    // Fetch reviews if review table is provided
    let reviews = null;
    if (reviewTable) {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from(reviewTable as any)
        .select('*');

      if (reviewsError) {
        console.error(`Error fetching ${reviewTable}:`, reviewsError);
      } else {
        reviews = reviewsData;
        console.log(`Fetched ${reviews?.length || 0} reviews from ${reviewTable}`);
      }
    }

    // Log what we found for debugging
    console.log(`Fetched data for ${informationTable}:`, {
      places: places?.length || 0,
      links: links?.length || 0,
      categories: categories?.length || 0,
      ratings: ratings?.length || 0,
      reviews: reviews?.length || 0
    });

    // Sample data debugging
    if (places?.length > 0) {
      console.log(`Sample place data:`, places[0]);
    }
    if (links?.length > 0) {
      console.log(`Sample link data:`, links[0]);
    }

    return {
      places: places || [],
      links: links || [],
      categories: categories || [],
      ratings: ratings || [],
      reviews: reviews || [],
    };
  } catch (error) {
    console.error("Error in fetchCategoryData:", error);
    return {
      places: []
    };
  }
}
