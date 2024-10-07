#!/bin/bash

## 一键打包所有 package(只打包基础 module 额外的如 yjs插件 vue2、vue3 等包 进入对应目录下打包)

# 获取 yarn dev/build 类型
buildType=build
if [ -n "$1" ]; then
  buildType=$1
fi

cd ./packages

# core 要第一个打包
cd ./core
rm -rf dist # 清空 dist 目录
yarn "$buildType"

cd ../basic-modules
rm -rf dist # 清空 dist 目录
yarn "$buildType"

# code-highlight 依赖于 basic-modules 中的 code-block
cd ../code-highlight
rm -rf dist # 清空 dist 目录
yarn "$buildType"

cd ../list-module
rm -rf dist # 清空 dist 目录
yarn "$buildType"

cd ../table-module
rm -rf dist # 清空 dist 目录
yarn "$buildType"

# upload-image 依赖于 basic-modules 中的 image
cd ../upload-image-module
rm -rf dist # 清空 dist 目录
yarn "$buildType"

cd ../video-module
rm -rf dist # 清空 dist 目录
yarn "$buildType"

# editor 依赖于上述的 core + modules
cd ../editor
rm -rf dist # 清空 dist 目录
yarn "$buildType"

# cd ../yjs
# rm -rf dist
# yarn "$buildType"

# cd ../yjs-for-react
# rm -rf dist
# yarn "$buildType"
