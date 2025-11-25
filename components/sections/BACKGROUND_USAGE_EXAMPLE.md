# SectionBackground 响应式 backgroundPosition 使用指南

## 功能说明

现在 `SectionBackground` 和 `ReversedSectionBackground` 都支持为 PC 端和移动端设置不同的背景位置。

## 使用方法

### 基本用法

#### 方式1：使用默认值（center）
```tsx
<SectionBackground
  glowSize={{ width: '800px', height: '400px' }}
  glowOpacity="/8"
/>
```
- PC端和移动端都使用 `center`

#### 方式2：PC端 center，移动端 top
```tsx
<SectionBackground
  glowSize={{ width: '800px', height: '400px' }}
  glowOpacity="/8"
  backgroundPositionDesktop="center"
  backgroundPositionMobile="top"
/>
```

#### 方式3：自定义具体位置
```tsx
<SectionBackground
  glowSize={{ width: '800px', height: '400px' }}
  glowOpacity="/8"
  backgroundPositionDesktop="center center"
  backgroundPositionMobile="center top"
/>
```

### ReversedSectionBackground 用法相同

```tsx
<ReversedSectionBackground
  glowSize={{ width: '800px', height: '400px' }}
  glowOpacity="/8"
  backgroundPositionDesktop="center"
  backgroundPositionMobile="top"
/>
```

## Props 说明

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `backgroundPositionDesktop` | `string` | `'center'` | PC端背景位置 (≥1024px) |
| `backgroundPositionMobile` | `string` | `'center'` | 移动端背景位置 (<1024px) |

## 常用值

- `'top'` - 顶部对齐
- `'center'` - 居中对齐
- `'bottom'` - 底部对齐
- `'left'` - 左对齐
- `'right'` - 右对齐
- `'center top'` - 水平居中，垂直顶部
- `'center bottom'` - 水平居中，垂直底部
- `'50% 25%'` - 自定义百分比位置

## 实现原理

组件内部使用两个 div 元素：
- 一个带 `hidden lg:block` 类（PC端显示）
- 一个带 `lg:hidden` 类（移动端显示）

断点为 1024px (Tailwind 的 `lg` 断点)

## 完整示例

```tsx
// RoadmapSection.tsx
<section id="roadmap" className="w-full relative overflow-hidden">
  <SectionBackground
    glowSize={{ width: '800px', height: '400px' }}
    glowOpacity="/8"
    backgroundPositionDesktop="center"
    backgroundPositionMobile="top"
  />

  {/* 你的内容 */}

  <ReversedSectionBackground
    glowSize={{ width: '800px', height: '400px' }}
    glowOpacity="/8"
    backgroundPositionDesktop="center"
    backgroundPositionMobile="top"
  />
</section>
```

## 注意事项

1. ✅ PC 端和移动端会渲染两个不同的背景 div
2. ✅ 不会影响性能，因为只有一个 div 在特定屏幕尺寸下可见
3. ✅ 默认值为 `'center'`，向后兼容现有代码
4. ✅ 支持所有标准的 CSS `background-position` 值
