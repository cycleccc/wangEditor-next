/**
 * @description parse html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant } from 'slate'

import { DOMElement } from '../../utils/dom'
import { DividerElement } from './custom-types'

function parseHtml(_elem: DOMElement, _children: Descendant[], _editor: IDomEditor): DividerElement {
  return {
    type: 'divider',
    children: [{ text: '' }], // void node 有一个空白 text
  }
}

export const parseHtmlConf = {
  selector: 'hr:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
