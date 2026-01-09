import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageCircle, Heart, Bell, ChevronRight } from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileNotifications() {
  const navigate = useNavigate();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Alice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      content: '赞了你的评论',
      targetContent: '这个课程非常有帮助，讲得很清晰！',
      time: '10分钟前',
      isRead: false,
      targetId: 1, // Video ID
      targetCommentId: 1, // Comment ID
    },
    {
      id: 2,
      type: 'reply',
      user: 'Bob',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      content: '回复了你的评论',
      targetContent: '确实，特别是第三章的实战部分。',
      time: '1小时前',
      isRead: true,
      targetId: 1,
      targetCommentId: 102,
    },
  ]);

  const handleNotificationClick = (notification) => {
    // Mark as read (in a real app, this would be an API call)
    const updatedNotifications = notifications.map(n => 
      n.id === notification.id ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);

    // Navigate based on type
    if (notification.targetId) {
      navigate(`/mobile/video/${notification.targetId}`, { 
        state: { 
          highlightCommentId: notification.targetCommentId 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-[480px] mx-auto shadow-2xl">
      <MobileStatusBar />
      
      {/* Header */}
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 sticky top-0 z-40 flex items-center gap-1">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 -ml-2 text-gray-800 active:opacity-70"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">消息通知</h1>
      </div>

      {/* Notification List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-4 flex gap-3 active:bg-gray-50 transition-colors cursor-pointer ${!notification.isRead ? 'bg-blue-50/30' : 'bg-white'}`}
          >
            {/* Avatar / Icon */}
            <div className="flex-shrink-0 relative">
              {notification.type === 'system' ? (
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
              ) : (
                <img 
                  src={notification.avatar} 
                  alt={notification.user} 
                  className="w-10 h-10 rounded-full border border-gray-100"
                />
              )}
              
              {/* Type Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                {notification.type === 'like' && (
                  <div className="w-full h-full bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="w-3 h-3 text-pink-500 fill-current" />
                  </div>
                )}
                {notification.type === 'reply' && (
                  <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 text-green-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-gray-800">{notification.user}</span>
                <span className="text-xs text-gray-400">{notification.time}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {notification.content}
              </p>

              {/* Target Content Preview */}
              {notification.targetContent && (
                <div className="bg-gray-50 rounded p-2 text-xs text-gray-500 line-clamp-2 border border-gray-100">
                  {notification.targetContent}
                </div>
              )}
            </div>
            
            <div className="self-center">
               <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
