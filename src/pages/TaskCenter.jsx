import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, AlertCircle, Clock, Calendar, 
  FileText, PlayCircle, Award, Filter, Search, ArrowRight 
} from 'lucide-react';
import { TASKS } from '../data/tasks';

export default function TaskCenter() {
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, PENDING, COMPLETED
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = TASKS.filter(task => {
    const matchesTab = 
      activeTab === 'ALL' ? true : 
      activeTab === 'PENDING' ? task.status === 'PENDING' : 
      task.status === 'COMPLETED';
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.source.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const pendingCount = TASKS.filter(t => t.status === 'PENDING').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-6 px-4 md:px-14">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                必修任务中心
                {pendingCount > 0 && (
                  <span className="px-2.5 py-0.5 bg-red-100 text-red-600 text-sm rounded-full font-medium">
                    {pendingCount} 待完成
                  </span>
                )}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                管理您的必修课程、考核与效能跃升任务
              </p>
            </div>
            
            <div className="flex gap-3">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="搜索任务..." 
                   className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-8 border-b border-gray-100">
            {['ALL', 'PENDING', 'COMPLETED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-all relative
                  ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {tab === 'ALL' && '全部任务'}
                {tab === 'PENDING' && '待完成'}
                {tab === 'COMPLETED' && '已完成'}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-gray-900 font-bold">没有找到相关任务</h3>
              <p className="text-gray-500 text-sm mt-1">试着调整筛选条件或搜索关键词</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }) {
  const isPending = task.status === 'PENDING';
  const isUrgent = task.priority === 'HIGH' && isPending;

  return (
    <div className={`group bg-white rounded-xl p-5 border transition-all hover:shadow-md
      ${isUrgent ? 'border-l-4 border-l-red-500 border-y-gray-200 border-r-gray-200' : 'border-gray-200'}
    `}>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        
        {/* Icon & Type */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
          ${task.type === 'EXAM' ? 'bg-purple-100 text-purple-600' : 
            task.type === 'PRACTICE' ? 'bg-blue-100 text-blue-600' : 
            'bg-orange-100 text-orange-600'}
        `}>
          {task.type === 'EXAM' && <FileText className="w-6 h-6" />}
          {task.type === 'PRACTICE' && <Award className="w-6 h-6" />}
          {task.type === 'VIDEO' && <PlayCircle className="w-6 h-6" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
            {isUrgent && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                紧急
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-medium">
                {task.source.title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              截止: {task.deadline}
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          {isPending ? (
            <Link 
              to={task.link || `/video/${task.source.id}`}
              className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              去完成 <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-green-600 font-bold px-4 py-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              已完成
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
