import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp,
  TrendingDown,
  Activity,

  ChevronRight,

} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import MobileStatusBar from './MobileStatusBar';
import MobileNav from './MobileNav';

export default function MobileCockpit() {
  const navigate = useNavigate();

  // --- Mock Data ---
  
  // 1. Sparkline Data (Activity)
  const sparklineData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        data: [450, 580, 420, 690, 610, 750, 850],
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0, // Hide points
        pointHoverRadius: 0,
        fill: false,
      }
    ],
  };

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false },
      y: { display: false, min: 300 } // Add some padding at bottom
    },
    layout: { padding: 0 }
  };

  // 2. Ranking Data (Progress List)
  const deptRankings = [
    { name: '研发部', value: '45.5h', score: 91 },
    { name: '产品部', value: '42h', score: 84 },
    { name: '运营部', value: '38.5h', score: 77 },
    { name: '市场部', value: '36h', score: 72 },
    { name: '设计部', value: '32.5h', score: 65 },
  ];

  // 3. Tag Cloud Data
  const tags = [
    { name: 'AI写作', heat: 95, color: 'bg-blue-600' },
    { name: '数据分析', heat: 88, color: 'bg-blue-500' },
    { name: 'Python', heat: 82, color: 'bg-blue-400' },
    { name: '提示词工程', heat: 75, color: 'bg-indigo-500' },
    { name: 'Midjourney', heat: 68, color: 'bg-indigo-400' },
    { name: '自动化办公', heat: 60, color: 'bg-purple-500' },
    { name: '短视频制作', heat: 55, color: 'bg-purple-400' },
    { name: '沟通技巧', heat: 45, color: 'bg-gray-400' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-20 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-12 flex items-center justify-center">
        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          移动驾驶舱
        </h1>
      </div>

      <div className="p-4 space-y-5">
        
        {/* 1. KPI Cards (2x2 Grid - Lightweight) */}
        <div className="grid grid-cols-2 gap-3">
          <KpiCard 
            title="全员覆盖率" 
            value="92%" 
            trend="较上周 +5%" 
            isUp={true} 
          />
          <KpiCard 
            title="累计时长" 
            value="15.4k" 
            trend="较上周 +12%" 
            isUp={true} 
          />
          <KpiCard 
            title="课程完课率" 
            value="65%" 
            trend="较上周 +3%" 
            isUp={true} 
          />
          <KpiCard 
            title="资源调用" 
            value="8,540" 
            trend="较上周 +18%" 
            isUp={true} 
          />
        </div>

        {/* 2. Trend Monitoring (Sparkline) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">近7天活跃趋势</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">活跃度持续上升 ↗</p>
            </div>
            <div className="text-xl font-bold text-blue-600">850</div>
          </div>
          <div className="h-[60px] w-full">
            <Line data={sparklineData} options={sparklineOptions} />
          </div>
        </div>

        {/* 3. Ranking Data (Progress List) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm">部门人均时长排行</h3>
            <span className="text-xs text-gray-400">Top 5</span>
          </div>
          <div className="space-y-4">
            {deptRankings.map((dept, index) => (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-gray-700">{dept.name}</span>
                  <span className="font-bold text-gray-900">{dept.value}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${dept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/mobile/ranking')}
            className="w-full mt-4 py-2 text-xs text-gray-500 flex items-center justify-center gap-1 hover:text-blue-600 transition-colors"
          >
            查看全部 <ChevronRight className="w-3 h-3" />
          </button>
        </div>


        {/* 5. Tag Cloud (Replaces Radar) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-sm">热门技能标签</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className={`${tag.color} text-white px-2.5 py-1 rounded-lg text-xs font-medium opacity-90`}
                style={{ opacity: 0.6 + (tag.heat / 200) }} // Dynamic opacity based on heat
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>



      </div>
      <MobileNav />
    </div>
  );
}

function KpiCard({ title, value, trend, isUp }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-24">
      <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</div>
      <div>
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className={`text-[10px] font-medium ${isUp ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {isUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
    </div>
  );
}
