# WPS Vue3 插件开发项目

一个基于 Vue3 和 WPS JavaScript API 的现代化办公插件开发框架，提供丰富的 UI 组件和便捷的开发体验。

## 🚀 项目概述

本项目是一个完整的 WPS Office 插件开发模板，集成了现代前端技术栈，支持快速构建功能丰富的办公自动化插件。项目采用模块化设计，包含功能区定制、任务窗格、对话框等多种交互界面。

### 核心特性

- 🎨 **现代化 UI 框架**：集成 PrimeVue 组件库，提供丰富的企业级 UI 组件
- ⚡ **高性能构建**：基于 Vite 构建工具，支持热重载和快速开发
- 📱 **响应式设计**：使用 TailwindCSS 实现优雅的响应式布局
- 🔧 **WPS 深度集成**：完整支持 WPS JavaScript API，实现文档操作自动化
- 🎯 **多页面架构**：支持功能区、任务窗格、对话框等多种展示形式
- 📦 **自动组件导入**：智能组件按需加载，优化打包体积
- 🛠️ **开发工具完善**：集成 ESLint + Prettier 代码规范检查

## 🛠 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **核心框架** | Vue.js | ^3.5.28 | 前端框架 |
| **构建工具** | Vite | ^7.3.1 | 开发服务器和构建工具 |
| **路由管理** | Vue Router | ^5.0.2 | 页面路由管理 |
| **UI 组件库** | PrimeVue | ^4.5.4 | 企业级 UI 组件 |
| **样式框架** | TailwindCSS | ^4.1.18 | 工具类 CSS 框架 |
| **主题系统** | PrimeUIX | ^2.0.3 | 现代化主题支持 |
| **图标库** | PrimeIcons | ^7.0.0 | 图标资源 |
| **HTTP 客户端** | Axios | ^1.13.5 | 网络请求处理 |
| **代码质量** | ESLint + Prettier | 最新版 | 代码规范检查 |
| **WPS 集成** | wpsjs | latest | WPS JavaScript API 封装 |

## 📁 项目结构

```
wpsjs-vue-template/
├── public/               # 静态资源目录
│   ├── favicon.ico       # 网站图标
│   └── images/           # 图片资源目录
├── src/                  # 源代码目录
│   ├── presets/          # 主题预设
│   │   └── Noir.js       # Noir 主题配置
│   ├── router/           # 路由配置
│   │   └── index.js      # 路由定义
│   ├── scripts/          # JavaScript 功能模块
│   │   ├── dialog.js     # 对话框功能实现
│   │   ├── functions.js  # 自定义函数定义
│   │   ├── systemdemo.js # 系统演示功能
│   │   ├── taskpane.js   # 任务窗格功能
│   │   └── util.js       # 工具函数
│   ├── views/            # 视图组件
│   │   ├── Dialog.vue    # 对话框组件
│   │   ├── Root.vue      # 主页面组件
│   │   └── TaskPane.vue  # 任务窗格组件
│   ├── App.vue           # 根组件
│   ├── main.js           # 入口文件
│   ├── ribbon.js         # 功能区逻辑
│   └── style.css         # 全局样式
├── .vscode/              # VSCode配置目录
├── wps-addon-build/      # WPS插件构建目录
├── .eslintrc.cjs         # ESLint 配置
├── .gitignore            # Git 忽略配置
├── .prettierrc.json      # Prettier 配置
├── index.html            # HTML 模板
├── jsconfig.json         # JavaScript 配置
├── manifest.xml          # 插件清单文件
├── package.json          # 项目依赖配置
├── pnpm-workspace.yaml   # pnpm工作区配置
├── publish.html          # 发布说明
├── README.md             # 项目文档
├── ribbon.xml            # 功能区配置文件
└── vite.config.js        # Vite 配置文件
```

## 📦 安装与配置

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 pnpm >= 7.0.0
- WPS Office 最新版

### 下载安装

```bash
# 使用 degit 克隆模板（推荐）
npx degit mwmi/wpsjs-vue-template MyWPSTool
cd MyWPSTool

# 安装依赖
pnpm install
# 或者使用 npm
# npm install
```

## ⚙️ 配置文件详解

### Vite 配置

```javascript
// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import tailwindcss from '@tailwindcss/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { functionsScanner, copyFile } from "wpsjs/vite_plugins"

export default defineConfig({
  base: './',
  plugins: [
    // 复制插件清单文件
    copyFile({
      src: 'manifest.xml',
      dest: 'manifest.xml',
    }),
    copyFile({
      src: 'ribbon.xml',
      dest: 'ribbon.xml',
    }),
    // 扫描自定义函数
    functionsScanner({
      inputJsPath: 'src/scripts/functions.js',
      outputJsonPath: 'functions.json',
      namespace: 'HelloEt',
    }),
    vue(),
    tailwindcss(),
    // 组件自动导入配置
    Components({
      resolvers: [
        PrimeVueResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3889
  }
})
```

### 插件清单配置

```xml
<!-- manifest.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<JsPlugin>
  <ApiVersion>1.0.0</ApiVersion>
  <Name>HelloEt</Name>
  <Description>WPS Excel 插件示例</Description>
  <Functions>
    <Uri>/functions.json</Uri>
    <Namespace>HelloEt</Namespace>
  </Functions>
</JsPlugin>
```

### 功能区配置

```xml
<!-- ribbon.xml -->
<customUI xmlns="http://schemas.microsoft.com/office/2006/01/customui" 
          onLoad="ribbon.OnAddinLoad">
  <ribbon startFromScratch="false">
    <tabs>
      <tab idMso="TabHome">
        <group id="btnDemoGroup" label="测试">
          <button id="btnShowTaskPane" label="弹任务窗格网页" 
                  onAction="ribbon.OnAction" getImage="ribbon.GetImage" size="large"/>
          <button id="btnShowDialog" label="弹对话框网页" 
                  onAction="ribbon.OnAction" getImage="ribbon.GetImage" size="large"/>
          <button id="btnShowMsg" label="弹出消息框" 
                  onAction="ribbon.OnAction" getImage="ribbon.GetImage" size="large"/>
        </group>
      </tab>
    </tabs>
  </ribbon>
</customUI>
```

### 开发工具配置

#### ESLint 配置

```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
```

#### Prettier 配置

```json
// .prettierrc.json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "none"
}
```

## 🚀 开发指南

### 启动开发服务器

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 3889）
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 项目启动流程

1. **环境准备**：确保已安装 Node.js 和 WPS Office
2. **依赖安装**：运行 `npm install` 安装所有依赖
3. **启动服务**：运行 `npm run dev` 启动开发服务器
4. **插件加载**：在 WPS 中加载生成的插件文件
5. **开发调试**：通过浏览器开发者工具进行调试

### 核心功能模块

#### 1. 自定义函数

```javascript
// src/scripts/functions.js
/**
 * 这是一个加载项自定义函数
 * @customfunction
 * @param {string} arg0 - 支持字符串参数
 * @param {number} arg1 - 支持数值参数
 * @param {boolean} arg2 - 支持布尔参数
 * @returns {string} - 返回处理结果
 */
function custom_function(arg0, arg1, arg2) {
  let argAndType = (arg) => `${arg}: ${typeof arg}`
  let argAndTypeList = [arg0, arg1, arg2].map(argAndType)
  let message = `这是一个加载项自定义函数(${argAndTypeList.join(', ')})`
  console.log(message)
  return message
}
```

#### 2. 功能区逻辑

```javascript
// src/ribbon.js
export default {
  // 插件加载回调
  OnAddinLoad(ribbonUI) {
    // 初始化逻辑
  },
  
  // 按钮点击处理
  OnAction(control) {
    const eleId = control.Id
    switch (eleId) {
      case "btnShowMsg":
        // 显示消息框
        break
      case "btnShowDialog":
        // 显示对话框
        break
      case "btnShowTaskPane":
        // 显示任务窗格
        break
    }
  },
  
  // 获取图片资源
  GetImage(control) {
    // 返回对应按钮的图标路径
  }
}
```

#### 3. 任务窗格功能

```javascript
// src/scripts/taskpane.js
export default {
  onbuttonclick(action) {
    switch(action) {
      case 'dockLeft':
        // 停靠到左侧
        break
      case 'dockRight':
        // 停靠到右侧
        break
      case 'hideTaskPane':
        // 隐藏任务窗格
        break
      case 'addString':
        // 在文档开头添加字符串
        break
    }
  }
}
```

#### 4. 对话框功能

```javascript
// src/scripts/dialog.js
export default {
  onbuttonclick(action) {
    switch(action) {
      case 'createTaskPane':
        // 创建任务窗格
        break
      case 'newDoc':
        // 新建文档
        break
      case 'addString':
        // 在文档开头添加字符串
        break
      case 'closeDoc':
        // 关闭文档
        break
    }
  }
}
```

## 🎯 使用示例

### 基础功能演示

1. **文档操作**：新建、打开、保存文档
2. **数据处理**：读取、修改单元格数据
3. **界面交互**：弹出对话框、显示任务窗格
4. **自定义函数**：在公式中使用自定义函数
5. **事件监听**：监听文档变化和用户操作

### 开发调试技巧

- 按 `F12` 打开浏览器开发者工具
- 使用 `console.log()` 输出调试信息
- 利用 Vue DevTools 调试组件状态
- 通过网络面板监控 API 请求
- 查看 WPS 控制台输出的插件日志

### 常见操作示例

```javascript
// 获取当前活动工作簿
const workbook = window.Application.ActiveWorkbook

// 获取当前活动工作表
const worksheet = window.Application.ActiveSheet

// 读取单元格值
const cellValue = worksheet.Cells.Item(1, 1).Value

// 设置单元格值
worksheet.Cells.Item(1, 1).Value = "Hello WPS"

// 新建工作簿
window.Application.Workbooks.Add()

// 显示消息框
window.Application.ExecuteExcel4Macro('ALERT("Hello World", "2")')
```

## 📖 API 文档参考

### WPS JavaScript API

官方文档：[https://open.wps.cn/docs/office](https://open.wps.cn/docs/office)

主要 API 包括：
- Application 对象：应用程序控制
- Workbook/Worksheet 对象：工作簿和工作表操作
- Range 对象：单元格范围操作
- Events 事件系统：各种事件监听

### PrimeVue 组件

官方文档：[https://primevue.org/](https://primevue.org/)

常用组件：
- Button：按钮组件
- InputText：输入框组件
- Card：卡片组件
- Divider：分割线组件
- Toast：消息提示

## 🤝 贡献指南

### 开发规范

1. **代码风格**：遵循 ESLint 和 Prettier 配置
2. **提交规范**：使用 conventional commits 规范
3. **分支管理**：采用 Git Flow 工作流
4. **测试覆盖**：确保核心功能有相应测试

### 提交流程

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发并提交代码
git add .
git commit -m "feat: 添加新功能描述"

# 3. 推送到远程仓库
git push origin feature/new-feature

# 4. 创建 Pull Request
```

## 📄 许可证

本项目基于 MIT 许可证开源，详情请查看 LICENSE 文件。

## 📞 技术支持

- **官方文档**：[WPS 开放平台](https://open.wps.cn/)
- **GitHub 仓库**：[https://github.com/mwmi/wpsjs-vue-template](https://github.com/mwmi/wpsjs-vue-template)
- **问题反馈**：在 GitHub Issues 中提交
- **技术交流**：加入开发者社区讨论

---

*Happy Coding!* ✨