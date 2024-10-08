import { defineConfig } from 'vitest/config'
import path from 'path'

// 抽取重复的模块路径
const modulePaths = [
  '@wangeditor-next/core',
  '@wangeditor-next/basic-modules',
  '@wangeditor-next/code-highlight',
  '@wangeditor-next/editor',
  '@wangeditor-next/list-module',
  '@wangeditor-next/table-module',
  '@wangeditor-next/upload-image-module',
  '@wangeditor-next/video-module',
]

export default defineConfig({
  test: {
    environment: 'jsdom', // Vitest 默认使用 jsdom
    include: ['**/*.test.{ts,js,tsx}'], // 对应的测试匹配模式
    globals: true, // 如果需要全局的 vi 函数
    setupFiles: path.resolve(__dirname, 'tests/setup/index.ts'), // 对应 setup 文件
    coverage: {
      provider: 'istanbul', // 可以选择使用 'c8' 或 'istanbul'
      reporter: ['text', 'json', 'html'], // 覆盖率报告格式
      include: [
        `packages/{${modulePaths.map(p => p.split('/')[1]).join(',')}}/src/**/*.{ts,tsx}`,
      ],
      exclude: [
        'dist',
        'locale',
        'index.ts',
        'config.ts',
        'browser-polyfill.ts',
        'node-polyfill.ts',
      ], // 忽略覆盖率计算的文件
    },
  },
  resolve: {
    alias: {
      // 对于样式文件 mock
      '^.+\\.(css|less)$': path.resolve(__dirname, 'tests/utils/stylesMock.js'),
      ...Object.fromEntries(
        modulePaths.map(p => [
          `${p}/dist/css/style.css`,
          path.resolve(__dirname, 'tests/utils/stylesMock.js')
        ])
      ),
    },
  },
  esbuild: {
    // 如果需要特定的转译处理
    jsx: 'transform',
    jsxFactory: 'jsx',
  },
})
