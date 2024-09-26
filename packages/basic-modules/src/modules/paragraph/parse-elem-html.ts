/**
 * @description parse html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant, Text } from 'slate'

import $, { DOMElement } from '../../utils/dom'
import { ParagraphElement } from './custom-types'

function parseParagraphHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor,
): ParagraphElement {
  const $elem = $(elem)

  children = children.filter(child => {
    if (Text.isText(child)) { return true }
    if (editor.isInline(child)) { return true }
    return false
  })

  // 无 children ，则用纯文本
  if (children.length === 0) {
    children = [{ text: $elem.text().replace(/\s+/gm, ' ') }]
  }

  return {
    type: 'paragraph',
    // @ts-ignore
    children,
  }
}

export const parseParagraphHtmlConf = {
  selector: 'p:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseParagraphHtml,
}
