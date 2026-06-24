'use client';
import { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["CPU", "쿨러/튜닝", "메인보드", "메모리", "그래픽카드", "SSD", "HDD", "케이스", "파워", "소프트웨어"];

const PRODUCTS = [
  { id: 1, name: "AMD 라이젠7-5세대 7800X3D (라파엘) (멀티팩 정품)", price: 441280, desc: "AMD(소켓AM5)/8코어/16스레드/메모리 규격:DDR5/탑재/5세대(Zen4)/5nm/기본:4.2GHz/...", category: "CPU" },
  { id: 2, name: "인텔 코어 울트라7 시리즈2 270K Plus (애로우레이크 리프레시) (정품)", price: 534730, desc: "인텔(소켓1851)/P8+E12코어/24스레드/메모리 규격:DDR5/탑재/TSMC 3nm/기본:3.7GHz/...", category: "CPU" },
];

export default function RentalPage() {
  const [activeCategory, setActiveCategory] = useState("CPU");
  const [showFilters, setShowFilters] = useState(false);

  // 현재 카테고리에 맞는 상품만 필터링
  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-zinc-900 pt-20">
      {/* Container - Grid를 사용하여 메인과 사이드바 비율 고정 */}
      <div className="w-full mx-auto grid grid-cols-[1fr,auto] gap-0">
        
        {/* Main Content Area */}
        <div className="min-w-0 border-r border-zinc-200">
          {/* Search */}
          <div className="relative border-b-2 border-red-600">
            <input type="text" placeholder="상품명을 입력하세요." className="w-full p-4 outline-none text-sm" />
            <button className="absolute right-0 top-0 h-[52px] w-[52px] bg-red-600 text-white flex items-center justify-center"><Search size={24}/></button>
          </div>

          {/* New Filter Button */}
          <div className="p-4 border-b border-zinc-200">
            <button onClick={() => setShowFilters(true)} className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 font-bold text-sm">상세 설정</button>
          </div>

          {/* Product List */}
          <div>
            <div className="flex text-sm font-bold border-b border-zinc-200 bg-zinc-50">
              {['인기상품순', '신상순', '낮은가격순'].map(t => <button key={t} className="p-4 border-r border-zinc-200 text-zinc-600 hover:text-red-600">{t}</button>)}
            </div>
            {filteredProducts.map(p => (
              <div key={p.id} className="p-4 border-b border-zinc-100 hover:bg-zinc-50/50 transition duration-200">
                {/* Top Section: Image, Info, Action */}
                <div className="flex gap-4 w-full">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-zinc-50 border border-zinc-200 rounded shrink-0 flex items-center justify-center text-zinc-300 text-[10px]">이미지</div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-zinc-900 hover:text-red-600 cursor-pointer transition line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="font-bold text-sm text-red-600 mt-2">{p.price.toLocaleString()}원</p>
                  </div>

                  {/* Action */}
                  <div className="text-right shrink-0 w-12 flex flex-col items-center justify-center">
                    <button className="p-2 border border-zinc-300 hover:bg-zinc-100 transition rounded">
                      <ShoppingCart size={16} className="text-zinc-600" />
                    </button>
                  </div>
                </div>

                {/* Specs Section - Full width */}
                <div className="bg-zinc-100 p-2 mt-3 rounded w-full">
                  <p className="text-[11px] text-zinc-600 leading-relaxed truncate">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-24 lg:w-40 shrink-0">
          <div className="border-t-0">
            <div className="bg-zinc-800 text-white p-2 font-bold text-[10px] text-center">PC 주요구성</div>
            <div className="flex flex-col">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full h-10 border-b border-zinc-200 text-[10px] font-bold flex items-center justify-center ${activeCategory === cat ? 'bg-red-600 text-white' : 'hover:bg-zinc-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bottom Sheet with Framer Motion */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50" 
            onClick={() => setShowFilters(false)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white p-6 rounded-t-2xl md:rounded-lg shadow-2xl" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">상세 설정</h3>
                  <button onClick={() => setShowFilters(false)} className="text-zinc-500 hover:text-black">닫기</button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div><label className="font-bold text-zinc-700 text-xs">제조사</label><div className="mt-2"><input type="checkbox"/> 인텔 <input type="checkbox" className="ml-2"/> AMD</div></div>
                <div><label className="font-bold text-zinc-700 text-xs">코어 수</label><select className="border w-full p-3 mt-2 rounded"><option>전체</option></select></div>
              </div>
              <button className="w-full mt-8 py-3 bg-red-600 text-white font-bold rounded shadow-lg hover:bg-red-700 transition" onClick={() => setShowFilters(false)}>적용하기</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
