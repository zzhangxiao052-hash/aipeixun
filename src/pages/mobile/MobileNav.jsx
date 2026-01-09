import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Clock, User, Activity } from 'lucide-react';

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: '首页', path: '/mobile', icon: Home, activePaths: ['/mobile', '/mobile/home'] },
    { name: '驾驶舱', path: '/mobile/cockpit', icon: Activity, activePaths: ['/mobile/cockpit'], isAdmin: true },
    { name: '分类', path: '/mobile/category', icon: Grid, activePaths: ['/mobile/category'] },
    { name: '历史', path: '/mobile/history', icon: Clock, activePaths: ['/mobile/history'] },
    { name: '我的', path: '/mobile/profile', icon: User, activePaths: ['/mobile/profile'] },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = item.activePaths.includes(pathname);
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-2 py-1 transition-colors relative ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <Icon className="w-6 h-6" />
                {item.isAdmin && (
                  <span className="absolute -top-1 -right-3 bg-red-500 text-white text-[8px] px-1 rounded-full scale-75 origin-left">
                    管
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
