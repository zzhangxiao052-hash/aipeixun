import { useState } from 'react';
import { Bell, X, Check, Hammer, MessageCircle, BookOpen, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock notification data
const MOCK_NOTIFICATIONS = [

  {
    id: 'notif_003',
    type: 'interaction',
    subType: 'reply',
    title: '收到新回复',
    content: 'Dev_Mike 回复了您的评论："我也这么觉得，特别是Prompt部分"',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isRead: true,
    priority: 'medium',
    actionUrl: '/video/201',
    actionLabel: '查看回复',
    metadata: {
      fromUser: 'Dev_Mike',
      commentId: 'comment_001',
      videoId: 201
    }
  },
  {
    id: 'notif_004',
    type: 'course',
    subType: 'update',
    title: '课程更新',
    content: '《DeepSeek深度解析》新增第5章：高级应用效能跃升',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isRead: true,
    priority: 'medium',
    actionUrl: '/video/201',
    actionLabel: '去学习',
    metadata: {
      courseId: 201
    }
  },

];

export default function NotificationCenter({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState('all'); // all, task, interaction, course, system

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (notification) => {
    handleMarkAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      onClose();
    }
  };

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeFilter);

  const getIcon = (type) => {
    switch (type) {
      case 'task': return Hammer;
      case 'interaction': return MessageCircle;
      case 'course': return BookOpen;
      case 'system': return AlertCircle;
      default: return Bell;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'task': return 'text-blue-600 bg-blue-50';
      case 'interaction': return 'text-green-600 bg-green-50';
      case 'course': return 'text-purple-600 bg-purple-50';
      case 'system': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return time.toLocaleDateString('zh-CN');
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            通知中心
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {[
            { key: 'all', label: '全部' },

            { key: 'interaction', label: '互动' },
            { key: 'course', label: '课程' },
            { key: 'system', label: '系统' }
          ].map(filter => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap
                ${activeFilter === filter.key 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification List */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">暂无通知</p>
          </div>
        ) : (
          filteredNotifications.map(notification => {
            const Icon = getIcon(notification.type);
            const colorClass = getTypeColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group
                  ${!notification.isRead ? 'bg-blue-50/30' : ''}
                `}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg ${colorClass} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                      {notification.content}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </span>
                      
                      {notification.actionLabel && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {notification.actionLabel}
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification.id);
                    }}
                    className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleMarkAllAsRead}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" />
            全部标记为已读
          </button>
        </div>
      )}
    </div>
  );
}
