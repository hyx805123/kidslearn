# KidsLearn - Children's Comprehensive Learning Platform

> A fun and interactive learning app for children aged 5-12, covering Pinyin, Math, Chinese, and English.

[中文说明](#中文说明)

## Features

- **Pinyin Kingdom** - Learn initials, finals, tones, and spelling with drag-and-drop games
- **Math Paradise** - Addition, subtraction, multiplication, division with level progression and timed challenges
- **Chinese World** - Stroke order tracing animation, idiom stories, poetry reading
- **English Corner** - Alphabet learning, word building with drag-and-drop, dialog scenes
- **Daily Challenge** - Cross-subject quiz refreshed every day
- **Gamification** - XP system, levels, badges, streak tracking
- **Parent Mode** - PIN-protected settings, time limit control, sound management
- **Offline First** - All data stored locally via IndexedDB, no server required
- **Audio Effects** - Programmatically generated sound effects using Web Audio API
- **Responsive** - Desktop sidebar + mobile bottom navigation

## Tech Stack

- React 18 + TypeScript + Vite 5
- Zustand (state management)
- Dexie.js (IndexedDB)
- @dnd-kit/core (drag and drop)
- Framer Motion (animations)
- Howler.js (audio)
- canvas-confetti (celebrations)

## Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
```

## Android APK

The Android version is built using Capacitor. See the `android` branch for the full Android project.

Download the latest APK from [GitHub Releases](../../releases).

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── common/     # Button, Card, Modal, ProgressBar, etc.
│   └── layout/     # AppShell, TopBar, Sidebar, BottomNav
├── constants/      # Static data (pinyin, math levels, etc.)
├── db/             # Dexie IndexedDB configuration
├── hooks/          # Custom hooks (useSound, useTimer)
├── pages/          # Page components by subject
│   ├── pinyin/
│   ├── math/
│   ├── chinese/
│   └── english/
├── store/          # Zustand stores
├── types/          # TypeScript type definitions
└── utils/          # Utilities (audio, random, experience)
```

## License

MIT License

Copyright (c) 2024 yingxiang.he

Contact: 350168448@qq.com

---

<a name="中文说明"></a>
# 中文说明

# KidsLearn - 儿童综合学习平台

> 一款面向 5-12 岁儿童的趣味互动学习应用，涵盖拼音、数学、语文、英语四大学科。

## 功能特色

- **拼音王国** - 学习声母、韵母、声调，拖拽拼读游戏
- **数学乐园** - 加减乘除闯关、计时挑战、连对奖励
- **语文天地** - 汉字笔顺描红动画、成语故事、古诗朗读
- **英语角** - 字母学习、拖拽拼单词、情景对话
- **每日挑战** - 每天刷新的跨学科趣味题
- **成长体系** - 经验值、等级、徽章收集、连续打卡
- **家长模式** - PIN 码保护、每日时长控制、声音设置
- **离线优先** - IndexedDB 本地存储，无需联网
- **音效系统** - Web Audio API 程序化生成音效
- **响应式** - 桌面端侧边栏 + 移动端底部导航

## 技术栈

- React 18 + TypeScript + Vite 5
- Zustand（状态管理）
- Dexie.js（IndexedDB 数据库）
- @dnd-kit/core（拖拽交互）
- Framer Motion（动画）
- Howler.js（音频）
- canvas-confetti（庆祝特效）

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 安卓版本

安卓版本使用 Capacitor 封装，完整 Android 工程在 `android` 分支。

从 [GitHub Releases](../../releases) 下载最新 APK 安装包。

## 版权信息

MIT 许可证

Copyright (c) 2024 yingxiang.he

联系邮箱：350168448@qq.com
