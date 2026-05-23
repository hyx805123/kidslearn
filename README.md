<div align="center">

# KidsLearn - 儿童综合学习平台

<img src="https://img.shields.io/badge/版本-v0.1.0--beta-blue" alt="version"/>
<img src="https://img.shields.io/badge/平台-Web%20%7C%20Android-green" alt="platform"/>
<img src="https://img.shields.io/badge/适龄-5--12岁-orange" alt="age"/>
<img src="https://img.shields.io/badge/许可证-MIT-lightgrey" alt="license"/>

**一款面向 5-12 岁儿童的趣味互动学习应用，涵盖拼音、数学、语文、英语四大学科。**

**纯前端离线应用，无需服务器，保护儿童隐私。**

[**中文**](#中文文档) | [**English**](#english-documentation)

---

</div>

<a name="中文文档"></a>

## 目录

- [项目简介](#项目简介)
- [功能特色](#功能特色)
- [应用截图](#应用截图)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [安卓 APK 安装](#安卓-apk-安装)
- [项目结构](#项目结构)
- [开发指南](#开发指南)
- [常见问题](#常见问题)
- [版权与联系](#版权与联系)

---

## 项目简介

**KidsLearn 儿童综合学习平台** 是一款专为中国学龄儿童 (5-12 岁) 设计的互动学习应用。通过游戏化的方式，让孩子在轻松愉快的氛围中学习拼音、数学、语文和英语基础知识。

### 设计理念

- **寓教于乐** — 所有学习内容以小游戏、拖拽互动、动画演示等形式呈现
- **循序渐进** — 难度分级递进，从简单到复杂逐步引导
- **即时反馈** — 正确/错误立即给出音效和视觉反馈，强化学习效果
- **自主学习** — 儿童可独立操作，无需家长全程陪同
- **隐私保护** — 纯前端应用，所有数据存储在本地设备，不上传任何信息

---

## 功能特色

### 拼音王国

| 模块 | 说明 |
|------|------|
| 声母学习 | 23 个声母的发音、笔顺、组词示例 |
| 韵母学习 | 24 个韵母（单韵母 + 复韵母 + 鼻韵母）|
| 拼读游戏 | 拖拽声母与韵母进行拼读组合 |
| 拼音测验 | 听音选字、看字选音多种题型 |

### 数学乐园

| 模块 | 说明 |
|------|------|
| 加减法闯关 | 5 个难度等级，从 10 以内到 1000 以内 |
| 乘法表 | 九九乘法口诀专项训练 |
| 限时挑战 | 60 秒内答对尽可能多的题目 |
| 连对奖励 | 连续答对获得额外经验值加成 |

### 语文天地

| 模块 | 说明 |
|------|------|
| 汉字笔顺 | Canvas 描红动画演示，田字格中逐笔书写 |
| 成语故事 | 精选常用成语，配有故事讲解和释义 |
| 古诗朗读 | 经典古诗词展示，注音辅助阅读 |

### 英语启蒙

| 模块 | 说明 |
|------|------|
| 字母学习 | 26 个英文字母大小写、发音 |
| 单词拼写 | 拖拽字母拼组单词，支持覆盖替换 |
| 情景对话 | 日常场景对话练习 |

### 成长体系

- **经验值 & 等级** — 每次答题获得 XP，积累升级
- **徽章收集** — 达成特定成就解锁徽章（如"数学小达人"、"连续7天打卡"等）
- **每日挑战** — 每天刷新的跨学科综合题，完成获得额外奖励
- **连续打卡** — 记录连续学习天数，培养学习习惯

### 家长管控

- **PIN 码保护** — 家长设置区域需输入密码进入
- **每日时长限制** — 设置每天最多学习时间，防止沉迷
- **声音开关** — 控制音效和背景声音
- **学习数据** — 查看孩子的学习进度和成绩统计

---

## 应用截图

> 应用采用响应式设计：桌面端显示左侧导航栏，移动端显示底部标签栏。

```
┌──────────────────────────────────┐
│  🏠 首页    展示各学科入口卡片    │
│  📐 数学    加减法闯关界面        │
│  🀄 语文    汉字描红田字格动画    │
│  🔤 英语    拖拽字母拼单词        │
│  🏆 挑战    每日跨学科综合题      │
│  👤 我的    等级/徽章/成就展示    │
└──────────────────────────────────┘
```

---

## 技术架构

### 核心技术栈

| 技术 | 用途 | 版本 |
|------|------|------|
| React | UI 框架 | 18.x |
| TypeScript | 类型安全 | 5.x |
| Vite | 构建工具 | 5.x |
| Zustand | 状态管理 | 5.x |
| Dexie.js | IndexedDB 封装 | 4.x |
| @dnd-kit/core | 拖拽交互 | 6.x |
| Framer Motion | 动画效果 | 10.x |
| Howler.js | 音频播放 | 2.x |
| canvas-confetti | 庆祝特效 | 1.x |
| Capacitor | 安卓封装 | 8.x |

### 架构特点

- **纯前端 SPA** — 无后端依赖，可部署到任何静态托管服务
### 离线说明

- **基础功能完全离线可用** — 所有学习内容、音效、动画内置
- **发音功能需要网络** — TTS 语音合成依赖有道词典 API（可选）
- **数据本地存储** — IndexedDB 存储用户数据、学习进度、设置偏好
- **Web Audio API** — 程序化生成音效（正确/错误/升级等），无需音频文件
- **Canvas 绘图** — 汉字描红使用 Canvas 实现田字格和笔画动画
- **响应式设计** — 自适应桌面端 (侧边栏) 和移动端 (底部导航)
- **组件化** — 通用组件 (Button, Card, Modal, ProgressBar) 可复用

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0

### Windows 用户注意

如果使用 PowerShell 运行 npm 命令时遇到执行策略错误，请运行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 安装与运行

```bash
# 1. 克隆项目
git clone https://github.com/hyx805123/kidslearn.git
cd kidslearn

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 浏览器打开 http://localhost:5173

# 4. 生产构建
npm run build

# 5. 预览生产构建
npm run preview
```

### 构建输出

生产构建后，`dist/` 目录包含完整的静态文件，可直接部署到：
- GitHub Pages
- Vercel / Netlify
- Nginx / Apache
- 任何静态文件服务器

---

## 安卓 APK 安装

### 下载安装

1. 前往 [GitHub Releases](https://github.com/hyx805123/kidslearn/releases) 页面
2. 下载最新的 `KidsLearn-v*.apk` 文件
3. 在手机上打开 APK 文件进行安装
4. 首次安装可能需要允许"未知来源"应用

### 兼容性

- **系统要求**: Android 7.0 (API 24) 及以上
- **测试设备**: 小米、OPPO、一加等国产安卓手机
- **APK 大小**: 约 5MB

### 自行构建 APK

如需自行构建安卓版本，请切换到 `android` 分支：

```bash
# 切换到 android 分支
git checkout android

# 安装依赖并构建 Web 资源
npm install && npm run build

# 同步到安卓项目
npx cap sync android

# 构建 APK（需要 JDK 21 + Android SDK）
cd android && ./gradlew assembleDebug
```

构建产物位于: `android/app/build/outputs/apk/debug/app-debug.apk`

> 注意: Android 构建需要 JDK 21、Android SDK 36、Gradle 8.12。  
> 已配置阿里云 Maven 镜像和腾讯 Gradle 分发镜像，国内网络可正常构建。

---

## 项目结构

```
kidslearn/
├── index.html              # 入口 HTML
├── package.json            # 项目配置与依赖
├── vite.config.ts          # Vite 构建配置
├── tsconfig.json           # TypeScript 配置
├── capacitor.config.ts     # Capacitor 安卓封装配置
│
├── src/
│   ├── main.tsx            # 应用入口
│   ├── App.tsx             # 根组件 & 路由
│   │
│   ├── components/         # 通用 UI 组件
│   │   ├── common/         # Button, Card, Modal, ProgressBar, Toast, Confetti
│   │   └── layout/         # AppShell, TopBar, Sidebar, BottomNav
│   │
│   ├── pages/              # 页面组件（按学科分组）
│   │   ├── HomePage.tsx            # 首页（学科入口）
│   │   ├── DailyChallengePage.tsx  # 每日挑战
│   │   ├── ProfilePage.tsx         # 个人中心（等级/徽章）
│   │   ├── ParentPage.tsx          # 家长设置
│   │   ├── pinyin/                 # 拼音模块
│   │   │   ├── PinyinHome.tsx      # 拼音首页
│   │   │   ├── InitialLearn.tsx    # 声母学习
│   │   │   ├── FinalLearn.tsx      # 韵母学习
│   │   │   ├── SpellingGame.tsx    # 拼读游戏
│   │   │   └── PinyinQuiz.tsx      # 拼音测验
│   │   ├── math/                   # 数学模块
│   │   │   ├── MathHome.tsx        # 数学首页
│   │   │   ├── AddSubGame.tsx      # 加减法闯关
│   │   │   └── TimedChallenge.tsx  # 限时挑战
│   │   ├── chinese/                # 语文模块
│   │   │   ├── ChineseHome.tsx     # 语文首页
│   │   │   ├── StrokeOrder.tsx     # 汉字笔顺描红
│   │   │   ├── IdiomStory.tsx      # 成语故事
│   │   │   └── PoetryRead.tsx      # 古诗朗读
│   │   └── english/                # 英语模块
│   │       ├── EnglishHome.tsx     # 英语首页
│   │       ├── AlphabetLearn.tsx   # 字母学习
│   │       ├── WordBuilder.tsx     # 单词拼写
│   │       └── DialogScene.tsx     # 情景对话
│   │
│   ├── constants/          # 静态数据
│   │   ├── pinyin-data.ts  # 拼音声母韵母数据
│   │   ├── chinese-data.ts # 汉字笔画、成语、古诗数据
│   │   ├── english-data.ts # 英文单词、对话数据
│   │   ├── math-levels.ts  # 数学难度等级配置
│   │   └── badges.ts       # 徽章定义
│   │
│   ├── store/              # Zustand 状态管理
│   │   ├── useUserStore.ts     # 用户数据（XP/等级/徽章/打卡）
│   │   └── useSettingsStore.ts # 设置（音量/时长限制/PIN）
│   │
│   ├── hooks/              # 自定义 Hooks
│   │   ├── useSound.ts     # 音效播放
│   │   └── useTimer.ts     # 倒计时器
│   │
│   ├── utils/              # 工具函数
│   │   ├── audio.ts        # Web Audio API 音效生成
│   │   ├── random.ts       # 随机数/洗牌算法
│   │   └── experience.ts   # 经验值计算
│   │
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts
│   │
│   ├── styles/             # 全局样式
│   │   ├── global.css      # 全局 CSS
│   │   ├── animations.css  # 动画关键帧
│   │   └── theme.ts        # 主题色彩定义
│   │
│   └── db/                 # 数据库
│       └── index.ts        # Dexie IndexedDB 配置
│
└── android/                # 安卓项目（android 分支）
    ├── app/                # 应用模块
    ├── build.gradle        # 根构建脚本（阿里云镜像）
    ├── gradle/             # Gradle Wrapper
    └── variables.gradle    # SDK 版本配置
```

---

## 开发指南

### 添加新学科模块

1. 在 `src/pages/` 下创建新的学科目录
2. 创建 `XxxHome.tsx` 作为学科首页
3. 在 `src/App.tsx` 中注册路由
4. 在 `src/components/layout/` 中添加导航项
5. 在 `src/constants/` 中添加对应的静态数据

### 添加新徽章

在 `src/constants/badges.ts` 中添加新的徽章定义：

```typescript
{
  id: 'badge_id',
  name: '徽章名称',
  description: '解锁条件描述',
  icon: '🎯',  // emoji 图标
  condition: (user) => user.totalCorrect >= 100
}
```

### 数学难度配置

在 `src/constants/math-levels.ts` 中调整难度参数：

```typescript
{
  level: 1,
  name: '入门',
  minNum: 1,
  maxNum: 10,
  operators: ['+', '-']
}
```

---

## 常见问题

<details>
<summary><b>Q: 安装 APK 时提示"未知来源"怎么办？</b></summary>

前往手机 **设置 > 安全 > 安装未知应用**，允许浏览器或文件管理器安装应用即可。

</details>

<details>
<summary><b>Q: 数据会丢失吗？</b></summary>

所有学习数据存储在设备本地的 IndexedDB 中。清除浏览器缓存或卸载 APP 会导致数据丢失。建议定期使用同一设备学习。

</details>

<details>
<summary><b>Q: 可以在 iPad / 平板上使用吗？</b></summary>

Web 版本支持任何现代浏览器，包括 iPad Safari、Android 平板 Chrome。响应式布局会自动适配屏幕尺寸。

</details>

<details>
<summary><b>Q: 如何重置家长 PIN 码？</b></summary>

清除浏览器本地数据 (IndexedDB) 即可重置所有设置。APK 版本需要清除应用数据。

</details>

<details>
<summary><b>Q: 需要联网使用吗？</b></summary>

不需要。这是一个纯前端离线应用，首次加载后即可完全离线使用。所有学习内容和音效都内置在应用中。

</details>

---

## 更新日志

### v0.1.0-beta (2026-05-23)

#### 功能优化
- **拼音学习交互优化** - 点击拼音卡片时直接播放读音，无需额外点击播放按钮，提升学习体验
- **使用时长追踪精度提升** - 从 30 秒改为 10 秒记录一次，提高统计准确性
- **徽章检查性能优化** - 添加已获徽章检查，避免重复调用，提升性能
- **音频缓存管理** - 添加内存监控和智能缓存淘汰策略，限制最大 100MB 占用

#### Bug 修复
- **路由配置错误** - 修复 4 个未实现页面路由复用问题，添加 TODO 标记
- **nul 文件问题** - 删除 Windows 保留设备名文件，解决 Git 跟踪问题
- **数据库初始化** - 完善 Version 3 错题本表初始化说明
- **响应式设计** - 修复家长页面固定宽度问题，优化小屏幕适配

#### 新增功能
- **Error Boundary** - 添加 React 错误边界组件，提供友好错误页面和刷新功能
- **ESLint 配置** - 添加代码质量检查配置，统一代码规范

#### 文档更新
- **版本号统一** - package.json 和 README 版本统一为 v0.1.0-beta
- **技术栈版本** - 更新 Node.js 18+、npm 9+、Zustand 5.x、Dexie 4.x、Capacitor 8.x
- **Windows 配置** - 添加 PowerShell 执行策略配置说明
- **离线说明** - 明确标注基础功能离线可用，TTS 发音需要网络

---

## 版权与联系

```
MIT License

Copyright (c) 2024 yingxiang.he
Contact: 350168448@qq.com
```

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT) 开源，欢迎学习和使用。

如有问题或建议，请通过以下方式联系：

- **邮箱**: 350168448@qq.com
- **GitHub Issues**: [提交问题](https://github.com/hyx805123/kidslearn/issues)

---

---

<a name="english-documentation"></a>

<div align="center">

# KidsLearn - Children's Comprehensive Learning Platform

**[中文](#中文文档)** | **English**

An interactive learning app for children aged 5-12, covering Pinyin, Math, Chinese, and English.

Fully offline, privacy-first — no server, no data collection.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Android APK](#android-apk)
- [Project Structure](#project-structure-1)
- [Development](#development)
- [FAQ](#faq)
- [License & Contact](#license--contact)

---

## Overview

**KidsLearn** is a gamified educational app designed for Chinese school-age children (5-12 years). It uses interactive games, drag-and-drop mechanics, and animations to make learning fun and engaging across four subjects: Pinyin, Math, Chinese, and English.

### Design Principles

- **Learn through Play** — All content delivered via mini-games and interactive animations
- **Progressive Difficulty** — Gradual skill building from basic to advanced
- **Instant Feedback** — Audio and visual cues for correct/incorrect answers
- **Independent Learning** — Children can use it without adult supervision
- **Privacy First** — All data stored locally on device, zero network requests

---

## Features

### Pinyin Kingdom
- Learn 23 initials and 24 finals with pronunciation
- Drag-and-drop spelling combinations
- Multiple quiz formats (listen & choose, read & match)

### Math Paradise
- Addition & subtraction with 5 difficulty levels (up to 1000)
- Multiplication table drills
- 60-second timed challenges with combo bonuses

### Chinese World
- **Stroke order animation** — Canvas-based 描红 (tracing) with 田字格 grid
- Idiom stories with explanations
- Classical poetry reading with Pinyin annotations

### English Corner
- Alphabet learning (upper & lowercase)
- Word building with drag-and-drop letter tiles
- Daily conversation scene practice

### Gamification System
- XP & level progression
- Badge collection (20+ achievements)
- Daily cross-subject challenges
- Streak tracking for habit building

### Parent Controls
- PIN-protected settings area
- Daily time limit configuration
- Sound on/off toggle
- Learning progress overview

---

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI framework | 18.x |
| TypeScript | Type safety | 5.x |
| Vite | Build tool | 5.x |
| Zustand | State management | 4.x |
| Dexie.js | IndexedDB wrapper | 3.x |
| @dnd-kit/core | Drag and drop | 6.x |
| Framer Motion | Animations | 10.x |
| Howler.js | Audio playback | 2.x |
| canvas-confetti | Celebration effects | 1.x |
| Capacitor | Android packaging | 7.x |

---

## Getting Started

### Prerequisites

- Node.js >= 18.0
- npm >= 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/hyx805123/kidslearn.git
cd kidslearn

# Install dependencies
npm install

# Start development server
npm run dev
# Open http://localhost:5173 in your browser

# Production build
npm run build
```

---

## Android APK

### Download

1. Go to [GitHub Releases](https://github.com/hyx805123/kidslearn/releases)
2. Download the latest `KidsLearn-v*.apk`
3. Install on your Android device (allow "Unknown sources" if prompted)

### Compatibility

- **Minimum**: Android 7.0 (API 24)
- **Tested on**: Xiaomi, OPPO, OnePlus devices
- **APK Size**: ~8MB

### Build from Source

```bash
git checkout android
npm install && npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

> Requires JDK 21 + Android SDK 36 + Gradle 8.12.  
> Chinese Maven mirrors (Aliyun) pre-configured.

### 构建产物

Web 版本构建后，`dist/` 目录包含完整的静态文件，可直接部署到：
- GitHub Pages
- Vercel / Netlify
- Nginx / Apache
- 任何静态文件服务器

---

## Project Structure

```
src/
├── components/         # Reusable UI (Button, Card, Modal, etc.)
├── pages/              # Page components grouped by subject
│   ├── pinyin/         # Pinyin learning modules
│   ├── math/           # Math game modules
│   ├── chinese/        # Chinese learning modules
│   └── english/        # English learning modules
├── constants/          # Static data (pinyin, words, levels, badges)
├── store/              # Zustand state stores
├── hooks/              # Custom hooks (useSound, useTimer)
├── utils/              # Utilities (audio generation, randomization)
├── types/              # TypeScript definitions
├── styles/             # Global CSS & theme
└── db/                 # Dexie IndexedDB config
```

---

## Development

### Adding a New Subject Module

1. Create a directory under `src/pages/`
2. Add a home page component (`XxxHome.tsx`)
3. Register routes in `src/App.tsx`
4. Add navigation items in layout components
5. Define static data in `src/constants/`

### Adding Badges

Add entries to `src/constants/badges.ts`:

```typescript
{
  id: 'badge_id',
  name: 'Badge Name',
  description: 'How to unlock',
  icon: '🎯',
  condition: (user) => user.totalCorrect >= 100
}
```

---

## Changelog

### v0.1.0-beta (2026-05-23)

#### Feature Improvements
- **Pinyin Learning UX** - Click pinyin cards to play audio directly, no extra button click needed
- **Usage Tracking Precision** - Improved from 30s to 10s intervals for better accuracy
- **Badge Check Optimization** - Added duplicate check to avoid redundant earnBadge calls
- **Audio Cache Management** - Added memory monitoring and smart eviction, capped at 100MB

#### Bug Fixes
- **Route Configuration** - Fixed 4 routes reusing wrong components, added TODO markers
- **nul File Issue** - Removed Windows reserved device name file, fixed Git tracking
- **Database Init** - Completed Version 3 wrong answers table initialization docs
- **Responsive Design** - Fixed ParentPage fixed width issue for better mobile support

#### New Features
- **Error Boundary** - Added React error boundary with friendly error page and refresh button
- **ESLint Config** - Added code quality checking configuration

#### Documentation
- **Version Alignment** - Unified package.json and README to v0.1.0-beta
- **Tech Stack Versions** - Updated to Node.js 18+, npm 9+, Zustand 5.x, Dexie 4.x, Capacitor 8.x
- **Windows Setup** - Added PowerShell execution policy configuration guide
- **Offline Notice** - Clarified basic features work offline, TTS requires network

---

## FAQ

<details>
<summary><b>Q: Does it require internet access?</b></summary>

No. This is a fully offline application. After the initial load, it works completely without network connectivity.

</details>

<details>
<summary><b>Q: Will my data be lost?</b></summary>

Data is stored in the browser's IndexedDB. Clearing browser data or uninstalling the app will reset all progress.

</details>

<details>
<summary><b>Q: Can I use it on a tablet?</b></summary>

Yes. The responsive layout adapts to any screen size, including iPads and Android tablets.

</details>

---

## License & Contact

```
MIT License
Copyright (c) 2024 yingxiang.he
Contact: 350168448@qq.com
```

Licensed under the [MIT License](https://opensource.org/licenses/MIT).

- **Email**: 350168448@qq.com
- **Issues**: [GitHub Issues](https://github.com/hyx805123/kidslearn/issues)
