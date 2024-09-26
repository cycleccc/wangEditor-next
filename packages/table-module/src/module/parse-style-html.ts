/**
 * @description parse style html
 * @author hsuna
 */
import { IDomEditor } from '@wangeditor-next/core'
import { Descendant } from 'slate'

import $, { DOMElement, getStyleValue } from '../utils/dom'
import { TableCellElement } from './custom-types'

// 获取 var(--w-e-textarea-border-color) 变量的实际样式值
const DEFAULT_BORDER_COLOR = window
  ?.getComputedStyle(document.documentElement)
  ?.getPropertyValue('--w-e-textarea-border-color')

export function parseStyleHtml(elem: DOMElement, node: Descendant, editor: IDomEditor): Descendant {
  if (elem.tagName !== 'TABLE' && elem.tagName !== 'TD') { return node }

  const $elem = $(elem)

  const tableNode = node as TableCellElement
  let backgroundColor = getStyleValue($elem, 'background-color')

  if (!backgroundColor) { backgroundColor = getStyleValue($elem, 'background') } // word 背景色
  if (backgroundColor) {
    tableNode.backgroundColor = backgroundColor
  }

  let border = getStyleValue($elem, 'border')

  if (!border && elem.tagName === 'TD') {
    // https://github.com/cycleccc/wangEditor-next/blob/master/packages/table-module/src/assets/index.less#L20
    // TD存在默认的css样式，尝试用getComputedStyle获取不到，只能写死
    border = `1px solid ${DEFAULT_BORDER_COLOR}`
  }

  let [borderWidth, borderStyle, borderColor] = border?.split(' ') || []

  borderWidth = getStyleValue($elem, 'border-width') || borderWidth // border 宽度
  if (borderWidth) {
    tableNode.borderWidth = borderWidth.replace(/[^\d]/g, '')
  }
  borderStyle = getStyleValue($elem, 'border-style') || borderStyle // border 样式
  if (borderStyle) {
    tableNode.borderStyle = borderStyle
  }
  borderColor = getStyleValue($elem, 'border-color') || borderColor // border 颜色
  if (borderColor) {
    tableNode.borderColor = borderColor
  }

  let textAlign = getStyleValue($elem, 'text-align')

  textAlign = getStyleValue($elem, 'text-align') || textAlign // 文本 对齐
  if (textAlign) {
    tableNode.textAlign = textAlign
  }
  return node
}
