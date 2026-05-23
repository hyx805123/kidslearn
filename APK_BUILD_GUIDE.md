# KidsLearn APK 构建指南

## 环境要求

构建 Android APK 需要以下环境：

1. **JDK 21** - Java Development Kit
2. **Android SDK 36** - Android Software Development Kit
3. **Gradle 8.12** - 构建工具（项目已包含 Gradle Wrapper）

## 安装 JDK 21

### Windows

1. 下载 JDK 21：
   - Oracle JDK: https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html
   - 或使用 OpenJDK: https://adoptium.net/

2. 安装后配置环境变量：
   ```powershell
   # 设置 JAVA_HOME
   [System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-21", "Machine")
   
   # 添加到 Path
   $path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
   [System.Environment]::SetEnvironmentVariable("Path", "$path;$JAVA_HOME\bin", "Machine")
   ```

3. 验证安装：
   ```powershell
   java -version
   # 应显示: java version "21.x.x"
   ```

## 安装 Android SDK

### 方法 1：使用 Android Studio（推荐）

1. 下载 Android Studio: https://developer.android.com/studio
2. 安装时选择 "Android SDK" 组件
3. 在 SDK Manager 中安装：
   - Android SDK Platform 36
   - Android SDK Build-Tools
   - Android SDK Command-line Tools

### 方法 2：使用命令行工具

1. 下载 Command Line Tools: https://developer.android.com/studio#command-line-tools-only
2. 解压并设置环境变量：
   ```powershell
   [System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Android\SDK", "Machine")
   $path = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
   [System.Environment]::SetEnvironmentVariable("Path", "$path;$ANDROID_HOME\cmdline-tools\bin;$ANDROID_HOME\platform-tools", "Machine")
   ```

3. 安装所需组件：
   ```powershell
   sdkmanager "platforms;android-36" "build-tools;36.0.0" "platform-tools"
   ```

## 构建 APK

### 1. 确保项目已同步

```powershell
# 安装依赖
npm install

# 构建 Web 资源
npm run build

# 同步到 Android
npx cap sync android
```

### 2. 构建 Debug APK（用于测试）

```powershell
cd android
.\gradlew assembleDebug
```

构建产物位于：`android\app\build\outputs\apk\debug\app-debug.apk`

### 3. 构建 Release APK（用于发布）

```powershell
cd android
.\gradlew assembleRelease
```

构建产物位于：`android\app\build\outputs\apk\release\app-release-unsigned.apk`

> 注意：Release APK 需要签名才能安装到设备上。

### 4. 构建已签名的 Release APK

1. 创建密钥库（首次构建）：
   ```powershell
   keytool -genkey -v -keystore kidslearn-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias kidslearn
   ```

2. 在 `android` 目录下创建 `keystore.properties`：
   ```properties
   storeFile=../kidslearn-release-key.jks
   storePassword=your_store_password
   keyAlias=kidslearn
   keyPassword=your_key_password
   ```

3. 构建已签名的 APK：
   ```powershell
   .\gradlew assembleRelease
   ```

## 常见问题

### Q: 构建时提示 "SDK not found"

确保设置了 `ANDROID_HOME` 环境变量，并且指向正确的 SDK 路径。

### Q: 构建时提示 "JDK version mismatch"

确保使用 JDK 21，其他版本可能导致构建失败。

### Q: Gradle 下载速度慢

项目已配置阿里云 Maven 镜像，如果仍然很慢，检查网络连接。

### Q: APK 安装失败

- Debug APK 可以直接安装
- Release APK 需要先签名
- 确保设备允许"未知来源"应用安装

## 测试 APK

### 使用模拟器

```powershell
# 启动 Android 模拟器
emulator -avd <emulator_name>

# 安装 APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 使用真机

1. 启用开发者模式和 USB 调试
2. 连接手机到电脑
3. 安装 APK：
   ```powershell
   adb install android/app/build/outputs/apk/debug/app-debug.apk
   ```

## 发布到 GitHub Releases

1. 访问: https://github.com/hyx805123/kidslearn/releases
2. 点击 "Draft a new release"
3. 选择 Tag: `v0.1.0-beta.2`
4. 上传 APK 文件
5. 发布 Release

## 当前版本

- **版本**: v0.1.0-beta.2
- **APK 大小**: 约 8MB
- **最低 Android 版本**: Android 7.0 (API 24)
- **目标 Android 版本**: Android 14 (API 36)
