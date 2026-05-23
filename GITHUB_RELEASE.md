# KidsLearn v0.1.0-beta.2

## 🎉 第二个测试版本发布

### 主要更新

#### ✨ 新功能
- **拼音学习交互优化** - 点击卡片直接播放读音，操作更简单
- **Error Boundary** - 添加错误边界，提升应用稳定性
- **Android 项目支持** - 完整的 Capacitor Android 集成

#### ⚡ 性能优化
- 使用时长追踪精度提升（10秒记录一次）
- 徽章检查性能优化
- 音频缓存智能管理

#### 🐛 Bug 修复
- 修复路由配置错误
- 删除 Windows nul 文件问题
- 优化响应式设计

### 📱 APK 构建说明

由于 APK 文件较大且需要本地构建环境，请按照以下步骤构建：

```powershell
# 1. 安装 JDK 21
winget install --id Oracle.JDK.21

# 2. 克隆项目
git clone https://github.com/hyx805123/kidslearn.git
cd kidslearn

# 3. 安装依赖并构建
npm install
npm run build
npx cap sync android

# 4. 构建 APK
cd android
.\gradlew.bat assembleDebug

# APK 位置
# android\app\build\outputs\apk\debug\app-debug.apk
```

详细构建指南请查看：[APK_BUILD_GUIDE.md](https://github.com/hyx805123/kidslearn/blob/master/APK_BUILD_GUIDE.md)

### 🌐 Web 版本

可以直接访问或部署 Web 版本：
- 开发：`npm run dev`
- 构建：`npm run build`
- 部署：`dist/` 目录可部署到任何静态服务器

### 📋 完整更新日志

查看 [RELEASE_NOTES.md](https://github.com/hyx805123/kidslearn/blob/master/RELEASE_NOTES.md) 获取完整的更新说明。

---

**发布日期**: 2026-05-23  
**Tag**: v0.1.0-beta.2  
**Commit**: 53f1bf7
