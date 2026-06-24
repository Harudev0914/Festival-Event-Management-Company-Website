'use client';
import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";

interface Submission {
  contactName: string;
  contactPhone: string;
  createdAt: string;
  status: string;
}

export default function ConstructionSubmissionsPage() {
  const [submissions] = useState<Submission[]>([]);

  useEffect(() => {
    // 실제 API 호출 로직으로 교체 필요
    // fetch('/api/construction/admin/list').then(res => res.json()).then(setSubmissions);
  }, []);

  return (
    <AdminLayout title="상담 신청 내역">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">상담 신청 내역</h1>
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm">
          <table className="w-full text-left">
            <thead className="bg-zinc-800 text-xs uppercase text-zinc-400">
              <tr>
                <th className="p-4">성함</th>
                <th className="p-4">연락처</th>
                <th className="p-4">신청일</th>
                <th className="p-4">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {submissions.map((s, i) => (
                <tr key={i} className="hover:bg-zinc-800/50">
                  <td className="p-4">{s.contactName}</td>
                  <td className="p-4">{s.contactPhone}</td>
                  <td className="p-4">{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
