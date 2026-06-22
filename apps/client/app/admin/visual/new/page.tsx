'use client';
import { useState } from 'react';
import Sidebar from "../../components/Sidebar";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function NewVisualPage() {
  const [formData, setFormData] = useState({
    backgroundType: 'image_file',
    backgroundValue: '',
    djImageType: 'image_file',
    djImageValue: '',
    detailContent: '',
    useTimestamp: false,
    timestampDate: '',
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
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-8 text-gray-900">새 메인비주얼 등록</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Background */}
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700">배경 설정</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg bg-white" value={formData.backgroundType} onChange={e => setFormData({...formData, backgroundType: e.target.value as any, backgroundValue: ''})}>
                    <option value="image_file">이미지 (File)</option>
                    <option value="image_url">이미지 (URL)</option>
                    <option value="video_file">영상 (File)</option>
                    <option value="video_url">영상 (URL)</option>
                  </select>
                  {renderValueInput(formData.backgroundType, formData.backgroundValue, (val) => setFormData({...formData, backgroundValue: val}), "경로 또는 URL 입력")}
                </div>

                {/* DJ Image */}
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-700">DJ 프로필 설정</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg bg-white" value={formData.djImageType} onChange={e => setFormData({...formData, djImageType: e.target.value as any, djImageValue: ''})}>
                    <option value="image_file">이미지 (File)</option>
                    <option value="image_url">이미지 (URL)</option>
                    <option value="video_file">영상 (File)</option>
                    <option value="video_url">영상 (URL)</option>
                  </select>
                  {renderValueInput(formData.djImageType, formData.djImageValue, (val) => setFormData({...formData, djImageValue: val}), "경로 또는 URL 입력")}
                </div>
              </div>

              {/* Detail Content */}
              <div className="space-y-2">
                <label className="block font-semibold text-gray-700">상세 내용</label>
                <textarea className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-black outline-none" value={formData.detailContent} onChange={e => setFormData({...formData, detailContent: e.target.value})} placeholder="상세 내용을 입력하세요" />
              </div>

              {/* Timestamp */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" checked={formData.useTimestamp} onChange={e => setFormData({...formData, useTimestamp: e.target.checked})} />
                  <span className="font-semibold text-gray-700">타임스탬프 기능 사용</span>
                </label>
                {formData.useTimestamp && (
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" value={formData.timestampDate} onChange={e => setFormData({...formData, timestampDate: e.target.value})} />
                )}
              </div>

              <button type="submit" className="w-full px-6 py-4 bg-black text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition">등록 완료</button>
            </form>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
