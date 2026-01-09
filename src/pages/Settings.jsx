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
  Folder,
  Search,
  Settings as SettingsIcon,
  Building2,
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
  // --- State ---
  const [orgStructure, setOrgStructure] = useState([
    {
      id: 'group-root',
      name: '树科科技集团',
      type: 'group',
      expanded: true,
      children: [
        {
          id: 'root',
          name: '树科云境总公司',
          type: 'company',
          expanded: true,
          children: [
            {
              id: 'dev',
              name: '研发中心',
              type: 'dept',
              expanded: true,
              children: [
                { id: 'dev-fe', name: '前端开发组', type: 'team' },
                { id: 'dev-be', name: '后端开发组', type: 'team' },
                { id: 'dev-ai', name: 'AI算法组', type: 'team' },
                { id: 'dev-test', name: '测试组', type: 'team' },
              ]
            },
            {
              id: 'prod',
              name: '产品中心',
              type: 'dept',
              expanded: true,
              children: [
                { id: 'prod-design', name: 'UI/UX设计组', type: 'team' },
                { id: 'prod-pm', name: '产品策划组', type: 'team' },
              ]
            },
            {
              id: 'market',
              name: '市场营销中心',
              type: 'dept',
              children: [
                { id: 'mkt-brand', name: '品牌部', type: 'team' },
                { id: 'mkt-sales', name: '销售部', type: 'team' },
              ]
            },
            {
              id: 'hr',
              name: '人力资源部',
              type: 'dept',
              children: []
            }
          ]
        },
        {
          id: 'bj-branch',
          name: '北京分公司',
          type: 'company',
          children: [
             { id: 'bj-sales', name: '销售部', type: 'dept', children: [] },
             { id: 'bj-tech', name: '技术支持部', type: 'dept', children: [] },
          ]
        }
      ]
    }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState('group-root');
  const [selectedNodeName, setSelectedNodeName] = useState('树科科技集团');
  const [expandedNodes, setExpandedNodes] = useState(['group-root', 'root', 'dev', 'prod']);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingDept, setIsAddingDept] = useState(false);
  const [isEditingDept, setIsEditingDept] = useState(false);
  const [isDeletingDept, setIsDeletingDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [editingDeptName, setEditingDeptName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: '超级管理员', dept: '前端开发组', deptId: 'dev-fe', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: '张三', email: 'zhangsan@example.com', role: '普通用户', dept: '市场营销中心', deptId: 'market', status: 'active', joinDate: '2023-03-10' },
    { id: 3, name: '李四', email: 'lisi@example.com', role: '部门经理', dept: '人力资源部', deptId: 'hr', status: 'inactive', joinDate: '2023-02-20' },
    { id: 4, name: '王五', email: 'wangwu@example.com', role: '普通用户', dept: 'AI算法组', deptId: 'dev-ai', status: 'active', joinDate: '2023-05-12' },
    { id: 5, name: '赵六', email: 'zhaoliu@example.com', role: '普通用户', dept: 'UI/UX设计组', deptId: 'prod-design', status: 'active', joinDate: '2023-06-01' },
    { id: 6, name: '钱七', email: 'qianqi@example.com', role: '高级工程师', dept: '后端开发组', deptId: 'dev-be', status: 'active', joinDate: '2023-04-15' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '普通用户',
    dept: '',
    status: 'active'
  });

  const [editingId, setEditingId] = useState(null);

  // --- Helpers ---
  const toggleNode = (nodeId) => {
    if (expandedNodes.includes(nodeId)) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const handleNodeClick = (node) => {
    setSelectedNodeId(node.id);
    setSelectedNodeName(node.name);
  };

  const addDeptToNode = (nodes, parentId, newDept) => {
    return nodes.map(node => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newDept],
          expanded: true 
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addDeptToNode(node.children, parentId, newDept)
        };
      }
      return node;
    });
  };

  const updateDeptName = (nodes, nodeId, newName) => {
    return nodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, name: newName };
      }
      if (node.children) {
        return { ...node, children: updateDeptName(node.children, nodeId, newName) };
      }
      return node;
    });
  };

  const deleteDept = (nodes, nodeId) => {
    return nodes.filter(node => node.id !== nodeId).map(node => {
      if (node.children) {
        return { ...node, children: deleteDept(node.children, nodeId) };
      }
      return node;
    });
  };

  const findNode = (nodes, id) => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleAddDeptSubmit = (e) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    const parentNode = findNode(orgStructure, selectedNodeId);
    let newType = 'team';
    if (parentNode) {
      if (parentNode.type === 'group') newType = 'company';
      else if (parentNode.type === 'company') newType = 'dept';
    }

    const newId = `node-${Date.now()}`;
    const newDept = {
      id: newId,
      name: newDeptName,
      type: newType, 
      children: []
    };
    
    setOrgStructure(prev => addDeptToNode(prev, selectedNodeId, newDept));
    if (!expandedNodes.includes(selectedNodeId)) {
      setExpandedNodes(prev => [...prev, selectedNodeId]);
    }
    
    setIsAddingDept(false);
    setNewDeptName('');
  };

  const handleEditDeptSubmit = (e) => {
    e.preventDefault();
    if (!editingDeptName.trim()) return;
    
    setOrgStructure(prev => updateDeptName(prev, selectedNodeId, editingDeptName));
    setSelectedNodeName(editingDeptName);
    setIsEditingDept(false);
  };

  const handleDeleteDeptConfirm = () => {
    setOrgStructure(prev => deleteDept(prev, selectedNodeId));
    // Reset selection to root if deleted
    if (selectedNodeId !== 'root') {
      setSelectedNodeId('root');
      setSelectedNodeName('树科云境总公司');
    }
    setIsDeletingDept(false);
  };

  // Filter users based on selection (Mock logic: if root, show all; else filter by dept name match or ID)
  // In a real app, this would query the backend or check parent-child relationships.
  // For this mock, we'll do a simple text match or "show all" if root.
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedNodeId === 'root') return matchesSearch;
    
    // Simple mock: check if user's dept name contains the selected node name or matches ID
    // This is a simplification. Real tree filtering is recursive.
    const matchesDept = user.dept === selectedNodeName || user.deptId === selectedNodeId || 
                        (selectedNodeId === 'dev' && ['前端开发组', '后端开发组', 'AI算法组', '测试组'].includes(user.dept)) ||
                        (selectedNodeId === 'prod' && ['UI/UX设计组', '产品策划组'].includes(user.dept)) ||
                        (selectedNodeId === 'market' && ['品牌部', '销售部'].includes(user.dept));
                        
    return matchesSearch && matchesDept;
  });

  // --- Tree Item Component ---
  const TreeItem = ({ node, level = 0 }) => {
    const isExpanded = expandedNodes.includes(node.id);
    const isSelected = selectedNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="select-none">
        <div 
          className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
            isSelected 
              ? 'bg-blue-50 text-blue-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {hasChildren ? (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="p-0.5 rounded hover:bg-gray-200 text-gray-400 transition-colors flex-shrink-0"
              >
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
            ) : (
              <span className="w-4.5 flex-shrink-0" /> // Spacer
            )}
            
            {node.type === 'group' && <div className="p-1 bg-indigo-100 rounded text-indigo-600 flex-shrink-0"><Building2 className="w-3.5 h-3.5" /></div>}
            {node.type === 'company' && <div className="p-1 bg-blue-100 rounded text-blue-600 flex-shrink-0"><Shield className="w-3.5 h-3.5" /></div>}
            {node.type === 'dept' && <div className="p-1 bg-purple-100 rounded text-purple-600 flex-shrink-0"><Users className="w-3.5 h-3.5" /></div>}
            {node.type === 'team' && <div className="p-1 bg-gray-100 rounded text-gray-500 flex-shrink-0"><User className="w-3.5 h-3.5" /></div>}
            
            <span className="truncate text-sm">{node.name}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNodeId(node.id);
                setSelectedNodeName(node.name);
                setEditingDeptName(node.name);
                setIsEditingDept(true);
              }}
              className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded"
              title="重命名"
            >
              <Edit2 className="w-3 h-3" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNodeId(node.id);
                setSelectedNodeName(node.name);
                setIsDeletingDept(true);
              }}
              className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded"
              title="删除"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            {node.children.map(child => (
              <TreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  // --- Add/Edit Logic (Simplified for UI Demo) ---
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
    } else {
      const newUser = {
        id: users.length + 1,
        ...formData,
        dept: selectedNodeName, // Default to current selection
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setIsAddingUser(false);
    setEditingId(null);
    setFormData({ name: '', email: '', role: '普通用户', dept: '', status: 'active' });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // --- Render ---
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
      {/* Left Sidebar: Organization Tree */}
      <div className="w-full lg:w-72 flex-shrink-0 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            组织架构
          </h3>
          <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="管理部门">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {orgStructure.map(node => (
            <TreeItem key={node.id} node={node} />
          ))}
        </div>

        <div className="p-3 border-t border-gray-100 bg-gray-50/30">
          <button 
            onClick={() => setIsAddingDept(true)}
            className="w-full py-2 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium border border-dashed border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            {(() => {
              const node = findNode(orgStructure, selectedNodeId);
              if (node?.type === 'group') return '添加子公司';
              if (node?.type === 'company') return '添加部门';
              return '添加子节点';
            })()}
          </button>
        </div>
      </div>

      {/* Add Dept Modal */}
      {isAddingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-96 p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {(() => {
                  const node = findNode(orgStructure, selectedNodeId);
                  if (node?.type === 'group') return '添加子公司';
                  if (node?.type === 'company') return '添加部门';
                  return '添加子节点';
                })()}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                将在 <span className="font-bold text-gray-700">{selectedNodeName}</span> 下创建
              </p>
              <form onSubmit={handleAddDeptSubmit}>
                <input 
                  autoFocus
                  type="text" 
                  value={newDeptName}
                  onChange={e => setNewDeptName(e.target.value)}
                  placeholder={(() => {
                    const node = findNode(orgStructure, selectedNodeId);
                    if (node?.type === 'group') return '请输入公司名称';
                    if (node?.type === 'company') return '请输入部门名称';
                    return '请输入名称';
                  })()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddingDept(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">取消</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">确认添加</button>
                </div>
              </form>
           </div>
        </div>
      )}

      {/* Edit Dept Modal */}
      {isEditingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-96 p-6 animate-in zoom-in-95 duration-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">重命名部门</h3>
              <form onSubmit={handleEditDeptSubmit}>
                <input 
                  autoFocus
                  type="text" 
                  value={editingDeptName}
                  onChange={e => setEditingDeptName(e.target.value)}
                  placeholder="请输入部门名称"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsEditingDept(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">取消</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">保存修改</button>
                </div>
              </form>
           </div>
        </div>
      )}

      {/* Delete Dept Modal */}
      {isDeletingDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-96 p-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <div className="p-2 bg-red-100 rounded-full">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">删除部门</h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                确定要删除 <span className="font-bold text-gray-700">{selectedNodeName}</span> 吗？此操作无法撤销，且该部门下的所有子部门也会被一并删除。
              </p>
              
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsDeletingDept(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium">取消</button>
                <button type="button" onClick={handleDeleteDeptConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">确认删除</button>
              </div>
           </div>
        </div>
      )}

      {/* Right Content: User List */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>组织架构</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-900 font-medium">{selectedNodeName}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{selectedNodeName}</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索成员..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-48 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', email: '', role: '普通用户', dept: selectedNodeName, status: 'active' });
                setIsAddingUser(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              添加成员
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="flex-1 overflow-auto">
          {isAddingUser ? (
            <div className="p-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">{editingId ? '编辑成员信息' : '添加新成员'}</h3>
                <button onClick={() => setIsAddingUser(false)} className="text-gray-400 hover:text-gray-600">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSaveUser} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">姓名</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">邮箱</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">所属部门</label>
                    <input type="text" value={formData.dept} readOnly className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg cursor-not-allowed" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">角色</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option>普通用户</option>
                      <option>部门经理</option>
                      <option>超级管理员</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setIsAddingUser(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">取消</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">保存</button>
                </div>
              </form>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 backdrop-blur sticky top-0 z-10 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 w-16">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-6 py-4">成员信息</th>
                  <th className="px-6 py-4">角色权限</th>
                  <th className="px-6 py-4">所属部门</th>
                  <th className="px-6 py-4">加入时间</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-white shadow-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          user.role === '超级管理员' 
                            ? 'bg-purple-50 text-purple-700 border-purple-100' 
                            : user.role === '部门经理'
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-gray-50 text-gray-600 border-gray-100'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Folder className="w-3.5 h-3.5 text-gray-400" />
                          {user.dept}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">{user.joinDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-green-50 text-green-700 border border-green-100' 
                            : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {user.status === 'active' ? '正常' : '禁用'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setFormData({ name: user.name, email: user.email, role: user.role, dept: user.dept, status: user.status });
                              setEditingId(user.id);
                              setIsAddingUser(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="7" className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-300" />
                        </div>
                        <p>该部门暂无成员</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer Pagination */}
        {!isAddingUser && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center text-sm text-gray-500">
            <div>显示 {filteredUsers.length} 条记录</div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 border border-gray-200 rounded bg-white hover:bg-gray-50 disabled:opacity-50" disabled>下一页</button>
            </div>
          </div>
        )}
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
