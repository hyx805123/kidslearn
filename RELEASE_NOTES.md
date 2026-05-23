# KidsLearn v0.1.0-beta.2 发布说明

## 📦 发布信息

- **版本号**: v0.1.0-beta.2
- **发布日期**: 2026-05-23
- **GitHub Release**: https://github.com/hyx805123/kidslearn/releases/tag/v0.1.0-beta.2
- **分支**: master
- **Commit**: 53f1bf7

---

## ✨ 新功能与优化

### 🎯 拼音学习交互优化
- **点击即播放** - 点击拼音卡片时直接播放读音，无需额外点击播放按钮
- **简化操作流程** - 从 3 步减少到 1 步，特别适合儿童用户
- **适用模块** - 声母学习、韵母学习

### ⚡ 性能优化
- **使用时长追踪** - 从 30 秒改为 10 秒记录一次，提高统计精度
- **徽章检查优化** - 添加已获徽章检查，避免重复调用 earnBadge()
- **音频缓存管理** - 添加内存监控，限制最大 100MB，智能缓存淘汰

### 🛡️ 稳定性提升
- **Error Boundary** - 添加 React 错误边界，提供友好的错误页面
- **ESLint 配置** - 统一代码规范，提升代码质量
- **路由修复** - 修复 4 个未实现页面路由复用问题

### 📱 Android 支持
- **Capacitor 集成** - 添加完整的 Android 项目支持
- **构建配置** - 配置阿里云 Maven 镜像，优化国内构建速度
- **详细文档** - 提供完整的 APK 构建指南

---

## 🐛 Bug 修复

| 问题 | 描述 | 解决方案 |
|------|------|----------|
| nul 文件 | Windows 保留设备名导致 Git 失败 | 删除文件并防止重新生成 |
| 路由配置 | 4 个路由复用错误组件 | 注释未实现路由，添加 TODO |
| 数据库初始化 | Version 3 错题本表缺少说明 | 完善初始化注释 |
| 响应式设计 | 家长页面固定宽度不适配 | 添加 width: 100% 和 padding |

---

## 📝 文档更新

- ✅ 统一版本号为 v0.1.0-beta
- ✅ 更新技术栈版本要求（Node.js 18+, npm 9+）
- ✅ 添加 Windows PowerShell 配置说明
- ✅ 明确标注离线功能范围（TTS 需要网络）
- ✅ 添加详细的中英文更新日志
- ✅ 创建 APK 构建指南文档

---

## 🔧 技术栈版本

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.6.3 | 类型安全 |
| Vite | 5.4.10 | 构建工具 |
| Zustand | 5.0.0 | 状态管理 |
| Dexie | 4.0.9 | IndexedDB |
| Capacitor | 8.3.3 | 移动端封装 |
| Framer Motion | 11.11.0 | 动画库 |

---

## 📱 APK 构建说明

### 环境要求

1. **JDK 21** - [下载](https://adoptium.net/)
2. **Android SDK 36** - 通过 Android Studio 或命令行安装
3. **Gradle 8.12** - 项目已包含 Wrapper

### 快速构建

```powershell
# 1. 安装依赖
npm install

# 2. 构建 Web 资源
npm run build

# 3. 同步到 Android
npx cap sync android

# 4. 构建 Debug APK
cd android
.\gradlew assembleDebug
```

### APK 位置

```
android\app\build\outputs\apk\debug\app-debug.apk
```

### 详细指南

查看 [APK_BUILD_GUIDE.md](./APK_BUILD_GUIDE.md) 获取完整构建说明。

---

## 🌐 访问方式

### Web 版本

- **开发服务器**: `npm run dev` → http://localhost:5173
- **生产构建**: `npm run build` → `dist/` 目录
- **预览构建**: `npm run preview`

### 部署选项

- GitHub Pages
- Vercel
- Netlify
- Nginx / Apache
- 任何静态文件服务器

---

## 📊 代码统计

- **总文件数**: 115 个文件变更
- **新增代码**: 170+ 行（文档）
- **优化代码**: 多个核心文件改进
- **构建大小**: 441.45 KB（gzip: 142.76 KB）

---

## ⚠️ 已知问题

1. **外部音频依赖** - TTS 发音功能依赖有道词典 API，需要网络连接
   - 影响：离线环境下无法使用发音功能
   - 计划：未来版本考虑添加离线语音方案

2. **未实现功能** - 以下模块路由已预留但页面未实现：
   - 声调学习 (`/pinyin/tones`)
   - 乘除法 (`/math/muldiv`)
   - 语文测验 (`/chinese/quiz`)
   - 英语语音 (`/english/phonics`)

---

## 🚀 下一步计划

- [ ] 实现声调学习页面
- [ ] 实现乘除法游戏
- [ ] 添加错题本功能 UI
- [ ] 实现离线 TTS 方案（Web Speech API）
- [ ] 添加数据导出/备份功能
- [ ] 完善单元测试

---

## 📮 反馈与贡献

- **GitHub Issues**: https://github.com/hyx805123/kidslearn/issues
- **邮箱**: 350168448@qq.com
- **许可证**: MIT

---

## 🙏 致谢

感谢所有为 KidsLearn 项目做出贡献的开发者和用户！

**KidsLearn Team**  
2026-05-23
