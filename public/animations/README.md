# 🎨 Lottie 动画文件说明

## 📁 此目录用途

存放 Lottie JSON 动画文件，用于网站的加载动画、图标动画等。

---

## 📦 已包含的文件

### `test-animation.json`
一个简单的测试动画（橙色圆圈旋转）
- 用于测试 Lottie 组件是否正常工作
- 文件很小（约 2KB）

---

## 🚀 如何使用

### 方法 1：使用测试动画
```tsx
import { PhoenixLottieAnimation } from '@/components/animations';

<PhoenixLottieAnimation 
  lottieUrl="/animations/test-animation.json"
  onComplete={() => console.log('Done!')}
/>
```

### 方法 2：使用你自己的动画
1. 将你的 Lottie JSON 文件放到这个目录
2. 重命名为 `phoenix-logo.json`
3. 使用组件：
```tsx
<PhoenixLottieAnimation 
  lottieUrl="/animations/phoenix-logo.json"
  onComplete={() => setShowAnimation(false)}
/>
```

---

## 🎯 获取 Lottie 动画的方法

### 方法 1：从 LottieFiles 下载（最简单）⭐⭐⭐⭐⭐
1. 访问：https://lottiefiles.com/
2. 搜索你需要的动画（如 "phoenix", "logo", "fire"）
3. 点击下载 JSON 文件
4. 放到这个目录

**推荐动画示例：**
- https://lottiefiles.com/search?q=phoenix - 凤凰相关
- https://lottiefiles.com/search?q=fire - 火焰效果
- https://lottiefiles.com/search?q=logo%20reveal - Logo 展示

### 方法 2：使用 After Effects 制作
参考：`MOV_TO_LOTTIE_GUIDE.md`

### 方法 3：使用在线工具
- **SVGator**: https://www.svgator.com/
- **Rive**: https://rive.app/

---

## 📊 文件大小参考

| 动画类型 | 文件大小 | 示例 |
|----------|----------|------|
| 简单图标 | 5-20 KB | 旋转、淡入淡出 |
| Logo 动画 | 20-100 KB | 组装、变形 |
| 复杂场景 | 100-500 KB | 多元素、长动画 |
| 超大动画 | >500 KB | ⚠️ 需要优化 |

**优化建议：**
- 文件 > 100KB → 使用 https://lottiefiles.com/tools/optimize
- 文件 > 500KB → 考虑简化或使用视频方案

---

## 🎨 Lottie 动画推荐

### 加载动画
```
https://lottiefiles.com/animations/loading-spinner-RzFZvGIHBQ
https://lottiefiles.com/animations/circle-loader-jIDj1ZvJPB
```

### Logo 展示
```
https://lottiefiles.com/animations/logo-reveal-xqZTQPyDbS
https://lottiefiles.com/animations/phoenix-rise-animation
```

### 火焰特效
```
https://lottiefiles.com/animations/fire-flame-q9jrZwBpPk
https://lottiefiles.com/animations/burning-fire-animation
```

---

## 🐛 常见问题

### Q: 动画不显示？
**A:** 检查：
1. JSON 文件路径是否正确
2. 文件是否有效（在 https://lottiefiles.com/preview 预览）
3. 浏览器控制台是否有错误

### Q: 动画太大了？
**A:** 优化方法：
1. 使用 https://lottiefiles.com/tools/optimize
2. 或运行：`npm install -g lottie-optimizer`
3. 然后：`lottie-optimizer input.json output.json`

### Q: 动画播放不流畅？
**A:** 
1. 检查 JSON 文件大小
2. 简化动画（减少关键帧）
3. 考虑使用视频方案

---

## 📝 测试你的动画

### 在线预览
访问：https://lottiefiles.com/preview
上传你的 JSON 文件查看效果

### 本地测试
启动项目：`npm run dev`
访问：http://localhost:3001/animation-demo

---

## 🎉 快速开始

```bash
# 1. 下载一个测试动画
# 访问 https://lottiefiles.com/
# 下载任意动画的 JSON 文件

# 2. 放到这个目录
# 重命名为 phoenix-logo.json

# 3. 测试
npm run dev
# 访问 http://localhost:3001/video-demo
```

---

## 📚 更多资源

- **Lottie 官方文档**: https://airbnb.io/lottie/
- **LottieFiles 社区**: https://lottiefiles.com/
- **制作教程**: 查看 `MOV_TO_LOTTIE_GUIDE.md`
