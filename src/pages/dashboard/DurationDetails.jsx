import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Download, Clock, Medal, Flame } from 'lucide-react';

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
    { id: 8, name: '郑十', dept: '研发部', totalHours: 62.5, lastLearning: '2天前' },
    { id: 9, name: '陈十一', dept: '产品部', totalHours: 58.0, lastLearning: '5小时前' },
    { id: 10, name: '林十二', dept: '运营部', totalHours: 55.5, lastLearning: '3天前' },
    { id: 11, name: '黄十三', dept: '市场部', totalHours: 52.0, lastLearning: '1周前' },
    { id: 12, name: '周十四', dept: '设计部', totalHours: 48.5, lastLearning: '2周前' },
    { id: 13, name: '吴十五', dept: '人事部', totalHours: 45.0, lastLearning: '1个月前' },
    { id: 14, name: '郑十六', dept: '财务部', totalHours: 42.5, lastLearning: '2天前' },
    { id: 15, name: '陈十七', dept: '研发部', totalHours: 38.0, lastLearning: '5小时前' },
    { id: 16, name: '林十八', dept: '产品部', totalHours: 35.5, lastLearning: '3天前' },
    { id: 17, name: '黄十九', dept: '运营部', totalHours: 32.0, lastLearning: '1周前' },
    { id: 18, name: '周二十', dept: '市场部', totalHours: 28.5, lastLearning: '2周前' },
    { id: 19, name: '吴二一', dept: '设计部', totalHours: 25.0, lastLearning: '1个月前' },
    { id: 20, name: '郑二二', dept: '人事部', totalHours: 22.5, lastLearning: '2天前' },
  ];

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
        {/* Top Section: Average Duration & Dept Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Average Duration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">人均学习时长</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-bold text-indigo-600">12.4</span>
              <span className="text-xl text-gray-400">小时</span>
            </div>
            <div className="text-sm text-green-600 font-medium flex items-center gap-1">
              <span>↑ 1.2h</span>
              <span className="text-gray-400">较上周</span>
            </div>
          </div>

          {/* Dept Leaderboard */}
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
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">学习时长榜单</h3>
            <div className="text-sm text-gray-500">共 {learnerLeaderboard.length} 位学员</div>
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
          {/* Pagination (Mock) */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
            <div>显示 1 至 {learnerLeaderboard.length} 条，共 {learnerLeaderboard.length} 条</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
