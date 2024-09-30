module.exports = {
  extends: ['@commitlint/config-conventional'],
}

/**
 * @description
 * 这个配置文件使用了 `@commitlint/config-conventional` 作为扩展。
 * 它定义了符合 Angular 规范的 commit message 规则，确保你的提交信息结构化并且遵循一定的格式。
 *
 * 基础的 commit type 主要有以下几种：
 *
 * 1. `feat`: 新功能（feature）。当你引入新的功能或特性时使用。
 *    - 示例: "feat: 增加登录功能"
 * 2. `fix`: 修复 bug。用于修复代码中的缺陷或问题。
 *    - 示例: "fix: 修复用户无法登录的问题"
 * 3. `docs`: 仅仅修改了文档内容。比如修改 README 文件或注释。
 *    - 示例: "docs: 更新项目的使用说明"
 * 4. `style`: 代码格式的更改，与功能或逻辑无关（例如空格、格式化、缺少分号等）。
 *    - 示例: "style: 调整缩进和代码格式"
 * 5. `refactor`: 代码重构，没有新增功能或修复 bug。通常用于代码优化和改善。
 *    - 示例: "refactor: 重构登录逻辑"
 * 6. `test`: 添加或修改测试用例，不涉及到代码的功能修改。
 *    - 示例: "test: 增加单元测试用例"
 * 7. `chore`: 杂务改动，不影响功能（例如构建脚本、工具配置等）。
 *    - 示例: "chore: 更新依赖库版本"
 * 8. `perf`: 提高性能的改动。通常用于优化代码，使其更高效。
 *    - 示例: "perf: 提升页面加载速度"
 * 9. `ci`: 与持续集成（CI）相关的改动，比如修改配置文件或 CI 脚本。
 *    - 示例: "ci: 修改 GitHub Actions 的配置"
 * 10. `build`: 与构建系统或外部依赖（如 npm、webpack、rollup）相关的改动。
 *     - 示例: "build: 升级 webpack 到 5.x 版本"
 * 11. `revert`: 用于撤销之前的提交。
 *     - 示例: "revert: 撤销 feat: 增加登录功能"
 *
 * 格式规则：
 * - 提交信息应该使用 `{type}: {message}` 的格式，`type` 表示提交的类型。
 * - `message` 是简短的说明，应尽量保持在 50 个字符以内。
 * - 提交信息的类型必须是上述类型中的一种，以确保提交历史一致且清晰。
 */
