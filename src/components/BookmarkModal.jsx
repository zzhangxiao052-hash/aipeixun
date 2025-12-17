import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

export default function BookmarkModal({ onClose, videoInfo, onConfirm }) {
  const [folders, setFolders] = useState(['我的技巧库 (默认)', '公文写作', '数据分析']);
  const [selectedFolder, setSelectedFolder] = useState('我的技巧库 (默认)');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const [tags, setTags] = useState(['大模型', '写作', '效率']);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');

  // Handle Folder Selection
  const handleFolderChange = (e) => {
    const value = e.target.value;
    if (value === 'new_folder_option') {
      setIsCreatingFolder(true);
      setSelectedFolder('');
    } else {
      setIsCreatingFolder(false);
      setSelectedFolder(value);
    }
  };

  // Handle Tag Deletion
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle Tag Addition
  const handleAddTag = () => {
    if (newTagValue.trim() && !tags.includes(newTagValue.trim())) {
      setTags([...tags, newTagValue.trim()]);
    }
    setNewTagValue('');
    setIsAddingTag(false);
  };

  const handleKeyDownTag = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  // Handle Confirm
  const handleSave = () => {
    const finalFolder = isCreatingFolder ? (newFolderName.trim() || '新建收藏夹') : selectedFolder;
    
    // Construct the new asset object
    const newAsset = {
      id: Date.now(),
      videoId: videoInfo.id, // Store video ID for linking
      title: videoInfo.title, // Use video title
      content: videoInfo.desc || '从视频收藏的内容', // Use video description
      tags: tags,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      folder: finalFolder,
      type: 'video_bookmark'
    };

    // Save to localStorage
    try {
      const existingAssets = JSON.parse(localStorage.getItem('user_assets') || '[]');
      
      // Check if already exists (by videoId) - 统一转为 String 进行比较
      const existingIndex = existingAssets.findIndex(a => String(a.videoId) === String(videoInfo.id));
      
      let updatedAssets;
      if (existingIndex >= 0) {
        // Update existing
        console.log('📝 更新现有收藏, index:', existingIndex);
        updatedAssets = [...existingAssets];
        updatedAssets[existingIndex] = { ...newAsset, id: existingAssets[existingIndex].id }; // Keep original ID
      } else {
        // Add new
        console.log('➕ 添加新收藏');
        updatedAssets = [newAsset, ...existingAssets];
      }

      localStorage.setItem('user_assets', JSON.stringify(updatedAssets));
      console.log('💾 已保存到 localStorage, 总数:', updatedAssets.length);
      
      // 触发自定义事件,通知其他组件更新
      window.dispatchEvent(new CustomEvent('bookmarks-changed'));
      console.log('📢 已触发 bookmarks-changed 事件');
      
      // Also save custom folders if needed (optional, for persistence of folder list)
      if (isCreatingFolder && newFolderName.trim()) {
         // In a real app we'd save the folder list too
      }
    } catch (error) {
      console.error("Failed to save bookmark:", error);
    }

    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">收藏至技巧库</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Folder Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择收藏夹</label>
            {!isCreatingFolder ? (
              <select 
                value={selectedFolder} 
                onChange={handleFolderChange}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              >
                {folders.map(f => <option key={f} value={f}>{f}</option>)}
                <option value="new_folder_option">+ 新建收藏夹</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="输入文件夹名称"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="flex-1 p-2.5 bg-white border border-blue-500 rounded-lg text-sm focus:outline-none"
                />
                <button 
                  onClick={() => setIsCreatingFolder(false)}
                  className="px-3 text-sm text-gray-500 hover:text-gray-700"
                >
                  取消
                </button>
              </div>
            )}
          </div>

          {/* Tag Management */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">添加标签 (Tags)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md flex items-center gap-1">
                  {tag} 
                  <button 
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
              
              {isAddingTag ? (
                <div className="flex items-center gap-1">
                  <input 
                    type="text" 
                    autoFocus
                    value={newTagValue}
                    onChange={(e) => setNewTagValue(e.target.value)}
                    onBlur={handleAddTag}
                    onKeyDown={handleKeyDownTag}
                    className="w-20 px-2 py-1 text-xs border border-blue-500 rounded-md outline-none"
                    placeholder="Enter..."
                  />
                </div>
              ) : (
                <button 
                  onClick={() => setIsAddingTag(true)}
                  className="px-2 py-1 border border-dashed border-gray-300 text-gray-500 text-xs rounded-md hover:border-blue-400 hover:text-blue-600 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> 添加
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            确认收藏
          </button>
        </div>
      </div>
    </div>
  );
}
