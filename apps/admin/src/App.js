"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLoginPage;
const react_1 = require("react");
function AdminLoginPage() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    return (<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tighter">Klipse</h1>
            <p className="text-sm text-gray-400 mt-2 font-medium uppercase tracking-widest">Admin Portal</p>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition placeholder-gray-400 text-sm" placeholder="관리자 이메일"/>
            </div>
            
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition placeholder-gray-400 text-sm" placeholder="비밀번호"/>
            </div>

            <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-2xl transition shadow-lg">
              로그인
            </button>
          </form>
        </div>
        
        <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-widest">
            &copy; 2026 Klipse Admin.
        </p>
      </div>
    </div>);
}
