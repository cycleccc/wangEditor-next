# 开发

## 准备工作

- 了解 slate.js
- 了解 vdom 和 snabbdom.js
- 了解 lerna
- 已安装 yarn

## 本地启动

### 打包

- 下载代码到本地，进入 `wangEditor` 目录
- 安装 yarn 4.x (node 18.x 以上)
~~~ shell
# 启用 Corepack
corepack enable

# 安装并激活 Yarn 4.x
corepack prepare yarn@stable --activate

# 安装完成后检查版本
yarn -v
~~~
- 安装依赖
~~~  shell
yarn
# 或者
yarn install
~~~
- 打包所有模块
~~~ shell
 # （调试使用 yarn dev 即可）
yarn dev
# 正式包使用 yarn build
yarn build
~~~

### 运行 demo

- 进入 `packages/editor` 目录，运行 `yarn example` ，浏览器打开 `http://localhost:8881/examples/`

## 注意事项

- 修改代码、重新打包后，要**强制刷新**浏览器
- 如果本地包依赖有问题，试试 `lerna link` 关联内部包
- 如果运行 `yarn dev` 报 **'sh' 不是内部或外部命令，也不是可运行的程序
或批处理文件** 的错误请换用 Git Bash 来执行命令

## 记录

全局安装一个插件 `yarn add xxx --dev -W`

注意合理使用 `peerDependencies` 和 `dependencies` ，不要重复打包一个第三方库

执行 `lerna add ...` 之后，需要重新 `lerna link` 建立内部连接

分析包体积
- 命令行，进入某个 package ，如 `cd packages/editor`
- 执行 `yarn size-stats` ，等待执行完成
- 结果会记录在 `packages/editor/stats.html` 用浏览器打开
