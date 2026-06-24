'use client';
import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Plus, Trash2, GripVertical } from "lucide-react";

// Mock Data Type
interface Question {
  id: number;
  order: number;
  title: string;
  subText?: string;
  type: string;
  options: string[];
}

export default function ConstructionSettingsPage() {
  const [questions] = useState<Question[]>([
    { id: 1, order: 1, title: "현재 운영 상태를 알려주세요.", type: "radio", options: ["신규 창업 예정입니다.", "현재 영업 중입니다.", "리뉴얼(인테리어) 예정입니다.", "기존 음향을 교체하고 싶습니다."] },
    { id: 2, order: 2, title: "지역을 선택해주세요.", type: "dropdown", options: ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"] },
  ]);

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  return (
    <AdminLayout title="시공 질문 설정">
      <main className="w-full h-full bg-white p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">시공 질문 설정</h1>
          <button className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-md font-bold text-sm hover:bg-black transition">
            <Plus size={16} /> 새 질문 추가
          </button>
        </div>

        <div className="space-y-4">
          {questions.sort((a, b) => a.order - b.order).map((q) => (
            <div key={q.id} className="border border-zinc-200 rounded-lg p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <GripVertical className="text-zinc-300 cursor-grab" />
                    <span className="w-8 h-8 flex items-center justify-center bg-zinc-100 rounded-full font-bold text-zinc-500">{q.order}</span>
                    <h3 className="font-bold text-lg">{q.title}</h3>
                    <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[11px] rounded font-bold uppercase">{q.type}</span>
                </div>
                <button onClick={() => setEditingQuestion(q)} className="text-zinc-500 hover:text-red-600 font-bold text-sm">수정</button>
              </div>

              {/* Options Preview */}
              <div className="bg-zinc-50 p-4 rounded text-sm text-zinc-600">
                <p className="font-bold text-zinc-800 mb-2">옵션 미리보기:</p>
                <div className="flex flex-wrap gap-2">
                    {q.options.map((opt, i) => <span key={i} className="bg-white px-3 py-1 border border-zinc-200 rounded text-xs">{opt}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* Editor Modal/Drawer (Simplified for logic) */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <div className="w-full max-w-xl bg-white h-full p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">질문 수정</h2>
                <button onClick={() => setEditingQuestion(null)}>닫기</button>
            </div>
            <div className="space-y-4">
                <input className="w-full border p-3 rounded" defaultValue={editingQuestion.title} />
                <select className="w-full border p-3 rounded" defaultValue={editingQuestion.type}>
                    <option value="radio">라디오 (단일 선택)</option>
                    <option value="checkbox">체크박스 (복수 선택)</option>
                    <option value="dropdown">드롭다운</option>
                    <option value="grid">그리드 (아이콘형)</option>
                    <option value="text">자유 입력</option>
                </select>
                <div className="space-y-2">
                    <label className="text-sm font-bold">옵션 설정</label>
                    {editingQuestion.options.map((opt, i) => (
                        <div key={i} className="flex gap-2">
                            <input className="flex-1 border p-2 rounded" defaultValue={opt} />
                            <button className="text-red-500"><Trash2 size={18}/></button>
                        </div>
                    ))}
                    <button className="text-xs text-blue-600">+ 옵션 추가</button>
                </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
