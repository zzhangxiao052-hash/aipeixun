import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye, EyeOff, Lock } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('两次输入的新密码不一致');
      return;
    }
    // Mock API call
    alert('密码修改成功，请重新登录');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-8 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">修改密码</h1>
        <div className="w-6" /> {/* Spacer */}
      </div>

      <div className="p-4 flex-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mb-2">
            为了保障您的账号安全，建议定期更换密码。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput 
            label="当前密码"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            show={showPassword.current}
            onToggle={() => toggleVisibility('current')}
            placeholder="请输入当前密码"
          />
          
          <PasswordInput 
            label="新密码"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            show={showPassword.new}
            onToggle={() => toggleVisibility('new')}
            placeholder="请输入新密码（至少6位）"
          />

          <PasswordInput 
            label="确认新密码"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={showPassword.confirm}
            onToggle={() => toggleVisibility('confirm')}
            placeholder="请再次输入新密码"
          />

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all"
            >
              确认修改
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PasswordInput({ label, name, value, onChange, show, onToggle, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-gray-500 ml-1">{label}</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        />
        <button 
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
