import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, LogOut, User, ChevronDown, LayoutDashboard, GraduationCap, Hammer, Wrench, BookOpen } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const MENU_ITEMS = [
  { label: '首页', path: '/', icon: LayoutDashboard },
  { 
    label: '实战课堂', 
    path: '/courses', 
    icon: GraduationCap, 
    subItems: [
      { label: '推荐课程', path: '/courses/recommended' }, 
      { label: '我的课程', path: '/courses/my' }
    ] 
  },
  { label: '实练工坊', path: '/workshop', icon: Hammer },
  { label: 'AI 工具箱', path: '/toolkit', icon: Wrench },
];

export default function GlobalNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [activeUserItem, setActiveUserItem] = useState('个人中心'); // Default active item
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sync active tab with location
  if (activeTab !== location.pathname) {
    setActiveTab(location.pathname);
  }

  // Simple scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 z-50 transition-all ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-14 h-full flex items-center justify-between">
        
        {/* --- Left: Logo + Menu --- */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">树科云境</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {MENU_ITEMS.map((item) => (
              <div key={item.path} className="relative group">
                <button 
                  onClick={() => { setActiveTab(item.path); navigate(item.path); }}
                  className={`flex items-center gap-1 text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer
                    ${activeTab.startsWith(item.path) && item.path !== '/' ? 'text-blue-700 font-bold' : activeTab === item.path ? 'text-blue-700 font-bold' : 'text-gray-600 hover:text-blue-600'}
                  `}
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="absolute top-full left-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform origin-top-left z-50">
                    {item.subItems.map(sub => (
                      <button 
                        key={sub.path} 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent bubbling to parent
                          setActiveTab(sub.path);
                          navigate(sub.path); 
                        }}
                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer bg-transparent border-none
                          ${activeTab === sub.path ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'}
                        `}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* --- Center: Search --- */}
        <div className="flex-1 max-w-lg mx-8 hidden lg:block">
          <div className="relative group">
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-transparent focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-md transition-all">
              <div className="px-3 py-2 text-xs text-gray-500 border-r border-gray-200 cursor-pointer hover:text-blue-700 flex items-center gap-1">
                全部 <ChevronDown className="w-3 h-3" />
              </div>
              <input 
                type="text" 
                placeholder="搜索课程、知识点或 AI 工具..." 
                className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button className="px-4 py-2 hover:bg-gray-200 text-gray-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Right: User --- */}
        <div className="flex items-center gap-5">
          <div className="relative">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative text-gray-500 hover:text-blue-700 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <NotificationCenter 
              isOpen={isNotificationOpen} 
              onClose={() => setIsNotificationOpen(false)} 
            />
          </div>

          <div className="relative group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gray-200 border-2 border-white shadow-sm overflow-hidden hover:ring-2 hover:ring-blue-200 transition-all flex items-center justify-center">
               {/* Placeholder Avatar */}
               <User className="w-5 h-5 text-gray-500" />
            </div>

            <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform origin-top-right z-50">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">U</div>
                <div>
                  <div className="font-bold text-gray-800">Admin User</div>
                  <div className="text-xs text-gray-500">高级工程师</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <MenuItem 
                  icon={User} 
                  label="个人中心" 
                  isActive={activeUserItem === '个人中心'} 
                  onClick={() => { setActiveUserItem('个人中心'); navigate('/profile'); }}
                />
                <MenuItem 
                  icon={BookOpen} 
                  label="我的技巧库" 
                  isActive={activeUserItem === '我的技巧库'} 
                  onClick={() => { 
                    setActiveUserItem('我的技巧库'); 
                    navigate('/profile');
                  }}
                />
                <MenuItem 
                  icon={Settings} 
                  label="设置" 
                  isActive={activeUserItem === '设置'} 
                  onClick={() => setActiveUserItem('设置')}
                />
                <div className="h-px bg-gray-50 my-2"></div>
                <MenuItem 
                  icon={LogOut} 
                  label="退出" 
                  isDanger 
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

function MenuItem({ icon: Icon, label, isDanger, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
      ${isDanger 
        ? 'text-red-500 hover:bg-red-50' 
        : isActive 
          ? 'text-blue-700 font-bold bg-blue-50' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'}
    `}>
      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : ''}`} />
      <span>{label}</span>
    </div>
  );
}
