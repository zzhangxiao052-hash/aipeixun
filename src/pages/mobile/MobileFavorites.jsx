import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Search, 
  Plus, 
  MoreVertical, 
  Folder, 
  Edit2, 
  Trash2, 
  Play, 
  Clock,
  X,
  Check
} from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileFavorites() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState(['我的技巧库 (默认)', '公文写作', '数据分析']);
  const [activeFolder, setActiveFolder] = useState('我的技巧库 (默认)');
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  // Folder Management State
  const [showFolderManage, setShowFolderManage] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState(null);
  const [renameValue, setRenameValue] = useState('');

  // Load data
  useEffect(() => {
    const loadData = () => {
      // Load folders
      const savedFolders = localStorage.getItem('user_folders');
      if (savedFolders) {
        setFolders(JSON.parse(savedFolders));
      } else {
        localStorage.setItem('user_folders', JSON.stringify(['我的技巧库 (默认)', '公文写作', '数据分析']));
      }

      // Load bookmarks
      const savedAssets = localStorage.getItem('user_assets');
      if (savedAssets) {
        const assets = JSON.parse(savedAssets);
        setBookmarks(assets.filter(a => a.type === 'video_bookmark'));
      }
    };

    loadData();

    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener('bookmarks-changed', handleStorageChange);
    window.addEventListener('folders-changed', handleStorageChange); // Custom event for folder sync
    return () => {
      window.removeEventListener('bookmarks-changed', handleStorageChange);
      window.removeEventListener('folders-changed', handleStorageChange);
    };
  }, []);

  // Save folders
  const saveFolders = (newFolders) => {
    setFolders(newFolders);
    localStorage.setItem('user_folders', JSON.stringify(newFolders));
    window.dispatchEvent(new CustomEvent('folders-changed', { detail: newFolders }));
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName.trim())) {
      saveFolders([...folders, newFolderName.trim()]);
      setNewFolderName('');
      setIsCreatingFolder(false);
      setShowFolderManage(false);
    }
  };

  const handleRenameFolder = (oldName) => {
    if (renameValue.trim() && renameValue.trim() !== oldName && !folders.includes(renameValue.trim())) {
      const newFolders = folders.map(f => f === oldName ? renameValue.trim() : f);
      saveFolders(newFolders);
      
      // Update bookmarks
      const newBookmarks = bookmarks.map(b => 
        b.folder === oldName ? { ...b, folder: renameValue.trim() } : b
      );
      setBookmarks(newBookmarks);
      localStorage.setItem('user_assets', JSON.stringify(newBookmarks));
      
      if (activeFolder === oldName) setActiveFolder(renameValue.trim());
      setEditingFolder(null);
    }
  };

  const handleDeleteFolder = (folderName) => {
    if (folderName === '我的技巧库 (默认)') return;
    
    if (confirm(`删除 "${folderName}"？内容将移至默认收藏夹。`)) {
      const newFolders = folders.filter(f => f !== folderName);
      saveFolders(newFolders);
      
      const newBookmarks = bookmarks.map(b => 
        b.folder === folderName ? { ...b, folder: '我的技巧库 (默认)' } : b
      );
      setBookmarks(newBookmarks);
      localStorage.setItem('user_assets', JSON.stringify(newBookmarks));
      
      if (activeFolder === folderName) setActiveFolder('我的技巧库 (默认)');
    }
  };

  const filteredBookmarks = bookmarks.filter(b => {
    const matchFolder = b.folder === activeFolder;
    const matchSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (b.tags && b.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchFolder && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/mobile/profile')} className="p-1 -ml-1">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">我的收藏</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchVisible(!isSearchVisible)}
            className={`p-2 rounded-full transition-colors ${isSearchVisible ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowFolderManage(true)}
            className="p-2 text-gray-600"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchVisible && (
        <div className="bg-white px-4 pb-3 animate-in slide-in-from-top-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="搜索收藏..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Folder Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex overflow-x-auto px-4 py-2 gap-2 no-scrollbar">
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeFolder === folder 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {folder}
              <span className={`ml-1.5 text-xs ${activeFolder === folder ? 'text-blue-200' : 'text-gray-400'}`}>
                {bookmarks.filter(b => b.folder === folder).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredBookmarks.length > 0 ? (
          <div className="space-y-4">
            {filteredBookmarks.map(item => (
              <div 
                key={item.id}
                onClick={() => navigate(`/mobile/video/${item.videoId}`)}
                className="bg-white rounded-xl p-3 shadow-sm flex gap-3 active:scale-[0.99] transition-transform"
              >
                {/* Thumbnail */}
                <div className="w-32 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden relative">
                  {/* <img src={item.thumbnail} className="w-full h-full object-cover" /> */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Play className="w-8 h-8 opacity-50" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                    {item.duration || '10:00'}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.slice(0, 2).map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Folder className="w-12 h-12 mb-2 opacity-20" />
            <p className="text-sm">暂无收藏内容</p>
          </div>
        )}
      </div>

      {/* Folder Management Bottom Sheet */}
      {showFolderManage && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-[480px] bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">管理收藏夹</h3>
              <button onClick={() => setShowFolderManage(false)} className="p-1">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Create New */}
            <div className="mb-6">
              {!isCreatingFolder ? (
                <button 
                  onClick={() => setIsCreatingFolder(true)}
                  className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-medium flex items-center justify-center gap-2 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  新建收藏夹
                </button>
              ) : (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="输入文件夹名称"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-50 border border-blue-500 rounded-xl text-sm outline-none"
                  />
                  <button 
                    onClick={handleCreateFolder}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium"
                  >
                    确定
                  </button>
                  <button 
                    onClick={() => setIsCreatingFolder(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-medium"
                  >
                    取消
                  </button>
                </div>
              )}
            </div>

            {/* List */}
            <div className="space-y-2">
              {folders.map(folder => (
                <div key={folder} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  {editingFolder === folder ? (
                    <div className="flex-1 flex gap-2">
                      <input 
                        type="text" 
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-blue-500 rounded text-sm outline-none"
                      />
                      <button onClick={() => handleRenameFolder(folder)} className="p-1 text-blue-600">
                        <Check className="w-5 h-5" />
                      </button>
                      <button onClick={() => setEditingFolder(null)} className="p-1 text-gray-400">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <Folder className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-700">{folder}</span>
                        <span className="text-xs text-gray-400">
                          ({bookmarks.filter(b => b.folder === folder).length})
                        </span>
                      </div>
                      
                      {folder !== '我的技巧库 (默认)' && (
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => {
                              setEditingFolder(folder);
                              setRenameValue(folder);
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteFolder(folder)}
                            className="p-2 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
