import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  User, 
  Smartphone, 
  Trash2, 
  Info, 
  MessageSquare, 
  LogOut,
  Moon,
  Wifi,
  Users
} from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileSettings() {
  const navigate = useNavigate();
  const [autoPlay, setAutoPlay] = useState(true);
  const [wifiReminder, setWifiReminder] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleClearCache = () => {
    // Mock clear cache
    alert('缓存已清理 (12.5MB)');
  };

  const handleLogout = () => {
    // Mock logout
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-8 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">设置</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="p-4 space-y-6">
        
        {/* Account & Security */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">账号与安全</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={User} 
              label="个人资料设置" 
              onClick={() => navigate('/mobile/profile/edit')} 
              showArrow
            />
            <div className="h-[1px] bg-gray-50 mx-4" />
            <MenuItem 
              icon={Shield} 
              label="修改密码" 
              onClick={() => navigate('/mobile/settings/password')} 
              showArrow
            />
          </div>
        </section>

        {/* General Settings */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">通用设置</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <ToggleItem 
              icon={Wifi} 
              label="非Wi-Fi播放提醒" 
              checked={wifiReminder}
              onChange={setWifiReminder}
            />
            <div className="h-[1px] bg-gray-50 mx-4" />
            <ToggleItem 
              icon={Smartphone} 
              label="自动播放下一集" 
              checked={autoPlay}
              onChange={setAutoPlay}
            />
            <div className="h-[1px] bg-gray-50 mx-4" />
            <MenuItem 
              icon={Trash2} 
              label="清除缓存" 
              value="12.5MB"
              onClick={handleClearCache} 
            />
            {/* Dark Mode - Optional */}
            {/* <div className="h-[1px] bg-gray-50 mx-4" />
            <ToggleItem 
              icon={Moon} 
              label="深色模式" 
              checked={darkMode}
              onChange={setDarkMode}
            /> */}
          </div>
        </section>

        {/* Admin Zone */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">管理员专区</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={Users} 
              label="成员管理" 
              onClick={() => navigate('/mobile/members')} 
              showArrow
            />
          </div>
        </section>

        {/* About & Support */}
        <section>
          <h2 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">关于与支持</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <MenuItem 
              icon={Info} 
              label="关于我们" 
              value="v1.0.0"
              onClick={() => alert('当前版本 v1.0.0')} 
            />
            <div className="h-[1px] bg-gray-50 mx-4" />
            <MenuItem 
              icon={MessageSquare} 
              label="意见反馈" 
              onClick={() => navigate('/mobile/feedback')} 
              showArrow
            />
          </div>
        </section>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="w-full bg-white text-red-600 font-bold py-3.5 rounded-xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          退出登录
        </button>

        <div className="text-center text-xs text-gray-400 pt-4 pb-8">
          © 2024 Aipeixun Platform. All rights reserved.
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label, value, onClick, showArrow }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        {showArrow && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </div>
    </button>
  );
}

function ToggleItem({ icon: Icon, label, checked, onChange }) {
  return (
    <div className="w-full flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
