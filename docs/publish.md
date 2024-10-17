# 发布到 NPM

## 发布一个正式版本

1. 添加 `changeset`：`npx changeset`
2. 提交代码合并 master，线上会自动发版到 `npm`。

## 发布一个测试版本

1. 进入预发布模式：`npx changeset pre enter beta`
2. 添加 `changeset`：`npx changeset`
3. 更新版本号：`npx changeset version`
4. 发布测试包：`npx changeset publish`
5. 退出预发布模式（可选）：`npx changeset pre exit`
