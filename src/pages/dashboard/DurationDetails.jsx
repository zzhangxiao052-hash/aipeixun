import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Download, Clock, Smartphone, Monitor, Flame, Medal } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DurationDetails() {
  // Mock Data
  const deptLeaderboard = [
    { name: '研发部', hours: 45.5 },
    { name: '产品部', hours: 42.0 },
    { name: '运营部', hours: 38.5 },
    { name: '市场部', hours: 36.0 },
    { name: '设计部', hours: 32.5 },
  ];

  const learnerLeaderboard = [
    { id: 1, name: '张三', dept: '研发部', totalHours: 128.5, lastLearning: '10分钟前' },
    { id: 2, name: '李四', dept: '产品部', totalHours: 115.2, lastLearning: '2小时前' },
    { id: 3, name: '王五', dept: '运营部', totalHours: 108.0, lastLearning: '昨天 18:30' },
    { id: 4, name: '赵六', dept: '市场部', totalHours: 95.5, lastLearning: '3天前' },
    { id: 5, name: '孙七', dept: '设计部', totalHours: 88.0, lastLearning: '1周前' },
    { id: 6, name: '周八', dept: '人事部', totalHours: 76.5, lastLearning: '2周前' },
    { id: 7, name: '吴九', dept: '财务部', totalHours: 65.0, lastLearning: '1个月前' },
  ];

  // Heatmap Data (Simulated)
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  
  const getHeatmapColor = (dayIndex, hour) => {
    // Simulate hotter spots: Lunch (12-13), Evening (19-21)
    let intensity = 0;
    if ((hour >= 12 && hour <= 13) || (hour >= 19 && hour <= 21)) {
      intensity = Math.random() * 0.5 + 0.5; // High intensity
    } else if (hour >= 9 && hour <= 18) {
      intensity = Math.random() * 0.3 + 0.2; // Medium intensity (work hours)
    } else {
      intensity = Math.random() * 0.1; // Low intensity
    }
    
    // Weekend adjustment
    if (dayIndex >= 5) intensity *= 0.4;

    const alpha = Math.max(0.05, intensity);
    return `rgba(79, 70, 229, ${alpha})`; // Indigo base
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 md:px-14 mb-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/settings" state={{ activeTab: 'cockpit' }} className="hover:text-blue-600 transition-colors">驾驶舱</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">累计学习时长详情</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">累计学习时长详情</h1>
              <p className="text-gray-500 mt-1">全平台学习时长统计与趋势分析</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索学员..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                导出数据
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Duration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">人均学习时长</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-indigo-600">12.4</span>
                <span className="text-lg text-gray-400">小时</span>
              </div>
              <div className="mt-2 text-sm text-green-600 font-medium">↑ 1.2h 较上周</div>
            </div>
            <div className="hidden md:block w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center">
               <Clock className="w-12 h-12 text-indigo-200" />
            </div>
          </div>

          {/* PC vs Mobile */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-6">终端时长占比</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 font-medium">PC 端</span>
                  </div>
                  <span className="font-bold text-gray-900">65%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 font-medium">移动端</span>
                  </div>
                  <span className="font-bold text-gray-900">35%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Heatmap (60%) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">学习时段热力图</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-3 h-3 bg-indigo-100 rounded-sm"></span>
                <span>闲时</span>
                <span className="w-3 h-3 bg-indigo-600 rounded-sm ml-2"></span>
                <span>忙时</span>
              </div>
            </div>
            
            <div className="min-w-[600px]">
              {/* X Axis Labels */}
              <div className="flex ml-12 mb-2">
                {hours.map(h => (
                   <div key={h} className="flex-1 text-center text-[10px] text-gray-400">{h}</div>
                ))}
              </div>
              
              {/* Grid */}
              <div className="space-y-1">
                {days.map((day, dayIdx) => (
                  <div key={day} className="flex items-center h-8">
                    <div className="w-12 text-xs text-gray-500 font-medium">{day}</div>
                    <div className="flex-1 flex gap-1 h-full">
                      {hours.map(hour => (
                        <div 
                          key={hour} 
                          className="flex-1 rounded-sm transition-all hover:scale-110 hover:shadow-sm cursor-pointer relative group"
                          style={{ backgroundColor: getHeatmapColor(dayIdx, hour) }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap z-10">
                            {day} {hour}:00
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dept Leaderboard (40%) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">部门人均时长排行 (Top 5)</h3>
            <div className="space-y-5">
              {deptLeaderboard.map((dept, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                        index < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{dept.hours}h</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full" 
                      style={{ width: `${(dept.hours / 50) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learner Leaderboard Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">学霸榜单</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 w-20">排名</th>
                  <th className="px-6 py-4">姓名</th>
                  <th className="px-6 py-4">部门</th>
                  <th className="px-6 py-4">总学习时长</th>
                  <th className="px-6 py-4">最近一次学习</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {learnerLeaderboard.map((learner, index) => (
                  <tr key={learner.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {index < 3 ? (
                        <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center">
                          <Medal className={`w-5 h-5 ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 
                            'text-orange-400'
                          }`} />
                        </div>
                      ) : (
                        <span className="w-8 h-8 flex items-center justify-center font-bold text-gray-400">
                          {index + 1}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{learner.name}</span>
                        {index < 3 && <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{learner.dept}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-indigo-600">{learner.totalHours}</span>
                      <span className="text-xs text-gray-400 ml-1">小时</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{learner.lastLearning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
