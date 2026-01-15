import { useNavigate } from 'react-router-dom';
import { 
  User, Star, MessageSquare, Users, LogOut, Bell, ChevronRight 
} from 'lucide-react';
import MobileNav from './MobileNav';
import MobileStatusBar from './MobileStatusBar';

export default function MobileProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { 
      id: 'notifications', 
      label: '消息通知', 
      icon: Bell, 
      color: 'text-blue-500', 
      bg: 'bg-blue-50',
      path: '/mobile/notifications',
      badge: 2 
    },
    { 
      id: 'favorites', 
      label: '我的收藏', 
      icon: Star, 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-50',
      path: '/mobile/favorites'
    },
    { 
      id: 'feedback', 
      label: '意见反馈', 
      icon: MessageSquare, 
      color: 'text-green-500', 
      bg: 'bg-green-50',
      path: '/mobile/feedback' 
    },
    { 
      id: 'members', 
      label: '成员管理', 
      icon: Users, 
      color: 'text-purple-500', 
      bg: 'bg-purple-50',
      path: '/mobile/members' 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* User Info Card */}
      <div className="bg-white p-6 rounded-b-[2rem] shadow-sm mb-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="absolute top-10 left-0 w-16 h-16 bg-pink-50 rounded-full -translate-x-1/2 opacity-50" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
              alt="Avatar" 
              className="w-full h-full object-cover bg-gray-100"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Alex</h2>
            <p className="text-sm text-gray-500 mt-1">产品设计部 · 高级设计师</p>
          </div>
          <button 
            onClick={() => navigate('/mobile/profile/edit')}
            className="p-2 bg-gray-50 rounded-full text-gray-600 active:bg-gray-200 transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="w-full bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 active:scale-[0.99] transition-transform"
            >
              <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="flex-1 text-left font-medium text-gray-700">
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.2rem] text-center">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </button>
          );
        })}
      </div>

      <div className="px-4 mt-6">
        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-600 font-bold py-3.5 rounded-xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>
      </div>

      <MobileNav />
    </div>
  );
}
