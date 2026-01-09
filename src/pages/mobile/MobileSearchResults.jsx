import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft, Filter, Play, Clock, MoreVertical } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

// Mock Data for Search Results
const MOCK_RESULTS = [
  { 
    id: 101, 
    title: 'DeepSeek 深度解析与应用实战', 
    author: 'AI 探索者', 
    views: '12.5w', 
    date: '2天前',
    duration: '12:30',
    cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80',
    tags: ['大模型', '实战']
  },
  { 
    id: 102, 
    title: '零基础入门 AI：从 DeepSeek 开始', 
    author: '编程导师', 
    views: '8.2w', 
    date: '1周前',
    duration: '45:20',
    cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80',
    tags: ['入门', 'Python']
  },
  { 
    id: 201, 
    title: 'ChatGPT vs DeepSeek：谁更适合写代码？', 
    author: '技术大咖', 
    views: '45.1w', 
    date: '3天前',
    duration: '18:15',
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
    tags: ['测评', '效率']
  },
  { 
    id: 202, 
    title: 'Prompt 提示词工程进阶：释放 DeepSeek 潜能', 
    author: 'Prompt 专家', 
    views: '33.4w', 
    date: '2周前',
    duration: '25:00',
    cover: 'https://images.unsplash.com/photo-1684469660894-394553555d26?w=400&q=80',
    tags: ['进阶', '提示词']
  },
  { 
    id: 301, 
    title: 'AI 绘画与 DeepSeek 的创意结合', 
    author: '设计工坊', 
    views: '28.9w', 
    date: '1个月前',
    duration: '32:10',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    tags: ['绘画', '创意']
  },
];

export default function MobileSearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchText, setSearchText] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState('comprehensive');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate search API call
  useEffect(() => {
    setIsLoading(true);
    // Simulate network delay
    const timer = setTimeout(() => {
      // Simple mock filter
      const filtered = MOCK_RESULTS.filter(item => 
        item.title.toLowerCase().includes(searchText.toLowerCase()) || 
        item.author.includes(searchText)
      );
      // If no text, show all for demo purposes, or show none
      setResults(searchText ? filtered : MOCK_RESULTS);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchText]); // Re-run when searchText changes (in real app, might wait for enter)

  const handleSearch = () => {
    // In a real app, this would trigger a new API call or navigation
    // For this mock, the useEffect already handles it based on state
  };

  const tabs = [
    { id: 'comprehensive', label: '综合' },
    { id: 'newest', label: '最新' },
    { id: 'most_viewed', label: '播放多' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-safe max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Search Header */}
      <div className="bg-white px-4 py-2 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-40">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-gray-100 text-gray-800 text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <button className="text-gray-600 font-medium text-sm">
          搜索
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 flex items-center justify-between border-b border-gray-100 sticky top-[53px] z-30">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-medium relative transition-colors ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-1 text-gray-500 text-sm py-3">
          <span>筛选</span>
          <Filter className="w-3 h-3" />
        </button>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 text-sm">正在搜索...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/mobile/video/${item.id}`)}
                className="flex gap-3 bg-white p-3 rounded-xl shadow-sm active:scale-[0.99] transition-transform"
              >
                {/* Thumbnail */}
                <div className="w-36 h-24 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
                  <img 
                    src={item.cover} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                    {item.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-gray-200 inline-block" />
                        {item.author}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {item.views}
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <MoreVertical className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center text-xs text-gray-400 py-4">
              - 没有更多结果了 -
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-12 h-12 mb-2 opacity-20" />
            <p>未找到相关课程</p>
            <p className="text-xs mt-1">换个关键词试试看</p>
          </div>
        )}
      </div>
    </div>
  );
}
