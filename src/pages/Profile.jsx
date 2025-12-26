import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Trash2, Folder, Search, Filter } from 'lucide-react';
import useBookmarks from '../hooks/useBookmarks';

export default function Profile() {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark, removeBookmarkById } = useBookmarks();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('全部');
  
  // 获取所有文件夹列表
  const folders = ['全部', ...new Set(bookmarks.map(b => b.folder || '默认收藏夹').filter(Boolean))];
  
  // 过滤收藏
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchQuery === '' || 
      bookmark.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFolder = selectedFolder === '全部' || 
      (bookmark.folder || '默认收藏夹') === selectedFolder;
    
    return matchesSearch && matchesFolder;
  });
  
  const handleDelete = (e, bookmark) => {
    e.stopPropagation();
    console.log('🔴 Delete requested for bookmark:', bookmark);
    
    // 暂时移除 confirm
    // if (confirm('确定要删除这个收藏吗？')) {
      if (bookmark.videoId) {
        console.log('🔴 Trying to remove by videoId:', bookmark.videoId);
        removeBookmark(bookmark.videoId);
      } else if (bookmark.id) {
        console.log('🔴 No videoId, trying to remove by id:', bookmark.id);
        removeBookmarkById(bookmark.id);
      } else {
        console.error('🔴 Bookmark has no ID!', bookmark);
      }
    // }
  };
  
  const handleVideoClick = (bookmark) => {
    if (bookmark.videoId) {
      navigate(`/video/${bookmark.videoId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      {/* Header Background */}
      <div className="h-48 bg-gradient-to-r from-blue-700 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-[1800px] mx-auto px-4 md:px-14 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">我的收藏</h1>
            <p className="text-blue-100">管理你的学习收藏</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 -mt-12 relative z-10">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Folder className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">我的收藏</h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {filteredBookmarks.length} 个视频
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Folder Filter */}
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[160px]"
              >
                {folders.map(folder => (
                  <option key={folder} value={folder}>
                    {folder === '全部' ? '📂 所有文件夹' : `📂 ${folder}`}
                  </option>
                ))}
              </select>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索收藏..."
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bookmarks Grid */}
        {filteredBookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handleVideoClick(bookmark)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                  {bookmark.thumbnail ? (
                    <img
                      src={bookmark.thumbnail}
                      alt={bookmark.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Play className="w-16 h-16 text-white/80" />
                    </div>
                  )}
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                      <Play className="w-7 h-7 text-blue-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  {bookmark.duration && (
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                      {bookmark.duration}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 min-h-[3rem]">
                    {bookmark.title || '未命名视频'}
                  </h3>
                  
                  {bookmark.content && (
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {bookmark.content}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{bookmark.date || '未知日期'}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">
                      {bookmark.folder || '默认收藏夹'}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  {bookmark.tags && bookmark.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {bookmark.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                      {bookmark.tags.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{bookmark.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Delete Button */}
                  <button
                    onClick={(e) => handleDelete(e, bookmark)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>删除收藏</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Filter className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {searchQuery || selectedFolder !== '全部' ? '没有找到匹配的收藏' : '还没有收藏'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery || selectedFolder !== '全部' 
                ? '尝试调整筛选条件' 
                : '浏览课程并收藏你感兴趣的内容'}
            </p>
            {(searchQuery || selectedFolder !== '全部') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFolder('全部');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                清除筛选
              </button>
            )}
            {!searchQuery && selectedFolder === '全部' && (
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                浏览课程
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
