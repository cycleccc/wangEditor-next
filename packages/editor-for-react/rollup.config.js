import { createRollupConfig } from '@wangeditor-next-shared/rollup-config'
import { string } from 'rollup-plugin-string'

import pkg from './package.json' assert { type: 'json' }

const name = 'WangEditorForReact'

const configList = []

// esm
const esmConf = createRollupConfig({
  output: {
    file: pkg.module,
    format: 'esm',
    name,
  },
})

configList.push(esmConf)

// umd
const umdConf = createRollupConfig({
  output: {
    file: pkg.main,
    format: 'umd',
    name,
  },
  plugins: [
    string({
      include: '**/*.css',
    }),
  ],
})

configList.push(umdConf)

export default configList
