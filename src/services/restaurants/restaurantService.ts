
import { Place } from "@/types/supabase";
import { fetchPlaceData, processPlaceData } from "../placeService";
import { TravelCategory } from "@/types/travel";

export async function fetchRestaurants(): Promise<Place[]> {
  try {
    console.log("Fetching restaurant data...");
    
    // 음식점 데이터 조회
    const { places, ratings, categories, links, reviews } = await fetchPlaceData(
      "restaurant" as TravelCategory,
      []  // 위치 필터 없이 모든 음식점 조회
    );

    console.log(`Processing ${places.length} restaurants with:`, {
      ratings: ratings.length, 
      categories: categories.length, 
      links: links.length, 
      reviews: reviews.length
    });

    // 각 음식점에 대해 데이터 처리
    const results = places.map((info: any) => {
      // 관련 데이터 처리
      const processedData = processPlaceData(info, ratings, categories, links, reviews);
      
      // 장소 이름 및 주소 추출
      const placeName = info.place_name || "";
      const roadAddress = info.road_address || "";
      const lotAddress = info.lot_address || "";
      
      // 좌표 추출
      const longitude = parseFloat(String(info.longitude || 0));
      const latitude = parseFloat(String(info.latitude || 0));
      
      // Place 객체 생성 - 모든 필수 필드 포함
      return {
        id: typeof info.id === 'string' ? String(info.id) : String(info.id || ''),
        name: placeName,
        address: lotAddress || roadAddress || "",
        category: "restaurant",
        categoryDetail: processedData.categoryDetail,
        x: longitude,
        y: latitude,
        naverLink: processedData.naverLink || '',
        instaLink: processedData.instaLink || '',
        rating: processedData.rating || 0,
        reviewCount: processedData.reviewCount || 0,
        weight: processedData.weight || 0,
        // 필수 필드 추가
        phone: '',
        description: '',
        image_url: '',
        road_address: roadAddress || '',
        homepage: '',
        raw: {
          info,
          processedData
        }
      };
    });
    
    // 처리 결과 로깅
    if (results.length > 0) {
      console.log("Sample processed restaurant:", {
        name: results[0].name,
        rating: results[0].rating,
        reviewCount: results[0].reviewCount,
        weight: results[0].weight
      });
    }
    
    return results;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
}
