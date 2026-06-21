'use client';
import { useState } from "react";
import Calendar from "../components/Calendar";

const PROVIDERS = ["STAGE A", "STAGE B", "STAGE C", "STAGE D"];
const PRODUCTS = ["Standard", "Premium", "Custom"];

export default function ConstructionPage() {
  const [selectedRange, setSelectedRange] = useState<{ start: string | null, end: string | null }>({ start: null, end: null });
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[1]);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[1]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "시공 기간은 얼마나 걸리나요?", a: "현장 상황에 따라 다르지만 보통 3~5일 정도 소요됩니다." },
    { q: "AS 지원이 가능한가요?", a: "네, 시공 완료 후 1년간 무상 AS를 지원합니다." },
    { q: "견적 상담은 유료인가요?", a: "아니요, Klipse의 모든 시공 상담은 무료로 진행됩니다." }
  ];

  const isComplete = selectedRange.start && selectedRange.end;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-32 md:p-20 md:pt-40">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-2">
            <h3 className="text-[#c84d4b] font-bold text-sm uppercase">Klipse Partnership</h3>
            <h1 className="text-4xl md:text-5xl font-bold">최대 지원 혜택을 확인해 보세요!</h1>
        </div>

        {/* Calendar (Hidden when range selected) */}
        {!isComplete && (
            <div className="animate-in fade-in duration-500">
                <Calendar onRangeSelect={setSelectedRange} />
            </div>
        )}

        {/* Sections that appear only when a date range is selected */}
        {isComplete && (
            <div className="space-y-16 animate-in fade-in duration-500">
                {/* Selected Date Summary */}
                <div className="p-6 border-l-4 border-[#c84d4b] bg-zinc-900">
                    <h3 className="text-zinc-400 text-sm font-bold uppercase mb-1">시공 일자</h3>
                    <p className="text-xl font-bold">{selectedRange.start} - {selectedRange.end}</p>
                </div>
                
                <div className="space-y-10">
                    <div>
                        <label className="block text-sm font-bold text-zinc-400 mb-4">2. 유형 선택</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {PROVIDERS.map(p => (
                                <button key={p} onClick={() => setSelectedProvider(p)} className={`p-4 border-b-2 text-left transition ${selectedProvider === p ? 'border-[#c84d4b] text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{p}</button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-zinc-400 mb-4">3. 상품 선택</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {PRODUCTS.map(p => (
                                <button key={p} onClick={() => setSelectedProduct(p)} className={`p-4 border-b-2 text-left transition ${selectedProduct === p ? 'border-[#c84d4b] text-white' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{p}</button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t border-b border-zinc-800 text-center text-zinc-400">
                        추가 상세 옵션 영역
                    </div>
                </div>

                {/* Summary & Actions */}
                <div className="pt-6 space-y-6">
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-zinc-400">예약 일자</span>
                        <span className="font-bold text-[#c84d4b] text-xl">{selectedRange.start} ~ {selectedRange.end}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-zinc-400">예상 지원 혜택</span>
                        <span className="font-bold text-[#c84d4b] text-xl">520,000원</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-zinc-400">예상 비용 (월)</span>
                        <span className="font-bold text-xl">38,500원</span>
                    </div>
                    
                    <div className="pt-4">
                        <button className="w-full p-4 bg-[#c84d4b] hover:bg-[#a63f3d] text-white rounded-sm font-bold transition">상담받기</button>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="pt-12 border-t border-zinc-800 space-y-6">
                    <h2 className="text-2xl font-bold">자주 묻는 질문 (FAQ)</h2>
                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <div key={i} className="border border-zinc-800 rounded-sm">
                                <button 
                                    onClick={() => toggleFaq(i)}
                                    className="w-full text-left p-4 font-bold text-white flex justify-between items-center hover:bg-zinc-900 transition"
                                >
                                    {item.q}
                                    <span className="text-[#c84d4b]">{openIndex === i ? '−' : '+'}</span>
                                </button>
                                {openIndex === i && (
                                    <div className="p-4 pt-4 text-zinc-400 text-sm border-t border-zinc-800 bg-zinc-900/50">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
