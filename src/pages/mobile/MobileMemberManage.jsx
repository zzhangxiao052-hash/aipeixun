import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, RefreshCw, Ban, User, Phone, MoreHorizontal, X } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileMemberManage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [users, setUsers] = useState([
    { id: 1, name: '张三', dept: '研发部', phone: '13800138000', status: 'active' },
    { id: 2, name: '李四', dept: '市场部', phone: '13900139000', status: 'active' },
    { id: 3, name: '王五', dept: '产品部', phone: '13700137000', status: 'active' },
    { id: 4, name: '赵六', dept: '设计部', phone: '13600136000', status: 'disabled' },
    { id: 5, name: '钱七', dept: '运营部', phone: '13500135000', status: 'active' },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredUsers = users.filter(user => 
    user.name.includes(searchTerm) || user.phone.includes(searchTerm)
  );

  const handleResetPassword = (id) => {
    alert(`已重置用户 ${id} 的密码`);
  };

  const handleToggleStatus = (id) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'active' ? 'disabled' : 'active' };
      }
      return user;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] pb-8 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-800">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-900">成员管理</h1>
        <div className="w-6" /> 
      </div>

      <div className="p-4 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索姓名或手机号" 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* User List */}
        <div className="space-y-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {user.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          {user.status === 'active' ? '在职' : '停用'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                        <span>{user.dept}</span>
                        <span className="w-px h-2 bg-gray-300"></span>
                        <span className="flex items-center gap-0.5">
                          <Phone className="w-3 h-3" /> {user.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-50">
                  <button 
                    onClick={() => handleResetPassword(user.id)}
                    className="flex-1 py-2 bg-gray-50 text-gray-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1 active:bg-gray-100"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    重置密码
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(user.id)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 active:opacity-80 ${
                      user.status === 'active' 
                        ? 'bg-red-50 text-red-600' 
                        : 'bg-green-50 text-green-600'
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                    {user.status === 'active' ? '停用账号' : '启用账号'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm">
              未找到相关人员
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
