'use client';
import { useState, useEffect } from 'react';
import AdminLayout from "../components/AdminLayout";

export default function FileManagerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  const fetchFiles = async () => {
    try {
      const res = await fetch('/api/admin/files');
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('/api/admin/files/upload', {
        method: 'POST',
        body: formData,
      });
      alert('파일 업로드 완료!');
      setFile(null);
      fetchFiles();
    } catch (err) {
      console.error('Failed to upload file:', err);
      alert('업로드 실패');
    }
  };

  return (
    <AdminLayout title="파일 관리자" subtitle="이미지 및 파일을 관리합니다.">
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">새 파일 업로드</h2>
        <div className="flex gap-4">
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black"
          />
          <button onClick={handleUpload} className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black">
            업로드
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">파일 목록</h2>
        <div className="space-y-2">
          {files.map((f: any) => (
            <div key={f.id} className="p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:bg-gray-50">
              <span className="font-medium text-gray-900">{f.fileName}</span>
              <span className="text-sm text-gray-500">{f.fileType}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
