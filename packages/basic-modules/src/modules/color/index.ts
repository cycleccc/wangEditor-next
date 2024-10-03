/**
 * @description color bgColor
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { bgColorMenuConf, colorMenuConf } from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { preParseHtmlConf } from './pre-parse-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const color: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  preParseHtml: [preParseHtmlConf],
  parseStyleHtml,
  menus: [colorMenuConf, bgColorMenuConf],
}

export default color
