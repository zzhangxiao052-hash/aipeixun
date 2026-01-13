import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Clock, PlayCircle, CheckCircle, Circle } from 'lucide-react';
import MobileNav from './MobileNav';
import MobileStatusBar from './MobileStatusBar';

// Mock Data
const HISTORY_DATA = [
  {
    date: '今天',
    items: [
      { id: 1, title: 'DeepSeek 深度解析与应用实战', author: 'AI 探索者', progress: 80, cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80', duration: '12:30', lastTimestamp: 600 },
      { id: 2, title: 'Midjourney 商业插画从入门到精通', author: '设计大咖', progress: 25, cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80', duration: '45:20', lastTimestamp: 680 },
    ]
  },
  {
    date: '昨天',
    items: [
      { id: 3, title: 'Python 数据分析基础课程', author: '编程导师', progress: 100, cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&q=80', duration: '20:15', lastTimestamp: 1215 },
    ]
  },
  {
    date: '更早',
    items: [
      { id: 4, title: 'ChatGPT 提示词工程进阶指南', author: 'Prompt 专家', progress: 5, cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80', duration: '15:00', lastTimestamp: 45 },
    ]
  }
];

const SwipeableItem = ({ item, isEditMode, isSelected, onToggleSelect, onDelete, onClick }) => {
  const [offset, setOffset] = useState(0);
  const startX = useRef(0);
  const currentOffset = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e) => {
    if (isEditMode) return;
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || isEditMode) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    
    // Only allow sliding left (negative diff)
    // Max slide is -80px (button width)
    const newOffset = Math.min(0, Math.max(-80, currentOffset.current + diff));
    setOffset(newOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || isEditMode) return;
    isDragging.current = false;
    
    // Snap logic
    if (offset < -40) {
      setOffset(-80);
      currentOffset.current = -80;
    } else {
      setOffset(0);
      currentOffset.current = 0;
    }
  };

  // Mouse Handlers for PC Testing
  const handleMouseDown = (e) => {
    if (isEditMode) return;
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isEditMode) return;
    if (e.buttons === 0) {
      handleMouseUp();
      return;
    }
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    const newOffset = Math.min(0, Math.max(-80, currentOffset.current + diff));
    setOffset(newOffset);
  };

  const handleMouseUp = () => {
    if (!isDragging.current || isEditMode) return;
    isDragging.current = false;
    if (offset < -40) {
      setOffset(-80);
      currentOffset.current = -80;
    } else {
      setOffset(0);
      currentOffset.current = 0;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      handleMouseUp();
    }
  };

  // Reset swipe if entering edit mode
  if (isEditMode && offset !== 0) {
    setOffset(0);
    currentOffset.current = 0;
  }

  return (
    <div className="relative overflow-hidden rounded-xl mb-3">
      {/* Background Delete Button */}
      <div className="absolute inset-y-0 right-0 w-[80px] bg-red-500 flex items-center justify-center text-white rounded-r-xl">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Foreground Content */}
      <div 
        className="bg-white p-2 rounded-xl shadow-sm relative z-10 transition-transform duration-200 ease-out flex gap-3"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          if (offset === 0) {
            if (isEditMode) {
              onToggleSelect(item.id);
            } else {
              onClick(item);
            }
          } else {
            // Close swipe if clicked while open
            setOffset(0);
            currentOffset.current = 0;
          }
        }}
      >
        {/* Edit Mode Checkbox */}
        {isEditMode && (
          <div className="flex items-center pl-1 pr-2">
            {isSelected ? (
              <CheckCircle className="w-5 h-5 text-blue-600 fill-current" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300" />
            )}
          </div>
        )}

        {/* Thumbnail */}
        <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 relative flex-shrink-0">
          <img 
            src={item.cover} 
            alt={item.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${item.progress}%` }}
            />
          </div>
          
          {/* Duration */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded">
            {item.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
          <div>
            <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug mb-1">
              {item.title}
            </h4>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>{item.author}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
            <PlayCircle className="w-3 h-3" />
            <span>
              {item.progress === 100 ? '已看完' : `观看至 ${item.progress}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MobileHistory() {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [history, setHistory] = useState(HISTORY_DATA);

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const deleteSelected = () => {
    const newHistory = history.map(group => ({
      ...group,
      items: group.items.filter(item => !selectedItems.includes(item.id))
    })).filter(group => group.items.length > 0);
    
    setHistory(newHistory);
    setSelectedItems([]);
    setIsEditMode(false);
  };

  const deleteSingle = (id) => {
    if (window.confirm('确定要删除这条记录吗？')) {
      const newHistory = history.map(group => ({
        ...group,
        items: group.items.filter(item => item.id !== id)
      })).filter(group => group.items.length > 0);
      setHistory(newHistory);
    }
  };

  const selectAll = () => {
    if (selectedItems.length > 0) {
      setSelectedItems([]);
    } else {
      const allIds = history.flatMap(group => group.items.map(item => item.id));
      setSelectedItems(allIds);
    }
  };

  const handleItemClick = (item) => {
    // Resume play with timestamp
    navigate(`/mobile/video/${item.id}?t=${item.lastTimestamp}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-40 flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800">观看历史</h1>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className="text-sm text-gray-600 font-medium active:opacity-70"
        >
          {isEditMode ? '完成' : '管理'}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Clock className="w-12 h-12 mb-2 opacity-50" />
            <p>暂无观看历史</p>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-sm font-bold text-gray-500 mb-3 ml-1">{group.date}</h3>
                <div className="">
                  {group.items.map((item) => (
                    <SwipeableItem
                      key={item.id}
                      item={item}
                      isEditMode={isEditMode}
                      isSelected={selectedItems.includes(item.id)}
                      onToggleSelect={toggleSelect}
                      onDelete={deleteSingle}
                      onClick={handleItemClick}
                    />
                  ))}
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
