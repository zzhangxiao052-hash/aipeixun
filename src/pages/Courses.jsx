import { useState } from 'react';
import { PlayCircle, User, Clock, Star, Filter, ChevronRight } from 'lucide-react';

const MOCK_COURSES = [
  {
    id: 1,
    title: '零基础上手 Python 数据分析：从 Excel 到 Pandas',
    instructor: '王老师',
    views: '1.2w',
    duration: '4h 30m',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    category: '数据分析',
    tags: ['Python', 'Pandas', '入门']
  },
  {
    id: 2,
    title: 'AI 辅助公文写作：让 ChatGPT 成为你的笔杆子',
    instructor: '李主任',
    views: '8.5k',
    duration: '2h 15m',
    cover: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop',
    category: '办公效率',
    tags: ['ChatGPT', '公文', 'Prompt']
  },
  {
    id: 3,
    title: '政务大数据可视化效能跃升：ECharts 大屏制作',
    instructor: '张工',
    views: '5.6k',
    duration: '6h 00m',
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop', // Reusing for demo
    category: '可视化',
    tags: ['ECharts', '大屏', '前端']
  },
  {
    id: 4,
    title: '深度学习基础：神经网络是如何工作的',
    instructor: 'AI Lab',
    views: '2.1w',
    duration: '8h 45m',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    category: 'AI 理论',
    tags: ['深度学习', '神经网络']
  },
  {
    id: 5,
    title: 'Midjourney 进阶：如何生成高质量宣传海报',
    instructor: '设计部',
    views: '9.3k',
    duration: '3h 20m',
    cover: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    category: 'AI 绘画',
    tags: ['Midjourney', '设计']
  },
  {
    id: 6,
    title: '数字化转型案例解析：智慧城市建设',
    instructor: '专家组',
    views: '4.2k',
    duration: '5h 10m',
    cover: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1000&auto=format&fit=crop',
    category: '案例分析',
    tags: ['智慧城市', '数字化']
  },
];

const CATEGORIES = ['全部', '数据分析', '办公效率', '可视化', 'AI 理论', 'AI 绘画', '案例分析'];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredCourses = activeCategory === '全部' 
    ? MOCK_COURSES 
    : MOCK_COURSES.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* --- Banner Section (Bilibili Style) --- */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">效能跃升课堂 Courses</h1>
            <p className="text-gray-500">精选 AI 效能跃升课程，助力数字化转型能力提升。</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer hover:bg-blue-100 transition-colors">
              <Star className="w-5 h-5" />
              我的课程
            </div>
            <div className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-colors">
              <Clock className="w-5 h-5" />
              观看历史
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        
        {/* --- Filter Bar --- */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="p-2 bg-gray-100 rounded-lg mr-2">
            <Filter className="w-5 h-5 text-gray-500" />
          </div>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                ${activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- Video Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200 overflow-hidden">
                <img 
                  src={course.cover} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {course.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {course.instructor}
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      {course.views}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {course.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
