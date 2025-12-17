import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Copy, Check, Tag, Filter, Search, User, MapPin, Briefcase, Award, Trash2, TrendingUp, Zap } from 'lucide-react';
import useBookmarks from '../hooks/useBookmarks';
import { getUserPoints, calculateRadarData, getLevelInfo, getRankPercentile, getPointHistory } from '../utils/pointsSystem';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RADAR_DATA = {
  labels: ['认知 (Cognition)', '工具 (Tools)', '实操 (Practice)', '创新 (Innovation)', '效率 (Efficiency)'],
  datasets: [
    {
      label: '当前能力值',
      data: [85, 90, 75, 65, 88],
      backgroundColor: 'rgba(37, 99, 235, 0.2)', // blue-600 with opacity
      borderColor: '#2563eb', // blue-600
      borderWidth: 2,
      pointBackgroundColor: '#2563eb',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#2563eb',
    },
  ],
};

const RADAR_OPTIONS = {
  scales: {
    r: {
      angleLines: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      pointLabels: {
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        color: '#4b5563', // gray-600
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: {
        display: false, // Hide the numbers on the scale lines for cleaner look
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
};

const MOCK_ASSETS = [
  {
    id: 1,
    title: '公文写作 - 通知模板',
    content: '请根据以下要素撰写一份正式的政府通知:\\n1. 发文单位:[单位名称]\\n2. 主题:[会议/活动/检查]\\n3. 时间:[具体日期]\\n4. 要求:语气庄重,格式规范。',
    tags: ['公文写作', '模板'],
    date: '2024-05-10',
  },
  {
    id: 2,
    title: '数据清洗 Python 脚本',
    content: 'import pandas as pd\\n\\n# 读取数据\\ndf = pd.read_csv("data.csv")\\n# 过滤空值\\ndf_clean = df.dropna()\\n# 导出\\ndf_clean.to_excel("clean_data.xlsx")',
    tags: ['数据分析', 'Python', '代码片段'],
    date: '2024-05-12',
  },
  {
    id: 3,
    title: '会议纪要生成 Prompt',
    content: '你是一名专业的会议记录员。请将以下会议录音转录文本整理成结构化的会议纪要,包含:\\n- 会议主题\\n- 参会人员\\n- 核心决议\\n- 待办事项(Assignee + Due Date)',
    tags: ['效率工具', 'Prompt'],
    date: '2024-05-15',
  },
  {
    id: 4,
    title: '政策解读风格转换',
    content: '请将以下晦涩难懂的政策条文,改写为通俗易懂的"大白话",面向社区老年居民进行宣传。要求:亲切、简单、重点突出。',
    tags: ['公文写作', '创新'],
    date: '2024-05-18',
  },
  {
    id: 5,
    title: 'Midjourney 宣传图 Prompt',
    content: '/imagine prompt: futuristic smart city, government service center, high tech, blue and white theme, bright lighting, 8k resolution, unreal engine 5 render --ar 16:9',
    tags: ['AI绘画', 'Prompt'],
    date: '2024-05-20',
  },
];

const ALL_TAGS = ['全部', '公文写作', '数据分析', '效率工具', 'AI绘画', 'Python', 'Prompt'];

export default function Profile() {
  const [activeTag, setActiveTag] = useState('全部');
  const [activeFolder, setActiveFolder] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  
  // 积分数据状态
  const [pointsData, setPointsData] = useState(null);
  const [radarData, setRadarData] = useState(null);
  
  // 直接从 localStorage 读取收藏
  const [assets, setAssets] = useState([]);
  
  // 加载积分数据
  useEffect(() => {
    const loadPoints = () => {
      const userData = getUserPoints();
      setPointsData(userData);
      
      // 计算雷达图数据
      const radar = calculateRadarData(userData);
      setRadarData({
        labels: ['认知 (Cognition)', '工具 (Tools)', '实操 (Practice)', '创新 (Innovation)', '效率 (Efficiency)'],
        datasets: [
          {
            label: '当前能力值',
            data: [radar.cognition, radar.tools, radar.practice, radar.innovation, radar.efficiency],
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            borderColor: '#2563eb',
            borderWidth: 2,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2563eb',
          },
        ],
      });
    };
    loadPoints();
    
    // 监听积分更新事件
    const handlePointsUpdate = () => {
      loadPoints();
    };
    window.addEventListener('pointsUpdated', handlePointsUpdate);
    
    return () => {
      window.removeEventListener('pointsUpdated', handlePointsUpdate);
    };
  }, []);
  
  // 加载收藏
  useEffect(() => {
    const loadAssets = () => {
      try {
        const data = localStorage.getItem('user_assets');
        if (data) {
          const bookmarks = JSON.parse(data);
          setAssets(bookmarks);
          console.log('Profile 加载了', bookmarks.length, '个收藏');
        } else {
          setAssets([]);
        }
      } catch (error) {
        console.error('加载收藏失败:', error);
        setAssets([]);
      }
    };
    loadAssets();
  }, []);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    console.log('🗑️ 删除收藏, id:', id);
    
    try {
      // 读取当前数据
      const data = localStorage.getItem('user_assets');
      if (!data) {
        console.log('  → 没有收藏数据');
        return;
      }
      
      const bookmarks = JSON.parse(data);
      console.log('  → 删除前数量:', bookmarks.length);
      
      // 过滤掉指定 id 的收藏
      const updated = bookmarks.filter(b => String(b.id) !== String(id));
      console.log('  → 删除后数量:', updated.length);
      
      // 保存
      localStorage.setItem('user_assets', JSON.stringify(updated));
      
      // 立即更新状态
      setAssets(updated);
      
      console.log('  → ✅ 删除成功!');
      
    } catch (error) {
      console.error('  → ❌ 删除失败:', error);
      alert('删除失败: ' + error.message);
    }
  };

  const uniqueFolders = ['全部', ...new Set(assets.map(a => a.folder || '我的技巧库 (默认)'))];

  const filteredAssets = assets.filter((asset) => {
    const matchesTag = activeTag === '全部' || (asset.tags && asset.tags.includes(activeTag));
    const matchesFolder = activeFolder === '全部' || (asset.folder || '我的技巧库 (默认)') === activeFolder;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (asset.content && asset.content.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesFolder && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: User Info & Radar */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* User Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-24 h-24 mx-auto bg-white rounded-full p-1 shadow-md -mt-16 mb-4">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                   <User className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Admin User</h1>
              <p className="text-gray-500 text-sm mb-2">高级数据分析师 · 数字化转型办公室</p>
              
              {/* 积分和等级显示 */}
              {pointsData && (
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold text-lg">{pointsData.totalPoints}</span>
                    <span className="text-xs opacity-90">积分</span>
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelInfo(pointsData.level).bg} ${getLevelInfo(pointsData.level).color}`}>
                      Lv.{pointsData.level} {getLevelInfo(pointsData.level).name}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  重庆·九龙坡
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  入职 3 年
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
                <div>
                  <div className="text-xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500">完成课程</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">45</div>
                  <div className="text-xs text-gray-500">实战练习</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">8</div>
                  <div className="text-xs text-gray-500">获得证书</div>
                </div>
              </div>
            </div>

            {/* Radar Chart Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  AI 能力模型
                </h2>
                {pointsData && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    前 {getRankPercentile(pointsData.totalPoints)}%
                  </span>
                )}
              </div>
              <div className="h-64 w-full">
                {radarData ? (
                  <Radar data={radarData} options={RADAR_OPTIONS} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p className="text-sm">加载中...</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  您的<span className="font-bold text-blue-600">工具应用</span>能力最为突出,建议加强<span className="font-bold text-amber-600">创新应用</span>方面的练习。
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Asset Library */}
          <div className="flex-1 space-y-6">
            
            {/* Library Header & Filters */}
            <div id="asset-library" className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-xl font-bold text-gray-900">我的技巧库 (Asset Library)</h2>
                  
                  <div className="flex gap-2">
                    {/* Folder Filter Dropdown */}
                    <select 
                      value={activeFolder}
                      onChange={(e) => setActiveFolder(e.target.value)}
                      className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
                    >
                      {uniqueFolders.map(folder => (
                        <option key={folder} value={folder}>
                          {folder === '全部' ? '📂 所有文件夹' : `📂 ${folder}`}
                        </option>
                      ))}
                    </select>

                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="搜索技巧或 Prompt..." 
                        className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['全部', ...new Set(assets.flatMap(a => a.tags || []))].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                      ${activeTag === tag 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Masonry/Grid Layout for Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800 line-clamp-1" title={asset.title}>{asset.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                             📂 {asset.folder || '我的技巧库 (默认)'}
                          </span>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{asset.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Code Snippet Style Content */}
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 font-mono text-xs text-gray-700 leading-relaxed overflow-hidden relative group">
                      <div className="line-clamp-4 whitespace-pre-wrap">
                        {asset.content}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/90 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-xl">
                    <div className="flex gap-2">
                      {asset.tags && asset.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleCopy(asset.id, asset.content)}
                        className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors px-2 py-1 rounded hover:bg-blue-50"
                      >
                        {copiedId === asset.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            复制
                          </>
                        )}
                      </button>
                      
                      <button 
                        onClick={(e) => handleDelete(e, asset.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50"
                        title="删除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAssets.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Filter className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>没有找到匹配的技巧</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
