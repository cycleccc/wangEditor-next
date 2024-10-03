/**
 * @description font-size font-family
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { fontFamilyMenuConf, fontSizeMenuConf } from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { preParseHtmlConf } from './pre-parse-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const fontSizeAndFamily: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  preParseHtml: [preParseHtmlConf],
  parseStyleHtml,
  menus: [fontSizeMenuConf, fontFamilyMenuConf],
}

export default fontSizeAndFamily
