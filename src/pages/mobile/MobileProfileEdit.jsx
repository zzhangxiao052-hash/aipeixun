import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Save, User } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: 'Alex',
    position: '产品设计部 · 高级设计师',
    bio: '负责公司AI培训平台的维护与内容更新。',
    email: 'alex@example.com',
    phone: '13800138000'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Mock save logic
    alert('个人资料已更新');
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-8 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">编辑资料</h1>
        <button onClick={handleSave} className="text-sm font-bold text-blue-600 px-2 py-1 rounded hover:bg-blue-50">
          保存
        </button>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg border-2 border-white active:scale-90 transition-transform">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500">点击图标更换头像</p>
        </div>

        {/* Form Fields */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden px-4 py-2">
          
          <div className="py-3 border-b border-gray-50">
            <label className="block text-xs font-bold text-gray-400 mb-1.5">昵称</label>
            <input 
              type="text" 
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
              placeholder="请输入昵称"
            />
          </div>

          <div className="py-3 border-b border-gray-50">
            <label className="block text-xs font-bold text-gray-400 mb-1.5">职位</label>
            <input 
              type="text" 
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
              placeholder="请输入职位信息"
            />
          </div>

          <div className="py-3 border-b border-gray-50">
            <label className="block text-xs font-bold text-gray-400 mb-1.5">个人简介</label>
            <textarea 
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300 resize-none"
              placeholder="介绍一下自己..."
            />
          </div>

           <div className="py-3 border-b border-gray-50">
            <label className="block text-xs font-bold text-gray-400 mb-1.5">邮箱</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
              placeholder="请输入邮箱"
            />
          </div>

           <div className="py-3">
            <label className="block text-xs font-bold text-gray-400 mb-1.5">手机号</label>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
              placeholder="请输入手机号"
            />
          </div>

        </div>

        <p className="text-xs text-center text-gray-400 px-4">
          部分信息可能需要审核后才会公开显示。
        </p>

      </div>
    </div>
  );
}
