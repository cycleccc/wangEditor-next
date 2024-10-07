/**
 * @description rollup dev config
 * @author wangfupeng
 */

import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'

// eslint-disable-next-line import/extensions
import genCommonConf from './common.js'

/**
 * 生成 dev config
 * @param {string} format 'umd' 'esm'
 */
function genDevConf(format) {
  const {
    input, output = {}, plugins = [], external,
  } = genCommonConf(format)

  return {
    input,
    output,
    external,
    plugins: [
      ...plugins,

      postcss({
        plugins: [autoprefixer()],
        extract: 'css/style.css',
      }),
    ],
  }
}

export default genDevConf
