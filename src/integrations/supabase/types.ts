export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accommodation_categories: {
        Row: {
          categories: string | null
          categories_details: string | null
          id: number
        }
        Insert: {
          categories?: string | null
          categories_details?: string | null
          id: number
        }
        Update: {
          categories?: string | null
          categories_details?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "accomodation_categories_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodation_information"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_information: {
        Row: {
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          lot_address: string | null
          near_dist: number | null
          near_fid: number | null
          place_name: string | null
          road_address: string | null
        }
        Insert: {
          id: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
        }
        Update: {
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
        }
        Relationships: []
      }
      accommodation_link: {
        Row: {
          id: number
          instagram: string | null
          link: string | null
        }
        Insert: {
          id: number
          instagram?: string | null
          link?: string | null
        }
        Update: {
          id?: number
          instagram?: string | null
          link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accomodation_link_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodation_information"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_rating: {
        Row: {
          blog_review_count: number | null
          id: number
          rating: number | null
          visitor_norm: number | null
          visitor_review_count: number | null
        }
        Insert: {
          blog_review_count?: number | null
          id: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Update: {
          blog_review_count?: number | null
          id?: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accomodation_rating_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodation_information"
            referencedColumns: ["id"]
          },
        ]
      }
      accommodation_review: {
        Row: {
          cleanliness: number | null
          convenient_public_transport: number | null
          easy_parking: number | null
          good_aircon_heating: number | null
          good_bedding: number | null
          good_breakfast: number | null
          good_for_staycation: number | null
          good_for_water_play: number | null
          good_soundproofing: number | null
          good_value_for_money: number | null
          good_view: number | null
          hot_water: number | null
          id: number
          kind_service: number | null
          location: string | null
          many_activities: number | null
          many_places_nearby: number | null
          no_bugs: number | null
          photo_spot: number | null
          quiet_and_relax: number | null
          secure_facilities: number | null
          stylish_interior: number | null
          unique_concept: number | null
          visitor_norm: number | null
          well_equipped_bathroom: number | null
          well_maintained_facilities: number | null
          worth_the_price: number | null
        }
        Insert: {
          cleanliness?: number | null
          convenient_public_transport?: number | null
          easy_parking?: number | null
          good_aircon_heating?: number | null
          good_bedding?: number | null
          good_breakfast?: number | null
          good_for_staycation?: number | null
          good_for_water_play?: number | null
          good_soundproofing?: number | null
          good_value_for_money?: number | null
          good_view?: number | null
          hot_water?: number | null
          id: number
          kind_service?: number | null
          location?: string | null
          many_activities?: number | null
          many_places_nearby?: number | null
          no_bugs?: number | null
          photo_spot?: number | null
          quiet_and_relax?: number | null
          secure_facilities?: number | null
          stylish_interior?: number | null
          unique_concept?: number | null
          visitor_norm?: number | null
          well_equipped_bathroom?: number | null
          well_maintained_facilities?: number | null
          worth_the_price?: number | null
        }
        Update: {
          cleanliness?: number | null
          convenient_public_transport?: number | null
          easy_parking?: number | null
          good_aircon_heating?: number | null
          good_bedding?: number | null
          good_breakfast?: number | null
          good_for_staycation?: number | null
          good_for_water_play?: number | null
          good_soundproofing?: number | null
          good_value_for_money?: number | null
          good_view?: number | null
          hot_water?: number | null
          id?: number
          kind_service?: number | null
          location?: string | null
          many_activities?: number | null
          many_places_nearby?: number | null
          no_bugs?: number | null
          photo_spot?: number | null
          quiet_and_relax?: number | null
          secure_facilities?: number | null
          stylish_interior?: number | null
          unique_concept?: number | null
          visitor_norm?: number | null
          well_equipped_bathroom?: number | null
          well_maintained_facilities?: number | null
          worth_the_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "accomodation_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "accommodation_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_categories: {
        Row: {
          categories: string | null
          categories_details: string | null
          id: number
          place_name: string | null
        }
        Insert: {
          categories?: string | null
          categories_details?: string | null
          id: number
          place_name?: string | null
        }
        Update: {
          categories?: string | null
          categories_details?: string | null
          id?: number
          place_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_categories_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_information: {
        Row: {
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          lot_address: string | null
          near_dist: number | null
          near_fid: number | null
          place_name: string | null
          road_address: string | null
          stay_time: number | null
        }
        Insert: {
          id: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Update: {
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Relationships: []
      }
      cafe_link: {
        Row: {
          id: number
          instagram: string | null
          link: string | null
        }
        Insert: {
          id: number
          instagram?: string | null
          link?: string | null
        }
        Update: {
          id?: number
          instagram?: string | null
          link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_link_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_openinghours_logical: {
        Row: {
          Fri_09: string | null
          Fri_10: string | null
          Fri_11: string | null
          Fri_12: string | null
          Fri_13: string | null
          Fri_14: string | null
          Fri_15: string | null
          Fri_16: string | null
          Fri_17: string | null
          Fri_18: string | null
          Fri_19: string | null
          Fri_20: string | null
          Fri_21: string | null
          id: number
          Mon_09: string | null
          Mon_10: string | null
          Mon_11: string | null
          Mon_12: string | null
          Mon_13: string | null
          Mon_14: string | null
          Mon_15: string | null
          Mon_16: string | null
          Mon_17: string | null
          Mon_18: string | null
          Mon_19: string | null
          Mon_20: string | null
          Mon_21: string | null
          Sat_09: string | null
          Sat_10: string | null
          Sat_11: string | null
          Sat_12: string | null
          Sat_13: string | null
          Sat_14: string | null
          Sat_15: string | null
          Sat_16: string | null
          Sat_17: string | null
          Sat_18: string | null
          Sat_19: string | null
          Sat_20: string | null
          Sat_21: string | null
          Sun_09: string | null
          Sun_10: string | null
          Sun_11: string | null
          Sun_12: string | null
          Sun_13: string | null
          Sun_14: string | null
          Sun_15: string | null
          Sun_16: string | null
          Sun_17: string | null
          Sun_18: string | null
          Sun_19: string | null
          Sun_20: string | null
          Sun_21: string | null
          Thu_09: string | null
          Thu_10: string | null
          Thu_11: string | null
          Thu_12: string | null
          Thu_13: string | null
          Thu_14: string | null
          Thu_15: string | null
          Thu_16: string | null
          Thu_17: string | null
          Thu_18: string | null
          Thu_19: string | null
          Thu_20: string | null
          Thu_21: string | null
          Tue_09: string | null
          Tue_10: string | null
          Tue_11: string | null
          Tue_12: string | null
          Tue_13: string | null
          Tue_14: string | null
          Tue_15: string | null
          Tue_16: string | null
          Tue_17: string | null
          Tue_18: string | null
          Tue_19: string | null
          Tue_20: string | null
          Tue_21: string | null
          Wed_09: string | null
          Wed_10: string | null
          Wed_11: string | null
          Wed_12: string | null
          Wed_13: string | null
          Wed_14: string | null
          Wed_15: string | null
          Wed_16: string | null
          Wed_17: string | null
          Wed_18: string | null
          Wed_19: string | null
          Wed_20: string | null
          Wed_21: string | null
        }
        Insert: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Update: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id?: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_openinghours_logical_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_openinghours_note: {
        Row: {
          id: number
          note: string | null
        }
        Insert: {
          id: number
          note?: string | null
        }
        Update: {
          id?: number
          note?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_openinghours_note_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_rating: {
        Row: {
          blog_review_count: number | null
          id: number
          rating: number | null
          visitor_norm: number | null
          visitor_review_count: number | null
        }
        Insert: {
          blog_review_count?: number | null
          id: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Update: {
          blog_review_count?: number | null
          id?: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_rating_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      cafe_review: {
        Row: {
          Calm_atmosphere: number | null
          Clean_restrooms: number | null
          Clean_store: number | null
          Comfortable_seating: number | null
          Cozy: number | null
          Delicious_bread: number | null
          Delicious_coffee: number | null
          Delicious_desserts: number | null
          Delicious_food: number | null
          Easy_parking: number | null
          Fast_service: number | null
          Fresh_ingredients: number | null
          Friendly: number | null
          Good_for_conversation: number | null
          Good_for_families_with_kids: number | null
          Good_for_focus: number | null
          Good_for_long_stays: number | null
          Good_for_photos: number | null
          Good_for_solo_dining: number | null
          Good_value_for_money: number | null
          Great_for_gifting: number | null
          Great_for_special_occasions: number | null
          Great_outdoor_space: number | null
          Healthy_taste: number | null
          id: number
          Large_portions: number | null
          location: string | null
          Nice_music: number | null
          Nice_view: number | null
          Pet_friendly: number | null
          Spacious_store: number | null
          Special_menu_available: number | null
          Stylish_interior: number | null
          Tasty_drinks: number | null
          Unique_concept: number | null
          Variety_of_options: number | null
          visitor_norm: number | null
          Well_curated_menu: number | null
          Worth_the_price: number | null
        }
        Insert: {
          Calm_atmosphere?: number | null
          Clean_restrooms?: number | null
          Clean_store?: number | null
          Comfortable_seating?: number | null
          Cozy?: number | null
          Delicious_bread?: number | null
          Delicious_coffee?: number | null
          Delicious_desserts?: number | null
          Delicious_food?: number | null
          Easy_parking?: number | null
          Fast_service?: number | null
          Fresh_ingredients?: number | null
          Friendly?: number | null
          Good_for_conversation?: number | null
          Good_for_families_with_kids?: number | null
          Good_for_focus?: number | null
          Good_for_long_stays?: number | null
          Good_for_photos?: number | null
          Good_for_solo_dining?: number | null
          Good_value_for_money?: number | null
          Great_for_gifting?: number | null
          Great_for_special_occasions?: number | null
          Great_outdoor_space?: number | null
          Healthy_taste?: number | null
          id: number
          Large_portions?: number | null
          location?: string | null
          Nice_music?: number | null
          Nice_view?: number | null
          Pet_friendly?: number | null
          Spacious_store?: number | null
          Special_menu_available?: number | null
          Stylish_interior?: number | null
          Tasty_drinks?: number | null
          Unique_concept?: number | null
          Variety_of_options?: number | null
          visitor_norm?: number | null
          Well_curated_menu?: number | null
          Worth_the_price?: number | null
        }
        Update: {
          Calm_atmosphere?: number | null
          Clean_restrooms?: number | null
          Clean_store?: number | null
          Comfortable_seating?: number | null
          Cozy?: number | null
          Delicious_bread?: number | null
          Delicious_coffee?: number | null
          Delicious_desserts?: number | null
          Delicious_food?: number | null
          Easy_parking?: number | null
          Fast_service?: number | null
          Fresh_ingredients?: number | null
          Friendly?: number | null
          Good_for_conversation?: number | null
          Good_for_families_with_kids?: number | null
          Good_for_focus?: number | null
          Good_for_long_stays?: number | null
          Good_for_photos?: number | null
          Good_for_solo_dining?: number | null
          Good_value_for_money?: number | null
          Great_for_gifting?: number | null
          Great_for_special_occasions?: number | null
          Great_outdoor_space?: number | null
          Healthy_taste?: number | null
          id?: number
          Large_portions?: number | null
          location?: string | null
          Nice_music?: number | null
          Nice_view?: number | null
          Pet_friendly?: number | null
          Spacious_store?: number | null
          Special_menu_available?: number | null
          Stylish_interior?: number | null
          Tasty_drinks?: number | null
          Unique_concept?: number | null
          Variety_of_options?: number | null
          visitor_norm?: number | null
          Well_curated_menu?: number | null
          Worth_the_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cafe_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "cafe_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_categories: {
        Row: {
          categories: string | null
          categories_details: string | null
          id: number
        }
        Insert: {
          categories?: string | null
          categories_details?: string | null
          id: number
        }
        Update: {
          categories?: string | null
          categories_details?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "landmark_categories_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_information: {
        Row: {
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          lot_address: string | null
          near_dist: number | null
          near_fid: number | null
          place_name: string | null
          road_address: string | null
          stay_time: number | null
        }
        Insert: {
          id: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Update: {
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Relationships: []
      }
      landmark_link: {
        Row: {
          id: number
          instagram: string | null
          link: string | null
        }
        Insert: {
          id: number
          instagram?: string | null
          link?: string | null
        }
        Update: {
          id?: number
          instagram?: string | null
          link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landmark_link_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_openinghours_logical: {
        Row: {
          Fri_09: string | null
          Fri_10: string | null
          Fri_11: string | null
          Fri_12: string | null
          Fri_13: string | null
          Fri_14: string | null
          Fri_15: string | null
          Fri_16: string | null
          Fri_17: string | null
          Fri_18: string | null
          Fri_19: string | null
          Fri_20: string | null
          Fri_21: string | null
          id: number
          Mon_09: string | null
          Mon_10: string | null
          Mon_11: string | null
          Mon_12: string | null
          Mon_13: string | null
          Mon_14: string | null
          Mon_15: string | null
          Mon_16: string | null
          Mon_17: string | null
          Mon_18: string | null
          Mon_19: string | null
          Mon_20: string | null
          Mon_21: string | null
          Sat_09: string | null
          Sat_10: string | null
          Sat_11: string | null
          Sat_12: string | null
          Sat_13: string | null
          Sat_14: string | null
          Sat_15: string | null
          Sat_16: string | null
          Sat_17: string | null
          Sat_18: string | null
          Sat_19: string | null
          Sat_20: string | null
          Sat_21: string | null
          Sun_09: string | null
          Sun_10: string | null
          Sun_11: string | null
          Sun_12: string | null
          Sun_13: string | null
          Sun_14: string | null
          Sun_15: string | null
          Sun_16: string | null
          Sun_17: string | null
          Sun_18: string | null
          Sun_19: string | null
          Sun_20: string | null
          Sun_21: string | null
          Thu_09: string | null
          Thu_10: string | null
          Thu_11: string | null
          Thu_12: string | null
          Thu_13: string | null
          Thu_14: string | null
          Thu_15: string | null
          Thu_16: string | null
          Thu_17: string | null
          Thu_18: string | null
          Thu_19: string | null
          Thu_20: string | null
          Thu_21: string | null
          Tue_09: string | null
          Tue_10: string | null
          Tue_11: string | null
          Tue_12: string | null
          Tue_13: string | null
          Tue_14: string | null
          Tue_15: string | null
          Tue_16: string | null
          Tue_17: string | null
          Tue_18: string | null
          Tue_19: string | null
          Tue_20: string | null
          Tue_21: string | null
          Wed_09: string | null
          Wed_10: string | null
          Wed_11: string | null
          Wed_12: string | null
          Wed_13: string | null
          Wed_14: string | null
          Wed_15: string | null
          Wed_16: string | null
          Wed_17: string | null
          Wed_18: string | null
          Wed_19: string | null
          Wed_20: string | null
          Wed_21: string | null
        }
        Insert: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Update: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id?: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landmark_openinghours_logical_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_openinghours_note: {
        Row: {
          id: number
          notes: string | null
        }
        Insert: {
          id: number
          notes?: string | null
        }
        Update: {
          id?: number
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "landmark_openinghours_note_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_rating: {
        Row: {
          blog_review_count: number | null
          id: number
          rating: string | null
          visitor_norm: number | null
          visitor_review_count: number | null
        }
        Insert: {
          blog_review_count?: number | null
          id: number
          rating?: string | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Update: {
          blog_review_count?: number | null
          id?: number
          rating?: string | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "landmark_rating_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      landmark_review: {
        Row: {
          Beautiful_Natural_Scenery: number | null
          Clean_Restrooms: number | null
          Convenient_Public_Transport: number | null
          Diverse_Experience_Programs: number | null
          Easy_Parking: number | null
          Easy_Reservation: number | null
          Friendly_Staff: number | null
          Great_for_Picnics: number | null
          Great_for_Water_Activities: number | null
          Great_View: number | null
          High_Visitor_Traffic: number | null
          id: number
          Ideal_for_Relaxation: number | null
          Informative: number | null
          Interesting_Exhibition_Themes: number | null
          Kid_Friendly: number | null
          Large_Scale: number | null
          location: string | null
          Long_Course: number | null
          Many_Attractions: number | null
          Not_Crowded: number | null
          Pet_Friendly: number | null
          Photogenic_Spot: number | null
          Rare_and_Unique_Plants: number | null
          Reasonable_Pricing: number | null
          Spacious_Area: number | null
          Stylish_Interior: number | null
          Unique_Concept: number | null
          Unique_Scenery: number | null
          Variety_of_Rides: number | null
          visitor_norm: number | null
          Well_Equipped_Facilities: number | null
          Well_Explained_Information: number | null
          Well_Kept_Facilities: number | null
          Well_Maintained: number | null
          Well_Maintained_Animals: number | null
          Well_Maintained_Walking_Trails: number | null
          Well_Organized_Exhibitions: number | null
          Well_Structured_Programs: number | null
        }
        Insert: {
          Beautiful_Natural_Scenery?: number | null
          Clean_Restrooms?: number | null
          Convenient_Public_Transport?: number | null
          Diverse_Experience_Programs?: number | null
          Easy_Parking?: number | null
          Easy_Reservation?: number | null
          Friendly_Staff?: number | null
          Great_for_Picnics?: number | null
          Great_for_Water_Activities?: number | null
          Great_View?: number | null
          High_Visitor_Traffic?: number | null
          id: number
          Ideal_for_Relaxation?: number | null
          Informative?: number | null
          Interesting_Exhibition_Themes?: number | null
          Kid_Friendly?: number | null
          Large_Scale?: number | null
          location?: string | null
          Long_Course?: number | null
          Many_Attractions?: number | null
          Not_Crowded?: number | null
          Pet_Friendly?: number | null
          Photogenic_Spot?: number | null
          Rare_and_Unique_Plants?: number | null
          Reasonable_Pricing?: number | null
          Spacious_Area?: number | null
          Stylish_Interior?: number | null
          Unique_Concept?: number | null
          Unique_Scenery?: number | null
          Variety_of_Rides?: number | null
          visitor_norm?: number | null
          Well_Equipped_Facilities?: number | null
          Well_Explained_Information?: number | null
          Well_Kept_Facilities?: number | null
          Well_Maintained?: number | null
          Well_Maintained_Animals?: number | null
          Well_Maintained_Walking_Trails?: number | null
          Well_Organized_Exhibitions?: number | null
          Well_Structured_Programs?: number | null
        }
        Update: {
          Beautiful_Natural_Scenery?: number | null
          Clean_Restrooms?: number | null
          Convenient_Public_Transport?: number | null
          Diverse_Experience_Programs?: number | null
          Easy_Parking?: number | null
          Easy_Reservation?: number | null
          Friendly_Staff?: number | null
          Great_for_Picnics?: number | null
          Great_for_Water_Activities?: number | null
          Great_View?: number | null
          High_Visitor_Traffic?: number | null
          id?: number
          Ideal_for_Relaxation?: number | null
          Informative?: number | null
          Interesting_Exhibition_Themes?: number | null
          Kid_Friendly?: number | null
          Large_Scale?: number | null
          location?: string | null
          Long_Course?: number | null
          Many_Attractions?: number | null
          Not_Crowded?: number | null
          Pet_Friendly?: number | null
          Photogenic_Spot?: number | null
          Rare_and_Unique_Plants?: number | null
          Reasonable_Pricing?: number | null
          Spacious_Area?: number | null
          Stylish_Interior?: number | null
          Unique_Concept?: number | null
          Unique_Scenery?: number | null
          Variety_of_Rides?: number | null
          visitor_norm?: number | null
          Well_Equipped_Facilities?: number | null
          Well_Explained_Information?: number | null
          Well_Kept_Facilities?: number | null
          Well_Maintained?: number | null
          Well_Maintained_Animals?: number | null
          Well_Maintained_Walking_Trails?: number | null
          Well_Organized_Exhibitions?: number | null
          Well_Structured_Programs?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "landmark_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "landmark_information"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_categories: {
        Row: {
          categories: string | null
          categories_details: string | null
          id: number
        }
        Insert: {
          categories?: string | null
          categories_details?: string | null
          id: number
        }
        Update: {
          categories?: string | null
          categories_details?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_categories_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "restaurant_information"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_information: {
        Row: {
          id: number
          latitude: number | null
          location: string | null
          longitude: number | null
          lot_address: string | null
          near_dist: number | null
          near_fid: number | null
          place_name: string | null
          road_address: string | null
          stay_time: number | null
        }
        Insert: {
          id: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Update: {
          id?: number
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          lot_address?: string | null
          near_dist?: number | null
          near_fid?: number | null
          place_name?: string | null
          road_address?: string | null
          stay_time?: number | null
        }
        Relationships: []
      }
      restaurant_link: {
        Row: {
          id: number
          instagram: string | null
          link: string | null
        }
        Insert: {
          id: number
          instagram?: string | null
          link?: string | null
        }
        Update: {
          id?: number
          instagram?: string | null
          link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_link_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "restaurant_information"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_openinghours_logical: {
        Row: {
          Fri_09: string | null
          Fri_10: string | null
          Fri_11: string | null
          Fri_12: string | null
          Fri_13: string | null
          Fri_14: string | null
          Fri_15: string | null
          Fri_16: string | null
          Fri_17: string | null
          Fri_18: string | null
          Fri_19: string | null
          Fri_20: string | null
          Fri_21: string | null
          id: number
          Mon_09: string | null
          Mon_10: string | null
          Mon_11: string | null
          Mon_12: string | null
          Mon_13: string | null
          Mon_14: string | null
          Mon_15: string | null
          Mon_16: string | null
          Mon_17: string | null
          Mon_18: string | null
          Mon_19: string | null
          Mon_20: string | null
          Mon_21: string | null
          Sat_09: string | null
          Sat_10: string | null
          Sat_11: string | null
          Sat_12: string | null
          Sat_13: string | null
          Sat_14: string | null
          Sat_15: string | null
          Sat_16: string | null
          Sat_17: string | null
          Sat_18: string | null
          Sat_19: string | null
          Sat_20: string | null
          Sat_21: string | null
          Sun_09: string | null
          Sun_10: string | null
          Sun_11: string | null
          Sun_12: string | null
          Sun_13: string | null
          Sun_14: string | null
          Sun_15: string | null
          Sun_16: string | null
          Sun_17: string | null
          Sun_18: string | null
          Sun_19: string | null
          Sun_20: string | null
          Sun_21: string | null
          Thu_09: string | null
          Thu_10: string | null
          Thu_11: string | null
          Thu_12: string | null
          Thu_13: string | null
          Thu_14: string | null
          Thu_15: string | null
          Thu_16: string | null
          Thu_17: string | null
          Thu_18: string | null
          Thu_19: string | null
          Thu_20: string | null
          Thu_21: string | null
          Tue_09: string | null
          Tue_10: string | null
          Tue_11: string | null
          Tue_12: string | null
          Tue_13: string | null
          Tue_14: string | null
          Tue_15: string | null
          Tue_16: string | null
          Tue_17: string | null
          Tue_18: string | null
          Tue_19: string | null
          Tue_20: string | null
          Tue_21: string | null
          Wed_09: string | null
          Wed_10: string | null
          Wed_11: string | null
          Wed_12: string | null
          Wed_13: string | null
          Wed_14: string | null
          Wed_15: string | null
          Wed_16: string | null
          Wed_17: string | null
          Wed_18: string | null
          Wed_19: string | null
          Wed_20: string | null
          Wed_21: string | null
        }
        Insert: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Update: {
          Fri_09?: string | null
          Fri_10?: string | null
          Fri_11?: string | null
          Fri_12?: string | null
          Fri_13?: string | null
          Fri_14?: string | null
          Fri_15?: string | null
          Fri_16?: string | null
          Fri_17?: string | null
          Fri_18?: string | null
          Fri_19?: string | null
          Fri_20?: string | null
          Fri_21?: string | null
          id?: number
          Mon_09?: string | null
          Mon_10?: string | null
          Mon_11?: string | null
          Mon_12?: string | null
          Mon_13?: string | null
          Mon_14?: string | null
          Mon_15?: string | null
          Mon_16?: string | null
          Mon_17?: string | null
          Mon_18?: string | null
          Mon_19?: string | null
          Mon_20?: string | null
          Mon_21?: string | null
          Sat_09?: string | null
          Sat_10?: string | null
          Sat_11?: string | null
          Sat_12?: string | null
          Sat_13?: string | null
          Sat_14?: string | null
          Sat_15?: string | null
          Sat_16?: string | null
          Sat_17?: string | null
          Sat_18?: string | null
          Sat_19?: string | null
          Sat_20?: string | null
          Sat_21?: string | null
          Sun_09?: string | null
          Sun_10?: string | null
          Sun_11?: string | null
          Sun_12?: string | null
          Sun_13?: string | null
          Sun_14?: string | null
          Sun_15?: string | null
          Sun_16?: string | null
          Sun_17?: string | null
          Sun_18?: string | null
          Sun_19?: string | null
          Sun_20?: string | null
          Sun_21?: string | null
          Thu_09?: string | null
          Thu_10?: string | null
          Thu_11?: string | null
          Thu_12?: string | null
          Thu_13?: string | null
          Thu_14?: string | null
          Thu_15?: string | null
          Thu_16?: string | null
          Thu_17?: string | null
          Thu_18?: string | null
          Thu_19?: string | null
          Thu_20?: string | null
          Thu_21?: string | null
          Tue_09?: string | null
          Tue_10?: string | null
          Tue_11?: string | null
          Tue_12?: string | null
          Tue_13?: string | null
          Tue_14?: string | null
          Tue_15?: string | null
          Tue_16?: string | null
          Tue_17?: string | null
          Tue_18?: string | null
          Tue_19?: string | null
          Tue_20?: string | null
          Tue_21?: string | null
          Wed_09?: string | null
          Wed_10?: string | null
          Wed_11?: string | null
          Wed_12?: string | null
          Wed_13?: string | null
          Wed_14?: string | null
          Wed_15?: string | null
          Wed_16?: string | null
          Wed_17?: string | null
          Wed_18?: string | null
          Wed_19?: string | null
          Wed_20?: string | null
          Wed_21?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_openinghours_logical_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "restaurant_information"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_rating: {
        Row: {
          blog_review_count: number | null
          id: number
          rating: number | null
          visitor_norm: number | null
          visitor_review_count: number | null
        }
        Insert: {
          blog_review_count?: number | null
          id: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Update: {
          blog_review_count?: number | null
          id?: number
          rating?: number | null
          visitor_norm?: number | null
          visitor_review_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_rating_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "restaurant_information"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_review: {
        Row: {
          Authentic_local_taste: number | null
          Calm_atmosphere: number | null
          Clean_restrooms: number | null
          Clean_store: number | null
          Comfortable_seating: number | null
          Cozy: number | null
          Delicious_desserts: number | null
          Delicious_food: number | null
          Easy_parking: number | null
          Fast_service: number | null
          Fresh_ingredients: number | null
          Friendly: number | null
          Good_complimentary_side_dishes: number | null
          Good_for_conversation: number | null
          Good_for_families_with_kids: number | null
          Good_for_long_stays: number | null
          Good_for_photos: number | null
          Good_for_solo_dining: number | null
          Good_for_solo_drinking: number | null
          Good_value_for_money: number | null
          Great_for_group_gatherings: number | null
          Great_for_special_occasions: number | null
          Great_outdoor_space: number | null
          Great_side_dishes: number | null
          Healthy_taste: number | null
          High_quality_meat: number | null
          id: number
          Large_portions: number | null
          Little_odor: number | null
          location: string | null
          Nice_music: number | null
          Nice_view: number | null
          Pet_friendly: number | null
          Spacious_store: number | null
          Special_menu_available: number | null
          Staff_grills_food_well: number | null
          Stylish_interior: number | null
          Tasty_drinks: number | null
          Unique_concept: number | null
          Variety_of_alcohol: number | null
          visitor_norm: number | null
          Well_curated_menu: number | null
          Worth_the_price: number | null
        }
        Insert: {
          Authentic_local_taste?: number | null
          Calm_atmosphere?: number | null
          Clean_restrooms?: number | null
          Clean_store?: number | null
          Comfortable_seating?: number | null
          Cozy?: number | null
          Delicious_desserts?: number | null
          Delicious_food?: number | null
          Easy_parking?: number | null
          Fast_service?: number | null
          Fresh_ingredients?: number | null
          Friendly?: number | null
          Good_complimentary_side_dishes?: number | null
          Good_for_conversation?: number | null
          Good_for_families_with_kids?: number | null
          Good_for_long_stays?: number | null
          Good_for_photos?: number | null
          Good_for_solo_dining?: number | null
          Good_for_solo_drinking?: number | null
          Good_value_for_money?: number | null
          Great_for_group_gatherings?: number | null
          Great_for_special_occasions?: number | null
          Great_outdoor_space?: number | null
          Great_side_dishes?: number | null
          Healthy_taste?: number | null
          High_quality_meat?: number | null
          id: number
          Large_portions?: number | null
          Little_odor?: number | null
          location?: string | null
          Nice_music?: number | null
          Nice_view?: number | null
          Pet_friendly?: number | null
          Spacious_store?: number | null
          Special_menu_available?: number | null
          Staff_grills_food_well?: number | null
          Stylish_interior?: number | null
          Tasty_drinks?: number | null
          Unique_concept?: number | null
          Variety_of_alcohol?: number | null
          visitor_norm?: number | null
          Well_curated_menu?: number | null
          Worth_the_price?: number | null
        }
        Update: {
          Authentic_local_taste?: number | null
          Calm_atmosphere?: number | null
          Clean_restrooms?: number | null
          Clean_store?: number | null
          Comfortable_seating?: number | null
          Cozy?: number | null
          Delicious_desserts?: number | null
          Delicious_food?: number | null
          Easy_parking?: number | null
          Fast_service?: number | null
          Fresh_ingredients?: number | null
          Friendly?: number | null
          Good_complimentary_side_dishes?: number | null
          Good_for_conversation?: number | null
          Good_for_families_with_kids?: number | null
          Good_for_long_stays?: number | null
          Good_for_photos?: number | null
          Good_for_solo_dining?: number | null
          Good_for_solo_drinking?: number | null
          Good_value_for_money?: number | null
          Great_for_group_gatherings?: number | null
          Great_for_special_occasions?: number | null
          Great_outdoor_space?: number | null
          Great_side_dishes?: number | null
          Healthy_taste?: number | null
          High_quality_meat?: number | null
          id?: number
          Large_portions?: number | null
          Little_odor?: number | null
          location?: string | null
          Nice_music?: number | null
          Nice_view?: number | null
          Pet_friendly?: number | null
          Spacious_store?: number | null
          Special_menu_available?: number | null
          Staff_grills_food_well?: number | null
          Stylish_interior?: number | null
          Tasty_drinks?: number | null
          Unique_concept?: number | null
          Variety_of_alcohol?: number | null
          visitor_norm?: number | null
          Well_curated_menu?: number | null
          Worth_the_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_review_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "restaurant_information"
            referencedColumns: ["id"]
          },
        ]
      }
      similarity_matching: {
        Row: {
          field_description: string | null
          field_name: string | null
          similarity: number | null
          table_name: string | null
          top_similar_fields: string | null
          user_keyword: string | null
        }
        Insert: {
          field_description?: string | null
          field_name?: string | null
          similarity?: number | null
          table_name?: string | null
          top_similar_fields?: string | null
          user_keyword?: string | null
        }
        Update: {
          field_description?: string | null
          field_name?: string | null
          similarity?: number | null
          table_name?: string | null
          top_similar_fields?: string | null
          user_keyword?: string | null
        }
        Relationships: []
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown | null
          f_table_catalog?: string | null
          f_table_name?: unknown | null
          f_table_schema?: unknown | null
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      raster_columns: {
        Row: {
          blocksize_x: number | null
          blocksize_y: number | null
          extent: unknown | null
          nodata_values: number[] | null
          num_bands: number | null
          out_db: boolean[] | null
          pixel_types: string[] | null
          r_raster_column: unknown | null
          r_table_catalog: unknown | null
          r_table_name: unknown | null
          r_table_schema: unknown | null
          regular_blocking: boolean | null
          same_alignment: boolean | null
          scale_x: number | null
          scale_y: number | null
          spatial_index: boolean | null
          srid: number | null
        }
        Relationships: []
      }
      raster_overviews: {
        Row: {
          o_raster_column: unknown | null
          o_table_catalog: unknown | null
          o_table_name: unknown | null
          o_table_schema: unknown | null
          overview_factor: number | null
          r_raster_column: unknown | null
          r_table_catalog: unknown | null
          r_table_name: unknown | null
          r_table_schema: unknown | null
        }
        Relationships: []
      }
    }
    Functions: {
      __st_countagg_transfn: {
        Args: {
          agg: Database["public"]["CompositeTypes"]["agg_count"]
          rast: unknown
          nband?: number
          exclude_nodata_value?: boolean
          sample_percent?: number
        }
        Returns: Database["public"]["CompositeTypes"]["agg_count"]
      }
      _add_overview_constraint: {
        Args: {
          ovschema: unknown
          ovtable: unknown
          ovcolumn: unknown
          refschema: unknown
          reftable: unknown
          refcolumn: unknown
          factor: number
        }
        Returns: boolean
      }
      _add_raster_constraint: {
        Args: { cn: unknown; sql: string }
        Returns: boolean
      }
      _add_raster_constraint_alignment: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_blocksize: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: boolean
      }
      _add_raster_constraint_coverage_tile: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_extent: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_nodata_values: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_num_bands: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_out_db: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_pixel_types: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_scale: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: boolean
      }
      _add_raster_constraint_spatially_unique: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _add_raster_constraint_srid: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_overview_constraint: {
        Args: { ovschema: unknown; ovtable: unknown; ovcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint: {
        Args: { rastschema: unknown; rasttable: unknown; cn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_alignment: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_blocksize: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: boolean
      }
      _drop_raster_constraint_coverage_tile: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_extent: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_nodata_values: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_num_bands: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_out_db: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_pixel_types: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_regular_blocking: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_scale: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: boolean
      }
      _drop_raster_constraint_spatially_unique: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _drop_raster_constraint_srid: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _overview_constraint: {
        Args: {
          ov: unknown
          factor: number
          refschema: unknown
          reftable: unknown
          refcolumn: unknown
        }
        Returns: boolean
      }
      _overview_constraint_info: {
        Args: { ovschema: unknown; ovtable: unknown; ovcolumn: unknown }
        Returns: Record<string, unknown>
      }
      _postgis_deprecate: {
        Args: { oldname: string; newname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { tbl: unknown; col: string }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: { tbl: unknown; att_name: string; geom: unknown; mode?: string }
        Returns: number
      }
      _raster_constraint_info_alignment: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _raster_constraint_info_blocksize: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: number
      }
      _raster_constraint_info_coverage_tile: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _raster_constraint_info_extent: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: unknown
      }
      _raster_constraint_info_index: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _raster_constraint_info_nodata_values: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: number[]
      }
      _raster_constraint_info_num_bands: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: number
      }
      _raster_constraint_info_out_db: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean[]
      }
      _raster_constraint_info_pixel_types: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: string[]
      }
      _raster_constraint_info_regular_blocking: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _raster_constraint_info_scale: {
        Args: {
          rastschema: unknown
          rasttable: unknown
          rastcolumn: unknown
          axis: string
        }
        Returns: number
      }
      _raster_constraint_info_spatially_unique: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: boolean
      }
      _raster_constraint_info_srid: {
        Args: { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
        Returns: number
      }
      _raster_constraint_nodata_values: {
        Args: { rast: unknown }
        Returns: number[]
      }
      _raster_constraint_out_db: {
        Args: { rast: unknown }
        Returns: boolean[]
      }
      _raster_constraint_pixel_types: {
        Args: { rast: unknown }
        Returns: string[]
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_aspect4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_asraster: {
        Args: {
          geom: unknown
          scalex?: number
          scaley?: number
          width?: number
          height?: number
          pixeltype?: string[]
          value?: number[]
          nodataval?: number[]
          upperleftx?: number
          upperlefty?: number
          gridx?: number
          gridy?: number
          skewx?: number
          skewy?: number
          touched?: boolean
        }
        Returns: unknown
      }
      _st_bestsrid: {
        Args: { "": unknown }
        Returns: number
      }
      _st_clip: {
        Args: {
          rast: unknown
          nband: number[]
          geom: unknown
          nodataval?: number[]
          crop?: boolean
        }
        Returns: unknown
      }
      _st_colormap: {
        Args: {
          rast: unknown
          nband: number
          colormap: string
          method?: string
        }
        Returns: unknown
      }
      _st_contains: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_containsproperly: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_convertarray4ma: {
        Args: { value: number[] }
        Returns: number[]
      }
      _st_count: {
        Args: {
          rast: unknown
          nband?: number
          exclude_nodata_value?: boolean
          sample_percent?: number
        }
        Returns: number
      }
      _st_countagg_finalfn: {
        Args: { agg: Database["public"]["CompositeTypes"]["agg_count"] }
        Returns: number
      }
      _st_countagg_transfn: {
        Args:
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              rast: unknown
              exclude_nodata_value: boolean
            }
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
            }
          | {
              agg: Database["public"]["CompositeTypes"]["agg_count"]
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              sample_percent: number
            }
        Returns: Database["public"]["CompositeTypes"]["agg_count"]
      }
      _st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dfullywithin: {
        Args: {
          rast1: unknown
          nband1: number
          rast2: unknown
          nband2: number
          distance: number
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args:
          | {
              geog1: unknown
              geog2: unknown
              tolerance: number
              use_spheroid?: boolean
            }
          | {
              rast1: unknown
              nband1: number
              rast2: unknown
              nband2: number
              distance: number
            }
        Returns: boolean
      }
      _st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_gdalwarp: {
        Args: {
          rast: unknown
          algorithm?: string
          maxerr?: number
          srid?: number
          scalex?: number
          scaley?: number
          gridx?: number
          gridy?: number
          skewx?: number
          skewy?: number
          width?: number
          height?: number
        }
        Returns: unknown
      }
      _st_grayscale4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_hillshade4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_histogram: {
        Args: {
          rast: unknown
          nband?: number
          exclude_nodata_value?: boolean
          sample_percent?: number
          bins?: number
          width?: number[]
          right?: boolean
          min?: number
          max?: number
        }
        Returns: Record<string, unknown>[]
      }
      _st_intersects: {
        Args:
          | { geom: unknown; rast: unknown; nband?: number }
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_mapalgebra: {
        Args:
          | {
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              callbackfunc: unknown
              pixeltype?: string
              distancex?: number
              distancey?: number
              extenttype?: string
              customextent?: unknown
              mask?: number[]
              weighted?: boolean
            }
          | {
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              expression: string
              pixeltype?: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
            }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_neighborhood: {
        Args: {
          rast: unknown
          band: number
          columnx: number
          rowy: number
          distancex: number
          distancey: number
          exclude_nodata_value?: boolean
        }
        Returns: number[]
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_pixelascentroids: {
        Args: {
          rast: unknown
          band?: number
          columnx?: number
          rowy?: number
          exclude_nodata_value?: boolean
        }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      _st_pixelaspolygons: {
        Args: {
          rast: unknown
          band?: number
          columnx?: number
          rowy?: number
          exclude_nodata_value?: boolean
        }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      _st_pointoutside: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_quantile: {
        Args: {
          rast: unknown
          nband?: number
          exclude_nodata_value?: boolean
          sample_percent?: number
          quantiles?: number[]
        }
        Returns: Record<string, unknown>[]
      }
      _st_rastertoworldcoord: {
        Args: { rast: unknown; columnx?: number; rowy?: number }
        Returns: Record<string, unknown>
      }
      _st_reclass: {
        Args: { rast: unknown }
        Returns: unknown
      }
      _st_roughness4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_samealignment_finalfn: {
        Args: { agg: Database["public"]["CompositeTypes"]["agg_samealignment"] }
        Returns: boolean
      }
      _st_samealignment_transfn: {
        Args: {
          agg: Database["public"]["CompositeTypes"]["agg_samealignment"]
          rast: unknown
        }
        Returns: Database["public"]["CompositeTypes"]["agg_samealignment"]
      }
      _st_setvalues: {
        Args: {
          rast: unknown
          nband: number
          x: number
          y: number
          newvalueset: number[]
          noset?: boolean[]
          hasnosetvalue?: boolean
          nosetvalue?: number
          keepnodata?: boolean
        }
        Returns: unknown
      }
      _st_slope4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_sortablehash: {
        Args: { geom: unknown }
        Returns: number
      }
      _st_summarystats: {
        Args: {
          rast: unknown
          nband?: number
          exclude_nodata_value?: boolean
          sample_percent?: number
        }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      _st_summarystats_finalfn: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      _st_tile: {
        Args: {
          rast: unknown
          width: number
          height: number
          nband?: number[]
          padwithnodata?: boolean
          nodataval?: number
        }
        Returns: unknown[]
      }
      _st_touches: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_tpi4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_tri4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      _st_union_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      _st_valuecount: {
        Args:
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
        Returns: Record<string, unknown>[]
      }
      _st_voronoi: {
        Args: {
          g1: unknown
          clip?: unknown
          tolerance?: number
          return_polygons?: boolean
        }
        Returns: unknown
      }
      _st_within: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
        Returns: boolean
      }
      _st_worldtorastercoord: {
        Args: { rast: unknown; longitude?: number; latitude?: number }
        Returns: Record<string, unknown>
      }
      _updaterastersrid: {
        Args: {
          schema_name: unknown
          table_name: unknown
          column_name: unknown
          new_srid: number
        }
        Returns: boolean
      }
      addauth: {
        Args: { "": string }
        Returns: boolean
      }
      addgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
              new_srid_in: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              schema_name: string
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
          | {
              table_name: string
              column_name: string
              new_srid: number
              new_type: string
              new_dim: number
              use_typmod?: boolean
            }
        Returns: string
      }
      addoverviewconstraints: {
        Args:
          | {
              ovschema: unknown
              ovtable: unknown
              ovcolumn: unknown
              refschema: unknown
              reftable: unknown
              refcolumn: unknown
              ovfactor: number
            }
          | {
              ovtable: unknown
              ovcolumn: unknown
              reftable: unknown
              refcolumn: unknown
              ovfactor: number
            }
        Returns: boolean
      }
      addrasterconstraints: {
        Args:
          | { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
          | {
              rastschema: unknown
              rasttable: unknown
              rastcolumn: unknown
              srid?: boolean
              scale_x?: boolean
              scale_y?: boolean
              blocksize_x?: boolean
              blocksize_y?: boolean
              same_alignment?: boolean
              regular_blocking?: boolean
              num_bands?: boolean
              pixel_types?: boolean
              nodata_values?: boolean
              out_db?: boolean
              extent?: boolean
            }
          | { rasttable: unknown; rastcolumn: unknown }
          | {
              rasttable: unknown
              rastcolumn: unknown
              srid?: boolean
              scale_x?: boolean
              scale_y?: boolean
              blocksize_x?: boolean
              blocksize_y?: boolean
              same_alignment?: boolean
              regular_blocking?: boolean
              num_bands?: boolean
              pixel_types?: boolean
              nodata_values?: boolean
              out_db?: boolean
              extent?: boolean
            }
        Returns: boolean
      }
      box: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box2d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box2df_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d: {
        Args: { "": unknown } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      box3d_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3d_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      box3dtobox: {
        Args: { "": unknown }
        Returns: unknown
      }
      bytea: {
        Args: { "": unknown } | { "": unknown } | { "": unknown }
        Returns: string
      }
      disablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      dropgeometrycolumn: {
        Args:
          | {
              catalog_name: string
              schema_name: string
              table_name: string
              column_name: string
            }
          | { schema_name: string; table_name: string; column_name: string }
          | { table_name: string; column_name: string }
        Returns: string
      }
      dropgeometrytable: {
        Args:
          | { catalog_name: string; schema_name: string; table_name: string }
          | { schema_name: string; table_name: string }
          | { table_name: string }
        Returns: string
      }
      dropoverviewconstraints: {
        Args:
          | { ovschema: unknown; ovtable: unknown; ovcolumn: unknown }
          | { ovtable: unknown; ovcolumn: unknown }
        Returns: boolean
      }
      droprasterconstraints: {
        Args:
          | { rastschema: unknown; rasttable: unknown; rastcolumn: unknown }
          | {
              rastschema: unknown
              rasttable: unknown
              rastcolumn: unknown
              srid?: boolean
              scale_x?: boolean
              scale_y?: boolean
              blocksize_x?: boolean
              blocksize_y?: boolean
              same_alignment?: boolean
              regular_blocking?: boolean
              num_bands?: boolean
              pixel_types?: boolean
              nodata_values?: boolean
              out_db?: boolean
              extent?: boolean
            }
          | { rasttable: unknown; rastcolumn: unknown }
          | {
              rasttable: unknown
              rastcolumn: unknown
              srid?: boolean
              scale_x?: boolean
              scale_y?: boolean
              blocksize_x?: boolean
              blocksize_y?: boolean
              same_alignment?: boolean
              regular_blocking?: boolean
              num_bands?: boolean
              pixel_types?: boolean
              nodata_values?: boolean
              out_db?: boolean
              extent?: boolean
            }
        Returns: boolean
      }
      enablelongtransactions: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geography: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      geography_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geography_gist_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_gist_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_send: {
        Args: { "": unknown }
        Returns: string
      }
      geography_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geography_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geography_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry: {
        Args:
          | { "": string }
          | { "": string }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
          | { "": unknown }
        Returns: unknown
      }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_analyze: {
        Args: { "": unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_decompress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_gist_sortsupport_2d: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_hash: {
        Args: { "": unknown }
        Returns: number
      }
      geometry_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_send: {
        Args: { "": unknown }
        Returns: string
      }
      geometry_sortsupport: {
        Args: { "": unknown }
        Returns: undefined
      }
      geometry_spgist_compress_2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_3d: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_spgist_compress_nd: {
        Args: { "": unknown }
        Returns: unknown
      }
      geometry_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      geometry_typmod_out: {
        Args: { "": number }
        Returns: unknown
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometrytype: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      get_proj4_from_srid: {
        Args: { "": number }
        Returns: string
      }
      gettransactionid: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      gidx_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gidx_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      json: {
        Args: { "": unknown }
        Returns: Json
      }
      jsonb: {
        Args: { "": unknown }
        Returns: Json
      }
      longtransactionsenabled: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      path: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_asflatgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asgeobuf_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_finalfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_asmvt_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      pgis_geometry_clusterintersecting_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_clusterwithin_finalfn: {
        Args: { "": unknown }
        Returns: unknown[]
      }
      pgis_geometry_collect_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_makeline_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_polygonize_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_finalfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      pgis_geometry_union_parallel_serialfn: {
        Args: { "": unknown }
        Returns: string
      }
      point: {
        Args: { "": unknown }
        Returns: unknown
      }
      polygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      populate_geometry_columns: {
        Args:
          | { tbl_oid: unknown; use_typmod?: boolean }
          | { use_typmod?: boolean }
        Returns: string
      }
      postgis_addbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_constraint_dims: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomschema: string; geomtable: string; geomcolumn: string }
        Returns: string
      }
      postgis_dropbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_extensions_upgrade: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_full_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_gdal_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_geos_noop: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_geos_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_getbbox: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_hasbbox: {
        Args: { "": unknown }
        Returns: boolean
      }
      postgis_index_supportfn: {
        Args: { "": unknown }
        Returns: unknown
      }
      postgis_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_revision: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libjson_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_liblwgeom_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libprotobuf_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_libxml_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_noop: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      postgis_proj_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_lib_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_lib_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_raster_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_build_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_installed: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_scripts_released: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_svn_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_type_name: {
        Args: {
          geomname: string
          coord_dimension: number
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_typmod_dims: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_srid: {
        Args: { "": number }
        Returns: number
      }
      postgis_typmod_type: {
        Args: { "": number }
        Returns: string
      }
      postgis_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      postgis_wagyu_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      raster_hash: {
        Args: { "": unknown }
        Returns: number
      }
      raster_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      raster_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      spheroid_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlength: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dperimeter: {
        Args: { "": unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addband: {
        Args:
          | {
              rast: unknown
              addbandargset: Database["public"]["CompositeTypes"]["addbandarg"][]
            }
          | {
              rast: unknown
              index: number
              outdbfile: string
              outdbindex: number[]
              nodataval?: number
            }
          | {
              rast: unknown
              index: number
              pixeltype: string
              initialvalue?: number
              nodataval?: number
            }
          | {
              rast: unknown
              outdbfile: string
              outdbindex: number[]
              index?: number
              nodataval?: number
            }
          | {
              rast: unknown
              pixeltype: string
              initialvalue?: number
              nodataval?: number
            }
          | {
              torast: unknown
              fromrast: unknown
              fromband?: number
              torastindex?: number
            }
          | {
              torast: unknown
              fromrasts: unknown[]
              fromband?: number
              torastindex?: number
            }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle: {
        Args:
          | { line1: unknown; line2: unknown }
          | { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
        Returns: number
      }
      st_approxcount: {
        Args:
          | {
              rast: unknown
              exclude_nodata_value: boolean
              sample_percent?: number
            }
          | { rast: unknown; nband: number; sample_percent: number }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              sample_percent?: number
            }
          | { rast: unknown; sample_percent: number }
        Returns: number
      }
      st_approxhistogram: {
        Args:
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              sample_percent: number
              bins: number
              right: boolean
            }
          | { rast: unknown; nband: number; sample_percent: number }
          | {
              rast: unknown
              nband: number
              sample_percent: number
              bins: number
              right: boolean
            }
          | {
              rast: unknown
              nband: number
              sample_percent: number
              bins: number
              width?: number[]
              right?: boolean
            }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              sample_percent?: number
              bins?: number
              width?: number[]
              right?: boolean
            }
          | { rast: unknown; sample_percent: number }
        Returns: Record<string, unknown>[]
      }
      st_approxquantile: {
        Args:
          | { rast: unknown; exclude_nodata_value: boolean; quantile?: number }
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              sample_percent: number
              quantile: number
            }
          | {
              rast: unknown
              nband: number
              sample_percent: number
              quantile: number
            }
          | {
              rast: unknown
              nband: number
              sample_percent: number
              quantiles?: number[]
            }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              sample_percent?: number
              quantiles?: number[]
            }
          | { rast: unknown; quantile: number }
          | { rast: unknown; quantiles: number[] }
          | { rast: unknown; sample_percent: number; quantile: number }
          | { rast: unknown; sample_percent: number; quantiles?: number[] }
        Returns: Record<string, unknown>[]
      }
      st_approxsummarystats: {
        Args:
          | {
              rast: unknown
              exclude_nodata_value: boolean
              sample_percent?: number
            }
          | { rast: unknown; nband: number; sample_percent: number }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              sample_percent?: number
            }
          | { rast: unknown; sample_percent: number }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      st_area: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_area2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_asbinary: {
        Args: { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asewkt: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_asgdalraster: {
        Args: {
          rast: unknown
          format: string
          options?: string[]
          srid?: number
        }
        Returns: string
      }
      st_asgeojson: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; options?: number }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              r: Record<string, unknown>
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
            }
        Returns: string
      }
      st_asgml: {
        Args:
          | { "": string }
          | {
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | { geom: unknown; maxdecimaldigits?: number; options?: number }
          | {
              version: number
              geog: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
          | {
              version: number
              geom: unknown
              maxdecimaldigits?: number
              options?: number
              nprefix?: string
              id?: string
            }
        Returns: string
      }
      st_ashexewkb: {
        Args: { "": unknown }
        Returns: string
      }
      st_asjpeg: {
        Args:
          | { rast: unknown; nband: number; options?: string[] }
          | { rast: unknown; nband: number; quality: number }
          | { rast: unknown; nbands: number[]; options?: string[] }
          | { rast: unknown; nbands: number[]; quality: number }
          | { rast: unknown; options?: string[] }
        Returns: string
      }
      st_askml: {
        Args:
          | { "": string }
          | { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
          | { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
        Returns: string
      }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: {
        Args: { geom: unknown; format?: string }
        Returns: string
      }
      st_asmvtgeom: {
        Args: {
          geom: unknown
          bounds: unknown
          extent?: number
          buffer?: number
          clip_geom?: boolean
        }
        Returns: unknown
      }
      st_aspect: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              units?: string
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              units?: string
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_aspng: {
        Args:
          | { rast: unknown; nband: number; compression: number }
          | { rast: unknown; nband: number; options?: string[] }
          | { rast: unknown; nbands: number[]; compression: number }
          | { rast: unknown; nbands: number[]; options?: string[] }
          | { rast: unknown; options?: string[] }
        Returns: string
      }
      st_asraster: {
        Args:
          | {
              geom: unknown
              ref: unknown
              pixeltype: string
              value?: number
              nodataval?: number
              touched?: boolean
            }
          | {
              geom: unknown
              ref: unknown
              pixeltype?: string[]
              value?: number[]
              nodataval?: number[]
              touched?: boolean
            }
          | {
              geom: unknown
              scalex: number
              scaley: number
              gridx: number
              gridy: number
              pixeltype: string
              value?: number
              nodataval?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              scalex: number
              scaley: number
              gridx?: number
              gridy?: number
              pixeltype?: string[]
              value?: number[]
              nodataval?: number[]
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              scalex: number
              scaley: number
              pixeltype: string[]
              value?: number[]
              nodataval?: number[]
              upperleftx?: number
              upperlefty?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              scalex: number
              scaley: number
              pixeltype: string
              value?: number
              nodataval?: number
              upperleftx?: number
              upperlefty?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              width: number
              height: number
              gridx: number
              gridy: number
              pixeltype: string
              value?: number
              nodataval?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              width: number
              height: number
              gridx?: number
              gridy?: number
              pixeltype?: string[]
              value?: number[]
              nodataval?: number[]
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              width: number
              height: number
              pixeltype: string[]
              value?: number[]
              nodataval?: number[]
              upperleftx?: number
              upperlefty?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
          | {
              geom: unknown
              width: number
              height: number
              pixeltype: string
              value?: number
              nodataval?: number
              upperleftx?: number
              upperlefty?: number
              skewx?: number
              skewy?: number
              touched?: boolean
            }
        Returns: unknown
      }
      st_assvg: {
        Args:
          | { "": string }
          | { geog: unknown; rel?: number; maxdecimaldigits?: number }
          | { geom: unknown; rel?: number; maxdecimaldigits?: number }
        Returns: string
      }
      st_astext: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      st_astiff: {
        Args:
          | { rast: unknown; compression: string; srid?: number }
          | {
              rast: unknown
              nbands: number[]
              compression: string
              srid?: number
            }
          | {
              rast: unknown
              nbands: number[]
              options?: string[]
              srid?: number
            }
          | { rast: unknown; options?: string[]; srid?: number }
        Returns: string
      }
      st_astwkb: {
        Args:
          | {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
          | {
              geom: unknown
              prec?: number
              prec_z?: number
              prec_m?: number
              with_sizes?: boolean
              with_boxes?: boolean
            }
        Returns: string
      }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_band: {
        Args:
          | { rast: unknown; nband: number }
          | { rast: unknown; nbands: string; delimiter?: string }
          | { rast: unknown; nbands?: number[] }
        Returns: unknown
      }
      st_bandfilesize: {
        Args: { rast: unknown; band?: number }
        Returns: number
      }
      st_bandfiletimestamp: {
        Args: { rast: unknown; band?: number }
        Returns: number
      }
      st_bandisnodata: {
        Args:
          | { rast: unknown; band?: number; forcechecking?: boolean }
          | { rast: unknown; forcechecking: boolean }
        Returns: boolean
      }
      st_bandmetadata: {
        Args:
          | { rast: unknown; band: number[] }
          | { rast: unknown; band?: number }
        Returns: {
          bandnum: number
          pixeltype: string
          nodatavalue: number
          isoutdb: boolean
          path: string
          outdbbandnum: number
          filesize: number
          filetimestamp: number
        }[]
      }
      st_bandnodatavalue: {
        Args: { rast: unknown; band?: number }
        Returns: number
      }
      st_bandpath: {
        Args: { rast: unknown; band?: number }
        Returns: string
      }
      st_bandpixeltype: {
        Args: { rast: unknown; band?: number }
        Returns: string
      }
      st_boundary: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_boundingdiagonal: {
        Args: { geom: unknown; fits?: boolean }
        Returns: unknown
      }
      st_buffer: {
        Args:
          | { geom: unknown; radius: number; options?: string }
          | { geom: unknown; radius: number; quadsegs: number }
        Returns: unknown
      }
      st_buildarea: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_centroid: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      st_cleangeometry: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_clip: {
        Args:
          | { rast: unknown; geom: unknown; crop: boolean }
          | { rast: unknown; geom: unknown; nodataval: number; crop?: boolean }
          | {
              rast: unknown
              geom: unknown
              nodataval?: number[]
              crop?: boolean
            }
          | {
              rast: unknown
              nband: number[]
              geom: unknown
              nodataval?: number[]
              crop?: boolean
            }
          | { rast: unknown; nband: number; geom: unknown; crop: boolean }
          | {
              rast: unknown
              nband: number
              geom: unknown
              nodataval: number
              crop?: boolean
            }
        Returns: unknown
      }
      st_clipbybox2d: {
        Args: { geom: unknown; box: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_clusterintersecting: {
        Args: { "": unknown[] }
        Returns: unknown[]
      }
      st_collect: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collectionextract: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_collectionhomogenize: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_colormap: {
        Args:
          | { rast: unknown; colormap: string; method?: string }
          | {
              rast: unknown
              nband?: number
              colormap?: string
              method?: string
            }
        Returns: unknown
      }
      st_concavehull: {
        Args: {
          param_geom: unknown
          param_pctconvex: number
          param_allow_holes?: boolean
        }
        Returns: unknown
      }
      st_contains: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_contour: {
        Args: {
          rast: unknown
          bandnumber?: number
          level_interval?: number
          level_base?: number
          fixed_levels?: number[]
          polygonize?: boolean
        }
        Returns: {
          geom: unknown
          id: number
          value: number
        }[]
      }
      st_convexhull: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      st_coorddim: {
        Args: { geometry: unknown }
        Returns: number
      }
      st_count: {
        Args:
          | { rast: unknown; exclude_nodata_value: boolean }
          | { rast: unknown; nband?: number; exclude_nodata_value?: boolean }
        Returns: number
      }
      st_coveredby: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_covers: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_createoverview: {
        Args: { tab: unknown; col: unknown; factor: number; algo?: string }
        Returns: unknown
      }
      st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_curvetoline: {
        Args: { geom: unknown; tol?: number; toltype?: number; flags?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { g1: unknown; tolerance?: number; flags?: number }
        Returns: unknown
      }
      st_dfullywithin: {
        Args:
          | {
              rast1: unknown
              nband1: number
              rast2: unknown
              nband2: number
              distance: number
            }
          | { rast1: unknown; rast2: unknown; distance: number }
        Returns: boolean
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_dimension: {
        Args: { "": unknown }
        Returns: number
      }
      st_disjoint: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_distance: {
        Args:
          | { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
          | { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distancesphere: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; radius: number }
        Returns: number
      }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_distinct4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_dump: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpaspolygons: {
        Args: { rast: unknown; band?: number; exclude_nodata_value?: boolean }
        Returns: Database["public"]["CompositeTypes"]["geomval"][]
      }
      st_dumppoints: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumprings: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpsegments: {
        Args: { "": unknown }
        Returns: Database["public"]["CompositeTypes"]["geometry_dump"][]
      }
      st_dumpvalues: {
        Args:
          | { rast: unknown; nband: number; exclude_nodata_value?: boolean }
          | { rast: unknown; nband?: number[]; exclude_nodata_value?: boolean }
        Returns: {
          nband: number
          valarray: number[]
        }[]
      }
      st_dwithin: {
        Args:
          | {
              geog1: unknown
              geog2: unknown
              tolerance: number
              use_spheroid?: boolean
            }
          | {
              rast1: unknown
              nband1: number
              rast2: unknown
              nband2: number
              distance: number
            }
          | { rast1: unknown; rast2: unknown; distance: number }
        Returns: boolean
      }
      st_endpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_envelope: {
        Args: { "": unknown } | { "": unknown }
        Returns: unknown
      }
      st_equals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_expand: {
        Args:
          | { box: unknown; dx: number; dy: number }
          | { box: unknown; dx: number; dy: number; dz?: number }
          | { geom: unknown; dx: number; dy: number; dz?: number; dm?: number }
        Returns: unknown
      }
      st_exteriorring: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_flipcoordinates: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force2d: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_force3d: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; zvalue?: number; mvalue?: number }
        Returns: unknown
      }
      st_forcecollection: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcecurve: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygonccw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcepolygoncw: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcerhr: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_forcesfs: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_fromgdalraster: {
        Args: { gdaldata: string; srid?: number }
        Returns: unknown
      }
      st_gdaldrivers: {
        Args: Record<PropertyKey, never>
        Returns: Record<string, unknown>[]
      }
      st_generatepoints: {
        Args:
          | { area: unknown; npoints: number }
          | { area: unknown; npoints: number; seed: number }
        Returns: unknown
      }
      st_geogfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geogfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geographyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geohash: {
        Args:
          | { geog: unknown; maxchars?: number }
          | { geom: unknown; maxchars?: number }
        Returns: string
      }
      st_geomcollfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomcollfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometricmedian: {
        Args: {
          g: unknown
          tolerance?: number
          max_iter?: number
          fail_if_not_converged?: boolean
        }
        Returns: unknown
      }
      st_geometryfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geometrytype: {
        Args: { "": unknown }
        Returns: string
      }
      st_geomfromewkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromewkt: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromgeojson: {
        Args: { "": Json } | { "": Json } | { "": string }
        Returns: unknown
      }
      st_geomfromgml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromkml: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfrommarc21: {
        Args: { marc21xml: string }
        Returns: unknown
      }
      st_geomfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromtwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_geomfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_georeference: {
        Args: { rast: unknown; format?: string }
        Returns: string
      }
      st_geotransform: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_gmltosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_grayscale: {
        Args:
          | {
              rast: unknown
              redband?: number
              greenband?: number
              blueband?: number
              extenttype?: string
            }
          | {
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              extenttype?: string
            }
        Returns: unknown
      }
      st_hasarc: {
        Args: { geometry: unknown }
        Returns: boolean
      }
      st_hasnoband: {
        Args: { rast: unknown; nband?: number }
        Returns: boolean
      }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_height: {
        Args: { "": unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_hillshade: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              azimuth?: number
              altitude?: number
              max_bright?: number
              scale?: number
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              azimuth?: number
              altitude?: number
              max_bright?: number
              scale?: number
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_histogram: {
        Args:
          | { rast: unknown; nband: number; bins: number; right: boolean }
          | {
              rast: unknown
              nband: number
              bins: number
              width?: number[]
              right?: boolean
            }
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              bins: number
              right: boolean
            }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              bins?: number
              width?: number[]
              right?: boolean
            }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_interpolateraster: {
        Args: {
          geom: unknown
          options: string
          rast: unknown
          bandnumber?: number
        }
        Returns: unknown
      }
      st_intersection: {
        Args:
          | { geom1: unknown; geom2: unknown; gridsize?: number }
          | { geomin: unknown; rast: unknown; band?: number }
          | { rast: unknown; band: number; geomin: unknown }
          | { rast: unknown; geomin: unknown }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              nodataval: number[]
            }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              nodataval: number
            }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              returnband: string
              nodataval: number
            }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              returnband?: string
              nodataval?: number[]
            }
          | { rast1: unknown; rast2: unknown; nodataval: number[] }
          | { rast1: unknown; rast2: unknown; nodataval: number }
          | {
              rast1: unknown
              rast2: unknown
              returnband: string
              nodataval: number
            }
          | {
              rast1: unknown
              rast2: unknown
              returnband?: string
              nodataval?: number[]
            }
        Returns: unknown
      }
      st_intersects: {
        Args:
          | { geog1: unknown; geog2: unknown }
          | { geom: unknown; rast: unknown; nband?: number }
          | { geom1: unknown; geom2: unknown }
          | { rast: unknown; geom: unknown; nband?: number }
          | { rast: unknown; nband: number; geom: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_invdistweight4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      st_isclosed: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscollection: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_iscoveragetile: {
        Args: {
          rast: unknown
          coverage: unknown
          tilewidth: number
          tileheight: number
        }
        Returns: boolean
      }
      st_isempty: {
        Args: { "": unknown } | { rast: unknown }
        Returns: boolean
      }
      st_ispolygonccw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_ispolygoncw: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isring: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_issimple: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvalid: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_isvaliddetail: {
        Args: { geom: unknown; flags?: number }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
      }
      st_isvalidreason: {
        Args: { "": unknown }
        Returns: string
      }
      st_isvalidtrajectory: {
        Args: { "": unknown }
        Returns: boolean
      }
      st_length: {
        Args:
          | { "": string }
          | { "": unknown }
          | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_length2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_letters: {
        Args: { letters: string; font?: Json }
        Returns: unknown
      }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { txtin: string; nprecision?: number }
        Returns: unknown
      }
      st_linefrommultipoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_linefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linemerge: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_linestringfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_linetocurve: {
        Args: { geometry: unknown }
        Returns: unknown
      }
      st_locatealong: {
        Args: { geometry: unknown; measure: number; leftrightoffset?: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          geometry: unknown
          frommeasure: number
          tomeasure: number
          leftrightoffset?: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { geometry: unknown; fromelevation: number; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_m: {
        Args: { "": unknown }
        Returns: number
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeemptycoverage: {
        Args: {
          tilewidth: number
          tileheight: number
          width: number
          height: number
          upperleftx: number
          upperlefty: number
          scalex: number
          scaley: number
          skewx: number
          skewy: number
          srid?: number
        }
        Returns: unknown[]
      }
      st_makeemptyraster: {
        Args:
          | { rast: unknown }
          | {
              width: number
              height: number
              upperleftx: number
              upperlefty: number
              pixelsize: number
            }
          | {
              width: number
              height: number
              upperleftx: number
              upperlefty: number
              scalex: number
              scaley: number
              skewx: number
              skewy: number
              srid?: number
            }
        Returns: unknown
      }
      st_makeline: {
        Args: { "": unknown[] } | { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makepolygon: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { "": unknown } | { geom: unknown; params: string }
        Returns: unknown
      }
      st_mapalgebra: {
        Args:
          | {
              rast: unknown
              nband: number[]
              callbackfunc: unknown
              pixeltype?: string
              extenttype?: string
              customextent?: unknown
              distancex?: number
              distancey?: number
            }
          | {
              rast: unknown
              nband: number
              callbackfunc: unknown
              mask: number[]
              weighted: boolean
              pixeltype?: string
              extenttype?: string
              customextent?: unknown
            }
          | {
              rast: unknown
              nband: number
              callbackfunc: unknown
              pixeltype?: string
              extenttype?: string
              customextent?: unknown
              distancex?: number
              distancey?: number
            }
          | {
              rast: unknown
              nband: number
              pixeltype: string
              expression: string
              nodataval?: number
            }
          | {
              rast: unknown
              pixeltype: string
              expression: string
              nodataval?: number
            }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              expression: string
              pixeltype?: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
            }
          | {
              rast1: unknown
              nband1: number
              rast2: unknown
              nband2: number
              callbackfunc: unknown
              pixeltype?: string
              extenttype?: string
              customextent?: unknown
              distancex?: number
              distancey?: number
            }
          | {
              rast1: unknown
              rast2: unknown
              expression: string
              pixeltype?: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
            }
          | {
              rastbandargset: Database["public"]["CompositeTypes"]["rastbandarg"][]
              callbackfunc: unknown
              pixeltype?: string
              extenttype?: string
              customextent?: unknown
              distancex?: number
              distancey?: number
            }
        Returns: unknown
      }
      st_mapalgebraexpr: {
        Args:
          | {
              rast: unknown
              band: number
              pixeltype: string
              expression: string
              nodataval?: number
            }
          | {
              rast: unknown
              pixeltype: string
              expression: string
              nodataval?: number
            }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              expression: string
              pixeltype?: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
            }
          | {
              rast1: unknown
              rast2: unknown
              expression: string
              pixeltype?: string
              extenttype?: string
              nodata1expr?: string
              nodata2expr?: string
              nodatanodataval?: number
            }
        Returns: unknown
      }
      st_mapalgebrafct: {
        Args:
          | { rast: unknown; band: number; onerastuserfunc: unknown }
          | { rast: unknown; band: number; onerastuserfunc: unknown }
          | {
              rast: unknown
              band: number
              pixeltype: string
              onerastuserfunc: unknown
            }
          | {
              rast: unknown
              band: number
              pixeltype: string
              onerastuserfunc: unknown
            }
          | { rast: unknown; onerastuserfunc: unknown }
          | { rast: unknown; onerastuserfunc: unknown }
          | { rast: unknown; pixeltype: string; onerastuserfunc: unknown }
          | { rast: unknown; pixeltype: string; onerastuserfunc: unknown }
          | {
              rast1: unknown
              band1: number
              rast2: unknown
              band2: number
              tworastuserfunc: unknown
              pixeltype?: string
              extenttype?: string
            }
          | {
              rast1: unknown
              rast2: unknown
              tworastuserfunc: unknown
              pixeltype?: string
              extenttype?: string
            }
        Returns: unknown
      }
      st_mapalgebrafctngb: {
        Args: {
          rast: unknown
          band: number
          pixeltype: string
          ngbwidth: number
          ngbheight: number
          onerastngbuserfunc: unknown
          nodatamode: string
        }
        Returns: unknown
      }
      st_max4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_maximuminscribedcircle: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_mean4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_memsize: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      st_metadata: {
        Args: { rast: unknown }
        Returns: Record<string, unknown>
      }
      st_min4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_minconvexhull: {
        Args: { rast: unknown; nband?: number }
        Returns: unknown
      }
      st_mindist4ma: {
        Args: { value: number[]; pos: number[] }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_minimumboundingradius: {
        Args: { "": unknown }
        Returns: Record<string, unknown>
      }
      st_minimumclearance: {
        Args: { "": unknown }
        Returns: number
      }
      st_minimumclearanceline: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_minpossiblevalue: {
        Args: { pixeltype: string }
        Returns: number
      }
      st_mlinefromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mlinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_mpolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multi: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_multilinefromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multilinestringfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_multipolygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_ndims: {
        Args: { "": unknown }
        Returns: number
      }
      st_nearestvalue: {
        Args:
          | {
              rast: unknown
              band: number
              columnx: number
              rowy: number
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              band: number
              pt: unknown
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              columnx: number
              rowy: number
              exclude_nodata_value?: boolean
            }
          | { rast: unknown; pt: unknown; exclude_nodata_value?: boolean }
        Returns: number
      }
      st_neighborhood: {
        Args:
          | {
              rast: unknown
              band: number
              columnx: number
              rowy: number
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              band: number
              pt: unknown
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              columnx: number
              rowy: number
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              pt: unknown
              distancex: number
              distancey: number
              exclude_nodata_value?: boolean
            }
        Returns: number[]
      }
      st_node: {
        Args: { g: unknown }
        Returns: unknown
      }
      st_normalize: {
        Args: { geom: unknown }
        Returns: unknown
      }
      st_notsamealignmentreason: {
        Args: { rast1: unknown; rast2: unknown }
        Returns: string
      }
      st_npoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_nrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numbands: {
        Args: { "": unknown }
        Returns: number
      }
      st_numgeometries: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorring: {
        Args: { "": unknown }
        Returns: number
      }
      st_numinteriorrings: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpatches: {
        Args: { "": unknown }
        Returns: number
      }
      st_numpoints: {
        Args: { "": unknown }
        Returns: number
      }
      st_offsetcurve: {
        Args: { line: unknown; distance: number; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_orientedenvelope: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_overlaps: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { "": unknown } | { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_perimeter2d: {
        Args: { "": unknown }
        Returns: number
      }
      st_pixelascentroid: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelascentroids: {
        Args: { rast: unknown; band?: number; exclude_nodata_value?: boolean }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelaspoint: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelaspoints: {
        Args: { rast: unknown; band?: number; exclude_nodata_value?: boolean }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelaspolygon: {
        Args: { rast: unknown; x: number; y: number }
        Returns: unknown
      }
      st_pixelaspolygons: {
        Args: { rast: unknown; band?: number; exclude_nodata_value?: boolean }
        Returns: {
          geom: unknown
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelheight: {
        Args: { "": unknown }
        Returns: number
      }
      st_pixelofvalue: {
        Args:
          | {
              rast: unknown
              nband: number
              search: number[]
              exclude_nodata_value?: boolean
            }
          | {
              rast: unknown
              nband: number
              search: number
              exclude_nodata_value?: boolean
            }
          | { rast: unknown; search: number[]; exclude_nodata_value?: boolean }
          | { rast: unknown; search: number; exclude_nodata_value?: boolean }
        Returns: {
          val: number
          x: number
          y: number
        }[]
      }
      st_pixelwidth: {
        Args: { "": unknown }
        Returns: number
      }
      st_pointfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_pointm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointonsurface: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_points: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
          mcoordinate: number
          srid?: number
        }
        Returns: unknown
      }
      st_polyfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polyfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygon: {
        Args: { rast: unknown; band?: number }
        Returns: unknown
      }
      st_polygonfromtext: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_polygonize: {
        Args: { "": unknown[] }
        Returns: unknown
      }
      st_project: {
        Args: { geog: unknown; distance: number; azimuth: number }
        Returns: unknown
      }
      st_quantile: {
        Args:
          | { rast: unknown; exclude_nodata_value: boolean; quantile?: number }
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              quantile: number
            }
          | { rast: unknown; nband: number; quantile: number }
          | { rast: unknown; nband: number; quantiles: number[] }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              quantiles?: number[]
            }
          | { rast: unknown; quantile: number }
          | { rast: unknown; quantiles: number[] }
        Returns: Record<string, unknown>[]
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_x: number
          prec_y?: number
          prec_z?: number
          prec_m?: number
        }
        Returns: unknown
      }
      st_range4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_rastertoworldcoord: {
        Args: { rast: unknown; columnx: number; rowy: number }
        Returns: Record<string, unknown>
      }
      st_rastertoworldcoordx: {
        Args:
          | { rast: unknown; xr: number }
          | { rast: unknown; xr: number; yr: number }
        Returns: number
      }
      st_rastertoworldcoordy: {
        Args:
          | { rast: unknown; xr: number; yr: number }
          | { rast: unknown; yr: number }
        Returns: number
      }
      st_rastfromhexwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_rastfromwkb: {
        Args: { "": string }
        Returns: unknown
      }
      st_reclass: {
        Args:
          | { rast: unknown }
          | {
              rast: unknown
              nband: number
              reclassexpr: string
              pixeltype: string
              nodataval?: number
            }
          | { rast: unknown; reclassexpr: string; pixeltype: string }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: string
      }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_resample: {
        Args:
          | {
              rast: unknown
              ref: unknown
              algorithm?: string
              maxerr?: number
              usescale?: boolean
            }
          | {
              rast: unknown
              ref: unknown
              usescale: boolean
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              scalex?: number
              scaley?: number
              gridx?: number
              gridy?: number
              skewx?: number
              skewy?: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              width: number
              height: number
              gridx?: number
              gridy?: number
              skewx?: number
              skewy?: number
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_rescale: {
        Args:
          | {
              rast: unknown
              scalex: number
              scaley: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              scalexy: number
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_resize: {
        Args:
          | {
              rast: unknown
              percentwidth: number
              percentheight: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              width: number
              height: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              width: string
              height: string
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_reskew: {
        Args:
          | {
              rast: unknown
              skewx: number
              skewy: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              skewxy: number
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_retile: {
        Args: {
          tab: unknown
          col: unknown
          ext: unknown
          sfx: number
          sfy: number
          tw: number
          th: number
          algo?: string
        }
        Returns: unknown[]
      }
      st_reverse: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_rotation: {
        Args: { "": unknown }
        Returns: number
      }
      st_roughness: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_samealignment: {
        Args:
          | { rast1: unknown; rast2: unknown }
          | {
              ulx1: number
              uly1: number
              scalex1: number
              scaley1: number
              skewx1: number
              skewy1: number
              ulx2: number
              uly2: number
              scalex2: number
              scaley2: number
              skewx2: number
              skewy2: number
            }
        Returns: boolean
      }
      st_scalex: {
        Args: { "": unknown }
        Returns: number
      }
      st_scaley: {
        Args: { "": unknown }
        Returns: number
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setbandindex: {
        Args: {
          rast: unknown
          band: number
          outdbindex: number
          force?: boolean
        }
        Returns: unknown
      }
      st_setbandisnodata: {
        Args: { rast: unknown; band?: number }
        Returns: unknown
      }
      st_setbandnodatavalue: {
        Args:
          | {
              rast: unknown
              band: number
              nodatavalue: number
              forcechecking?: boolean
            }
          | { rast: unknown; nodatavalue: number }
        Returns: unknown
      }
      st_setbandpath: {
        Args: {
          rast: unknown
          band: number
          outdbpath: string
          outdbindex: number
          force?: boolean
        }
        Returns: unknown
      }
      st_setgeoreference: {
        Args:
          | { rast: unknown; georef: string; format?: string }
          | {
              rast: unknown
              upperleftx: number
              upperlefty: number
              scalex: number
              scaley: number
              skewx: number
              skewy: number
            }
        Returns: unknown
      }
      st_setgeotransform: {
        Args: {
          rast: unknown
          imag: number
          jmag: number
          theta_i: number
          theta_ij: number
          xoffset: number
          yoffset: number
        }
        Returns: unknown
      }
      st_setm: {
        Args: { rast: unknown; geom: unknown; resample?: string; band?: number }
        Returns: unknown
      }
      st_setrotation: {
        Args: { rast: unknown; rotation: number }
        Returns: unknown
      }
      st_setscale: {
        Args:
          | { rast: unknown; scale: number }
          | { rast: unknown; scalex: number; scaley: number }
        Returns: unknown
      }
      st_setskew: {
        Args:
          | { rast: unknown; skew: number }
          | { rast: unknown; skewx: number; skewy: number }
        Returns: unknown
      }
      st_setsrid: {
        Args:
          | { geog: unknown; srid: number }
          | { geom: unknown; srid: number }
          | { rast: unknown; srid: number }
        Returns: unknown
      }
      st_setupperleft: {
        Args: { rast: unknown; upperleftx: number; upperlefty: number }
        Returns: unknown
      }
      st_setvalue: {
        Args:
          | {
              rast: unknown
              band: number
              x: number
              y: number
              newvalue: number
            }
          | { rast: unknown; geom: unknown; newvalue: number }
          | { rast: unknown; nband: number; geom: unknown; newvalue: number }
          | { rast: unknown; x: number; y: number; newvalue: number }
        Returns: unknown
      }
      st_setvalues: {
        Args:
          | {
              rast: unknown
              nband: number
              geomvalset: Database["public"]["CompositeTypes"]["geomval"][]
              keepnodata?: boolean
            }
          | {
              rast: unknown
              nband: number
              x: number
              y: number
              newvalueset: number[]
              noset?: boolean[]
              keepnodata?: boolean
            }
          | {
              rast: unknown
              nband: number
              x: number
              y: number
              newvalueset: number[]
              nosetvalue: number
              keepnodata?: boolean
            }
          | {
              rast: unknown
              nband: number
              x: number
              y: number
              width: number
              height: number
              newvalue: number
              keepnodata?: boolean
            }
          | {
              rast: unknown
              x: number
              y: number
              width: number
              height: number
              newvalue: number
              keepnodata?: boolean
            }
        Returns: unknown
      }
      st_setz: {
        Args: { rast: unknown; geom: unknown; resample?: string; band?: number }
        Returns: unknown
      }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shiftlongitude: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; vertex_fraction: number; is_outer?: boolean }
        Returns: unknown
      }
      st_skewx: {
        Args: { "": unknown }
        Returns: number
      }
      st_skewy: {
        Args: { "": unknown }
        Returns: number
      }
      st_slope: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              units?: string
              scale?: number
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              units?: string
              scale?: number
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_snaptogrid: {
        Args:
          | {
              rast: unknown
              gridx: number
              gridy: number
              algorithm?: string
              maxerr?: number
              scalex?: number
              scaley?: number
            }
          | {
              rast: unknown
              gridx: number
              gridy: number
              scalex: number
              scaley: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              gridx: number
              gridy: number
              scalexy: number
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_split: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_square: {
        Args: { size: number; cell_i: number; cell_j: number; origin?: unknown }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { size: number; bounds: unknown }
        Returns: Record<string, unknown>[]
      }
      st_srid: {
        Args: { "": unknown } | { geog: unknown } | { geom: unknown }
        Returns: number
      }
      st_startpoint: {
        Args: { "": unknown }
        Returns: unknown
      }
      st_stddev4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_subdivide: {
        Args: { geom: unknown; maxvertices?: number; gridsize?: number }
        Returns: unknown[]
      }
      st_sum4ma: {
        Args:
          | { matrix: number[]; nodatamode: string }
          | { value: number[]; pos: number[] }
        Returns: number
      }
      st_summary: {
        Args: { "": unknown } | { "": unknown } | { rast: unknown }
        Returns: string
      }
      st_summarystats: {
        Args:
          | { rast: unknown; exclude_nodata_value: boolean }
          | { rast: unknown; nband?: number; exclude_nodata_value?: boolean }
        Returns: Database["public"]["CompositeTypes"]["summarystats"]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tile: {
        Args:
          | {
              rast: unknown
              nband: number[]
              width: number
              height: number
              padwithnodata?: boolean
              nodataval?: number
            }
          | {
              rast: unknown
              nband: number
              width: number
              height: number
              padwithnodata?: boolean
              nodataval?: number
            }
          | {
              rast: unknown
              width: number
              height: number
              padwithnodata?: boolean
              nodataval?: number
            }
        Returns: unknown[]
      }
      st_tileenvelope: {
        Args: {
          zoom: number
          x: number
          y: number
          bounds?: unknown
          margin?: number
        }
        Returns: unknown
      }
      st_touches: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_tpi: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_transform: {
        Args:
          | { geom: unknown; from_proj: string; to_proj: string }
          | { geom: unknown; from_proj: string; to_srid: number }
          | { geom: unknown; to_proj: string }
          | {
              rast: unknown
              alignto: unknown
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              srid: number
              algorithm?: string
              maxerr?: number
              scalex?: number
              scaley?: number
            }
          | {
              rast: unknown
              srid: number
              scalex: number
              scaley: number
              algorithm?: string
              maxerr?: number
            }
          | {
              rast: unknown
              srid: number
              scalexy: number
              algorithm?: string
              maxerr?: number
            }
        Returns: unknown
      }
      st_tri: {
        Args:
          | {
              rast: unknown
              nband: number
              customextent: unknown
              pixeltype?: string
              interpolate_nodata?: boolean
            }
          | {
              rast: unknown
              nband?: number
              pixeltype?: string
              interpolate_nodata?: boolean
            }
        Returns: unknown
      }
      st_triangulatepolygon: {
        Args: { g1: unknown }
        Returns: unknown
      }
      st_union: {
        Args:
          | { "": unknown[] }
          | { geom1: unknown; geom2: unknown }
          | { geom1: unknown; geom2: unknown; gridsize: number }
        Returns: unknown
      }
      st_upperleftx: {
        Args: { "": unknown }
        Returns: number
      }
      st_upperlefty: {
        Args: { "": unknown }
        Returns: number
      }
      st_value: {
        Args:
          | {
              rast: unknown
              band: number
              pt: unknown
              exclude_nodata_value?: boolean
              resample?: string
            }
          | {
              rast: unknown
              band: number
              x: number
              y: number
              exclude_nodata_value?: boolean
            }
          | { rast: unknown; pt: unknown; exclude_nodata_value?: boolean }
          | {
              rast: unknown
              x: number
              y: number
              exclude_nodata_value?: boolean
            }
        Returns: number
      }
      st_valuecount: {
        Args:
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              searchvalue: number
              roundto?: number
            }
          | {
              rast: unknown
              nband: number
              searchvalue: number
              roundto?: number
            }
          | {
              rast: unknown
              nband: number
              searchvalues: number[]
              roundto?: number
            }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
          | { rast: unknown; searchvalue: number; roundto?: number }
          | { rast: unknown; searchvalues: number[]; roundto?: number }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              exclude_nodata_value: boolean
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              searchvalues: number[]
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              searchvalues: number[]
              roundto?: number
            }
        Returns: Record<string, unknown>[]
      }
      st_valuepercent: {
        Args:
          | {
              rast: unknown
              nband: number
              exclude_nodata_value: boolean
              searchvalue: number
              roundto?: number
            }
          | {
              rast: unknown
              nband: number
              searchvalue: number
              roundto?: number
            }
          | {
              rast: unknown
              nband: number
              searchvalues: number[]
              roundto?: number
            }
          | {
              rast: unknown
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
          | { rast: unknown; searchvalue: number; roundto?: number }
          | { rast: unknown; searchvalues: number[]; roundto?: number }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              exclude_nodata_value: boolean
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband: number
              searchvalues: number[]
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              nband?: number
              exclude_nodata_value?: boolean
              searchvalues?: number[]
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              searchvalue: number
              roundto?: number
            }
          | {
              rastertable: string
              rastercolumn: string
              searchvalues: number[]
              roundto?: number
            }
        Returns: number
      }
      st_voronoilines: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { g1: unknown; tolerance?: number; extend_to?: unknown }
        Returns: unknown
      }
      st_width: {
        Args: { "": unknown }
        Returns: number
      }
      st_within: {
        Args:
          | { geom1: unknown; geom2: unknown }
          | { rast1: unknown; nband1: number; rast2: unknown; nband2: number }
          | { rast1: unknown; rast2: unknown }
        Returns: boolean
      }
      st_wkbtosql: {
        Args: { wkb: string }
        Returns: unknown
      }
      st_wkttosql: {
        Args: { "": string }
        Returns: unknown
      }
      st_worldtorastercoord: {
        Args:
          | { rast: unknown; longitude: number; latitude: number }
          | { rast: unknown; pt: unknown }
        Returns: Record<string, unknown>
      }
      st_worldtorastercoordx: {
        Args:
          | { rast: unknown; pt: unknown }
          | { rast: unknown; xw: number }
          | { rast: unknown; xw: number; yw: number }
        Returns: number
      }
      st_worldtorastercoordy: {
        Args:
          | { rast: unknown; pt: unknown }
          | { rast: unknown; xw: number; yw: number }
          | { rast: unknown; yw: number }
        Returns: number
      }
      st_wrapx: {
        Args: { geom: unknown; wrap: number; move: number }
        Returns: unknown
      }
      st_x: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_xmin: {
        Args: { "": unknown }
        Returns: number
      }
      st_y: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymax: {
        Args: { "": unknown }
        Returns: number
      }
      st_ymin: {
        Args: { "": unknown }
        Returns: number
      }
      st_z: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmax: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmflag: {
        Args: { "": unknown }
        Returns: number
      }
      st_zmin: {
        Args: { "": unknown }
        Returns: number
      }
      text: {
        Args: { "": unknown }
        Returns: string
      }
      unlockrows: {
        Args: { "": string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          schema_name: string
          table_name: string
          column_name: string
          new_srid_in: number
        }
        Returns: string
      }
      updaterastersrid: {
        Args:
          | {
              schema_name: unknown
              table_name: unknown
              column_name: unknown
              new_srid: number
            }
          | { table_name: unknown; column_name: unknown; new_srid: number }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      addbandarg: {
        index: number | null
        pixeltype: string | null
        initialvalue: number | null
        nodataval: number | null
      }
      agg_count: {
        count: number | null
        nband: number | null
        exclude_nodata_value: boolean | null
        sample_percent: number | null
      }
      agg_samealignment: {
        refraster: unknown | null
        aligned: boolean | null
      }
      geometry_dump: {
        path: number[] | null
        geom: unknown | null
      }
      geomval: {
        geom: unknown | null
        val: number | null
      }
      rastbandarg: {
        rast: unknown | null
        nband: number | null
      }
      reclassarg: {
        nband: number | null
        reclassexpr: string | null
        pixeltype: string | null
        nodataval: number | null
      }
      summarystats: {
        count: number | null
        sum: number | null
        mean: number | null
        stddev: number | null
        min: number | null
        max: number | null
      }
      unionarg: {
        nband: number | null
        uniontype: string | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown | null
      }
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
