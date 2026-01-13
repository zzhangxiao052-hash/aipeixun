import { useState, useEffect, useCallback } from 'react';

export default function useBookmarks(videoId = null) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const loadBookmarks = useCallback(() => {
    try {
      const savedAssets = localStorage.getItem('user_assets');
      if (savedAssets) {
        const assets = JSON.parse(savedAssets);
        const videoBookmarks = assets.filter(a => a.type === 'video_bookmark');
        setBookmarks(videoBookmarks);
        
        if (videoId) {
          const exists = videoBookmarks.some(b => String(b.videoId) === String(videoId));
          setIsBookmarked(exists);
        }
      } else {
        setBookmarks([]);
        setIsBookmarked(false);
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    }
  }, [videoId]);

  useEffect(() => {
    loadBookmarks();

    const handleStorageChange = () => {
      loadBookmarks();
    };

    window.addEventListener('bookmarks-changed', handleStorageChange);
    // Also listen to storage event for cross-tab sync
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('bookmarks-changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadBookmarks]);

  const addBookmark = (bookmarkData) => {
    try {
      const existingAssets = JSON.parse(localStorage.getItem('user_assets') || '[]');
      
      // Check if already exists
      const existingIndex = existingAssets.findIndex(a => 
        a.type === 'video_bookmark' && String(a.videoId) === String(bookmarkData.videoId)
      );

      let updatedAssets;
      if (existingIndex >= 0) {
        // Update existing
        updatedAssets = [...existingAssets];
        updatedAssets[existingIndex] = { ...bookmarkData, id: existingAssets[existingIndex].id, type: 'video_bookmark' };
      } else {
        // Add new
        const newAsset = {
          ...bookmarkData,
          id: Date.now(),
          type: 'video_bookmark'
        };
        updatedAssets = [newAsset, ...existingAssets];
      }

      localStorage.setItem('user_assets', JSON.stringify(updatedAssets));
      window.dispatchEvent(new CustomEvent('bookmarks-changed'));
      return true;
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      return false;
    }
  };

  const removeBookmark = (idToRemove) => {
    try {
      const existingAssets = JSON.parse(localStorage.getItem('user_assets') || '[]');
      // If idToRemove is passed as videoId (string/number) or assetId (number)
      // We should probably support removing by videoId if that's what the UI passes
      
      // Check if we are removing by videoId (common in detail page) or asset ID (common in list)
      // Assuming if it matches the current videoId context, it's a videoId, otherwise check both.
      
      const updatedAssets = existingAssets.filter(a => {
        if (a.type !== 'video_bookmark') return true;
        // Remove if matches videoId or asset id
        return String(a.videoId) !== String(idToRemove) && a.id !== idToRemove;
      });

      localStorage.setItem('user_assets', JSON.stringify(updatedAssets));
      window.dispatchEvent(new CustomEvent('bookmarks-changed'));
      return true;
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
      return false;
    }
  };

  return {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    refreshBookmarks: loadBookmarks
  };
}
