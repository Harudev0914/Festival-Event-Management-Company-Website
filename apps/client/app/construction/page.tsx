'use client';
import { useState, useRef } from "react";
import { Check, CheckCircle2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Options as defined in requirements
const SPACE_OPTIONS = [{ label: "카페", emoji: "☕" }, { label: "와인바", emoji: "🍷" }, { label: "바(BAR)", emoji: "🍸" }, { label: "라운지", emoji: "🎧" }, { label: "클럽", emoji: "🕺" }, { label: "음식점", emoji: "🍖" }, { label: "고깃집", emoji: "🥩" }, { label: "한식", emoji: "🥘" }, { label: "일식", emoji: "🍣" }, { label: "레스토랑", emoji: "🥂" }, { label: "의류매장", emoji: "👕" }, { label: "헬스장", emoji: "🏋️" }, { label: "미용실", emoji: "💇" }, { label: "호텔", emoji: "🏨" }, { label: "행사장", emoji: "🎪" }, { label: "사무실", emoji: "🏢" }, { label: "학원", emoji: "🏫" }, { label: "기타", emoji: "🏪" }];
const STATUS_OPTIONS = ["신규 창업 예정입니다.", "현재 영업 중입니다.", "리뉴얼(인테리어) 예정입니다.", "기존 음향을 교체하고 싶습니다."];
const REGION_OPTIONS = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
const SCALE_OPTIONS = ["20평 미만", "20~40평", "40~60평", "60~100평", "100~200평", "200평 이상"];
const HEIGHT_OPTIONS = ["2.5m 이하", "2.5~3m", "3~5m", "5m 이상", "잘 모르겠습니다."];
const PURPOSE_OPTIONS = ["고객에게 편안한 BGM", "매장 분위기를 살리는 감성 음악", "라이브 공연", "DJ 공연", "클럽 운영", "행사 및 이벤트", "마이크 방송", "발표 및 세미나", "영상 상영", "노래방"];
const SOUND_OPTIONS = ["자연스럽고 편안한 음색", "선명한 보컬 전달력", "풍부한 저음", "공간 전체가 균일하게 들리는 사운드", "클럽 수준의 강력한 출력", "전문가와 상담 후 결정"];
const EQUIPMENT_OPTIONS = ["스피커", "우퍼", "앰프", "DSP", "믹서", "DJ 장비", "무선마이크", "유선마이크", "TV 연결", "프로젝터 연결", "HDMI 음향연동", "조명 시스템", "기타"];
const OWNERSHIP_OPTIONS = ["전혀 없습니다.", "일부 있습니다.", "대부분 있습니다.", "기존 장비를 활용하고 싶습니다."];
const INTERIOR_OPTIONS = ["공사 시작 전", "공사 진행 중", "거의 완료", "이미 운영 중"];
const SCHEDULE_OPTIONS = ["최대한 빠르게", "1개월 이내", "2~3개월", "일정 미정"];
const BUDGET_OPTIONS = ["100만원 이하", "100~300만원", "300~500만원", "500~1,000만원", "1,000~3,000만원", "3,000만원 이상", "전문가 상담 후 결정"];

interface FormData {
  selectedStatus?: string;
  selectedRegion?: string;
  selectedSpace?: string;
  customSpaceInput?: string;
  selectedScale?: string;
  selectedHeight?: string;
  selectedPurposes: string[];
  selectedSound?: string;
  selectedEquipments: string[];
  currentEquipment?: string;
  interiorStage?: string;
  desiredSchedule?: string;
  expectedBudget?: string;
  additionalNotes?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactCompany?: string;
  uploadedFiles: File[];
}

export default function ConstructionPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({ selectedPurposes: [], selectedEquipments: [], uploadedFiles: [] });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateData = <K extends keyof FormData>(key: K, val: FormData[K]) => {
    setError(null);
    setData((prev) => ({ ...prev, [key]: val }));
  };
  
  const validateStep = (): boolean => {
    switch(step) {
      case 1: return !!data.selectedStatus;
      case 2: return !!data.selectedRegion;
      case 3: return !!data.selectedSpace && (data.selectedSpace !== "기타" || !!data.customSpaceInput);
      case 4: return !!data.selectedScale;
      case 5: return !!data.selectedHeight;
      case 6: return data.selectedPurposes.length > 0;
      case 7: return !!data.selectedSound;
      case 8: return data.selectedEquipments.length > 0;
      case 9: return !!data.currentEquipment;
      case 10: return !!data.interiorStage;
      case 11: return !!data.desiredSchedule;
      case 12: return !!data.expectedBudget;
      case 13: return true;
      case 14: return !!data.contactName && !!data.contactPhone;
      default: return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setError(null);
      if (step < 14) setStep(prev => prev + 1);
    } else {
      setError("필수 항목을 선택하거나 입력해주세요.");
    }
  };
  const handlePrevStep = () => { setError(null); if (step > 1) setStep(prev => prev - 1); };

  const renderGrid = (options: (string | {label: string, emoji: string})[], key: keyof FormData, multi = false) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.label;
        const isSelected = multi 
          ? (data[key] as string[])?.includes(val) 
          : data[key] === val;
        
        return (
          <button key={val} type="button" onClick={() => {
          if (multi) {
            const current = (data[key] as string[]) || [];
            updateData(key, (isSelected ? current.filter((s: string) => s !== val) : [...current, val]) as FormData[typeof key]);
          } else updateData(key, val as FormData[typeof key]);
          }} className={`p-4 text-left border rounded-sm flex justify-between items-center ${isSelected ? 'border-[#c84d4b] bg-[#c84d4b]/10' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'}`}>
            <span className="text-sm">{typeof opt === 'object' ? `${opt.emoji} ${opt.label}` : opt}</span>
            {isSelected && <Check size={16} className="text-[#c84d4b]" />}
          </button>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch(step) {
      case 1: return <div className="space-y-4"><h2 className="text-xl font-bold">1. 현재 운영 상태는?</h2>{renderGrid(STATUS_OPTIONS, 'selectedStatus')}</div>;
      case 2: return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">2. 지역은?</h2>
          <div className="relative">
            <motion.button 
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="w-full bg-zinc-900 border border-zinc-700 p-4 flex justify-between items-center rounded-sm hover:border-[#c84d4b] transition-all"
            >
              <span className={data.selectedRegion ? "text-white" : "text-zinc-500"}>
                {data.selectedRegion || "지역을 선택해 주세요"}
              </span> 
              <ChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}/>
            </motion.button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-700 rounded-sm p-2 grid grid-cols-3 gap-2 shadow-2xl"
                >
                  {REGION_OPTIONS.map(r => (
                    <button 
                      key={r} 
                      type="button"
                      onClick={() => {updateData('selectedRegion', r); setDropdownOpen(false)}} 
                      className={`p-3 text-xs rounded-sm transition ${data.selectedRegion === r ? 'bg-[#c84d4b] text-white' : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'}`}
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
      case 3: return <div className="space-y-4"><h2 className="text-xl font-bold">3. 어떤 공간인가요?</h2>{renderGrid(SPACE_OPTIONS, 'selectedSpace')}</div>;
      case 4: return <div className="space-y-4"><h2 className="text-xl font-bold">4. 공간 규모는 어느 정도인가요?</h2>{renderGrid(SCALE_OPTIONS, 'selectedScale')}</div>;
      case 5: return <div className="space-y-4"><h2 className="text-xl font-bold">5. 천장 높이는 어느 정도인가요?</h2>{renderGrid(HEIGHT_OPTIONS, 'selectedHeight')}</div>;
      case 6: return <div className="space-y-4"><h2 className="text-xl font-bold">6. 음악은 어떤 목적으로 사용하시나요?</h2>{renderGrid(PURPOSE_OPTIONS, 'selectedPurposes', true)}</div>;
      case 7: return <div className="space-y-4"><h2 className="text-xl font-bold">7. 어떤 사운드를 원하시나요?</h2>{renderGrid(SOUND_OPTIONS, 'selectedSound')}</div>;
      case 8: return <div className="space-y-4"><h2 className="text-xl font-bold">8. 설치를 원하는 장비는 무엇인가요?</h2>{renderGrid(EQUIPMENT_OPTIONS, 'selectedEquipments', true)}</div>;
      case 9: return <div className="space-y-4"><h2 className="text-xl font-bold">9. 현재 음향장비가 있으신가요?</h2>{renderGrid(OWNERSHIP_OPTIONS, 'currentEquipment')}</div>;
      case 10: return <div className="space-y-4"><h2 className="text-xl font-bold">10. 인테리어 공사는 어느 단계인가요?</h2>{renderGrid(INTERIOR_OPTIONS, 'interiorStage')}</div>;
      case 11: return <div className="space-y-4"><h2 className="text-xl font-bold">11. 시공 희망 일정</h2>{renderGrid(SCHEDULE_OPTIONS, 'desiredSchedule')}</div>;
      case 12: return <div className="space-y-4"><h2 className="text-xl font-bold">12. 예상 예산을 알려주세요.</h2>{renderGrid(BUDGET_OPTIONS, 'expectedBudget')}</div>;
      case 13: return <div className="space-y-4"><h2 className="text-xl font-bold">13. 추가로 원하시는 사항이 있으신가요?</h2><textarea className="w-full bg-zinc-900 border border-zinc-800 p-4 h-32" value={data.additionalNotes || ''} onChange={e => updateData('additionalNotes', e.target.value)} /></div>;
      case 14: return (
        <div className="space-y-6">
          <h2 className="text-xl font-bold">14. 무료 음향 컨설팅 신청</h2>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400">성함 (필수)</label>
              <input className={`w-full bg-zinc-900 border ${error && !data.contactName ? 'border-red-500' : 'border-zinc-800'} p-4`} placeholder="홍길동" value={data.contactName || ''} onChange={e => updateData('contactName', e.target.value)}/>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400">연락처 (필수)</label>
              <input className={`w-full bg-zinc-900 border ${error && (!data.contactPhone || !/^010-\d{3,4}-\d{4}$/.test(data.contactPhone)) ? 'border-red-500' : 'border-zinc-800'} p-4`} placeholder="010-0000-0000" value={data.contactPhone || ''} onChange={e => updateData('contactPhone', e.target.value)}/>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400">이메일 (선택)</label>
              <input className="w-full bg-zinc-900 border border-zinc-800 p-4" placeholder="example@klipse.com" value={data.contactEmail || ''} onChange={e => updateData('contactEmail', e.target.value)}/>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-400">상호명 (선택)</label>
              <input className="w-full bg-zinc-900 border border-zinc-800 p-4" placeholder="주식회사 클립스 컴퍼니" value={data.contactCompany || ''} onChange={e => updateData('contactCompany', e.target.value)}/>
            </div>

            <div className="border border-zinc-800 p-4 mt-4">
              <p className="text-sm text-zinc-400 mb-2">도면 및 자료 업로드 (선택)</p>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full py-3 bg-zinc-900 border border-zinc-700 text-sm hover:border-[#c84d4b] transition-all">파일 선택 ({data.uploadedFiles?.length || 0}개)</button>
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                updateData('uploadedFiles', [...(data.uploadedFiles || []), ...files]);
              }} />
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-20">
      <div className="max-w-4xl mx-auto bg-[#121212] p-8 border border-zinc-800 space-y-8 mt-10">
        {!submitted ? (
          <>
            <div className="h-1 bg-zinc-900"><div className="h-full bg-[#c84d4b] transition-all" style={{ width: `${((step - 1) / 14) * 100}%` }}/></div>
            {renderStep()}
            {error && <p className="text-[#c84d4b] text-sm font-bold text-center animate-pulse">{error}</p>}
            <div className="flex justify-between pt-8 border-t border-zinc-800">
              <button type="button" onClick={handlePrevStep} disabled={step === 1} className="px-6 py-3 bg-zinc-900 border border-zinc-800 disabled:opacity-50">이전</button>
              <button type="button" onClick={step === 14 ? () => setSubmitted(true) : handleNextStep} className="px-6 py-3 bg-[#c84d4b]">{step === 14 ? "상담 신청하기" : "다음"}</button>
            </div>
          </>
        ) : (
          <div className="text-center py-20"><CheckCircle2 size={64} className="mx-auto text-[#c84d4b] mb-4" /><h2 className="text-2xl font-bold">신청 완료</h2></div>
        )}
      </div>
    </div>
  );
}
