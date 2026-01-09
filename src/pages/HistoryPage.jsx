import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Trash2, ArrowRight } from 'lucide-react';

// Mock Data for Watch History
const mockHistoryData = [
  {
    id: 201,
    title: "DeepSeek 深度解析：国产大模型应用效能跃升",
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    progress: 45, // 45% watched
    lastTimestamp: 1224, // Last paused at 1224 seconds
    totalDuration: 2720, // Total duration in seconds
    lastWatched: "2小时前",
    remainingTime: "剩余 25分钟"
  },
  {
    id: 102,
    title: "Prompt 提示词进阶指南：如何写出高质量 Prompt",
    cover: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80",
    progress: 80,
    lastTimestamp: 600,
    totalDuration: 750,
    lastWatched: "昨天",
    remainingTime: "剩余 2分钟"
  },
  {
    id: 103,
    title: "AI 绘图工具 Midjourney 从入门到精通",
    cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    progress: 10,
    lastTimestamp: 120,
    totalDuration: 1200,
    lastWatched: "3天前",
    remainingTime: "剩余 18分钟"
  },
  {
    id: 104,
    title: "数字化办公：Excel 中的 AI 技巧",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    progress: 95,
    lastTimestamp: 570,
    totalDuration: 600,
    lastWatched: "1周前",
    remainingTime: "剩余 30秒"
  }
];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistoryData);
  const navigate = useNavigate();

  const handleClearHistory = () => {
    if (window.confirm('确定要清空所有观看历史吗？')) {
      setHistory([]);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">观看历史</h1>
        </div>
        
        {history.length > 0 && (
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 bg-white hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-lg transition-all shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            <span>清空历史</span>
          </button>
        )}
      </div>

      {/* Grid Layout */}
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Clock className="w-16 h-16 mb-4 opacity-20" />
          <p className="text-lg">暂无观看历史</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            去浏览课程
          </button>
        </div>
      )}
    </div>
  );
}

function HistoryCard({ item }) {
  const navigate = useNavigate();

  // Resume Play Logic
  // 核心逻辑：断点续播 (Resume Play)
  // 当用户点击卡片时，跳转到视频详情页，并带上时间参数 t。
  // 目标 URL 格式：/video/[id]?t=[lastTimestamp]
  // 
  // 说明：
  // 播放器组件 (VideoDetail.jsx) 应该在加载时读取 URL 中的 't' 参数。
  // 如果存在 't' 参数，则将其解析为整数，并设置播放器的 currentTime。
  // 示例代码 (在 VideoDetail.jsx 中):
  // useEffect(() => {
  //   const t = searchParams.get('t');
  //   if (t) {
  //     const seekTime = parseInt(t, 10);
  //     setCurrentTime(seekTime);
  //     setIsPlaying(true);
  //   }
  // }, [searchParams]);

  const handleCardClick = () => {
    navigate(`/video/${item.id}?t=${item.lastTimestamp}&resumed=true`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img 
          src={item.cover} 
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Hover Overlay with Play Icon */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 text-blue-600 ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30">
          <div 
            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            style={{ width: `${item.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 mb-3 h-10 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.lastWatched}
          </span>
          <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
            {item.remainingTime}
          </span>
        </div>
      </div>
    </div>
  );
}
