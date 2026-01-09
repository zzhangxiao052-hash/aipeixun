import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Play } from 'lucide-react';
import MobileNav from './MobileNav';
import MobileStatusBar from './MobileStatusBar';

// Mock Data
const CATEGORIES = [
  { 
    id: 'basic', 
    name: 'AI 基础', 
    subCategories: ['机器学习', '深度学习', 'Python', '数学基础'],
    courses: [
      { id: 101, title: '零基础入门 AI', views: '12.5w', cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80' },
      { id: 102, title: 'Python 数据分析实战', views: '8.2w', cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80' }
    ]
  },
  { 
    id: 'llm', 
    name: '大模型', 
    subCategories: ['ChatGPT', 'Claude', 'Llama', 'Prompt'],
    courses: [
      { id: 201, title: 'ChatGPT 高效办公指南', views: '45.1w', cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80' },
      { id: 202, title: 'Prompt 提示词工程进阶', views: '33.4w', cover: 'https://images.unsplash.com/photo-1684469660894-394553555d26?w=400&q=80' }
    ]
  },
  { 
    id: 'art', 
    name: 'AI 绘画', 
    subCategories: ['Midjourney', 'Stable Diffusion', 'ComfyUI'],
    courses: [
      { id: 301, title: 'Midjourney 商业插画实战', views: '28.9w', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
      { id: 302, title: 'Stable Diffusion 部署与训练', views: '19.5w', cover: 'https://images.unsplash.com/photo-1579783902614-a3fb39279c42?w=400&q=80' }
    ]
  },
  { 
    id: 'video', 
    name: 'AI 视频', 
    subCategories: ['Runway', 'Pika', 'Sora', '剪映 AI'],
    courses: [
      { id: 401, title: 'Runway 视频生成全攻略', views: '15.2w', cover: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400&q=80' },
      { id: 402, title: 'AI 短视频制作流', views: '11.8w', cover: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80' }
    ]
  },
  { 
    id: 'industry', 
    name: '行业应用', 
    subCategories: ['办公提效', '编程开发', '数据分析'],
    courses: [
      { id: 501, title: 'AI 辅助编程实战', views: '22.1w', cover: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&q=80' },
      { id: 502, title: '自动化办公工作流', views: '18.3w', cover: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&q=80' }
    ]
  },
];

export default function MobileCategory() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <div className="min-h-screen bg-white pb-20 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header with Search */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-40">
        <div 
          onClick={() => navigate('/mobile/search')}
          className="h-9 bg-gray-100 rounded-full flex items-center px-4 gap-2 active:bg-gray-200 transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">搜索课程分类</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-24 bg-gray-50 overflow-y-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`w-full px-2 py-4 text-sm font-medium text-center transition-colors relative ${
                activeCategory.id === cat.id
                  ? 'bg-white text-blue-600 font-bold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.name}
              {activeCategory.id === cat.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-blue-600 rounded-r-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Banner */}
          <div className="w-full h-24 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 mb-6 flex items-center justify-center text-white shadow-md">
            <div className="text-center">
              <h3 className="text-lg font-bold">{activeCategory.name}</h3>
              <p className="text-xs opacity-80">精选优质课程</p>
            </div>
          </div>

          {/* Sub Categories Chips */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-800 mb-3">热门标签</h4>
            <div className="flex flex-wrap gap-2">
              {activeCategory.subCategories.map((sub, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg border border-gray-100"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Course List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-800">推荐课程</h4>
              <button className="text-xs text-gray-400 flex items-center">
                全部 <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="space-y-3">
              {activeCategory.courses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => navigate(`/mobile/video/${course.id}`)}
                  className="flex gap-3 active:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img 
                      src={course.cover} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <h5 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                      {course.title}
                    </h5>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Play className="w-3 h-3 fill-current" />
                      <span>{course.views}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
