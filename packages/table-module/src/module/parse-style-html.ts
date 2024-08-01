/**
 * @description parse style html
 * @author hsuna
 */
import { Descendant } from 'slate'
import { IDomEditor } from '@wangeditor-next/core'
import $, { DOMElement, getStyleValue } from '../utils/dom'
import { TableCellElement } from './custom-types'

export function parseStyleHtml(elem: DOMElement, node: Descendant, editor: IDomEditor): Descendant {
  if (elem.tagName !== 'TABLE' && elem.tagName !== 'TD') return node

  const $elem = $(elem)

  let tableNode = node as TableCellElement
  let backgroundColor = getStyleValue($elem, 'background-color')
  if (!backgroundColor) backgroundColor = getStyleValue($elem, 'background') // word 背景色
  if (backgroundColor) {
    tableNode.backgroundColor = backgroundColor
  }

  // eslint-disable-next-line no-unsafe-optional-chaining
  let [borderWidth, borderStyle, borderColor] = getStyleValue($elem, 'border')?.split(' ')
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
