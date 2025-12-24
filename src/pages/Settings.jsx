import { useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: '个人设置', icon: User },
    { id: 'permissions', label: '权限管理', icon: Shield },
    { id: 'cockpit', label: '可视化驾驶舱', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-8 pb-4 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
          <p className="text-gray-500 mt-1">管理您的个人资料、系统权限及查看数据报表</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  // Mock Data
  const deptActivityData = {
    labels: ['研发部', '市场部', '销售部', '人事部', '财务部', '行政部'],
    datasets: [
      {
        label: '活跃度分数',
        data: [95, 88, 82, 75, 60, 55],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const coursePopularityData = {
    labels: ['DeepSeek应用', 'Python入门', 'AI绘画实战', '办公自动化', '数据分析基础'],
    datasets: [
      {
        label: '学习人数',
        data: [1200, 980, 850, 720, 600],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const toolUsageData = {
    labels: ['ChatGPT', 'Midjourney', 'Notion AI', 'Copilot', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(209, 213, 219, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0,0,0,0.05)',
        },
        border: {
          display: false,
        }
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        }
      }
    },
  };

  const doughnutOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Clock} 
          title="总学时统计" 
          value="128.5" 
          unit="小时" 
          trend="+12%" 
          trendUp={true}
          color="blue"
        />
        <StatCard 
          icon={BookOpen} 
          title="课程完课率" 
          value="85" 
          unit="%" 
          trend="+5%" 
          trendUp={true}
          color="purple"
        />
        <StatCard 
          icon={Award} 
          title="实操成果" 
          value="12" 
          unit="个项目" 
          trend="本月新增 2" 
          trendUp={true}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Org Dimension: Dept Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">部门学习活跃度排名</h3>
              <p className="text-xs text-gray-500">组织维度数据分析</p>
            </div>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Bar data={deptActivityData} options={options} />
          </div>
        </div>

        {/* Content Dimension: Tool Usage */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">AI 工具使用率分布</h3>
              <p className="text-xs text-gray-500">内容维度数据分析</p>
            </div>
            <Wrench className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={toolUsageData} options={doughnutOptions} />
          </div>
        </div>

        {/* Content Dimension: Course Popularity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">课程热度排行趋势</h3>
              <p className="text-xs text-gray-500">近30天课程访问量统计</p>
            </div>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-72">
            <Line data={coursePopularityData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, value, unit, trend, trendUp, color }) {
  const colorStyles = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorStyles[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  );
}
