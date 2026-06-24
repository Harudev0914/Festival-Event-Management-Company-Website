'use client';
import { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";

interface Announcement {
  id: string;
  title: string;
  content: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch('/api/admin/announcements')
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error('Failed to fetch announcements:', err));
  }, []);

  return (
    <AdminLayout title="공지사항 관리" subtitle="사이트 공지사항을 관리합니다.">
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">공지사항 목록</h2>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black">
            새 공지 작성
          </button>
        </div>
        <div className="space-y-4">
          {announcements.map((a: Announcement) => (
            <div key={a.id} className="p-4 bg-white rounded-xl border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-500">{a.content}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-gray-500 hover:text-gray-900">수정</button>
                <button className="text-sm text-red-500 hover:text-red-700">삭제</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
