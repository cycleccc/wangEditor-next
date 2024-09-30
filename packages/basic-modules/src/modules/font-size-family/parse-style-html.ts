/**
 * @description parse style html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant, Text } from 'slate'

import $, { DOMElement, getStyleValue } from '../../utils/dom'
import { FontSizeAndFamilyText } from './custom-types'

export function parseStyleHtml(
  text: DOMElement,
  node: Descendant,
  _editor: IDomEditor,
): Descendant {
  const $text = $(text)

  if (!Text.isText(node)) {
    return node
  }

  const textNode = node as FontSizeAndFamilyText

  // -------- 处理 font-size --------
  const fontSize = getStyleValue($text, 'font-size')

  if (fontSize) {
    textNode.fontSize = fontSize
  }

  // 这里需要替换掉 "， css 设置 font-family，会将有空格的字体使用 " 包裹
  const fontFamily = getStyleValue($text, 'font-family').replace(/"/g, '')

  if (fontFamily) {
    textNode.fontFamily = fontFamily
  }

  return textNode
}
