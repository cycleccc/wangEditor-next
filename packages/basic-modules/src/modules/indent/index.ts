/**
 * @description indent entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { delIndentMenuConf, indentMenuConf } from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { preParseHtmlConf } from './pre-parse-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const indent: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  preParseHtml: [preParseHtmlConf],
  parseStyleHtml,
  menus: [indentMenuConf, delIndentMenuConf],
}

export default indent
