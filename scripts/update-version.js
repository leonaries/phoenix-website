#!/usr/bin/env node

/**
 * 资源版本更新脚本
 * 用于更新资源文件的版本号，触发浏览器缓存更新
 *
 * 使用方式：
 *   pnpm version:patch  - 增加补丁版本号（1.0.0 -> 1.0.1）
 *   pnpm version:minor  - 增加次版本号（1.0.1 -> 1.1.0）
 *   pnpm version:major  - 增加主版本号（1.1.0 -> 2.0.0）
 *
 * 该脚本会同时更新：
 * 1. utils/assetVersion.ts - 资源版本号
 * 2. public/sw.js - Service Worker 缓存版本号
 */

const fs = require('fs');
const path = require('path');

// 文件路径
const ASSET_VERSION_PATH = path.join(__dirname, '../utils/assetVersion.ts');
const SW_PATH = path.join(__dirname, '../public/sw.js');

// 获取命令行参数
const versionType = process.argv[2] || 'patch'; // 默认增加补丁版本

// 验证版本类型
if (!['major', 'minor', 'patch'].includes(versionType)) {
  console.error('❌ Invalid version type. Use: major, minor, or patch');
  process.exit(1);
}

/**
 * 解析版本号字符串
 */
function parseVersion(versionString) {
  const match = versionString.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match) {
    throw new Error(`Invalid version format: ${versionString}`);
  }
  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
  };
}

/**
 * 增加版本号
 */
function incrementVersion(version, type) {
  const { major, minor, patch } = version;

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return `${major}.${minor}.${patch}`;
  }
}

/**
 * 更新 assetVersion.ts 文件中的版本号
 */
function updateAssetVersion(newVersion) {
  try {
    let content = fs.readFileSync(ASSET_VERSION_PATH, 'utf8');

    // 替换版本号
    content = content.replace(
      /export const ASSET_VERSION = ['"][\d.]+['"]/,
      `export const ASSET_VERSION = '${newVersion}'`
    );

    fs.writeFileSync(ASSET_VERSION_PATH, content, 'utf8');
    console.log(`✅ Updated ${path.relative(process.cwd(), ASSET_VERSION_PATH)}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update assetVersion.ts:`, error.message);
    return false;
  }
}

/**
 * 更新 sw.js 文件中的缓存版本号
 */
function updateServiceWorkerVersion(newVersion) {
  try {
    let content = fs.readFileSync(SW_PATH, 'utf8');

    // 替换缓存版本号
    content = content.replace(
      /const CACHE_VERSION = ['"][\d.]+['"]/,
      `const CACHE_VERSION = '${newVersion}'`
    );

    fs.writeFileSync(SW_PATH, content, 'utf8');
    console.log(`✅ Updated ${path.relative(process.cwd(), SW_PATH)}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to update sw.js:`, error.message);
    return false;
  }
}

/**
 * 从文件中读取当前版本号
 */
function getCurrentVersion() {
  try {
    const content = fs.readFileSync(ASSET_VERSION_PATH, 'utf8');
    const match = content.match(/export const ASSET_VERSION = ['"](\d+\.\d+\.\d+)['"]/);
    if (!match) {
      throw new Error('Could not find ASSET_VERSION in file');
    }
    return match[1];
  } catch (error) {
    console.error(`❌ Failed to read current version:`, error.message);
    process.exit(1);
  }
}

// 主流程
console.log('\n🚀 Phoenix Asset Version Updater\n');

// 1. 读取当前版本
const currentVersionString = getCurrentVersion();
const currentVersion = parseVersion(currentVersionString);
console.log(`📌 Current version: ${currentVersionString}`);

// 2. 计算新版本
const newVersionString = incrementVersion(currentVersion, versionType);
console.log(`📈 New version: ${newVersionString} (${versionType})\n`);

// 3. 更新文件
const success1 = updateAssetVersion(newVersionString);
const success2 = updateServiceWorkerVersion(newVersionString);

// 4. 输出结果
if (success1 && success2) {
  console.log('\n✨ Version updated successfully!');
  console.log('\n📝 Next steps:');
  console.log('   1. Review the changes');
  console.log('   2. Commit the version update');
  console.log('   3. Deploy to production');
  console.log('\n💡 Tips:');
  console.log('   - Users will see the new assets after refreshing');
  console.log('   - Old cached assets will be automatically cleaned up');
  console.log('');
} else {
  console.error('\n❌ Version update failed. Please check the errors above.');
  process.exit(1);
}
