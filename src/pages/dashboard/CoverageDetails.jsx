import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Download, ArrowRight, Bell } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CoverageDetails() {
  const [dateRange, setDateRange] = useState('30days');

  // Mock Data
  const trendData = Array.from({ length: 15 }, (_, i) => ({
    date: `12-${10 + i}`,
    active: 850 + Math.floor(Math.random() * 150)
  }));

  const deptData = [
    { name: '研发部', rate: 98 },
    { name: '产品部', rate: 95 },
    { name: '设计部', rate: 92 },
    { name: '市场部', rate: 85 },
    { name: '运营部', rate: 82 },
    { name: '人事部', rate: 78 },
    { name: '财务部', rate: 75 },
    { name: '行政部', rate: 70 },
  ];

  const userList = [
    { id: 1, name: '王强', dept: '财务部', status: '未激活', lastLogin: '-' },
    { id: 2, name: '李丽', dept: '人事部', status: '已激活', lastLogin: '2023-12-24 09:30' },
    { id: 3, name: '张伟', dept: '运营部', status: '已激活', lastLogin: '2023-12-25 14:20' },
    { id: 4, name: '赵敏', dept: '市场部', status: '未激活', lastLogin: '-' },
    { id: 5, name: '孙涛', dept: '行政部', status: '已激活', lastLogin: '2023-12-23 18:00' },
    { id: 6, name: '周杰', dept: '研发部', status: '已激活', lastLogin: '2023-12-25 10:15' },
    { id: 7, name: '吴刚', dept: '产品部', status: '已激活', lastLogin: '2023-12-25 11:45' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 md:px-14 mb-6">
        <div className="max-w-[1800px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/settings" state={{ activeTab: 'cockpit' }} className="hover:text-blue-600 transition-colors">驾驶舱</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">全员覆盖率详情</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">全员覆盖率详情</h1>
              <p className="text-gray-500 mt-1">查看各部门及人员的平台覆盖与激活情况</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索部门或姓名..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                导出报表
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 space-y-6">
        {/* Top Cards (Funnel Effect) */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Card 1 */}
          <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-200"></div>
            <p className="text-sm font-medium text-gray-500 mb-2">总人数</p>
            <div className="text-4xl font-bold text-gray-900">1,200</div>
            <div className="mt-2 text-xs text-gray-400">全公司在职员工</div>
          </div>

          <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block flex-shrink-0" />

          {/* Card 2 */}
          <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
            <p className="text-sm font-medium text-gray-500 mb-2">已激活账号</p>
            <div className="text-4xl font-bold text-blue-600">1,150</div>
            <div className="mt-2 text-xs text-green-600 font-medium">激活率 95.8%</div>
          </div>

          <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block flex-shrink-0" />

          {/* Card 3 */}
          <div className="flex-1 w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
            <p className="text-sm font-medium text-gray-500 mb-2">本月登录人数</p>
            <div className="text-4xl font-bold text-indigo-600">980</div>
            <div className="mt-2 text-xs text-blue-600 font-medium">月活率 81.6%</div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Trend Chart (60%) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">近30天日活趋势</h3>
              <div className="px-3 py-1 bg-gray-50 text-xs text-gray-500 rounded-lg border border-gray-200">
                每日登录人数
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} domain={[0, 'auto']} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                  />
                  <Line type="monotone" dataKey="active" stroke="#2563EB" strokeWidth={3} dot={{r: 3, fill: '#2563EB', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dept Chart (40%) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">各部门激活率对比</h3>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" margin={{left: 10, right: 30}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4B5563', fontSize: 13}} width={60} />
                  <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                  <Bar dataKey="rate" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#6B7280', fontSize: 12, formatter: (val) => `${val}%` }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">人员明细列表</h3>
            <div className="flex gap-2">
               <button className="text-sm text-gray-500 hover:text-gray-700 font-medium px-3 py-1 bg-gray-50 rounded-lg">全部</button>
               <button className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 rounded-lg">未激活</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">姓名</th>
                  <th className="px-6 py-4">部门</th>
                  <th className="px-6 py-4">账号状态</th>
                  <th className="px-6 py-4">最后登录时间</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userList.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600">{user.dept}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === '已激活' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === '已激活' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-xs font-medium bg-transparent">
                        <Bell className="w-3 h-3" />
                        发送提醒
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
             <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">加载更多...</button>
          </div>
        </div>
      </div>
    </div>
  );
}
