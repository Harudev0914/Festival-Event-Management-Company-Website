'use client';
import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";

interface Question {
  id: number;
  order: number;
  title: string;
  type: string;
}

export default function ConstructionSettingsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // API 호출로 질문 데이터 로드 (예정)
    // fetch('/api/construction/questions').then(...)
    const initialData: Question[] = [
      { id: 1, order: 1, title: "공간 유형", type: "grid" },
      { id: 2, order: 2, title: "운영 상태", type: "radio" },
      // ... 14단계 데이터
    ];
    setTimeout(() => setQuestions(initialData), 0);
  }, []);

  return (
    <AdminLayout title="상담 신청 질문 설정">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">상담 신청 질문 설정</h1>
        <div className="bg-zinc-900 p-6 rounded-md">
          {questions.sort((a, b) => a.order - b.order).map((q) => (
            <div key={q.id} className="flex justify-between p-4 border-b border-zinc-700">
              <span>{q.order}. {q.title}</span>
              <button className="text-[#c84d4b]">수정</button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
