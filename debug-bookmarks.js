// 在浏览器控制台运行此脚本来调试收藏功能

console.log('=== 收藏功能调试工具 ===\n');

// 1. 查看当前 localStorage 中的收藏数据
const rawData = localStorage.getItem('user_assets');
console.log('1. localStorage 原始数据:');
console.log(rawData);

if (rawData) {
  try {
    const bookmarks = JSON.parse(rawData);
    console.log('\n2. 解析后的收藏列表:');
    console.log('总数:', bookmarks.length);
    console.table(bookmarks.map(b => ({
      id: b.id,
      videoId: b.videoId,
      title: b.title,
      folder: b.folder,
      date: b.date
    })));
    
    // 3. 检查数据类型
    console.log('\n3. 数据类型检查:');
    bookmarks.forEach((b, index) => {
      console.log(`[${index}] id类型: ${typeof b.id}, videoId类型: ${typeof b.videoId}`);
    });
    
    // 4. 检查当前视频 ID
    const currentVideoId = 201; // VideoDetail 页面的视频 ID
    console.log('\n4. 当前视频 ID:', currentVideoId, '类型:', typeof currentVideoId);
    
    // 5. 检查是否已收藏
    const isBookmarked = bookmarks.some(b => String(b.videoId) === String(currentVideoId));
    console.log('是否已收藏:', isBookmarked);
    
    // 6. 查找匹配的收藏项
    const matched = bookmarks.filter(b => String(b.videoId) === String(currentVideoId));
    console.log('匹配的收藏项:', matched);
    
  } catch (error) {
    console.error('解析 JSON 失败:', error);
  }
} else {
  console.log('localStorage 中没有收藏数据');
}

// 7. 测试删除功能
console.log('\n=== 测试函数 ===');
console.log('测试删除第一个收藏:');
console.log('window.testDelete = function() {');
console.log('  const bookmarks = JSON.parse(localStorage.getItem("user_assets") || "[]");');
console.log('  if (bookmarks.length > 0) {');
console.log('    const firstId = bookmarks[0].id;');
console.log('    console.log("删除 ID:", firstId);');
console.log('    const updated = bookmarks.filter(b => String(b.id) !== String(firstId));');
console.log('    localStorage.setItem("user_assets", JSON.stringify(updated));');
console.log('    window.dispatchEvent(new Event("storage"));');
console.log('    console.log("删除成功,剩余:", updated.length);');
console.log('  }');
console.log('}');

window.testDelete = function() {
  const bookmarks = JSON.parse(localStorage.getItem('user_assets') || '[]');
  if (bookmarks.length > 0) {
    const firstId = bookmarks[0].id;
    console.log('删除 ID:', firstId);
    const updated = bookmarks.filter(b => String(b.id) !== String(firstId));
    localStorage.setItem('user_assets', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    console.log('删除成功,剩余:', updated.length);
    return true;
  }
  return false;
};

console.log('\n运行 testDelete() 来测试删除功能');
