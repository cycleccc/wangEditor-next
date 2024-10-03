/**
 * @description link entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { linkToHtmlConf } from './elem-to-html'
import {
  editLinkMenuConf,
  insertLinkMenuConf,
  unLinkMenuConf,
  viewLinkMenuConf,
} from './menu/index'
import { parseHtmlConf } from './parse-elem-html'
import withLink from './plugin'
import { renderLinkConf } from './render-elem'

const link: Partial<IModuleConf> = {
  renderElems: [renderLinkConf],
  elemsToHtml: [linkToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [insertLinkMenuConf, editLinkMenuConf, unLinkMenuConf, viewLinkMenuConf],
  editorPlugin: withLink,
}

export default link
