/**
 * @description module entry
 * @author cycleccc
 */

import './local' // 多语言

import { IModuleConf } from '@wangeditor-next/editor'

import elemToHtmlConf from './elem-to-html'
import { imageFloatLeftMenuConf, imageFloatNoneMenuConf, imageFloatRightMenuConf } from './menu'
import { parseHtmlConf } from './parse-elem-html'
import { renderImageConf } from './render-elem'

const module: Partial<IModuleConf> = {
  renderElems: [renderImageConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [imageFloatLeftMenuConf, imageFloatRightMenuConf, imageFloatNoneMenuConf],
}

export default module
