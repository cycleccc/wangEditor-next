/**
 * @description code highlight module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { codeToHtmlConf } from './elem-to-html'
import { selectLangMenuConf } from './menu/index'
import { parseCodeStyleHtml } from './parse-style-html'
import { renderStyle } from './render-style'

const codeHighlightModule: Partial<IModuleConf> = {
  renderStyle,
  parseStyleHtml: parseCodeStyleHtml,
  menus: [selectLangMenuConf],
  elemsToHtml: [codeToHtmlConf],
}

export default codeHighlightModule
