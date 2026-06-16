import { useState } from 'react';
import { MainVisualManager } from './MainVisualManager';

function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">분석 대시보드</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">섹션별 체류 시간</h3>
          <p className="text-3xl font-bold text-gray-900">0.0s</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">진입/이탈 플로우</h3>
          <p className="text-sm text-gray-600">데이터 로딩 중...</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">주요 이탈 지점</h3>
          <p className="text-sm text-gray-600">데이터 로딩 중...</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: '대시보드' },
    { id: 'users', name: '회원 관리' },
    { id: 'construction', name: '시공 관리' },
    { id: 'rental', name: '렌탈 관리' },
    { id: 'dj', name: 'DJ 관리' },
    { id: 'mainVisual', name: '메인비주얼 관리' },
    { id: 'contents', name: '컨텐츠 관리' },
    { id: 'news', name: '뉴스 관리' },
    { id: 'terms', name: '약관 관리' },
    { id: 'audit', name: '감사 관리' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Admin Dashboard</h1>
        <div className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)} 
              className={`block w-full text-left p-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
            >
              {item.name}
            </button>
          ))}
          
          {/* Settings Submenu */}
          <div className="pt-4 border-t border-gray-700">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="block w-full text-left p-3 rounded-lg hover:bg-gray-800 transition-colors font-bold"
            >
              설정 {showSettings ? '▲' : '▼'}
            </button>
            {showSettings && (
              <div className="pl-4 space-y-1 mt-1">
                <button onClick={() => setActiveTab('adminSettings')} className={`block w-full text-left p-2 rounded ${activeTab === 'adminSettings' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>관리자 관리</button>
                <button onClick={() => setActiveTab('sseSettings')} className={`block w-full text-left p-2 rounded ${activeTab === 'sseSettings' ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>SSE 관리</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'mainVisual' && <MainVisualManager />}
          {!['dashboard', 'mainVisual'].includes(activeTab) && (
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.name || 
               (activeTab === 'adminSettings' ? '관리자 관리' : 
                activeTab === 'sseSettings' ? 'SSE 관리' : '준비 중입니다...')}
            </h2>
          )}
        </div>
      </main>
    </div>
  );
}
