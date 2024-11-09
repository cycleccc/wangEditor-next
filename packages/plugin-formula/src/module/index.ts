/**
 * @description formula module entry
 * @author wangfupeng
 */

import './local' // 多语言

import { IModuleConf } from '@wangeditor-next/editor'

import elemToHtmlConf from './elem-to-html'
import { editFormulaMenuConf, insertFormulaMenuConf } from './menu/index'
import parseHtmlConf from './parse-elem-html'
import withFormula from './plugin'
import renderElemConf from './render-elem'

const module: Partial<IModuleConf> = {
  editorPlugin: withFormula,
  renderElems: [renderElemConf],
  elemsToHtml: [elemToHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [insertFormulaMenuConf, editFormulaMenuConf],
}

export default module
