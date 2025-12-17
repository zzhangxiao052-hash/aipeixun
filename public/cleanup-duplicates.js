// 在浏览器控制台运行此脚本来清理重复的收藏数据

console.log('🧹 开始清理重复的收藏数据...\n');

// 1. 读取当前数据
const rawData = localStorage.getItem('user_assets');
if (!rawData) {
  console.log('❌ 没有找到收藏数据');
} else {
  const bookmarks = JSON.parse(rawData);
  console.log('📊 当前收藏总数:', bookmarks.length);
  
  // 2. 按 videoId 去重
  const seen = new Set();
  const unique = [];
  const duplicates = [];
  
  bookmarks.forEach((bookmark, index) => {
    const videoId = String(bookmark.videoId);
    
    if (seen.has(videoId)) {
      duplicates.push({ index, videoId, title: bookmark.title });
    } else {
      seen.add(videoId);
      unique.push(bookmark);
    }
  });
  
  console.log('\n📋 去重结果:');
  console.log('  - 唯一收藏:', unique.length);
  console.log('  - 重复收藏:', duplicates.length);
  
  if (duplicates.length > 0) {
    console.log('\n🔍 重复的收藏:');
    console.table(duplicates);
    
    // 3. 保存去重后的数据
    localStorage.setItem('user_assets', JSON.stringify(unique));
    window.dispatchEvent(new Event('storage'));
    
    console.log('\n✅ 已清理重复数据!');
    console.log('   删除了', duplicates.length, '个重复项');
    console.log('   剩余', unique.length, '个唯一收藏');
  } else {
    console.log('\n✅ 没有发现重复数据');
  }
  
  // 4. 显示清理后的数据
  console.log('\n📚 清理后的收藏列表:');
  console.table(unique.map(b => ({
    id: b.id,
    videoId: b.videoId,
    title: b.title,
    folder: b.folder || '默认'
  })));
}

console.log('\n✨ 清理完成!请刷新页面查看效果。');
