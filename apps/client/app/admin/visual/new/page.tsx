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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving new visual:', formData);
    alert('새 비주얼이 추가되었습니다.');
    // In a real app, this would be an API call
    window.location.href = '/admin/visual';
  };

  const renderValueInput = (type: string, value: string, setValue: (val: string) => void, placeholder: string) => {
    const isFile = type.includes('file');
    return isFile ? (
      <input type="file" className="w-full p-2 border rounded" onChange={e => setValue(e.target.files?.[0]?.name || '')} />
    ) : (
      <input type="text" placeholder={placeholder} className="w-full p-2 border rounded" value={value} onChange={e => setValue(e.target.value)} />
    );
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 p-10 bg-white">
          <h1 className="text-3xl font-bold mb-6">새 비주얼 추가</h1>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
            
            {/* Background */}
            <div className="space-y-2">
              <label className="block font-medium">배경 타입</label>
              <select className="w-full p-2 border rounded" value={formData.backgroundType} onChange={e => setFormData({...formData, backgroundType: e.target.value, backgroundValue: ''})}>
                <option value="image_file">이미지 (File)</option>
                <option value="image_url">이미지 (URL)</option>
                <option value="video_file">영상 (File)</option>
                <option value="video_url">영상 (URL)</option>
              </select>
              {renderValueInput(formData.backgroundType, formData.backgroundValue, (val) => setFormData({...formData, backgroundValue: val}), "배경 경로 또는 URL")}
            </div>

            {/* DJ Image */}
            <div className="space-y-2">
              <label className="block font-medium">DJ 프로필</label>
              <select className="w-full p-2 border rounded" value={formData.djImageType} onChange={e => setFormData({...formData, djImageType: e.target.value, djImageValue: ''})}>
                <option value="image_file">이미지 (File)</option>
                <option value="image_url">이미지 (URL)</option>
                <option value="video_file">영상 (File)</option>
                <option value="video_url">영상 (URL)</option>
              </select>
              {renderValueInput(formData.djImageType, formData.djImageValue, (val) => setFormData({...formData, djImageValue: val}), "DJ 프로필 경로 또는 URL")}
            </div>

            {/* Detail Content */}
            <div className="space-y-2">
              <label className="block font-medium">상세 내용</label>
              <textarea className="w-full p-2 border rounded" rows={4} value={formData.detailContent} onChange={e => setFormData({...formData, detailContent: e.target.value})} />
            </div>

            {/* Timestamp */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-medium">
                <input type="checkbox" checked={formData.useTimestamp} onChange={e => setFormData({...formData, useTimestamp: e.target.checked})} />
                타임스탬프 사용
              </label>
              {formData.useTimestamp && (
                <input type="date" className="w-full p-2 border rounded" value={formData.timestampDate} onChange={e => setFormData({...formData, timestampDate: e.target.value})} />
              )}
            </div>

            <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded font-bold hover:bg-gray-800">저장</button>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
