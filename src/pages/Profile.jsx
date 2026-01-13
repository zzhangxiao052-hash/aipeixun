import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Play, 
  Clock, 
  Search,
  FolderOpen,
  LayoutGrid,
  List
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(['我的技巧库 (默认)', '公文写作', '数据分析']);
  const [activeFolder, setActiveFolder] = useState('我的技巧库 (默认)');
  const [bookmarks, setBookmarks] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid, list
  const [searchQuery, setSearchQuery] = useState('');
  
  // Folder Management State
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [showFolderMenu, setShowFolderMenu] = useState(null); // folder name

  // Load data
  useEffect(() => {
    // Load folders
    const savedFolders = localStorage.getItem('user_folders');
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    } else {
      // Initialize default folders if not exist
      localStorage.setItem('user_folders', JSON.stringify(['我的技巧库 (默认)', '公文写作', '数据分析']));
    }

    // Load bookmarks
    const savedAssets = localStorage.getItem('user_assets');
    if (savedAssets) {
      const assets = JSON.parse(savedAssets);
      setBookmarks(assets.filter(a => a.type === 'video_bookmark'));
    }

    // Listen for updates
    const handleStorageChange = () => {
      const updatedAssets = JSON.parse(localStorage.getItem('user_assets') || '[]');
      setBookmarks(updatedAssets.filter(a => a.type === 'video_bookmark'));
      
      const updatedFolders = JSON.parse(localStorage.getItem('user_folders'));
      if (updatedFolders) setFolders(updatedFolders);
    };

    window.addEventListener('bookmarks-changed', handleStorageChange);
    return () => window.removeEventListener('bookmarks-changed', handleStorageChange);
  }, []);

  // Save folders to localStorage
  const saveFolders = (newFolders) => {
    setFolders(newFolders);
    localStorage.setItem('user_folders', JSON.stringify(newFolders));
    // Dispatch event for other components (like BookmarkModal)
    window.dispatchEvent(new CustomEvent('folders-changed', { detail: newFolders }));
  };

  // Create Folder
  const handleCreateFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName.trim())) {
      saveFolders([...folders, newFolderName.trim()]);
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  // Rename Folder
  const handleRenameFolder = (oldName) => {
    if (renameValue.trim() && renameValue.trim() !== oldName && !folders.includes(renameValue.trim())) {
      const newFolders = folders.map(f => f === oldName ? renameValue.trim() : f);
      saveFolders(newFolders);
      
      // Update bookmarks in this folder
      const newBookmarks = bookmarks.map(b => 
        b.folder === oldName ? { ...b, folder: renameValue.trim() } : b
      );
      setBookmarks(newBookmarks);
      localStorage.setItem('user_assets', JSON.stringify(newBookmarks));
      
      if (activeFolder === oldName) setActiveFolder(renameValue.trim());
      setEditingFolder(null);
    }
  };

  // Delete Folder
  const handleDeleteFolder = (folderName) => {
    if (folderName === '我的技巧库 (默认)') {
      alert('默认收藏夹不能删除');
      return;
    }
    
    if (confirm(`确定要删除收藏夹 "${folderName}" 吗？该文件夹下的收藏将被移动到默认收藏夹。`)) {
      const newFolders = folders.filter(f => f !== folderName);
      saveFolders(newFolders);
      
      // Move bookmarks to default
      const newBookmarks = bookmarks.map(b => 
        b.folder === folderName ? { ...b, folder: '我的技巧库 (默认)' } : b
      );
      setBookmarks(newBookmarks);
      localStorage.setItem('user_assets', JSON.stringify(newBookmarks));
      
      if (activeFolder === folderName) setActiveFolder('我的技巧库 (默认)');
    }
  };

  // Delete Bookmark
  const handleDeleteBookmark = (id) => {
    if (confirm('确定要取消收藏吗？')) {
      const newBookmarks = bookmarks.filter(b => b.id !== id);
      setBookmarks(newBookmarks);
      localStorage.setItem('user_assets', JSON.stringify(newBookmarks));
      window.dispatchEvent(new CustomEvent('bookmarks-changed'));
    }
  };

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(b => {
    const matchFolder = b.folder === activeFolder;
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchFolder && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">我的收藏</h1>
          <p className="text-gray-500">
            管理您的收藏内容，支持自定义文件夹分类。
          </p>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar: Folders */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                  收藏夹
                </h2>
                <button 
                  onClick={() => setIsCreatingFolder(true)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="新建收藏夹"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Create Folder Input */}
              {isCreatingFolder && (
                <div className="mb-3 p-2 bg-blue-50 rounded-lg animate-in fade-in slide-in-from-top-2">
                  <input
                    type="text"
                    autoFocus
                    placeholder="输入名称..."
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
                    className="w-full px-2 py-1 text-sm border border-blue-200 rounded mb-2 focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setIsCreatingFolder(false)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleCreateFolder}
                      className="text-xs text-blue-600 font-medium hover:text-blue-700"
                    >
                      创建
                    </button>
                  </div>
                </div>
              )}

              {/* Folder List */}
              <div className="space-y-1">
                {folders.map(folder => (
                  <div 
                    key={folder}
                    className={`group relative flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                      activeFolder === folder 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveFolder(folder)}
                  >
                    {editingFolder === folder ? (
                      <div className="flex-1 flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <input
                          type="text"
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleRenameFolder(folder)}
                          onBlur={() => setEditingFolder(null)}
                          className="w-full px-2 py-0.5 text-sm border border-blue-300 rounded focus:outline-none"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 truncate">
                          <Folder className={`w-4 h-4 ${activeFolder === folder ? 'fill-current' : ''}`} />
                          <span className="text-sm font-medium truncate">{folder}</span>
                          <span className="text-xs text-gray-400">
                            {bookmarks.filter(b => b.folder === folder).length}
                          </span>
                        </div>
                        
                        {/* Folder Actions (Don't show for default folder) */}
                        {folder !== '我的技巧库 (默认)' && (
                          <div className="relative" onClick={e => e.stopPropagation()}>
                            <button 
                              onClick={() => setShowFolderMenu(showFolderMenu === folder ? null : folder)}
                              className={`p-1 rounded-md hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity ${showFolderMenu === folder ? 'opacity-100 bg-black/5' : ''}`}
                            >
                              <MoreVertical className="w-3.5 h-3.5" />
                            </button>
                            
                            {showFolderMenu === folder && (
                              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-10 animate-in fade-in zoom-in-95">
                                <button 
                                  onClick={() => {
                                    setEditingFolder(folder);
                                    setRenameValue(folder);
                                    setShowFolderMenu(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Edit2 className="w-3 h-3" /> 重命名
                                </button>
                                <button 
                                  onClick={() => {
                                    handleDeleteFolder(folder);
                                    setShowFolderMenu(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  <Trash2 className="w-3 h-3" /> 删除
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content: Bookmarks */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索收藏..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bookmarks Grid/List */}
            {filteredBookmarks.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredBookmarks.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group ${
                      viewMode === 'list' ? 'flex' : 'flex flex-col'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-40'} flex-shrink-0 bg-gray-100`}>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Play className="w-8 h-8 opacity-50" />
                      </div>
                      {/* Placeholder for video thumbnail if available */}
                      {/* <img src={item.thumbnail} className="w-full h-full object-cover" /> */}
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBookmark(item.id);
                          }}
                          className="p-1.5 bg-black/50 text-white rounded-lg hover:bg-red-600 transition-colors backdrop-blur-sm"
                          title="取消收藏"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 
                        className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer"
                        onClick={() => navigate(`/video/${item.videoId}`)}
                      >
                        {item.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tags?.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.date}
                        </span>
                        <button 
                          onClick={() => navigate(`/video/${item.videoId}`)}
                          className="text-blue-600 font-medium hover:underline"
                        >
                          去学习
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FolderOpen className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">暂无收藏</h3>
                <p className="text-gray-500 text-sm">
                  {searchQuery ? '没有找到匹配的收藏内容' : '该文件夹下还没有收藏内容'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
