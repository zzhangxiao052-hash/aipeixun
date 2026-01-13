import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, LogOut, User, History, Smartphone, Flame, Trash2, Clock } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

// Mock Data for Search
const HOT_SEARCHES = ['DeepSeek', 'Python', '大模型', 'Prompt', 'AI 绘画', '职场效率'];
const SUGGESTIONS_POOL = [
  'DeepSeek 深度解析与应用实战',
  '零基础入门 AI：从 DeepSeek 开始',
  'ChatGPT vs DeepSeek：谁更适合写代码？',
  'Prompt 提示词工程进阶',
  'AI 绘画与 DeepSeek 的创意结合',
  'Python 数据分析实战',
  '大模型微调入门',
  '高效职场办公技巧',
  'Midjourney 商业变现'
];



export default function GlobalNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [activeUserItem, setActiveUserItem] = useState('个人中心'); // Default active item
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('search_history');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleSearch = (query = searchQuery) => {
    if (query.trim()) {
      // Save to history
      const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('search_history', JSON.stringify(newHistory));

      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchFocused(false);
    }
  };

  const clearHistory = (e) => {
    e.stopPropagation();
    setSearchHistory([]);
    localStorage.removeItem('search_history');
  };

  const isHome = location.pathname === '/';
  // Clear search query when navigating to home page
  useEffect(() => {
    if (location.pathname === '/') {
      setSearchQuery('');
    }
  }, [location.pathname]);
  const isTransparent = isHome && !isScrolled;

  // Sync active tab with location
  if (activeTab !== location.pathname) {
    setActiveTab(location.pathname);
  }

  // Simple scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-gradient-to-b from-black/60 to-transparent border-transparent' 
        : 'bg-white border-b border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-[1800px] mx-auto px-4 md:px-14 h-full flex items-center justify-between">
        
        {/* --- Left: Logo + Menu --- */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className={`text-xl font-bold tracking-tight ${
              isTransparent 
                ? 'text-white' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              树科云境
            </span>
          </div>

          {/* Navigation Links */}
          <div className={`hidden md:flex items-center gap-6 transition-all duration-300 ${
            isTransparent ? 'opacity-0 invisible -translate-y-2' : 'opacity-100 visible translate-y-0'
          }`}>
            {[
              { name: '前沿洞察', path: '/category/cognitive' },
              { name: '效能跃升', path: '/category/skill' },
              { name: '场景创新', path: '/category/life' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-base font-medium transition-colors text-gray-600 hover:text-blue-600"
              >
                {item.name}
              </button>
            ))}
          </div>

          </div>




        {/* --- Right: User --- */}
        <div className="flex items-center gap-5">
          
          {/* Mobile Preview Button */}
          <button
            onClick={() => navigate('/mobile')}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:scale-105 ${
              isTransparent 
                ? 'bg-white/20 border-white/50 text-white hover:bg-white/30' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white hover:shadow-lg'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">手机端预览</span>
          </button>

          {/* Search Bar (Moved) */}
          <div className={`relative transition-all duration-300 ease-in-out hidden lg:block ${isSearchFocused ? 'w-[32rem]' : 'w-64'}`}>
             <div className={`flex items-center rounded-full overflow-hidden border transition-all ${
              isTransparent 
                ? (isSearchFocused ? 'bg-white border-transparent text-gray-700' : 'bg-white/20 border-white/30 text-white')
                : (isSearchFocused ? 'bg-white border-blue-300 text-gray-700 shadow-md' : 'bg-gray-100 border-transparent text-gray-600')
            }`}>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={isSearchFocused ? "搜索课程、知识点..." : "搜索..."}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay to allow click on button
                className={`flex-1 px-4 py-1.5 bg-transparent outline-none text-sm transition-colors ${
                  isTransparent 
                    ? (isSearchFocused ? 'text-gray-700 placeholder-gray-400' : 'text-white placeholder-gray-200')
                    : 'text-gray-700 placeholder-gray-400'
                }`}
              />
              <button 
                onClick={handleSearch}
                className={`px-3 py-1.5 transition-colors ${
                 isTransparent 
                 ? (isSearchFocused ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20')
                 : 'text-gray-600 hover:bg-gray-200'
              }`}>
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {searchQuery.trim() === '' ? (
                  // Hot Search State
                  <div>
                    {/* History Section */}
                    {searchHistory.length > 0 && (
                      <div className="mb-4">
                        <div className="px-4 py-2 text-xs font-bold text-gray-400 mb-1 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            历史搜索
                          </div>
                          <button 
                            onClick={clearHistory}
                            className="hover:text-gray-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2 px-4">
                          {searchHistory.map((tag) => (
                            <button
                              key={tag}
                              onMouseDown={() => {
                                setSearchQuery(tag);
                                handleSearch(tag);
                              }}
                              className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-xs rounded-lg transition-colors max-w-[150px] truncate"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="px-4 py-2 text-xs font-bold text-gray-400 mb-1 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" />
                      热门搜索
                    </div>
                    <div className="flex flex-wrap gap-2 px-4 pb-2">
                      {HOT_SEARCHES.map((tag) => (
                        <button
                          key={tag}
                          onMouseDown={() => {
                            setSearchQuery(tag);
                            handleSearch(tag);
                          }}
                          className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-xs rounded-lg transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Suggestions State
                  <div>
                    {SUGGESTIONS_POOL.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                      SUGGESTIONS_POOL.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).map((item, index) => (
                        <button
                          key={index}
                          onMouseDown={() => {
                            setSearchQuery(item);
                            handleSearch(item);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                        >
                          <Search className="w-3.5 h-3.5 text-gray-400" />
                          <span dangerouslySetInnerHTML={{
                            __html: item.replace(
                              new RegExp(searchQuery, 'gi'),
                              (match) => `<span class="text-blue-600 font-medium">${match}</span>`
                            )
                          }} />
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-400 text-center">
                        未找到相关课程
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>


          <div 
            className="relative py-2"
            onMouseEnter={() => setIsNotificationOpen(true)}
            onMouseLeave={() => setIsNotificationOpen(false)}
          >
            <button 
              className={`relative w-9 h-9 rounded-xl border-2 shadow-sm flex items-center justify-center transition-all hover:ring-2 hover:ring-blue-200 ${
                isTransparent 
                  ? 'bg-white/20 border-white/50 text-white' 
                  : 'bg-white border-gray-100 text-gray-500 hover:text-blue-700'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <NotificationCenter 
              isOpen={isNotificationOpen} 
              onClose={() => setIsNotificationOpen(false)} 
            />
          </div>

          <div className="relative group cursor-pointer">
            <div className={`w-9 h-9 rounded-xl border-2 shadow-sm overflow-hidden hover:ring-2 hover:ring-blue-200 transition-all flex items-center justify-center ${
              isTransparent ? 'bg-white/20 border-white/50' : 'bg-gray-200 border-white'
            }`}>
               {/* Placeholder Avatar */}
               <User className={`w-5 h-5 ${isTransparent ? 'text-white' : 'text-gray-500'}`} />
            </div>

            <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all transform origin-top-right z-50">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">U</div>
                <div>
                  <div className="font-bold text-gray-800">Admin User</div>
                  <div className="text-xs text-gray-500">高级工程师</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <MenuItem 
                  icon={User} 
                  label="我的收藏" 
                  isActive={location.pathname === '/profile'} 
                  onClick={() => navigate('/profile')}
                />


                <MenuItem 
                  icon={History} 
                  label="观看历史" 
                  isActive={activeUserItem === '观看历史'} 
                  onClick={() => navigate('/history')}
                />
                <MenuItem 
                  icon={Settings} 
                  label="设置" 
                  isActive={activeUserItem === '设置'} 
                  onClick={() => navigate('/settings')}
                />
                <div className="h-px bg-gray-50 my-2"></div>
                <MenuItem 
                  icon={LogOut} 
                  label="退出" 
                  isDanger 
                  onClick={() => navigate('/login')}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}

function MenuItem({ icon: Icon, label, isDanger, isActive, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors
      ${isDanger 
        ? 'text-red-500 hover:bg-red-50' 
        : isActive 
          ? 'text-blue-700 font-bold bg-blue-50' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-700'}
    `}>
      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : ''}`} />
      <span>{label}</span>
    </div>
  );
}
