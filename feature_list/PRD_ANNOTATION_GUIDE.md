# PRD 标注系统使用说明

## 📋 功能介绍

这是一个在前端页面上直接添加需求标注的系统，让研发可以在浏览原型页面时直接查看 PRD 需求说明，无需在原型和文档之间来回切换。

## 🎯 使用方式

### 1. 查看标注

在任何页面的 URL 后添加 `?prd=true` 参数即可显示 PRD 标注。

**示例：**

```
正常访问：http://localhost:5173/mobile/search
查看标注：http://localhost:5173/mobile/search?prd=true
```

### 2. 标注交互

- **默认状态**：标注框显示标题和图标，内容折叠
- **点击 "+" 按钮**：展开查看详细需求说明
- **点击 "×" 按钮**：收起内容

### 3. 标注样式

标注框支持 4 种颜色，用于区分不同类型的需求：

- 🔴 **红色（red）**：核心功能、重要规则
- 🔵 **蓝色（blue）**：基础功能、展示规则
- 🟠 **橙色（orange）**：交互逻辑、UI 规范
- 🟢 **绿色（green）**：算法规则、兜底策略

## 💻 开发指南

### 在页面中添加标注

#### 步骤 1：导入组件

```jsx
import { PRDAnnotationWrapper } from "../../components/PRDAnnotation";
```

#### 步骤 2：包裹需要标注的区域

```jsx
<PRDAnnotationWrapper
  annotations={[
    {
      title: "📋 PRD v2.1 - 功能名称",
      content: "详细的需求说明\n支持换行",
      position: "top-right", // 标注位置
      arrowDirection: "left", // 箭头方向
      color: "red", // 标注颜色
      offsetX: -10, // X轴偏移
      offsetY: 10, // Y轴偏移
    },
    // 可以添加多个标注
  ]}
>
  {/* 你的页面内容 */}
  <div>需要标注的内容区域</div>
</PRDAnnotationWrapper>
```

### 标注配置参数

| 参数             | 类型   | 可选值                                              | 说明                       |
| ---------------- | ------ | --------------------------------------------------- | -------------------------- |
| `title`          | string | -                                                   | 标注标题                   |
| `content`        | string | -                                                   | 标注内容（支持 `\n` 换行） |
| `position`       | string | `top-left` `top-right` `bottom-left` `bottom-right` | 标注框位置                 |
| `arrowDirection` | string | `up` `down` `left` `right`                          | 箭头指向                   |
| `color`          | string | `red` `blue` `green` `orange`                       | 标注颜色                   |
| `offsetX`        | number | -                                                   | X轴偏移量（px）            |
| `offsetY`        | number | -                                                   | Y轴偏移量（px）            |

## 📱 已添加标注的页面

### 移动端搜索页面

**访问地址：** `/mobile/search?prd=true`

**标注内容：**

1. 🔵 展示数量 - 默认展示前 8 条热门搜索词
2. 🟠 排名标识 - 前3名彩色，4-8名灰色
3. 🔴 热度数值 - 动态显示策略
4. 🟢 排序规则 - 按近7天搜索次数降序

## 🎨 标注示例

### 示例 1：简单标注

```jsx
<PRDAnnotationWrapper
  annotations={[
    {
      title: "📋 需求说明",
      content: "这是一个简单的标注示例",
      position: "top-right",
      arrowDirection: "down",
      color: "blue",
    },
  ]}
>
  <div>内容区域</div>
</PRDAnnotationWrapper>
```

### 示例 2：多行内容标注

```jsx
<PRDAnnotationWrapper
  annotations={[
    {
      title: "📋 复杂规则",
      content: "第一行说明\n第二行说明\n第三行说明",
      position: "bottom-left",
      arrowDirection: "up",
      color: "red",
      offsetX: 20,
      offsetY: -20,
    },
  ]}
>
  <div>内容区域</div>
</PRDAnnotationWrapper>
```

### 示例 3：多个标注

```jsx
<PRDAnnotationWrapper
  annotations={[
    {
      title: "标注1",
      content: "第一个标注",
      position: "top-left",
      arrowDirection: "down",
      color: "blue",
    },
    {
      title: "标注2",
      content: "第二个标注",
      position: "top-right",
      arrowDirection: "down",
      color: "red",
    },
  ]}
>
  <div>内容区域</div>
</PRDAnnotationWrapper>
```

## 🔧 最佳实践

### 1. 标注命名规范

建议使用以下格式：

```
📋 PRD v{版本号} - {功能模块}
```

示例：

- `📋 PRD v2.1 - 排序规则`
- `📋 PRD v2.1 - 展示数量`

### 2. 内容编写建议

- ✅ 简洁明了，直接说明规则
- ✅ 使用换行符 `\n` 分隔不同要点
- ✅ 包含具体的数值和示例
- ❌ 避免过长的描述
- ❌ 避免重复 PRD 文档的全部内容

### 3. 颜色使用建议

- 🔴 **红色**：核心算法、重要变更
- 🔵 **蓝色**：基础配置、常规说明
- 🟠 **橙色**：UI 规范、交互逻辑
- 🟢 **绿色**：兜底策略、可选配置

### 4. 位置调整技巧

- 使用 `offsetX` 和 `offsetY` 微调标注位置
- 避免标注框遮挡重要内容
- 多个标注时注意间距，避免重叠

## 📝 注意事项

1. **性能考虑**：标注仅在 `?prd=true` 时显示，不影响正常访问性能
2. **移动端适配**：标注框宽度固定为 280px，适合移动端查看
3. **版本管理**：建议在标注标题中注明 PRD 版本号
4. **内容更新**：PRD 变更时记得同步更新标注内容

## 🚀 扩展功能

### 未来可以添加的功能

- [ ] 标注导出为 PDF
- [ ] 标注内容搜索
- [ ] 标注历史版本对比
- [ ] 标注权限控制（仅研发可见）
- [ ] 标注评论功能

## 📞 技术支持

如有问题或建议，请联系产品团队。
