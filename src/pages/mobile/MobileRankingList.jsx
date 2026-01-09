import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Medal } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileRankingList() {
  const navigate = useNavigate();

  // Mock Data
  const rankingData = [
    { id: 1, name: '张二', department: '研发部', duration: '128.5 小时', lastTime: '10分钟前', rank: 1 },
    { id: 2, name: '李四', department: '产品部', duration: '115.2 小时', lastTime: '2小时前', rank: 2 },
    { id: 3, name: '王五', department: '运营部', duration: '108 小时', lastTime: '昨天 18:30', rank: 3 },
    { id: 4, name: '赵六', department: '市场部', duration: '95.5 小时', lastTime: '3天前', rank: 4 },
    { id: 5, name: '孙七', department: '设计部', duration: '88 小时', lastTime: '1周前', rank: 5 },
    { id: 6, name: '周八', department: '人事部', duration: '76.5 小时', lastTime: '2周前', rank: 6 },
    { id: 7, name: '吴九', department: '财务部', duration: '65 小时', lastTime: '1个月前', rank: 7 },
    { id: 8, name: '郑十', department: '研发部', duration: '62.5 小时', lastTime: '2天前', rank: 8 },
    { id: 9, name: '陈十一', department: '产品部', duration: '58 小时', lastTime: '5小时前', rank: 9 },
    { id: 10, name: '林十二', department: '运营部', duration: '55.5 小时', lastTime: '3天前', rank: 10 },
    { id: 11, name: '黄十三', department: '市场部', duration: '52 小时', lastTime: '1周前', rank: 11 },
    { id: 12, name: '何十四', department: '设计部', duration: '48.5 小时', lastTime: '2周前', rank: 12 },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-xs"><Medal className="w-4 h-4" /></div>;
      case 2:
        return <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs"><Medal className="w-4 h-4" /></div>;
      case 3:
        return <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs"><Medal className="w-4 h-4" /></div>;
      default:
        return <span className="text-gray-400 font-medium w-6 text-center">{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-8 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">学习时长榜单</h1>
        <div className="w-6" /> 
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-sm font-bold text-gray-800">学习时长榜单</h2>
          <span className="text-xs text-gray-500">共 {rankingData.length} 位学员</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs text-gray-500 font-medium">
            <div className="col-span-2 text-center">排名</div>
            <div className="col-span-3">姓名</div>
            <div className="col-span-3">部门</div>
            <div className="col-span-4 text-right">总时长</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-50">
            {rankingData.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 px-4 py-3.5 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-2 flex justify-center">
                  {getRankIcon(item.rank)}
                </div>
                <div className="col-span-3">
                  <div className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    {item.name}
                    {item.rank <= 3 && <span className="text-[10px] text-red-500">🔥</span>}
                  </div>
                </div>
                <div className="col-span-3 text-xs text-gray-500">
                  {item.department}
                </div>
                <div className="col-span-4 text-right">
                  <div className="text-sm font-bold text-blue-600">{item.duration}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{item.lastTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
