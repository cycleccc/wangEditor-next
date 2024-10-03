/**
 * @description code block module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { codeToHtmlConf, preToHtmlConf } from './elem-to-html'
import { codeBlockMenuConf } from './menu/index'
import { parseCodeHtmlConf, parsePreHtmlConf } from './parse-elem-html'
import withCodeBlock from './plugin'
import { preParseHtmlConf } from './pre-parse-html'
import { renderCodeConf, renderPreConf } from './render-elem'

const codeBlockModule: Partial<IModuleConf> = {
  menus: [codeBlockMenuConf],
  editorPlugin: withCodeBlock,
  renderElems: [renderPreConf, renderCodeConf],
  elemsToHtml: [codeToHtmlConf, preToHtmlConf],
  preParseHtml: [preParseHtmlConf],
  parseElemsHtml: [parseCodeHtmlConf, parsePreHtmlConf],
}

export default codeBlockModule
