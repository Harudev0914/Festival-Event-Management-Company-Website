'use client';
import { useState } from 'react';
import { LayoutDashboard, Users, MessageSquare, Image, Package, HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: '대시보드', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: '회원 관리', icon: Users, path: '/admin/users' },
    { name: '문의 관리', icon: MessageSquare, path: '#' },
    { name: '메인비주얼 관리', icon: Image, path: '/admin/visual' },
    { name: '렌탈 관리', icon: Package, path: '#' },
    { name: 'FAQ 관리', icon: HelpCircle, path: '/admin/faq' },
  ];

  return (
    // Updated width to be dynamic, full expansion allowed.
    <div className={`h-screen bg-[#1a1a1a] text-[#dddedf] transition-all duration-300 border-r border-[#333] ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between">
        <span className={`font-bold text-lg text-white ${!isOpen && 'hidden'}`}>Klipse Admin</span>
        <button onClick={() => setIsOpen(!isOpen)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#333] text-[#dddedf]">
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="mt-6 px-3 space-y-1">
        {menuItems.map((item) => (
          <div key={item.name}>
            <a 
              href={item.path} 
              className="flex items-center gap-4 px-2 h-9 rounded-lg hover:bg-[#333] hover:text-white transition-all group"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#dddedf] group-hover:text-white" />
              </div>
              <span className={`${!isOpen && 'hidden'} flex-1 font-medium`}>{item.name}</span>
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}
