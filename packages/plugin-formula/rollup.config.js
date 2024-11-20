import { createRollupConfig } from '@wangeditor-next-shared/rollup-config'

import pkg from './package.json' assert { type: 'json' }

const name = 'WangEditorFormulaPlugin'

const configList = []

// esm
const esmConf = createRollupConfig({
  output: {
    file: pkg.module,
    format: 'esm',
    name,
  },
  plugins: [
    string({
      include: '**/*.css',
    }),
  ],
})

configList.push(esmConf)

// umd
const umdConf = createRollupConfig({
  output: {
    file: pkg.main,
    format: 'umd',
    name,
  },
})

configList.push(umdConf)

export default configList
