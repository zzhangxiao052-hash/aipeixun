import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Play, Clock, Calendar, User } from 'lucide-react';

// Mock Data for Search Results (Consistent with Mobile)
const MOCK_RESULTS = [
  { 
    id: 101, 
    title: 'DeepSeek 深度解析与应用实战', 
    author: 'AI 探索者', 
    views: '12.5w', 
    date: '2天前',
    duration: '12:30',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
    tags: ['大模型', '实战'],
    description: '本课程深入解析 DeepSeek 大模型的核心架构与应用场景，结合实际案例演示如何快速部署与微调，适合 AI 开发者与研究人员。'
  },
  { 
    id: 102, 
    title: '零基础入门 AI：从 DeepSeek 开始', 
    author: '编程导师', 
    views: '8.2w', 
    date: '1周前',
    duration: '45:20',
    cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
    tags: ['入门', 'Python'],
    description: '专为零基础学员打造的 AI 入门课程，以 DeepSeek 为例，讲解人工智能的基础概念、工具使用及简单的代码实现。'
  },
  { 
    id: 201, 
    title: 'ChatGPT vs DeepSeek：谁更适合写代码？', 
    author: '技术大咖', 
    views: '45.1w', 
    date: '3天前',
    duration: '18:15',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    tags: ['测评', '效率'],
    description: '全方位对比 ChatGPT 与 DeepSeek 在代码生成、调试及优化方面的表现，帮助开发者选择最适合自己的编程助手。'
  },
  { 
    id: 202, 
    title: 'Prompt 提示词工程进阶：释放 DeepSeek 潜能', 
    author: 'Prompt 专家', 
    views: '33.4w', 
    date: '2周前',
    duration: '25:00',
    cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
    tags: ['进阶', '提示词'],
    description: '掌握高级 Prompt 技巧，学会如何与 DeepSeek 进行高效交互，挖掘大模型深层能力，提升工作效率。'
  },
  { 
    id: 301, 
    title: 'AI 绘画与 DeepSeek 的创意结合', 
    author: '设计工坊', 
    views: '28.9w', 
    date: '1个月前',
    duration: '32:10',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    tags: ['绘画', '创意'],
    description: '探索文本生成模型 DeepSeek 与 AI 绘画工具的跨界融合，激发无限创意，创作出独一无二的数字艺术作品。'
  },
];

export default function PCSearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState('relevance');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay
    const timer = setTimeout(() => {
      const filtered = MOCK_RESULTS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.author.includes(query) ||
        item.description.includes(query) ||
        item.tags.some(tag => tag.includes(query))
      );
      setResults(query ? filtered : MOCK_RESULTS);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [query]);

  const tabs = [
    { id: 'relevance', label: '综合排序' },
    { id: 'newest', label: '最新发布' },
    { id: 'most_viewed', label: '最多播放' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
              首页
            </button>
            <span>/</span>
            <span className="text-gray-800">搜索结果</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            "{query}" 的搜索结果
          </h1>
          <p className="text-gray-500 text-sm">
            共找到 {results.length} 个相关课程
          </p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8 flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          {/* Filter Tabs */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm font-medium relative transition-colors ${
                  activeTab === tab.id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Results List */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 text-sm">正在搜索...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navigate(`/video/${item.id}`)}
                  className="group bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer flex gap-6"
                >
                  {/* Thumbnail */}
                  <div className="w-64 h-36 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
                    <img 
                      src={item.cover} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                      {item.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-50 pt-3">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                          <User className="w-4 h-4" />
                          {item.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Play className="w-4 h-4" />
                          {item.views}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white rounded-xl border border-gray-100">
              <Search className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium mb-1">未找到相关课程</p>
              <p className="text-sm">请尝试更换关键词或检查拼写</p>
            </div>
          )}
        </div>

        {/* Right Sidebar (Optional Recommendation) */}
        <div className="w-80 hidden xl:block">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-4">热门搜索</h3>
            <div className="flex flex-wrap gap-2">
              {['DeepSeek', 'Python', '大模型', 'Prompt', 'AI 绘画', '职场效率', '数据分析'].map((tag, index) => (
                <button 
                  key={index}
                  onClick={() => navigate(`/search?q=${tag}`)} // Note: This will need to force refresh or update state if on same page
                  className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm rounded-lg transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
