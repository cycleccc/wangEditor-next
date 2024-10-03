/**
 * @description todo entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { todoToHtmlConf } from './elem-to-html'
import { todoMenuConf } from './menu/index'
import { parseHtmlConf } from './parse-elem-html'
import withTodo from './plugin'
import { preParseHtmlConf } from './pre-parse-html'
import { renderTodoConf } from './render-elem'

const todo: Partial<IModuleConf> = {
  renderElems: [renderTodoConf],
  elemsToHtml: [todoToHtmlConf],
  preParseHtml: [preParseHtmlConf],
  parseElemsHtml: [parseHtmlConf],
  menus: [todoMenuConf],
  editorPlugin: withTodo,
}

export default todo
