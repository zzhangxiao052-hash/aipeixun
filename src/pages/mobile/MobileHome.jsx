import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Play, Clock, TrendingUp, Star, Zap, Globe, PenTool, Bell } from 'lucide-react';
import MobileNav from './MobileNav';

import MobileStatusBar from './MobileStatusBar';

import { RECOMMENDED_VIDEOS, COGNITIVE_VIDEOS, SKILL_VIDEOS, LIFE_VIDEOS } from '../../data/mockData';

export default function MobileHome() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: '推荐' },
    { id: 'cognitive', label: '前沿洞察' },
    { id: 'skill', label: '效能跃升' },
    { id: 'life', label: '场景创新' },
  ];

  const getDisplayCourses = () => {
    switch (activeTab) {
      case 'cognitive':
        return COGNITIVE_VIDEOS;
      case 'skill':
        return SKILL_VIDEOS;
      case 'life':
        return LIFE_VIDEOS;
      default:
        return RECOMMENDED_VIDEOS;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      {/* 顶部 Header */}
{/* 顶部 Header & Navigation */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        {/* 搜索栏 */}
        <div className="px-4 py-2 flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-full border border-gray-100" />
          <div 
            onClick={() => navigate('/mobile/search')}
            className="flex-1 h-9 bg-gray-100 rounded-full flex items-center px-4 gap-2 active:bg-gray-200 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 truncate">人工智能基础入门:从零开始掌握人工智能</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => navigate('/mobile/notifications')}>
               <Bell className="w-6 h-6 text-gray-600" />
             </button>
          </div>

        </div>

        {/* 导航栏 */}
        <div className="flex items-center gap-5 px-4 pb-2 pt-1 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-2 py-1 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === cat.id
                  ? 'text-pink-500 text-base font-bold'
                  : 'text-gray-600'
              }`}
            >
              {cat.label}
              {activeTab === cat.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-pink-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Banner 区域 */}
      <div className="px-4 py-3">
        <div className="w-full h-40 rounded-2xl relative overflow-hidden shadow-lg group">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="relative z-10 h-full flex flex-col justify-center px-6 text-white">

            <h2 className="text-xl font-bold mb-1 leading-tight">开启你的 AI <br/>学习之旅</h2>
            <p className="text-xs text-gray-200 mb-3 opacity-90 line-clamp-1">专家经验转化为标准化方法论</p>
            <button className="self-start px-4 py-1.5 bg-white text-blue-900 text-xs font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20">
              立即开始
            </button>
          </div>
        </div>
      </div>

      {/* 推荐流 */}
      <div className="mt-2 pb-4">
        {/* 课程列表 */}
        <div className="px-4 grid grid-cols-2 gap-3">
          {getDisplayCourses().map((course) => (
            <div 
              key={course.id}
              onClick={() => navigate(`/mobile/video/${course.id}`)}
              className="bg-white rounded-xl shadow-sm flex flex-col overflow-hidden active:scale-[0.98] transition-transform border border-gray-100"
            >
              {/* 缩略图 */}
              <div className="w-full aspect-video relative overflow-hidden bg-gray-100">
                <img 
                  src={course.cover} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-[2px] text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
                {course.isUpdated && (
                  <div className="absolute top-1.5 right-1.5 bg-blue-600/90 backdrop-blur-[2px] text-white text-[10px] px-1.5 py-0.5 rounded font-medium">
                    NEW
                  </div>
                )}
              </div>
              
              {/* 内容 */}
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1.5 h-9">
                    {course.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {course.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    <span>{Math.floor(Math.random() * 10000) + 1000}</span>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 悬浮返回按钮 */}
      <button
        onClick={() => navigate('/')}
        className="fixed bottom-24 right-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg text-xs font-medium hover:bg-black transition-colors z-50"
      >
        返回 PC 端
      </button>

      <MobileNav />
    </div>
  );
}




