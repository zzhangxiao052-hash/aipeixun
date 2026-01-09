import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, Flame, Trash2, ArrowLeft } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileSearch() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    'DeepSeek 教程', 'AI 绘画', 'Prompt 工程', 'Python 基础'
  ]);
  
  const hotSearches = [
    { id: 1, title: 'ChatGPT 进阶实战', hot: '98.2w' },
    { id: 2, title: 'Midjourney 角色设计', hot: '85.4w' },
    { id: 3, title: 'Stable Diffusion 部署', hot: '76.1w' },
    { id: 4, title: '大模型微调', hot: '62.3w' },
    { id: 5, title: 'RAG 知识库搭建', hot: '51.8w' },
    { id: 6, title: 'LangChain 开发', hot: '43.5w' },
    { id: 7, title: 'AI 视频生成', hot: '32.9w' },
    { id: 8, title: 'Copilot 编程助手', hot: '28.4w' },
  ];

  useEffect(() => {
    // Auto focus input on mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = (text) => {
    const query = text || searchText;
    if (!query.trim()) return;
    
    // Add to history (mock)
    if (!searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory]);
    }
    
    // In a real app, navigate to results page
    console.log('Searching for:', query);
    navigate(`/mobile/search-results?q=${encodeURIComponent(query)}`);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="min-h-screen bg-white pb-safe max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Search Header */}
      <div className="px-4 py-2 flex items-center gap-3 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜索课程、讲师"
            className="w-full bg-gray-100 text-gray-800 text-sm rounded-full pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
          {searchText && (
            <button 
              onClick={() => setSearchText('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-600 text-sm font-medium active:opacity-70"
        >
          取消
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="px-4 py-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-gray-800">历史搜索</h3>
              <button onClick={clearHistory} className="p-1">
                <Trash2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(item)}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs rounded-lg active:bg-gray-100 transition-colors truncate max-w-[150px]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hot Search */}
        <div className="px-4 py-2">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1">
            <Flame className="w-4 h-4 text-red-500 fill-current" />
            热门搜索
          </h3>
          <div className="space-y-4">
            {hotSearches.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handleSearch(item.title)}
                className="flex items-center gap-3 active:bg-gray-50 -mx-4 px-4 py-1 cursor-pointer"
              >
                <span className={`
                  w-5 text-center text-sm font-bold italic
                  ${index === 0 ? 'text-red-500' : ''}
                  ${index === 1 ? 'text-orange-500' : ''}
                  ${index === 2 ? 'text-yellow-500' : ''}
                  ${index > 2 ? 'text-gray-400' : ''}
                `}>
                  {index + 1}
                </span>
                <span className="flex-1 text-sm text-gray-700">{item.title}</span>
                <span className="text-xs text-gray-400">{item.hot}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
