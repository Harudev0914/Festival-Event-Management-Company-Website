'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#c84d4b]/5 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Login Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
          {/* Accent Line */}
          <div className="h-2 bg-[#c84d4b]" />
          
          <div className="p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tighter">Klipse</h1>
              <p className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-widest">Admin Portal</p>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#c84d4b]/20 focus:border-[#c84d4b] outline-none transition placeholder-gray-400 text-sm"
                  placeholder="관리자 이메일"
                />
              </div>
              
              <div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#c84d4b]/20 focus:border-[#c84d4b] outline-none transition placeholder-gray-400 text-sm"
                  placeholder="비밀번호"
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-gray-500 cursor-pointer hover:text-gray-800 transition">
                  <input type="checkbox" className="mr-2 w-4 h-4 rounded border-gray-300 accent-[#c84d4b]" /> 
                  로그인 유지
                </label>
                <a href="#" className="text-[#c84d4b] font-semibold hover:underline">비밀번호 찾기</a>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-[#c84d4b] hover:bg-[#a63f3d] text-white font-bold rounded-2xl transition shadow-lg shadow-[#c84d4b]/20"
              >
                로그인
              </button>
            </form>
          </div>
        </div>
        
        <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-widest">
            &copy; 2026 Klipse Admin.
        </p>
      </div>
    </div>
  );
}
