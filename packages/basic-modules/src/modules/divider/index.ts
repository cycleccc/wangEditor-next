/**
 * @description divider module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { dividerToHtmlConf } from './elem-to-html'
import { insertDividerMenuConf } from './menu/index'
import { parseHtmlConf } from './parse-elem-html'
import withDivider from './plugin'
import { renderDividerConf } from './render-elem'

const image: Partial<IModuleConf> = {
  renderElems: [renderDividerConf],
  elemsToHtml: [dividerToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [insertDividerMenuConf],
  editorPlugin: withDivider,
}

export default image
