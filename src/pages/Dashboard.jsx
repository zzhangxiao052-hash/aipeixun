import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

const LAST_WATCHED = {
  id: 101,
  title: 'AI 辅助公文写作：从入门到精通',
  cover: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  progress: 65,
  timeLeft: '12min',
  chapter: '第3章：大纲生成的技巧'
};

import { TASKS } from '../data/tasks';

const PENDING_TASKS = TASKS.filter(t => t.status === 'PENDING');

const RECOMMENDED_VIDEOS = [
  { 
    id: 201, 
    title: 'DeepSeek 深度解析：国产大模型应用', 
    cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '45:20', 
    tags: ['技术', '大模型'], 
    isUpdated: true,
    author: '技术部'
  },
  { 
    id: 202, 
    title: '高效办公：Excel 中的 AI 技巧', 
    cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '15:10', 
    tags: ['办公', '效率'], 
    isUpdated: false,
    author: '培训中心'
  },
  { 
    id: 203, 
    title: '数字化转型案例分析', 
    cover: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '32:05', 
    tags: ['管理', '案例'], 
    isUpdated: false,
    author: '战略部'
  },
  { 
    id: 204, 
    title: '网络安全基础意识', 
    cover: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '20:00', 
    tags: ['安全', '必修'], 
    isUpdated: true,
    author: '安全部'
  },
  { 
    id: 205, 
    title: 'AI 绘画工具 Midjourney 进阶', 
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '28:15', 
    tags: ['设计', '创意'], 
    isUpdated: false,
    author: '设计部'
  },
  { 
    id: 206, 
    title: '政务服务中的沟通艺术', 
    cover: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '40:00', 
    tags: ['行政', '沟通'], 
    isUpdated: false,
    author: '人资部'
  },
  { 
    id: 207, 
    title: 'Python 数据分析基础', 
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '55:30', 
    tags: ['技术', '数据'], 
    isUpdated: true,
    author: '技术部'
  },
  { 
    id: 208, 
    title: '未来城市：智慧交通系统', 
    cover: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    duration: '22:45', 
    tags: ['规划', '前沿'], 
    isUpdated: false,
    author: '规划局'
  }
];

export default function Dashboard() {
  const [lastWatched, setLastWatched] = useState(LAST_WATCHED);

  useEffect(() => {
    const savedProgress = localStorage.getItem('video_progress_201');
    if (savedProgress) {
      const time = parseInt(savedProgress, 10);
      const totalDuration = 2720; // 45:20 in seconds
      const progress = Math.min(100, Math.round((time / totalDuration) * 100));
      
      setLastWatched(prev => ({
        ...prev,
        id: 201, // Ensure it points to our demo video
        title: 'DeepSeek 深度解析：国产大模型应用实战', // Match video 201
        cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        progress,
        time, // Store raw time for link
        timeLeft: `${Math.ceil((totalDuration - time) / 60)}min`,
        chapter: '上次观看至 ' + formatTime(time)
      }));
    }
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8 space-y-10">
      
      {/* --- 1. Hero Section --- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Continue Watching (断点续学) */}
        <Link 
          to={`/video/${lastWatched.id}?t=${Math.max(0, (lastWatched.time || 0) - 5)}&resumed=true`}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center transition-shadow hover:shadow-md group cursor-pointer"
        >
          <div className="relative w-full sm:w-72 h-48 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden">
            <img src={lastWatched.cover} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Cover" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-6 h-6 text-blue-700 ml-1" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200">
              <div className="h-full bg-blue-600 rounded-r-full" style={{ width: `${lastWatched.progress}%` }}></div>
            </div>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="flex items-center gap-2">
               <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">最近学习</span>
               <div className="text-sm text-gray-500 font-medium flex items-center gap-1">
                 <Clock className="w-3.5 h-3.5" /> {lastWatched.chapter}
               </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-700 transition-colors">
              {lastWatched.title}
            </h2>
            
            <div className="flex items-center gap-4 pt-2">
              <div className="px-8 py-2.5 bg-blue-700 group-hover:bg-blue-800 text-white rounded-lg font-medium transition-all shadow-blue-200 shadow-lg group-hover:shadow-blue-300 group-hover:-translate-y-0.5">
                继续学习
              </div>
              <span className="text-sm text-gray-500 font-medium">剩余 {lastWatched.timeLeft}</span>
            </div>
          </div>
        </Link>

        {/* Right: Mandatory Tasks (必修任务提醒) */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col w-full h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              必修任务提醒
            </h3>
            {PENDING_TASKS.length > 0 && (
               <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </div>
          
          {PENDING_TASKS.length > 0 ? (
            <>
              <div className="mb-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 font-medium flex items-center gap-2">
                 <AlertCircle className="w-4 h-4" />
                 您有 {PENDING_TASKS.length} 项必修任务未完成
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-1">
                {PENDING_TASKS.map(task => (
                  <Link to={task.link || `/video/${task.source.id}`} key={task.id} className="group flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-sm transition-all cursor-pointer">
                    <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${task.priority === 'HIGH' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
                    <div className="flex-1">
                      <div className={`text-sm font-bold ${task.priority === 'HIGH' ? 'text-gray-800' : 'text-gray-700'} group-hover:text-blue-700 transition-colors`}>
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> 截止: {task.deadline}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-2">
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
              <span className="text-sm">所有必修任务已完成</span>
            </div>
          )}
          
          <Link to="/tasks" className="w-full mt-4 py-2.5 text-sm text-gray-600 hover:text-blue-700 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all font-medium flex items-center justify-center">
            查看全部任务
          </Link>
        </div>
      </section>

      {/* --- 2. Recommendations (智能推荐流) --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-800">为你推荐</h2>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold">AI 精选</span>
          </div>
          <div className="flex gap-2">
            {['全部', '行政', '财务', '技术', '安全'].map(tag => (
              <button key={tag} className="px-4 py-1.5 text-sm rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all font-medium">
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {RECOMMENDED_VIDEOS.map(video => (
            <VideoCard key={video.id} data={video} />
          ))}
        </div>
      </section>
    </div>
  );
}

function VideoCard({ data }) {
  return (
    <Link to={`/video/${data.id}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img src={data.cover} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          {data.duration}
        </div>
        
        {/* Update Badge */}
        {data.isUpdated && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-blue-900/20 z-10">
            UPDATE
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors h-10">
          {data.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium hover:text-gray-700">{data.author}</span>
          <div className="flex gap-1">
            {data.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500 font-medium group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
