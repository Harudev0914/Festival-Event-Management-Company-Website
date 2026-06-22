'use client';
import { useState } from 'react';
import { LayoutDashboard, Users, MessageSquare, Image, Package, HelpCircle, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const menuItems = [
    { name: '대시보드', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: '회원 관리', icon: Users, path: '/admin/users' },
    {
      name: '문의 관리', icon: MessageSquare, hasSub: true, subItems: [
        { name: '시공 문의', path: '/admin/inquiries/construction' },
        { name: '렌탈 문의', path: '/admin/inquiries/rental' },
        { name: 'DJ 문의', path: '/admin/inquiries/dj' },
      ]
    },
    { name: '메인비주얼 관리', icon: Image, path: '/admin/visual' },
    {
      name: '렌탈 관리', icon: Package, hasSub: true, subItems: [
        { name: '카테고리 관리', path: '/admin/rental/categories' },
        { name: '제품 관리', path: '/admin/rental/products' },
      ]
    },
    { name: 'FAQ 관리', icon: HelpCircle, path: '/admin/faq' },
  ];

  return (
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
              href={item.hasSub ? '#' : item.path} 
              onClick={(e) => { if (item.hasSub) { e.preventDefault(); toggleSubMenu(item.name); } }}
              className="flex items-center gap-4 px-2 h-9 rounded-lg hover:bg-[#333] hover:text-white transition-all group"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#dddedf] group-hover:text-white" />
              </div>
              <span className={`${!isOpen && 'hidden'} flex-1 font-medium`}>{item.name}</span>
              {item.hasSub && isOpen && (
                <ChevronDown className={`w-4 h-4 transition ${openSubMenus[item.name] ? 'rotate-180' : ''}`} />
              )}
            </a>
            {item.hasSub && isOpen && openSubMenus[item.name] && (
              <div className="pl-12 space-y-1 mt-1 mb-2">
                {item.subItems?.map(sub => (
                  <a key={sub.name} href={sub.path} className="block p-2 text-sm text-[#dddedf] hover:text-white rounded-lg hover:bg-[#333]">
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
