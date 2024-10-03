/**
 * @description paragraph entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { pToHtmlConf } from './elem-to-html'
import { parseParagraphHtmlConf } from './parse-elem-html'
import withParagraph from './plugin'
import { renderParagraphConf } from './render-elem'

const p: Partial<IModuleConf> = {
  renderElems: [renderParagraphConf],
  elemsToHtml: [pToHtmlConf],
  parseElemsHtml: [parseParagraphHtmlConf],
  editorPlugin: withParagraph,
}

export default p
