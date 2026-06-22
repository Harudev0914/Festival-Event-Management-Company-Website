'use client';
import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import { Edit2, Trash2 } from 'lucide-react';

export default function MainVisualPage() {
  const [visuals, setVisuals] = useState([]);

  useEffect(() => {
    fetch('/api/admin/visual')
      .then(res => res.json())
      .then(data => setVisuals(data))
      .catch(err => console.error('Failed to fetch visuals:', err));
  }, []);

  const toggleStatus = (id: number) => {
    // In a real implementation, this would call the API to update status
    setVisuals(prev => prev.map(v => v.id === id ? { ...v, status: !v.status } : v));
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 p-10 bg-white">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">메인비주얼 관리</h1>
              <p className="text-gray-500 mt-2">웹사이트 메인 화면에 노출할 비주얼을 관리합니다.</p>
            </div>
            <a href="/admin/visual/new" className="px-4 py-2 bg-black text-white rounded-[4px] hover:bg-gray-800">새 비주얼 추가</a>
          </header>

          <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-medium text-gray-600">ID</th>
                  <th className="p-4 font-medium text-gray-600">메인비주얼 명칭</th>
                  <th className="p-4 font-medium text-gray-600">마감 일자</th>
                  <th className="p-4 font-medium text-gray-600">등록 일자</th>
                  <th className="p-4 font-medium text-gray-600">타임스탬프</th>
                  <th className="p-4 font-medium text-gray-600">상태</th>
                  <th className="p-4 font-medium text-gray-600">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visuals.map((visual: any) => (
                  <tr key={visual.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-700">{visual.id}</td>
                    <td className="p-4 font-medium text-gray-900">{visual.title}</td>
                    <td className="p-4 text-gray-700">{visual.deadline}</td>
                    <td className="p-4 text-gray-700">{visual.regDate}</td>
                    <td className="p-4 text-gray-700">{visual.useTimestamp ? '사용' : '미사용'}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => toggleStatus(visual.id)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${visual.status ? 'bg-green-600' : 'bg-gray-300'}`}
                      >
                        <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${visual.status ? 'left-6' : 'left-1'}`} />
                      </button>
                    </td>
                    <td className="p-4 flex gap-2 items-center">
                      <a href={`/admin/visual/${visual.id}/edit`} className="text-gray-600 hover:text-black">
                        <Edit2 size={18} />
                      </a>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => {
                          if (confirm(`${visual.title}을(를) 정말 삭제하시겠습니까?`)) {
                            // In a real implementation, this would call the API to delete
                            setVisuals(prev => prev.filter(v => v.id !== visual.id));
                          }
                        }}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
