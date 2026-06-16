'use client';

import { useState } from 'react';
import { MainVisualManager } from './MainVisualManager';
import { 
  LayoutDashboard, Users, Hammer, Calendar, Music, 
  ImageIcon, FileText, Newspaper, FileCheck, 
  ClipboardList, Settings, ChevronDown, ChevronUp, X, Menu, Instagram, Youtube
} from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">분석 대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">섹션별 체류 시간</h3>
          <p className="text-3xl font-bold text-gray-900">0.0s</p>
        </div>
      </div>
    </div>
  );
}

export const AdminApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['members', 'products', 'inquiries']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const menuItems = [
    { id: 'dashboard', name: '대시보드', icon: LayoutDashboard },
    { 
      id: 'members', 
      name: '회원 관리', 
      icon: Users,
      sub: [{ id: 'djList', name: 'DJ 목록' }, { id: 'djReview', name: 'DJ 심사 목록' }] 
    },
    { 
      id: 'inquiries', 
      name: '고객 문의 관리', 
      icon: ClipboardList,
      sub: [{ id: 'constInquiry', name: '시공 문의' }, { id: 'rentalInquiry', name: '렌탈 문의' }, { id: 'djInquiry', name: 'DJ 문의' }] 
    },
    { 
      id: 'products', 
      name: '상품 관리', 
      icon: Hammer,
      sub: [{ id: 'construction', name: '시공 관리' }, { id: 'rental', name: '렌탈 관리' }, { id: 'dj', name: 'DJ 관리' }] 
    },
    { id: 'mainVisual', name: '메인비주얼 관리', icon: ImageIcon },
    { id: 'contents', name: '컨텐츠 관리', icon: FileText },
    { id: 'news', name: '뉴스 관리', icon: Newspaper },
    { id: 'terms', name: '약관 관리', icon: FileCheck },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <nav className={`fixed inset-y-0 left-0 bg-[#121212] text-white z-50 transition-all duration-300 shadow-2xl ${isSidebarOpen ? 'w-72' : 'w-20'}`}>
        <div className="flex h-full">
          <div className="w-20 bg-[#111] flex flex-col items-center py-8 justify-between text-yellow-500">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-800 rounded-full">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex flex-col gap-6">
              <Instagram size={20} />
              <Youtube size={20} />
            </div>
          </div>

          {isSidebarOpen && (
            <div className="flex-1 p-8 flex flex-col">
              <h1 className="text-xl font-bold mb-10 tracking-wider">KLIPSE</h1>
              <div className="flex-1 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id}>
                      <button 
                        onClick={() => item.sub ? toggleMenu(item.id) : setActiveTab(item.id)}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-yellow-400 text-black font-bold' : 'text-gray-400 hover:text-white'}`}
                      >
                        <Icon size={18} />
                        <span className="text-sm tracking-wide">{item.name}</span>
                        {item.sub && <span className="ml-auto">{expandedMenus.includes(item.id) ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}</span>}
                      </button>
                      {item.sub && expandedMenus.includes(item.id) && (
                        <div className="pl-10 mt-1 space-y-1">
                          {item.sub.map(sub => (
                            <button key={sub.id} onClick={() => setActiveTab(sub.id)} className={`block py-1.5 text-sm transition-colors ${activeTab === sub.id ? 'text-yellow-400' : 'text-gray-500 hover:text-white'}`}>
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="pt-6 border-t border-gray-800">
                <button onClick={() => setActiveTab('settings')} className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white">
                    <Settings size={20}/>
                    <span className="text-sm tracking-wide">설정</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <main className={`flex-1 p-10 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'mainVisual' && <MainVisualManager />}
          {!['dashboard', 'mainVisual'].includes(activeTab) && (
            <div className="p-10 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800">
                {menuItems.flatMap(m => m.sub ? [m, ...m.sub] : m).find(item => item.id === activeTab)?.name || '준비 중입니다...'}
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
