# KidsLearn APK 构建和上传自动化脚本
# 使用前请确保：
# 1. 已安装 JDK 21
# 2. 已安装 Android SDK
# 3. 已安装 GitHub CLI (gh)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "KidsLearn APK 构建和上传脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查 JDK
Write-Host "检查 JDK..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1
    if ($javaVersion -match "21") {
        Write-Host "✓ JDK 21 已安装" -ForegroundColor Green
    } else {
        Write-Host "✗ 需要 JDK 21" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "✗ JDK 未安装" -ForegroundColor Red
    exit 1
}

# 检查 Android SDK
Write-Host "检查 Android SDK..." -ForegroundColor Yellow
if ($env:ANDROID_HOME -and (Test-Path "$env:ANDROID_HOME")) {
    Write-Host "✓ Android SDK 已配置: $env:ANDROID_HOME" -ForegroundColor Green
} else {
    Write-Host "✗ Android SDK 未配置" -ForegroundColor Red
    Write-Host "请设置 ANDROID_HOME 环境变量" -ForegroundColor Yellow
    exit 1
}

# 检查 GitHub CLI
Write-Host "检查 GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version 2>&1
    Write-Host "✓ GitHub CLI 已安装" -ForegroundColor Green
} catch {
    Write-Host "✗ GitHub CLI 未安装" -ForegroundColor Red
    Write-Host "请安装: winget install GitHub.cli" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "开始构建 APK..." -ForegroundColor Cyan

# 构建 Web 资源
Write-Host "`n1. 安装依赖..." -ForegroundColor Yellow
npm install

Write-Host "`n2. 构建 Web 资源..." -ForegroundColor Yellow
npm run build

Write-Host "`n3. 同步到 Android..." -ForegroundColor Yellow
npx cap sync android

# 构建 APK
Write-Host "`n4. 构建 Debug APK..." -ForegroundColor Yellow
Set-Location android
.\gradlew.bat assembleDebug

# 检查 APK 是否生成
$apkPath = "app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    Write-Host "`n✓ APK 构建成功: $apkPath" -ForegroundColor Green
    
    # 获取 APK 大小
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "  APK 大小: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Green
    
    Set-Location ..
    
    # 创建 GitHub Release
    Write-Host "`n5. 创建 GitHub Release..." -ForegroundColor Yellow
    $tagName = "v0.1.0-beta.2"
    $releaseName = "KidsLearn v0.1.0-beta.2"
    $releaseNotes = Get-Content "GITHUB_RELEASE.md" | Out-String
    
    try {
        # 检查 release 是否已存在
        $existingRelease = gh release view $tagName 2>&1
        if ($existingRelease) {
            Write-Host "Release 已存在，正在删除..." -ForegroundColor Yellow
            gh release delete $tagName --yes
        }
    } catch {}
    
    # 创建 Release 并上传 APK
    Write-Host "创建 Release 并上传 APK..." -ForegroundColor Yellow
    gh release create $tagName `
        --title $releaseName `
        --notes $releaseNotes `
        --draft `
        "$apkPath#KidsLearn-v0.1.0-beta.2.apk"
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "✓ 完成！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "APK 已上传到 GitHub Release" -ForegroundColor Cyan
    Write-Host "访问: https://github.com/hyx805123/kidslearn/releases/tag/$tagName" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "注意: Release 当前为草稿状态" -ForegroundColor Yellow
    Write-Host "请在 GitHub 上审核并发布" -ForegroundColor Yellow
    
} else {
    Set-Location ..
    Write-Host ""
    Write-Host "✗ APK 构建失败" -ForegroundColor Red
    Write-Host "请检查构建日志" -ForegroundColor Yellow
    exit 1
}
