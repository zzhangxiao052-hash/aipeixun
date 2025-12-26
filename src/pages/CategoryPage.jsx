import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, Play, Clock, User, ChevronRight } from 'lucide-react';
import { RECOMMENDED_VIDEOS, COGNITIVE_VIDEOS, SKILL_VIDEOS, LIFE_VIDEOS } from '../data/mockData';

const CATEGORY_CONFIG = {
  recommended: {
    title: '为您推荐',
    description: '基于您的兴趣与岗位，为您精选最适合的 AI 课程',
    color: 'from-blue-500 to-indigo-600',
    data: RECOMMENDED_VIDEOS,
    tags: ['全部', '行政', '财务', '技术', '安全', '人事', '营销', '运营', '管理', '法律', '研发']
  },
  cognitive: {
    title: '前沿洞察',
    description: '探索 AI 本质，构建数字化思维模型',
    color: 'from-purple-500 to-violet-600',
    data: COGNITIVE_VIDEOS,
    tags: ['全部', '名词解释', 'AI通识', '历史', '伦理', '行业趋势', '政策解读', '伦理规范', '未来展望', '专家访谈', '案例拆解']
  },
  skill: {
    title: '效能跃升',
    description: '掌握 AI 工具，实现办公效率指数级提升',
    color: 'from-emerald-500 to-teal-600',
    data: SKILL_VIDEOS,
    tags: ['全部', '办公提效', '公文生成', '数据分析', '设计', '图像处理', '视频剪辑', '代码辅助', '会议纪要', '邮件撰写', '流程自动化']
  },
  life: {
    title: '场景创新',
    description: '将 AI 融入生活，体验科技带来的无限可能',
    color: 'from-orange-400 to-amber-500',
    data: LIFE_VIDEOS,
    tags: ['全部', '生活助手', '趣味创作', '旅行', '健康', '学习辅导', '健康咨询', '旅游规划', '创意写作', '艺术设计', '情感陪伴']
  }
};

export default function CategoryPage() {
  const { type } = useParams();
  const config = CATEGORY_CONFIG[type] || CATEGORY_CONFIG.recommended;
  const [activeTag, setActiveTag] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // Reset tag when type changes
  useEffect(() => {
    setActiveTag('全部');
    setSearchQuery('');
  }, [type]);

  const filteredVideos = config.data.filter(video => {
    const matchesTag = activeTag === '全部' || video.tags.includes(activeTag);
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* --- Hero Banner --- */}
      <div className="relative bg-white overflow-hidden h-[300px] md:h-[380px]">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        {/* 3D-like Shape Placeholder (CSS) */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden lg:block opacity-90">
          <div className={`w-64 h-64 bg-gradient-to-br ${config.color} rounded-2xl rotate-12 shadow-2xl opacity-20 blur-sm absolute transform translate-x-4 translate-y-4`}></div>
          <div className={`relative w-64 h-64 bg-gradient-to-br ${config.color} rounded-2xl rotate-12 shadow-2xl flex items-center justify-center text-white/20`}>
             <div className="text-9xl font-bold select-none">AI</div>
          </div>
        </div>

        <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link to="/" className="hover:text-blue-600 transition-colors">首页</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">{config.title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              {config.title}
            </h1>
            
            {/* Search Bar */}
            <div className="relative max-w-lg">
              <input 
                type="text" 
                placeholder="搜索课程、知识点或 AI 工具..." 
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-gray-200 shadow-lg shadow-blue-100/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-1.5 rounded-full text-sm font-medium transition-colors">
                搜索
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="container mx-auto px-6 py-12">
        
        {/* Tags / Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {config.tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? `bg-gradient-to-r ${config.color} text-white shadow-md`
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map(video => (
              <Link 
                key={video.id} 
                to={`/video/${video.id}?from=${type}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={video.cover} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-5 h-5 text-gray-900 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-gray-50">
                    <div className="flex gap-1">
                      {video.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-gray-50 px-1.5 py-0.5 rounded text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-300 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">没有找到相关课程</h3>
            <p className="text-gray-400 text-sm mt-2">试试其他关键词或标签</p>
          </div>
        )}
      </div>
    </div>
  );
}
