import { useState } from 'react';
import { Search, Play, Clock, Star, BookOpen, FileText, Mic, BarChart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all', label: '全部推荐' },
  { id: 'writing', label: '公文写作', icon: FileText },
  { id: 'meeting', label: '会议提效', icon: Mic },
  { id: 'data', label: '数据处理', icon: BarChart },
  { id: 'policy', label: '政策分析', icon: BookOpen },
];

const RECOMMENDED_COURSES = [
  {
    id: 1,
    title: '公文写作神器：让 AI 帮你写通知、总结与报告',
    description: '告别加班写材料！学习如何使用 AI 快速生成高质量的公文草稿，涵盖通知、工作总结、调研报告等常见场景。',
    category: 'writing',
    duration: '45分钟',
    rating: 4.9,
    students: 1250,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    tags: ['ChatGPT', '公文写作', '效率']
  },
  {
    id: 2,
    title: '智能会议纪要：录音一键转文字，自动提取待办',
    description: '会议记录不再头疼。掌握 AI 语音转写工具，自动生成结构化会议纪要，精准提取核心决议与待办事项。',
    category: 'meeting',
    duration: '30分钟',
    rating: 4.8,
    students: 980,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
    tags: ['通义听悟', '会议记录', '办公自动化']
  },
  {
    id: 3,
    title: '零代码数据分析：用对话的方式做 Excel 透视表',
    description: '不需要学 Python！直接用自然语言与 Excel 对话，自动清洗数据、生成图表，让数据汇报更轻松。',
    category: 'data',
    duration: '60分钟',
    rating: 4.9,
    students: 2100,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['Excel AI', '数据分析', '可视化']
  },
  {
    id: 4,
    title: '政策解读小助手：快速提炼百页文档核心要点',
    description: '面对厚厚的红头文件不知所措？用 AI 快速分析政策文档，提炼关键信息，生成思维导图与执行建议。',
    category: 'policy',
    duration: '40分钟',
    rating: 4.7,
    students: 850,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    tags: ['Kimi', '文档分析', '政策解读']
  },
  {
    id: 5,
    title: 'PPT 快速生成：从大纲到精美演示文稿只需 5 分钟',
    description: '输入主题或大纲，AI 自动生成排版精美的 PPT，包含配图与动画，专注于内容演讲而非格式调整。',
    category: 'writing',
    duration: '50分钟',
    rating: 4.8,
    students: 1500,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
    tags: ['Gamma', 'PPT制作', '汇报演示']
  },
  {
    id: 6,
    title: '政务新媒体运营：AI 辅助选题与爆款文案创作',
    description: '解决公众号选题枯竭难题。利用 AI 捕捉热点，生成多种风格的推文标题与正文，提升阅读量与互动率。',
    category: 'writing',
    duration: '55分钟',
    rating: 4.6,
    students: 720,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    tags: ['新媒体', '文案创作', '创意']
  }
];

export default function RecommendedCourses() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = RECOMMENDED_COURSES.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const matchesSearch = course.title.includes(searchQuery) || course.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI 赋能政务办公，让工作更轻松
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mb-8">
            精选适合政府工作人员的 AI 效能跃升课程，不学代码，只学方法。
            从公文写作到数据分析，全方位提升您的办公效率。
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl">
            <input 
              type="text" 
              placeholder="搜索感兴趣的课程，如：公文写作、会议记录..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>


          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all shadow-sm
                  ${activeCategory === cat.id 
                    ? 'bg-white text-blue-700 shadow-md ring-2 ring-blue-100' 
                    : 'bg-white/10 text-white hover:bg-white/20 hover:text-white border border-white/20'}
                `}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              onClick={() => navigate(`/video/${course.id}`)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Play className="w-4 h-4 fill-current" />
                    开始学习
                  </button>
                </div>
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-gray-400" />
                    {course.students} 人已学
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">没有找到相关课程</h3>
            <p className="text-gray-500">尝试更换关键词或分类</p>
          </div>
        )}
      </div>
    </div>
  );
}
