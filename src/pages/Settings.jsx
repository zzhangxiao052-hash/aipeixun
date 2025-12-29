import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Shield, 
  BarChart2, 
  Camera, 
  Save, 
  Plus, 
  MoreHorizontal, 
  Trash2, 
  Edit2,
  Users,
  BookOpen,
  Wrench,
  Award,
  Clock,
  Filter,
  ChevronDown,
  Check,
  ArrowLeft,
  ChevronRight,

} from 'lucide-react';
import 'chart.js/auto';
import { Bar, Doughnut, Line, Radar, Scatter } from 'react-chartjs-2';

import { useLocation } from 'react-router-dom';

export default function Settings() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'personal');

  const tabs = [
    { id: 'personal', label: '个人设置', icon: User },
    { id: 'permissions', label: '权限管理', icon: Shield },
    { id: 'cockpit', label: '可视化驾驶舱', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-4 px-4 md:px-14 mb-6">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-500 mt-1">管理您的个人资料、系统权限及查看数据报表</p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'personal' && <PersonalSettings />}
            {activeTab === 'permissions' && <PermissionManagement />}
            {activeTab === 'cockpit' && <VisualCockpit />}
          </div>
        </div>
      </div>
    </div>
  );
}

function PersonalSettings() {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          基本信息
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white shadow-md">
                U
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">更换头像</button>
          </div>

          {/* Form */}
          <div className="flex-1 w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                <input 
                  type="text" 
                  defaultValue="Admin User" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                <input 
                  type="text" 
                  defaultValue="高级工程师" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                <textarea 
                  rows="3"
                  defaultValue="负责公司AI培训平台的维护与内容更新。" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Save className="w-4 h-4" />
                保存修改
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" />
          安全设置
        </h2>
        
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              修改密码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PermissionManagement() {
  const [filterDept, setFilterDept] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: '超级管理员', dept: '技术部', status: 'active' },
    { id: 2, name: '张三', email: 'zhangsan@example.com', role: '普通用户', dept: '市场部', status: 'active' },
    { id: 3, name: '李四', email: 'lisi@example.com', role: '部门经理', dept: '人事部', status: 'inactive' },
    { id: 4, name: '王五', email: 'wangwu@example.com', role: '普通用户', dept: '研发部', status: 'active' },
    { id: 5, name: '赵六', email: 'zhaoliu@example.com', role: '普通用户', dept: '销售部', status: 'active' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '普通用户',
    dept: '技术部',
    status: 'active'
  });

  const [editingId, setEditingId] = useState(null);

  const uniqueDepts = ['技术部', '市场部', '人事部', '研发部', '销售部', '财务部', '行政部'];

  const handleAddUser = (e) => {
    e.preventDefault();
    if (editingId) {
      setUsers(prevUsers => prevUsers.map(user => user.id === editingId ? { ...user, ...formData } : user));
      setEditingId(null);
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = {
        id: newId,
        ...formData
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    setIsAddingUser(false);
    setFormData({ name: '', email: '', role: '普通用户', dept: '技术部', status: 'active' });
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      dept: user.dept,
      status: user.status
    });
    setEditingId(user.id);
    setIsAddingUser(true);
  };

  const handleDeleteUser = (id) => {
    // Remove confirmation to ensure immediate execution
    if (editingId === id) {
      setIsAddingUser(false);
      setEditingId(null);
      setFormData({ name: '', email: '', role: '普通用户', dept: '技术部', status: 'active' });
    }
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => 
    filterDept === 'all' || user.dept === filterDept
  );

  if (isAddingUser) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <button 
            onClick={() => setIsAddingUser(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{editingId ? '编辑用户' : '添加新用户'}</h2>
            <p className="text-sm text-gray-500">{editingId ? '修改用户信息及权限设置' : '创建新的系统用户并分配角色权限'}</p>
          </div>
        </div>
        
        <div className="p-6 max-w-2xl">
          <form onSubmit={handleAddUser} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">用户名</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="请输入用户名"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">邮箱地址</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="example@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">所属部门</label>
                <div className="relative">
                  <select
                    value={formData.dept}
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    {uniqueDepts.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">角色权限</label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                  >
                    <option value="普通用户">普通用户</option>
                    <option value="部门经理">部门经理</option>
                    <option value="超级管理员">超级管理员</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">账号状态</label>
                <div className="flex gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">正常启用</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">暂时禁用</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100 mt-6">
              <button
                type="button"
                onClick={() => setIsAddingUser(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingId ? '保存修改' : '保存用户'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">用户与权限管理</h2>
          <p className="text-sm text-gray-500">管理系统用户、分配角色及权限</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', email: '', role: '普通用户', dept: '技术部', status: 'active' });
            setIsAddingUser(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
            <tr>
              <th className="px-6 py-4">用户</th>
              <th className="px-6 py-4">角色</th>
              <th className="px-6 py-4 relative">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    onBlur={() => setTimeout(() => setIsFilterOpen(false), 200)}
                    className={`flex items-center gap-1.5 text-sm font-bold transition-colors outline-none ${
                      filterDept !== 'all' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {filterDept === 'all' ? '部门' : filterDept}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-4 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 transform transition-all duration-200 origin-top-left ${
                    isFilterOpen 
                      ? 'opacity-100 scale-100 translate-y-0 visible' 
                      : 'opacity-0 scale-95 -translate-y-2 invisible'
                  }`}>
                    <div className="px-2 py-1.5">
                      <div className="text-xs font-medium text-gray-400 px-2 mb-1">筛选部门</div>
                      <button
                        onClick={() => setFilterDept('all')}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                          filterDept === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <span>全部部门</span>
                        {filterDept === 'all' && <Check className="w-3.5 h-3.5" />}
                      </button>
                      {uniqueDepts.map(dept => (
                        <button
                          key={dept}
                          onClick={() => setFilterDept(dept)}
                          className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-colors ${
                            filterDept === dept ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <span>{dept}</span>
                          {filterDept === dept && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === '超级管理员' 
                      ? 'bg-purple-100 text-purple-800' 
                      : user.role === '部门经理'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.dept}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {user.status === 'active' ? '正常' : '禁用'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditUser(user);
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                      title="编辑"
                    >
                      <Edit2 className="w-4 h-4 pointer-events-none" />
                    </button>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                      title="删除"
                    >
                      <Trash2 className="w-4 h-4 pointer-events-none" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
        <div>共 {filteredUsers.length} 个用户</div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
          <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>下一页</button>
        </div>
      </div>
    </div>
  );
}

function VisualCockpit() {
  // --- Mock Data for Learning Platform View ---

  // 1. Learning Activity Trend (Line Chart)
  const activityTrendData = {
    labels: ['12-01', '12-05', '12-10', '12-15', '12-20', '12-25'],
    datasets: [
      {
        label: '课程播放量',
        data: [450, 580, 420, 690, 610, 850],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgb(59, 130, 246)',
        pointBorderWidth: 2,
      },
      {
        label: '活跃学习人数',
        data: [120, 150, 110, 180, 160, 210],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgb(168, 85, 247)',
        pointBorderWidth: 2,
      }
    ],
  };

  // 2. Department Efficiency Matrix (Scatter Chart)
  const deptMatrixData = {
    datasets: [
      {
        label: '研发部',
        data: [{ x: 45, y: 78 }],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        pointRadius: 12,
        pointHoverRadius: 15,
      },
      {
        label: '市场部',
        data: [{ x: 38, y: 65 }],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        pointRadius: 12,
        pointHoverRadius: 15,
      },
      {
        label: '产品部',
        data: [{ x: 35, y: 58 }],
        backgroundColor: 'rgba(236, 72, 153, 0.8)',
        pointRadius: 12,
        pointHoverRadius: 15,
      },
      {
        label: '设计部',
        data: [{ x: 30, y: 45 }],
        backgroundColor: 'rgba(251, 146, 60, 0.8)',
        pointRadius: 12,
        pointHoverRadius: 15,
      },
      {
        label: '运营部',
        data: [{ x: 28, y: 40 }],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        pointRadius: 12,
        pointHoverRadius: 15,
      }
    ],
  };

  // 3. Talent Skill Portrait (Radar Chart)
  const skillPortraitData = {
    labels: ['智能写作', '数据分析', '自动化办公', 'AI绘图设计', '代码辅助', '知识管理'],
    datasets: [
      {
        label: '话题热度指数',
        data: [90, 75, 85, 80, 50, 70],
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(249, 115, 22, 1)',
      },
    ],
  };

  // 4. Trending Courses with Tags
  const trendingCourses = [
    { id: 1, title: 'DeepSeek 高效办公效能跃升指南', category: '办公提效', views: '2,345', trend: '+15%', tags: ['效能跃升派', '工具类'] },
    { id: 2, title: 'Midjourney 商业级绘图进阶', category: 'AI绘画', views: '1,890', trend: '+12%', tags: ['高评分', '工具类'] },
    { id: 3, title: 'Python 数据分析与可视化', category: '数据分析', views: '1,560', trend: '+8%', tags: ['效能跃升派'] },
    { id: 4, title: '企业级 Prompt 提示词编写', category: '提示词工程', views: '1,230', trend: '+5%', tags: ['高评分'] },
  ];

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 } }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.03)' },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        border: { display: false }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, boxWidth: 8, font: { size: 10 } }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: 人均${context.parsed.x}h, 调用率${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: '人均学习时长 (小时)', font: { size: 11, weight: 'bold' } },
        grid: { color: 'rgba(0,0,0,0.05)' },
        border: { display: false }
      },
      y: {
        title: { display: true, text: '资源调用率 (%)', font: { size: 11, weight: 'bold' } },
        grid: { color: 'rgba(0,0,0,0.05)' },
        border: { display: false }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0,0,0,0.05)' },
        grid: { color: 'rgba(0,0,0,0.05)' },
        pointLabels: { font: { size: 11, weight: 'bold' }, color: '#4B5563' },
        ticks: { display: false, backdropColor: 'transparent' }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };



  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg shadow-blue-900/20">
        <div>
          <h2 className="text-2xl font-bold mb-1">数字化人才培养驾驶舱</h2>
          <p className="text-blue-100 text-sm opacity-90">实时监控组织学习氛围与知识技能掌握情况</p>
        </div>
        <div className="flex gap-3">

          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <div className="text-xs text-blue-100">本月活跃率</div>
            <div className="font-bold text-lg">78%</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
            <div className="text-xs text-blue-100">总学习人数</div>
            <div className="font-bold text-lg">1,245</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          icon={Users} 
          title="全员覆盖率" 
          value="92" 
          unit="%" 
          trend="+5%" 
          trendUp={true}
          color="blue"
          subtext="目标 100%"
          link="/dashboard/coverage"
        />
        <StatCard 
          icon={Clock} 
          title="累计学习时长" 
          value="15,420" 
          unit="小时" 
          trend="+12%" 
          trendUp={true}
          color="indigo"
          subtext="人均 12.4 小时"
          link="/dashboard/duration"
        />
        <StatCard 
          icon={BookOpen} 
          title="课程完课率" 
          value="65" 
          unit="%" 
          trend="+3%" 
          trendUp={true}
          color="purple"
          subtext="累计完课 3,200 门"
          link="/dashboard/completion"
        />
        <StatCard 
          icon={Wrench} 
          title="工具/资源调用次" 
          value="8,540" 
          unit="次" 
          trend="+18%" 
          trendUp={true}
          color="green"
          subtext="链接点击与提示词复制"
          link="/dashboard/resource-usage"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Trend */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">学习活跃度趋势</h3>
              <p className="text-xs text-gray-500">每日课程播放量与活跃学习人数</p>
            </div>
            <div className="flex gap-2">
              <select className="text-xs border-gray-200 rounded-lg text-gray-500 bg-gray-50 border px-2 py-1 outline-none">
                <option>近 7 天</option>
                <option>近 30 天</option>
              </select>
            </div>
          </div>
          <div className="h-[300px]">
            <Line data={activityTrendData} options={commonOptions} />
          </div>
        </div>

        {/* Dept Efficiency Matrix */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">部门效能对比矩阵</h3>
              <p className="text-xs text-gray-500">右上角=勤奋且爱动手</p>
            </div>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-[300px]">
            <Scatter data={deptMatrixData} options={scatterOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Portrait */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900">关注热度画像</h3>
              <p className="text-xs text-gray-500">基于全员学习行为的兴趣分布</p>
            </div>
          </div>
          <div className="h-[250px] flex items-center justify-center">
            <Radar data={skillPortraitData} options={radarOptions} />
          </div>
        </div>

        {/* Trending Courses */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">热门课程风向标</h3>
              <p className="text-xs text-gray-500">全平台播放量最高的优质课程</p>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">查看全部</button>
          </div>
          
          <div className="space-y-4">
            {trendingCourses.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer border border-transparent hover:border-blue-100">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {item.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors truncate">{item.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
                      <span className="bg-white px-2 py-0.5 rounded border border-gray-200">{item.category}</span>
                      <span>播放量 {item.views}</span>
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className={`px-2 py-0.5 rounded font-medium ${
                          tag === '效能跃升派' ? 'bg-orange-100 text-orange-700' :
                          tag === '高评分' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">{item.trend}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, unit, trend, trendUp, color, subtext, link }) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  };

  const Content = () => (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorStyles[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
          trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-1.5 mb-2">
          <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
          <span className="text-sm font-medium text-gray-400">{unit}</span>
        </div>
        {subtext && (
          <p className="text-xs text-gray-400 font-medium">{subtext}</p>
        )}
      </div>
    </>
  );

  if (link) {
    return (
      <Link to={link} className="block bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
        <Content />
      </Link>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <Content />
    </div>
  );
}
