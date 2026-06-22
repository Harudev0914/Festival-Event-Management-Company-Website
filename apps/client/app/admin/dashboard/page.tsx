'use client';
import { useState, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, events: 0, revenue: 0 });

  useEffect(() => {
    fetch('/api/admin/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  const data = [
    { name: '유저', value: stats.users },
    { name: '이벤트', value: stats.events },
    { name: '수익', value: stats.revenue },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-white">
        <Sidebar />
        <main className="flex-1 p-10 bg-white">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">대시보드</h1>
            <p className="text-gray-500 mt-2">Klipse 관리자 포털 현황입니다.</p>
          </header>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: '총 유저', value: stats.users },
              { title: '총 이벤트', value: stats.events },
              { title: '총 수익', value: `₩${stats.revenue.toLocaleString()}` },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:border-gray-200 transition-all">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{stat.title}</h3>
                <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-gray-100 bg-gray-50 h-96">
            <h3 className="text-lg font-bold text-gray-900 mb-6">통계 요약</h3>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '1rem', border: 'none' }} />
                <Bar dataKey="value" fill="#111827" radius={[8, 8, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
