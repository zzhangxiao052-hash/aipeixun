import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Download, ThumbsUp, AlertTriangle, User, BookOpen } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function CompletionDetails() {
  const [activeTab, setActiveTab] = useState('person'); // 'person' or 'course'

  // Mock Data
  const basicCognitionData = [
    { name: '已完成', value: 85 },
    { name: '未完成', value: 15 },
  ];
  const practicalSkillsData = [
    { name: '已完成', value: 62 },
    { name: '未完成', value: 38 },
  ];
  const COLORS = {
    basic: ['#3B82F6', '#E5E7EB'], // Blue
    practical: ['#10B981', '#E5E7EB'],   // Green
  };

  const popularCourses = [
    { id: 1, title: 'DeepSeek 高效办公', rate: 92, likes: '98%' },
    { id: 2, title: 'Midjourney 进阶指南', rate: 88, likes: '96%' },
    { id: 3, title: 'Python 数据分析基础', rate: 85, likes: '95%' },
    { id: 4, title: '公文写作助手效能跃升', rate: 82, likes: '94%' },
    { id: 5, title: 'Excel AI 插件应用', rate: 78, likes: '92%' },
  ];

  const abandonedCourses = [
    { id: 1, title: '复杂神经网络原理', rate: 15, warning: '难度过高' },
    { id: 2, title: 'C++ 高级编程', rate: 22, warning: '缺乏效能跃升' },
    { id: 3, title: '传统机器学习算法', rate: 28, warning: '内容枯燥' },
    { id: 4, title: '区块链技术底层逻辑', rate: 35, warning: '应用场景少' },
    { id: 5, title: '元宇宙概念解析', rate: 40, warning: '概念模糊' },
  ];

  const personList = [
    { id: 1, name: '张三', dept: '研发部', basicRate: 92, practicalRate: 85 },
    { id: 2, name: '李四', dept: '产品部', basicRate: 65, practicalRate: 42 },
    { id: 3, name: '王五', dept: '运营部', basicRate: 100, practicalRate: 98 },
    { id: 4, name: '赵六', dept: '市场部', basicRate: 35, practicalRate: 20 },
    { id: 5, name: '孙七', dept: '设计部', basicRate: 88, practicalRate: 90 },
    { id: 6, name: '周八', dept: '人事部', basicRate: 45, practicalRate: 15 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-6 pb-4 px-4 md:px-14 mb-6">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/settings" state={{ activeTab: 'cockpit' }} className="hover:text-blue-600 transition-colors">驾驶舱</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">课程完课率详情</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">课程完课率详情</h1>
              <p className="text-gray-500 mt-1">分析各课程类别的完成情况与学员进度</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索课程或学员..." 
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
        {/* Top Stats (Completion Overview) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Cognition Rate */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">基础认知完成率</h3>
              <p className="text-sm text-gray-500 mb-4">AI通识、伦理与趋势分析</p>
              <div className="text-4xl font-bold text-blue-600">85%</div>
              <div className="text-xs text-green-600 font-medium mt-2">↑ 5% 较上月</div>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={basicCognitionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {basicCognitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.basic[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Practical Skills Rate */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">效能跃升技能完成率</h3>
              <p className="text-sm text-gray-500 mb-4">办公提效、Prompt工程与工具实操</p>
              <div className="text-4xl font-bold text-green-600">62%</div>
              <div className="text-xs text-green-600 font-medium mt-2">↑ 12% 较上月</div>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={practicalSkillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {practicalSkillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.practical[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Middle Section (Red/Black List) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Popular Courses (Red List) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <ThumbsUp className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-gray-900">最受欢迎课程 Top 5</h3>
            </div>
            <div className="space-y-4">
              {popularCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                      index < 3 ? 'bg-red-500 text-white' : 'bg-red-200 text-red-700'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{course.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">完课率 <span className="font-bold text-gray-900">{course.rate}%</span></span>
                    <span className="text-red-600 font-medium">好评 {course.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abandoned Courses (Black List) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-bold text-gray-900">“半途而废”课程 Top 5</h3>
            </div>
            <div className="space-y-4">
              {abandonedCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{course.title}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-gray-500">完课率 <span className="font-bold text-gray-900">{course.rate}%</span></span>
                    <span className="text-orange-500 font-medium">{course.warning}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section (Detailed Data with Tabs) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('person')}
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${
                  activeTab === 'person' 
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4" />
                按人员查看
              </button>
              <button 
                onClick={() => setActiveTab('course')}
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 ${
                  activeTab === 'course' 
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                按课程查看
              </button>
            </div>
          </div>

          <div className="p-0">
            {activeTab === 'person' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">姓名</th>
                      <th className="px-6 py-4">部门</th>
                      <th className="px-6 py-4">基础认知完成率</th>
                      <th className="px-6 py-4">效能跃升技能完成率</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {personList.map((person) => (
                      <tr key={person.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{person.name}</td>
                        <td className="px-6 py-4 text-gray-600">{person.dept}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-100 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  person.basicRate >= 80 ? 'bg-blue-500' : 
                                  person.basicRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${person.basicRate}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-600 w-8 text-right">{person.basicRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-100 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  person.practicalRate >= 80 ? 'bg-green-500' : 
                                  person.practicalRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${person.practicalRate}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold text-gray-600 w-8 text-right">{person.practicalRate}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>
                {/* Filter Bar */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="all">所有类别</option>
                      <option value="basic">基础认知</option>
                      <option value="practical">效能跃升技能</option>
                    </select>
                    <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="default">默认排序</option>
                      <option value="rate_desc">完课率从高到低</option>
                      <option value="rate_asc">完课率从低到高</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-500">共找到 <span className="font-bold text-gray-900">6</span> 门课程</div>
                </div>

                {/* Course Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 w-1/3">课程信息</th>
                        <th className="px-6 py-4">课程点赞数</th>
                        <th className="px-6 py-4 w-1/4">完课率</th>
                        <th className="px-6 py-4">平均耗时</th>
                        <th className="px-6 py-4 text-right">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { id: 1, title: 'DeepSeek 高效办公效能跃升', category: 'practical', likes: 850, rate: 92, duration: '45分钟' },
                        { id: 2, title: 'AI 伦理与安全导论', category: 'basic', likes: 1200, rate: 88, duration: '30分钟' },
                        { id: 3, title: 'Midjourney 图像生成进阶', category: 'practical', likes: 680, rate: 75, duration: '60分钟' },
                        { id: 4, title: 'Python 数据分析基础', category: 'practical', likes: 520, rate: 65, duration: '90分钟' },
                        { id: 5, title: '元宇宙概念解析', category: 'basic', likes: 300, rate: 40, duration: '25分钟' },
                        { id: 6, title: '区块链技术底层逻辑', category: 'basic', likes: 150, rate: 35, duration: '50分钟' },
                      ].map((course) => (
                        <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-200 flex-shrink-0"></div>
                              <div>
                                <div className="font-medium text-gray-900 mb-1">{course.title}</div>
                                <div className="flex items-center gap-2 text-xs">
                                  <span className={`px-1.5 py-0.5 rounded border ${
                                    course.category === 'basic' 
                                      ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                      : 'bg-green-50 text-green-600 border-green-100'
                                  }`}>
                                    {course.category === 'basic' ? '基础认知' : '效能跃升技能'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-gray-900">
                              <ThumbsUp className="w-4 h-4 text-red-500" />
                              <span className="font-medium">{course.likes}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`font-bold ${
                                course.rate >= 80 ? 'text-green-600' : 
                                course.rate >= 50 ? 'text-yellow-600' : 'text-red-600'
                              }`}>{course.rate}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  course.rate >= 80 ? 'bg-green-500' : 
                                  course.rate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${course.rate}%` }}
                              ></div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{course.duration}</td>
                          <td className="px-6 py-4 text-right">
                            <Link to={`/video/${course.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">查看详情</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {activeTab === 'person' && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
               <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">加载更多...</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
