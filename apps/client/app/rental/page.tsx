'use client';
import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  desc: string;
  manufacturer: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const DJ_PRODUCTS: Product[] = [
  { id: 1, name: "Pioneer DJ CDJ-3000", price: 3200000, desc: "Professional DJ Multi Player", manufacturer: "Pioneer DJ", category: "CDJ" },
  { id: 2, name: "Pioneer DJ DJM-A9", price: 3500000, desc: "4-channel Professional DJ Mixer", manufacturer: "Pioneer DJ", category: "Mixer" },
  { id: 3, name: "Technics SL-1200MK7", price: 1200000, desc: "Direct Drive Turntable", manufacturer: "Technics", category: "Turntable" },
];

const DJ_CATEGORIES = Array.from(new Set(DJ_PRODUCTS.map(p => p.category)));

export default function RentalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [cart, setCart] = useState<Record<string, CartItem[]>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = DJ_PRODUCTS.filter(p => 
    (searchTerm === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilters.length === 0 || selectedFilters.includes(p.category))
  );

  const toggleFilter = (cat: string) => {
    setSelectedFilters(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const categoryItems = prev[product.category] || [];
      const existingItem = categoryItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return { ...prev, [product.category]: categoryItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) };
      }
      return { ...prev, [product.category]: [...categoryItems, { ...product, quantity: 1 }] };
    });
  };

  const updateQuantity = (category: string, productId: number, delta: number) => {
    setCart(prev => ({
        ...prev,
        [category]: prev[category].map(item => item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
    }));
  };

  const removeItem = (category: string, productId: number) => {
    setCart(prev => ({ ...prev, [category]: prev[category].filter(item => item.id !== productId) }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-24">
      <div className="max-w-7xl mx-auto my-12 space-y-12">
        
        {/* Ad Section */}
        <div className="bg-gradient-to-r from-[#c84d4b] to-zinc-900 p-8 rounded-lg text-center border border-[#c84d4b]">
            <h2 className="text-3xl font-bold mb-2">특별 프로모션</h2>
            <p className="text-zinc-300">지금 DJ 장비를 렌탈하고 페스티벌 무대를 준비하세요!</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
            {/* Left Area: Filters + Products */}
            <div className="col-span-9 space-y-6">
            <div className="relative">
                <input 
                type="text" 
                placeholder="DJ 장비를 검색하세요." 
                className="w-full bg-zinc-900 text-white p-4 pl-4 border border-zinc-700 rounded-md focus:border-[#c84d4b] focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-4 text-zinc-500" />
            </div>

            <div className="bg-zinc-900 p-6 rounded-md border border-zinc-800 text-sm">
                <div className="flex gap-4 items-start">
                    <span className="font-bold text-zinc-400 mt-1">장비 분류:</span>
                    <div className="flex gap-4 flex-wrap">
                        {DJ_CATEGORIES.map(cat => (
                            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${selectedFilters.includes(cat) ? 'bg-[#c84d4b] border-[#c84d4b]' : 'border-zinc-600 group-hover:border-[#c84d4b]'}`}>
                                    <input type="checkbox" className="hidden" checked={selectedFilters.includes(cat)} onChange={() => toggleFilter(cat)}/>
                                    {selectedFilters.includes(cat) && <span className="text-white text-xs">✓</span>}
                                </div>
                                <span className="group-hover:text-[#c84d4b] transition">{cat}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {filteredProducts.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-zinc-900 p-6 rounded-md border border-zinc-800 hover:border-zinc-600 transition">
                    <div>
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-sm text-zinc-400">{p.desc}</p>
                    </div>
                    <div className="text-right">
                    <p className="font-bold text-xl">{p.price.toLocaleString()}원</p>
                    <button 
                        onClick={() => addToCart(p)}
                        className="bg-[#c84d4b] hover:bg-[#a63f3d] text-white px-4 py-2 mt-2 rounded transition flex items-center gap-1 font-medium"
                    >
                        담기 <ChevronRight size={16} />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(page => (
                    <button 
                        key={page} 
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 border ${currentPage === page ? 'bg-[#c84d4b] border-[#c84d4b]' : 'bg-zinc-900 border-zinc-700'} hover:bg-zinc-800`}
                    >
                        {page}
                    </button>
                ))}
                <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800">{">"}</button>
            </div>
            </div>

            {/* Right Area: Configurator */}
            <div className="col-span-3">
            <div className="bg-zinc-900 p-4 rounded-md border border-zinc-800 sticky top-24">
                <h2 className="text-lg font-bold mb-4 border-b border-zinc-700 pb-2 text-white">렌탈 견적 구성</h2>
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                {DJ_CATEGORIES.map(cat => (
                    <div 
                        key={cat} 
                        className="border border-zinc-700 rounded overflow-hidden cursor-pointer"
                        onClick={() => toggleFilter(cat)}
                    >
                        <div className={`p-2 text-sm font-bold text-white uppercase tracking-wider ${selectedFilters.includes(cat) ? 'bg-[#a63f3d]' : 'bg-[#c84d4b]'}`}>
                            {cat}
                        </div>
                        {cart[cat]?.map(item => (
                            <div key={item.id} className="p-3 border-b border-zinc-700 last:border-b-0">
                                <div className="text-sm mb-2 text-white font-medium">{item.name}</div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center border border-zinc-600 rounded">
                                        <button onClick={() => updateQuantity(item.category, item.id, -1)} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700">-</button>
                                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.category, item.id, 1)} className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700">+</button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-[#c84d4b]">{(item.price * item.quantity).toLocaleString()}원</span>
                                        <button onClick={() => removeItem(item.category, item.id)} className="text-zinc-500 hover:text-[#c84d4b]">✕</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                </div>

                {/* Sidebar Footer */}
                <div className="mt-6 pt-4 border-t border-zinc-700">
                    <div className="flex justify-between items-center mb-4 text-sm text-zinc-400">
                        <span>총 {Object.values(cart).flat().reduce((sum, item) => sum + item.quantity, 0)}개 품목 선택</span>
                        <button onClick={() => setCart({})} className="hover:text-white">전체삭제</button>
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-white">총 합계금액</span>
                        <span className="text-2xl font-bold text-[#c84d4b]">{Object.values(cart).flat().reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}원</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-4">
                        <button className="text-xs p-2 bg-[#c84d4b] hover:bg-[#a63f3d] text-white font-bold">구매하기</button>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                        {['저장', '불러오기', '공유', '캡처', '신청'].map(label => (
                            <button key={label} className="text-[10px] p-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-400">{label}</button>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
