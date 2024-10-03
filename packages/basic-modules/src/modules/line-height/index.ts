/**
 * @description line-height module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { lineHeightMenuConf } from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const lineHeight: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  parseStyleHtml,
  menus: [lineHeightMenuConf],
}

export default lineHeight
