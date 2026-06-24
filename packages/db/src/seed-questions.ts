import { db } from './index';
import { constructionQuestions } from './schema';

const initialQuestions = [
  { order: 1, title: "현재 운영 상태를 알려주세요.", type: "radio", options: JSON.stringify(["신규 창업 예정입니다.", "현재 영업 중입니다.", "리뉴얼(인테리어) 예정입니다.", "기존 음향을 교체하고 싶습니다."]) },
  { order: 2, title: "지역을 선택해주세요.", type: "dropdown", options: JSON.stringify(["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]) },
  { order: 3, title: "어떤 공간인가요?", type: "grid", options: JSON.stringify([
    { label: "카페", emoji: "☕" }, { label: "와인바", emoji: "🍷" }, { label: "바(BAR)", emoji: "🍸" },
    { label: "라운지", emoji: "🎧" }, { label: "클럽", emoji: "🕺" }, { label: "음식점", emoji: "🍖" },
    { label: "고깃집", emoji: "🥩" }, { label: "한식", emoji: "🥘" }, { label: "일식", emoji: "🍣" },
    { label: "레스토랑", emoji: "🥂" }, { label: "의류매장", emoji: "👕" }, { label: "헬스장", emoji: "🏋️" },
    { label: "미용실", emoji: "💇" }, { label: "호텔", emoji: "🏨" }, { label: "행사장", emoji: "🎪" },
    { label: "사무실", emoji: "🏢" }, { label: "학원", emoji: "🏫" }, { label: "기타", emoji: "🏪" }
  ]) },
  { order: 4, title: "공간 규모는 어느 정도인가요?", type: "radio", options: JSON.stringify(["20평 미만", "20~40평", "40~60평", "60~100평", "100~200평", "200평 이상"]) },
  { order: 5, title: "천장 높이는 어느 정도인가요?", type: "radio", options: JSON.stringify(["2.5m 이하", "2.5~3m", "3~5m", "5m 이상", "잘 모르겠습니다."]) },
  { order: 6, title: "음악은 어떤 목적으로 사용하시나요?", type: "checkbox", options: JSON.stringify(["고객에게 편안한 BGM", "매장 분위기를 살리는 감성 음악", "라이브 공연", "DJ 공연", "클럽 운영", "행사 및 이벤트", "마이크 방송", "발표 및 세미나", "영상 상영", "노래방"]) },
  { order: 7, title: "어떤 사운드를 원하시나요?", type: "radio", options: JSON.stringify(["자연스럽고 편안한 음색", "선명한 보컬 전달력", "풍부한 저음", "공간 전체가 균일하게 들리는 사운드", "클럽 수준의 강력한 출력", "전문가와 상담 후 결정"]) },
  { order: 8, title: "설치를 원하는 장비는 무엇인가요?", type: "checkbox", options: JSON.stringify(["스피커", "우퍼", "앰프", "DSP", "믹서", "DJ 장비", "무선마이크", "유선마이크", "TV 연결", "프로젝터 연결", "HDMI 음향연동", "조명 시스템", "기타"]) },
  { order: 9, title: "현재 음향장비가 있으신가요?", type: "radio", options: JSON.stringify(["전혀 없습니다.", "일부 있습니다.", "대부분 있습니다.", "기존 장비를 활용하고 싶습니다."]) },
  { order: 10, title: "인테리어 공사는 어느 단계인가요?", type: "radio", options: JSON.stringify(["공사 시작 전", "공사 진행 중", "거의 완료", "이미 운영 중"]) },
  { order: 11, title: "시공 희망 일정", type: "radio", options: JSON.stringify(["최대한 빠르게", "1개월 이내", "2~3개월", "일정 미정"]) },
  { order: 12, title: "예상 예산을 알려주세요.", type: "radio", options: JSON.stringify(["100만원 이하", "100~300만원", "300~500만원", "500~1,000만원", "1,000~3,000만원", "3,000만원 이상", "전문가 상담 후 결정"]) },
  { order: 13, title: "추가로 원하시는 사항이 있으신가요?", type: "text", options: JSON.stringify([]) },
  { order: 14, title: "무료 음향 컨설팅 신청", type: "form", options: JSON.stringify(["성함", "연락처", "이메일(선택)", "상호명(선택)", "도면/사진/참고이미지 업로드"]) },
];

async function seed() {
  await db.insert(constructionQuestions).values(initialQuestions);
  console.log("Construction questions seeded successfully");
}

seed();
