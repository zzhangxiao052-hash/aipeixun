import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'user_assets';

/**
 * 清洗 localStorage 中的脏数据
 * - 确保所有收藏都有 videoId 字段
 * - 统一 ID 类型为 String
 * - 移除无效数据
 */
function cleanupBookmarks(bookmarks) {
  return bookmarks
    .filter(item => {
      // 必须有 videoId 或 title (至少有一个标识符)
      return item.videoId || item.title;
    })
    .map(item => {
      // 如果没有 videoId 但有 title,尝试从 title 生成一个唯一 ID
      if (!item.videoId && item.title) {
        // 为旧数据生成一个基于 title 的 hash ID
        const hashId = `legacy_${item.title.split('').reduce((acc, char) => {
          return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0)}`;
        item.videoId = hashId;
      }
      
      // 统一转换 videoId 为 String 类型
      if (item.videoId !== undefined && item.videoId !== null) {
        item.videoId = String(item.videoId);
      }
      
      // 确保有 id 字段(用于 React key 和删除操作)
      if (!item.id) {
        item.id = item.videoId || Date.now();
      }
      
      // 统一 id 也为 String
      item.id = String(item.id);
      
      return item;
    });
}

/**
 * 从 localStorage 读取并清洗收藏数据
 */
function loadBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const bookmarks = raw ? JSON.parse(raw) : [];
    const cleaned = cleanupBookmarks(bookmarks);
    
    // 如果清洗后数据有变化,立即写回
    if (JSON.stringify(bookmarks) !== JSON.stringify(cleaned)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    
    return cleaned;
  } catch (error) {
    console.error('Failed to load bookmarks:', error);
    return [];
  }
}

/**
 * 保存收藏数据到 localStorage
 */
function saveBookmarks(bookmarks) {
  try {
    const cleaned = cleanupBookmarks(bookmarks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    return cleaned;
  } catch (error) {
    console.error('Failed to save bookmarks:', error);
    return bookmarks;
  }
}

/**
 * 统一的收藏管理 Hook
 * @param {string|number} videoId - 可选,当前视频的 ID
 * @returns {Object} 收藏状态和操作方法
 */
export default function useBookmarks(videoId = null) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // 统一 videoId 类型为 String
  const normalizedVideoId = videoId !== null && videoId !== undefined 
    ? String(videoId) 
    : null;

  // 初始化:加载并清洗数据
  useEffect(() => {
    console.log('📚 useBookmarks Hook 初始化');
    console.log('  - videoId:', videoId, '类型:', typeof videoId);
    console.log('  - normalizedVideoId:', normalizedVideoId);
    console.log('🔄 useBookmarks 初始化 useEffect 执行');
    
    const loaded = loadBookmarks();
    console.log('  - 加载的收藏数量:', loaded.length);
    setBookmarks(loaded);
    
    // 如果提供了 videoId,检查是否已收藏
    if (normalizedVideoId) {
      const exists = loaded.some(item => String(item.videoId) === normalizedVideoId);
      console.log('  - 检查 videoId', normalizedVideoId, '是否已收藏:', exists);
      setIsBookmarked(exists);
    }
  }, [normalizedVideoId]);

  // 监听收藏变化事件,实现跨组件同步
  useEffect(() => {
    console.log('👂 设置收藏变化事件监听器');
    
    const handleBookmarksChange = () => {
      console.log('🔔 收到收藏变化事件');
      const loaded = loadBookmarks();
      console.log('  - 重新加载的收藏数量:', loaded.length);
      setBookmarks(loaded);
      
      if (normalizedVideoId) {
        const exists = loaded.some(item => String(item.videoId) === normalizedVideoId);
        console.log('  - 更新 isBookmarked 为:', exists);
        setIsBookmarked(exists);
      }
    };

    // 监听自定义事件 (同一页面内的更新)
    window.addEventListener('bookmarks-changed', handleBookmarksChange);
    // 也监听 storage 事件 (跨标签页的更新)
    window.addEventListener('storage', handleBookmarksChange);
    
    return () => {
      console.log('🔇 移除收藏变化事件监听器');
      window.removeEventListener('bookmarks-changed', handleBookmarksChange);
      window.removeEventListener('storage', handleBookmarksChange);
    };
  }, [normalizedVideoId]);

  /**
   * 添加收藏
   * @param {Object} bookmarkData - 收藏数据对象
   * @returns {boolean} 是否成功
   */
  const addBookmark = useCallback((bookmarkData) => {
    try {
      const newBookmark = {
        ...bookmarkData,
        id: bookmarkData.id || Date.now(),
        videoId: String(bookmarkData.videoId),
        date: bookmarkData.date || new Date().toISOString().split('T')[0],
      };

      setBookmarks(prev => {
        // 检查是否已存在(通过 videoId)
        const existingIndex = prev.findIndex(
          item => String(item.videoId) === String(newBookmark.videoId)
        );

        let updated;
        if (existingIndex >= 0) {
          // 更新现有收藏
          updated = [...prev];
          updated[existingIndex] = { 
            ...newBookmark, 
            id: prev[existingIndex].id // 保留原 ID
          };
        } else {
          // 添加新收藏
          updated = [newBookmark, ...prev];
        }

        saveBookmarks(updated);
        // 触发自定义事件,通知其他组件
        window.dispatchEvent(new CustomEvent('bookmarks-changed'));
        return updated;
      });

      setIsBookmarked(true);
      return true;
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      return false;
    }
  }, []);

  /**
   * 删除收藏(通过 videoId)
   * @param {string|number} targetVideoId - 要删除的视频 ID
   * @returns {boolean} 是否成功
   */
  const removeBookmark = useCallback((targetVideoId) => {
    console.log('🗑️ removeBookmark 被调用');
    console.log('  - 目标 videoId:', targetVideoId, '类型:', typeof targetVideoId);
    console.log('  - 当前 normalizedVideoId:', normalizedVideoId);
    
    try {
      const normalizedTargetId = String(targetVideoId);
      console.log('  - 标准化后的 targetId:', normalizedTargetId);
      
      setBookmarks(prev => {
        console.log('  - 删除前的收藏数量:', prev.length);
        console.log('  - 删除前的收藏列表:', prev.map(b => ({ id: b.id, videoId: b.videoId, title: b.title })));
        
        const updated = prev.filter(
          item => {
            const match = String(item.videoId) !== normalizedTargetId;
            if (!match) {
              console.log('  - 找到匹配项,将被删除:', item);
            }
            return match;
          }
        );
        
        console.log('  - 删除后的收藏数量:', updated.length);
        console.log('  - 是否有变化:', prev.length !== updated.length);
        
        saveBookmarks(updated);
        console.log('  - 已保存到 localStorage');
        
        // 触发自定义事件,通知其他组件
        window.dispatchEvent(new CustomEvent('bookmarks-changed'));
        console.log('  - 已触发 storage 事件');
        
        return updated;
      });

      // 如果删除的是当前视频,更新状态
      if (normalizedVideoId && normalizedTargetId === normalizedVideoId) {
        console.log('  - 更新 isBookmarked 为 false');
        setIsBookmarked(false);
      }

      console.log('✅ removeBookmark 执行成功');
      return true;
    } catch (error) {
      console.error('❌ removeBookmark 失败:', error);
      return false;
    }
  }, [normalizedVideoId]);

  /**
   * 删除收藏(通过内部 ID,用于 Profile 页面)
   * @param {string|number} itemId - 收藏项的内部 ID
   * @returns {boolean} 是否成功
   */
  const removeBookmarkById = useCallback((itemId) => {
    console.log('🗑️ removeBookmarkById 被调用');
    console.log('  - 目标 id:', itemId, '类型:', typeof itemId);
    
    try {
      const normalizedItemId = String(itemId);
      console.log('  - 标准化后的 id:', normalizedItemId);
      
      setBookmarks(prev => {
        console.log('  - 删除前的收藏数量:', prev.length);
        console.log('  - 删除前的收藏列表:', prev.map(b => ({ id: b.id, videoId: b.videoId, title: b.title })));
        
        const updated = prev.filter(
          item => {
            const match = String(item.id) !== normalizedItemId;
            if (!match) {
              console.log('  - 找到匹配项,将被删除:', item);
            }
            return match;
          }
        );
        
        console.log('  - 删除后的收藏数量:', updated.length);
        console.log('  - 是否有变化:', prev.length !== updated.length);
        
        saveBookmarks(updated);
        console.log('  - 已保存到 localStorage');
        
        // 触发自定义事件,通知其他组件
        window.dispatchEvent(new CustomEvent('bookmarks-changed'));
        console.log('  - 已触发 storage 事件');
        
        return updated;
      });

      console.log('✅ removeBookmarkById 执行成功');
      return true;
    } catch (error) {
      console.error('❌ removeBookmarkById 失败:', error);
      return false;
    }
  }, []);

  /**
   * 切换收藏状态(用于视频详情页)
   * @param {Object} bookmarkData - 收藏时需要的数据
   * @returns {boolean} 新的收藏状态
   */
  const toggleBookmark = useCallback((bookmarkData) => {
    if (!normalizedVideoId) {
      console.error('toggleBookmark requires a videoId');
      return isBookmarked;
    }

    if (isBookmarked) {
      // 取消收藏
      removeBookmark(normalizedVideoId);
      return false;
    } else {
      // 添加收藏
      addBookmark({
        ...bookmarkData,
        videoId: normalizedVideoId,
      });
      return true;
    }
  }, [normalizedVideoId, isBookmarked, addBookmark, removeBookmark]);

  /**
   * 获取当前视频的收藏信息
   */
  const currentBookmark = normalizedVideoId 
    ? bookmarks.find(item => String(item.videoId) === normalizedVideoId)
    : null;

  return {
    // 状态
    bookmarks,           // 所有收藏列表
    isBookmarked,        // 当前视频是否已收藏
    currentBookmark,     // 当前视频的收藏信息
    
    // 方法
    addBookmark,         // 添加收藏
    removeBookmark,      // 通过 videoId 删除
    removeBookmarkById,  // 通过内部 id 删除(Profile 页面用)
    toggleBookmark,      // 切换收藏状态
    
    // 工具方法
    refresh: () => {     // 手动刷新(如果需要)
      const loaded = loadBookmarks();
      setBookmarks(loaded);
      if (normalizedVideoId) {
        const exists = loaded.some(item => String(item.videoId) === normalizedVideoId);
        setIsBookmarked(exists);
      }
    }
  };
}
