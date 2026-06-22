'use client';
import { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function NewVisualPage() {
  const [formData, setFormData] = useState({
    backgroundType: 'video_url',
    backgroundValue: 'AIogFe419-8',
    djImageType: 'image_url',
    djImageValue: 'https://www.ambitionmusik.com/image/artist/img_donmalik.png',
    title: 'MIDNIGHT CITY FESTIVAL 2026',
    detailContent: 'Next Festival Arrival',
    detailFont: 'sans-serif',
    useTimestamp: false,
    timestampDate: '2026-07-12',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save');

      alert('새 비주얼이 추가되었습니다.');
      window.location.href = '/admin/visual';
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const renderValueInput = (type: string, value: string, setValue: (val: string) => void, placeholder: string) => {
    const isFile = type.includes('file');
    return isFile ? (
      <input type="file" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" onChange={e => setValue(e.target.files?.[0]?.name || '')} />
    ) : (
      <input type="text" placeholder={placeholder} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none" value={value} onChange={e => setValue(e.target.value)} />
    );
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-10">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Preview Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center text-center">
              <h2 className="text-lg font-bold mb-4 text-gray-900 relative z-10 self-start">미리보기</h2>
              
              {/* Background & DJ (Existing logic) */}
              {/* Content Preview Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4">
                <p className="text-zinc-300 leading-relaxed font-bold tracking-[0.2em] uppercase text-xs md:text-sm">{formData.detailContent}</p>
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]" style={{ fontFamily: formData.detailFont }}>{formData.title}</h1>
                
                {formData.useTimestamp && (
                  <div className="text-white text-2xl font-bold">D-DAY: {formData.timestampDate}</div>
                )}
              </div>
            </div>

            {/* Configuration Form Section */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h1 className="text-2xl font-bold mb-8 text-gray-900">메인비주얼 설정</h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title & Detail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-700">타이틀</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="타이틀 입력" />
                    </div>
                    <div className="space-y-2">
                        <label className="block font-semibold text-gray-700">상세 내용</label>
                        <input className="w-full p-3 border border-gray-300 rounded-lg" value={formData.detailContent} onChange={e => setFormData({...formData, detailContent: e.target.value})} placeholder="상세 내용 입력" />
                    </div>
                </div>

                {/* ... (rest of form) */}
                <button type="submit" className="w-full px-6 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition">등록 완료</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
