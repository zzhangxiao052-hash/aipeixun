import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Folder, PlayCircle, CheckCircle, Circle, Star, ChevronLeft } from 'lucide-react';
import MobileNav from './MobileNav';
import MobileStatusBar from './MobileStatusBar';
import useBookmarks from '../../hooks/useBookmarks';

export default function MobileFavorites() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmarkById } = useBookmarks();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeFolder, setActiveFolder] = useState('all');

  const folders = ['all', '默认收藏夹', ...new Set(bookmarks.map(b => b.folder).filter(f => f && f !== '默认收藏夹'))];

  const filteredBookmarks = activeFolder === 'all' 
    ? bookmarks 
    : bookmarks.filter(b => (b.folder || '默认收藏夹') === activeFolder);

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelected = () => {
    selectedItems.forEach(id => {
      removeBookmarkById(id);
    });
    setSelectedItems([]);
    setIsEditMode(false);
  };

  const selectAll = () => {
    if (selectedItems.length > 0) {
      setSelectedItems([]);
    } else {
      const allIds = bookmarks.map(item => item.id);
      setSelectedItems(allIds);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-40 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => navigate(-1)}
            className="p-1 -ml-2 text-gray-800 active:opacity-70"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">我的收藏</h1>
        </div>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-sm text-gray-600 font-medium active:opacity-70"
        >
          {isEditMode ? '完成' : '管理'}
        </button>
      </div>

      {/* Folder Tabs */}
      <div className="bg-white px-4 pb-3 pt-1 border-b border-gray-200 sticky top-[53px] z-30 flex overflow-x-auto gap-2 scrollbar-hide">
        {folders.map(folder => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeFolder === folder
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {folder === 'all' ? '全部' : folder}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Star className="w-12 h-12 mb-2 opacity-50" />
            <p>暂无收藏内容</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookmarks.map((item) => (
              <div 
                key={item.id}
                className="flex gap-3 bg-white p-2 rounded-xl shadow-sm active:scale-[0.99] transition-transform"
                onClick={() => {
                  if (isEditMode) {
                    toggleSelect(item.id);
                  } else {
                    if (item.videoId) {
                      navigate(`/mobile/video/${item.videoId}`);
                    }
                  }
                }}
              >
                {/* Edit Mode Checkbox */}
                {isEditMode && (
                  <div className="flex items-center pl-1 pr-2">
                    {selectedItems.includes(item.id) ? (
                      <CheckCircle className="w-5 h-5 text-blue-600 fill-current" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                )}

                {/* Thumbnail */}
                <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <PlayCircle className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  
                  {/* Duration */}
                  {item.duration && (
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">
                      {item.duration}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1">
                      {item.title || '未命名视频'}
                    </h4>
                    {item.content && (
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {item.content}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                      <Folder className="w-3 h-3" />
                      <span>{item.folder || '默认收藏夹'}</span>
                    </div>
                    <span className="text-[10px] text-gray-300">
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Mode Bottom Bar */}
      {isEditMode && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 z-50 p-3 flex justify-between items-center shadow-lg pb-safe">
          <button 
            onClick={selectAll}
            className="text-sm text-gray-600 font-medium px-2"
          >
            {selectedItems.length > 0 ? '取消全选' : '全选'}
          </button>
          <button 
            onClick={deleteSelected}
            disabled={selectedItems.length === 0}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              selectedItems.length > 0 
                ? 'bg-red-50 text-red-600' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            删除 ({selectedItems.length})
          </button>
        </div>
      )}

      {!isEditMode && <MobileNav />}
    </div>
  );
}
