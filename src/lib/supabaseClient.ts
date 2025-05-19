
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정
// 실제 환경에서는 환경 변수를 사용하는 것이 좋습니다
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gicmtijvsqejdkxxiopc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY210aWp2c3FlamRreHhpb3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NjQ0MDYsImV4cCI6MjA1OTQ0MDQwNn0.eTam9yNQtHn0ltkFkADNwjIlPEFSDAj-IsHP_9VeXec';

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Supabase 클라이언트 초기화 로그
console.log('🚀 [Supabase] 클라이언트 초기화 완료');
console.log('🌐 [Supabase] URL:', supabaseUrl);

// 필수 테이블 접속 테스트
const testTables = async () => {
  console.log('🔍 [Supabase] 테이블 접속 테스트 시작...');
  
  // 카테고리별 테이블 정의
  const categories = ['accommodation', 'landmark', 'restaurant', 'cafe'];
  const tableTypes = ['_information', '_rating', '_link', '_categories', '_review'];
  
  // 결과 저장용 객체
  let results = {
    success: 0,
    failed: 0,
    details: {} as Record<string, boolean>
  };
  
  // 모든 테이블에 대한 접속 테스트
  for (const category of categories) {
    for (const type of tableTypes) {
      const tableName = `${category}${type}`;
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('id')
          .limit(1);
          
        const success = !error && data !== null;
        results.details[tableName] = success;
        
        if (success) {
          console.log(`✅ [Supabase] 테이블 연결 성공: ${tableName} (${data?.length || 0}개 데이터 확인)`);
          results.success++;
        } else {
          console.error(`❌ [Supabase] 테이블 연결 실패: ${tableName}`, error?.message || "No data");
          results.failed++;
        }
      } catch (e) {
        console.error(`❌ [Supabase] 테이블 접속 오류: ${tableName}`, e);
        results.details[tableName] = false;
        results.failed++;
      }
    }
  }
  
  // 최종 결과 출력
  console.log('📊 [Supabase] 테이블 접속 테스트 결과:', {
    성공: results.success,
    실패: results.failed,
    성공률: `${Math.round((results.success / (results.success + results.failed)) * 100)}%`
  });
  
  return results;
};

// 애플리케이션 시작 시 테이블 접속 테스트 실행
testTables().then(results => {
  if (results.failed > 0) {
    console.warn(`⚠️ [Supabase] 일부 테이블(${results.failed}개)에 접속할 수 없습니다. 데이터 로딩에 문제가 발생할 수 있습니다.`);
  } else {
    console.log('✅ [Supabase] 모든 테이블에 성공적으로 접속했습니다.');
  }
});
