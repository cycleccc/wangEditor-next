/**
 * @description blockquote entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { quoteToHtmlConf } from './elem-to-html'
import { blockquoteMenuConf } from './menu/index'
import { parseHtmlConf } from './parse-elem-html'
import withBlockquote from './plugin'
import { renderBlockQuoteConf } from './render-elem'

const blockquote: Partial<IModuleConf> = {
  renderElems: [renderBlockQuoteConf],
  elemsToHtml: [quoteToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [blockquoteMenuConf],
  editorPlugin: withBlockquote,
}

export default blockquote
