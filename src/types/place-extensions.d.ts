
import { Place } from './supabase';

// 기존 Place 인터페이스를 확장하여 weight 속성 추가
declare module '@/types/supabase' {
  interface Place {
    weight?: number;
  }
}
