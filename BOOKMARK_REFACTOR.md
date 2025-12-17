# 收藏功能重构说明文档

## 📋 问题总结

之前的收藏功能存在以下严重问题:

1. **删除失败**: Profile 页面删除后,刷新页面数据又出现
2. **取消收藏失败**: VideoDetail 页面点击"已收藏"无法取消
3. **状态不同步**: 两个页面的收藏状态不一致
4. **脏数据干扰**: localStorage 中混杂了旧版本数据(缺少 videoId 字段)
5. **ID 类型混乱**: videoId 可能是 Number 或 String,比较时使用宽松的 `==`

## ✅ 解决方案

### 1. 创建统一的 `useBookmarks` Hook

**位置**: `src/hooks/useBookmarks.js`

**核心功能**:

- ✨ 自动清洗 localStorage 中的脏数据
- ✨ 统一 ID 类型为 String,避免类型比较问题
- ✨ 集中管理所有增删改查逻辑
- ✨ 监听 storage 事件,实现跨组件实时同步
- ✨ 为旧数据自动生成 videoId

### 2. 数据清洗逻辑

```javascript
// 自动处理以下情况:
// 1. 没有 videoId 的旧数据 → 基于 title 生成唯一 ID
// 2. videoId 类型不一致 → 统一转为 String
// 3. 缺少 id 字段 → 自动补充
// 4. 无效数据 → 自动过滤
```

### 3. Hook API 说明

#### 基本用法

```javascript
import useBookmarks from "../hooks/useBookmarks";

// 在视频详情页使用(需要传入 videoId)
const { isBookmarked, toggleBookmark, removeBookmark } = useBookmarks(
  VIDEO_INFO.id
);

// 在 Profile 页面使用(不需要 videoId)
const { bookmarks: assets, removeBookmarkById } = useBookmarks();
```

#### 返回值说明

| 属性/方法                 | 类型         | 说明                                        |
| ------------------------- | ------------ | ------------------------------------------- |
| `bookmarks`               | Array        | 所有收藏列表                                |
| `isBookmarked`            | Boolean      | 当前视频是否已收藏(仅当传入 videoId 时有效) |
| `currentBookmark`         | Object\|null | 当前视频的收藏信息                          |
| `addBookmark(data)`       | Function     | 添加收藏                                    |
| `removeBookmark(videoId)` | Function     | 通过 videoId 删除收藏                       |
| `removeBookmarkById(id)`  | Function     | 通过内部 id 删除(Profile 页面用)            |
| `toggleBookmark(data)`    | Function     | 切换收藏状态                                |
| `refresh()`               | Function     | 手动刷新数据                                |

## 📝 代码示例

### VideoDetail.jsx 中的使用

```javascript
import useBookmarks from "../hooks/useBookmarks";

export default function VideoDetail() {
  // 使用 Hook
  const { isBookmarked, removeBookmark } = useBookmarks(VIDEO_INFO.id);

  // 取消收藏
  const handleUnbookmark = () => {
    if (window.confirm("确定要取消收藏吗?")) {
      removeBookmark(VIDEO_INFO.id);
      // 状态会自动更新,无需手动 setState
    }
  };

  // 收藏按钮
  <ActionButton
    icon={Bookmark}
    label={isBookmarked ? "已收藏" : "收藏"}
    active={isBookmarked}
    onClick={() => {
      if (isBookmarked) {
        handleUnbookmark();
      } else {
        setShowBookmarkModal(true);
      }
    }}
  />;
}
```

### Profile.jsx 中的使用

```javascript
import useBookmarks from "../hooks/useBookmarks";

export default function Profile() {
  // 获取所有收藏
  const { bookmarks: assets, removeBookmarkById } = useBookmarks();

  // 删除收藏
  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("确定要删除这条收藏吗?")) {
      removeBookmarkById(id);
      // 状态会自动更新,UI 会立即响应
    }
  };

  // 渲染收藏列表
  {
    assets.map((asset) => (
      <div key={asset.id}>
        <h3>{asset.title}</h3>
        <button onClick={(e) => handleDelete(e, asset.id)}>删除</button>
      </div>
    ));
  }
}
```

### BookmarkModal.jsx 中的使用

```javascript
// BookmarkModal 保存后,需要触发 storage 事件通知其他组件
const handleSave = () => {
  // ... 保存逻辑
  localStorage.setItem("user_assets", JSON.stringify(updatedAssets));

  // 触发 storage 事件,让 useBookmarks 自动刷新
  window.dispatchEvent(new Event("storage"));

  onConfirm();
};
```

## 🔧 技术细节

### 1. ID 类型统一

所有 ID 比较都使用严格的 String 类型:

```javascript
// ❌ 旧代码 - 可能出错
a.videoId == VIDEO_INFO.id; // 类型不一致时可能失败

// ✅ 新代码 - 安全可靠
String(a.videoId) === String(VIDEO_INFO.id);
```

### 2. 脏数据清洗

```javascript
// 为没有 videoId 的旧数据生成唯一 ID
if (!item.videoId && item.title) {
  const hashId = `legacy_${item.title.split("").reduce((acc, char) => {
    return (acc << 5) - acc + char.charCodeAt(0);
  }, 0)}`;
  item.videoId = hashId;
}
```

### 3. 跨组件同步

```javascript
// 监听 storage 事件
useEffect(() => {
  const handleStorageChange = () => {
    const loaded = loadBookmarks();
    setBookmarks(loaded);
    // 更新当前视频的收藏状态
    if (normalizedVideoId) {
      const exists = loaded.some(
        (item) => String(item.videoId) === normalizedVideoId
      );
      setIsBookmarked(exists);
    }
  };

  window.addEventListener("storage", handleStorageChange);
  return () => window.removeEventListener("storage", handleStorageChange);
}, [normalizedVideoId]);
```

## 🎯 测试清单

请按以下步骤测试功能是否正常:

### ✅ VideoDetail 页面

1. [ ] 打开视频详情页,检查收藏按钮状态是否正确
2. [ ] 点击"收藏"按钮,打开收藏弹窗
3. [ ] 在弹窗中选择文件夹和标签,确认收藏
4. [ ] 检查按钮是否变为"已收藏"状态
5. [ ] 点击"已收藏",确认取消收藏
6. [ ] 检查按钮是否变回"收藏"状态
7. [ ] 刷新页面,检查状态是否保持

### ✅ Profile 页面

1. [ ] 打开个人中心,检查收藏列表是否正确显示
2. [ ] 点击删除按钮,确认删除
3. [ ] 检查卡片是否立即消失
4. [ ] 刷新页面,检查卡片是否真的被删除
5. [ ] 使用搜索和筛选功能,检查是否正常

### ✅ 跨页面同步

1. [ ] 在 VideoDetail 收藏一个视频
2. [ ] 切换到 Profile 页面,检查是否出现新收藏
3. [ ] 在 Profile 删除该收藏
4. [ ] 返回 VideoDetail 页面,检查按钮是否变回"收藏"状态

### ✅ 数据清洗

1. [ ] 手动在 localStorage 中添加一条没有 videoId 的旧数据
2. [ ] 刷新页面,检查数据是否被自动清洗(补充了 videoId)
3. [ ] 检查功能是否正常(删除、取消收藏等)

## 🐛 常见问题

### Q: 删除后刷新页面,数据又出现了?

A: 这是旧代码的问题。新的 Hook 会确保删除操作立即写入 localStorage,并触发所有组件更新。

### Q: VideoDetail 和 Profile 的收藏状态不一致?

A: 新的 Hook 通过 storage 事件实现跨组件同步,任何一处的修改都会立即反映到其他地方。

### Q: localStorage 中有旧数据怎么办?

A: Hook 会在初始化时自动清洗数据,为旧数据补充必要字段,无需手动处理。

### Q: 如何手动刷新收藏列表?

A: 调用 `refresh()` 方法:

```javascript
const { refresh } = useBookmarks();
refresh(); // 手动刷新
```

## 📚 相关文件

- `src/hooks/useBookmarks.js` - 核心 Hook
- `src/pages/VideoDetail.jsx` - 视频详情页
- `src/pages/Profile.jsx` - 个人中心
- `src/components/BookmarkModal.jsx` - 收藏弹窗

## 🎉 总结

通过引入统一的 `useBookmarks` Hook,我们彻底解决了:

1. ✅ 删除失败的问题
2. ✅ 取消收藏失败的问题
3. ✅ 状态不同步的问题
4. ✅ 脏数据干扰的问题
5. ✅ ID 类型混乱的问题

现在收藏功能具有:

- 🔒 类型安全
- 🔄 实时同步
- 🧹 自动清洗
- 📦 集中管理
- 🎯 简单易用

祝使用愉快! 🚀
