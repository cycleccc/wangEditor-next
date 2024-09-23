// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修补 bug
        'docs', // 文档更新
        'style', // 代码格式（不影响代码运行的变动）
        'refactor', // 重构（即不是新增功能，也不是修改 bug 的代码变动）
        'test', // 添加测试
        'chore', // 构建过程或辅助工具的变动
      ],
    ],
  },
}
