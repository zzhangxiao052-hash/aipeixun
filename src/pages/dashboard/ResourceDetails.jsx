import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Download, MousePointer, Copy, Users, Zap, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function ResourceDetails() {
  // Mock Data
  const toolUsageData = [
    { name: 'DeepSeek', calls: 3500 },
    { name: 'Midjourney', calls: 2800 },
    { name: 'Excel AI', calls: 1500 },
    { name: 'ChatGPT', calls: 1200 },
    { name: 'Notion AI', calls: 800 },
  ];

  const promptCategoryData = [
    { name: '办公写作', value: 40 },
    { name: '代码辅助', value: 30 },
    { name: '图像生成', value: 20 },
    { name: '数据分析', value: 10 },
  ];
  const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  const talentList = [
    { id: 1, name: '张三', dept: '研发部', calls: 128, preference: '代码辅助' },
    { id: 2, name: '李四', dept: '市场部', calls: 85, preference: '文案创作' },
    { id: 3, name: '王五', dept: '设计部', calls: 62, preference: '图像生成' },
    { id: 4, name: '赵六', dept: '运营部', calls: 45, preference: '数据分析' },
    { id: 5, name: '孙七', dept: '产品部', calls: 30, preference: '办公写作' },
    { id: 6, name: '周八', dept: '人事部', calls: 55, preference: '办公写作' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 md:px-14 mb-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/settings" state={{ activeTab: 'cockpit' }} className="hover:text-blue-600 transition-colors">驾驶舱</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">工具/资源调用详情</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">工具/资源调用详情</h1>
              <p className="text-gray-500 mt-1">监控 AI 工具调用频率与资源使用情况</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索工具或人员..." 
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                导出日志
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 space-y-6">
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <MousePointer className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">资源点击总数</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">12,580</div>
            <div className="text-xs text-green-600 font-medium mt-1">↑ 12% 较上周</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Copy className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">提示词复制总数</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">8,450</div>
            <div className="text-xs text-green-600 font-medium mt-1">↑ 25% 较上周</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2 text-gray-500">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">人均调用次</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-2">38.5</div>
            <div className="text-xs text-green-600 font-medium mt-1">↑ 5.2次 较上周</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Popular Tools (60%) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">热门 AI 工具排行榜</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={toolUsageData} layout="vertical" margin={{ left: 20, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 13}} />
                  <Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                  <Bar dataKey="calls" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} label={{ position: 'right', fill: '#6B7280', fontSize: 12 }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Prompt Categories (40%) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">复制提示词类别占比</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promptCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {promptCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Digital Talent List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900">数字化人才挖掘列表</h3>
              <p className="text-xs text-gray-500 mt-1">发现潜在的 AI 业务专家</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">查看全部</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">姓名</th>
                  <th className="px-6 py-4">部门</th>
                  <th className="px-6 py-4">资源调用总次数</th>
                  <th className="px-6 py-4">偏好领域</th>
                  <th className="px-6 py-4">标签</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {talentList.map((talent) => (
                  <tr key={talent.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{talent.name}</td>
                    <td className="px-6 py-4 text-gray-600">{talent.dept}</td>
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-blue-600">{talent.calls}</span>
                      <span className="text-xs text-gray-400 ml-1">次</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {talent.preference}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {talent.calls > 50 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 border border-purple-200">
                          <Award className="w-3 h-3" />
                          效能跃升派
                        </span>
                      )}
                    </td>
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
