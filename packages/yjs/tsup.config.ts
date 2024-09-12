import { defineConfig, Options } from 'tsup'

export default defineConfig(
  ({ watch }) => <Options[]>[
      {
        entry: ['src/index.ts'],
        outDir: 'dist',
        format: ['cjs', 'iife', 'esm'],
        globalName: 'SlateYjsCore',
        platform: 'browser',
        splitting: false,
        bundle: true,
        sourcemap: true,
        minify: false,
        clean: !watch,
      },
      !!watch && {
        entry: ['src'],
        outDir: 'dist',
        format: [],
        platform: 'browser',
        splitting: false,
        bundle: false,
        sourcemap: true,
        dts: true,
        minify: false,
        clean: false,
      },
    ].filter(Boolean)
)
