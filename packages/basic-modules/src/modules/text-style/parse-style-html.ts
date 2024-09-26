/**
 * @description parse style html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant, Text } from 'slate'

import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { StyledText } from './custom-types'

/**
 * $text 是否匹配 tags
 * @param $text $text
 * @param selector selector 如 'b,strong' 或 'sub'
 */
function isMatch($text: Dom7Array, selector: string): boolean {
  if ($text.length === 0) { return false }

  if ($text[0].matches(selector)) { return true }

  if ($text.find(selector).length > 0) { return true }

  return false
}

export function parseStyleHtml(
  textElem: DOMElement,
  node: Descendant,
  editor: IDomEditor,
): Descendant {
  const $text = $(textElem)

  if (!Text.isText(node)) { return node }

  const textNode = node as StyledText

  // bold
  if (isMatch($text, 'b,strong')) {
    textNode.bold = true
  }

  // italic
  if (isMatch($text, 'i,em')) {
    textNode.italic = true
  }

  // underline
  if (isMatch($text, 'u')) {
    textNode.underline = true
  }

  // through
  if (isMatch($text, 's,strike')) {
    textNode.through = true
  }

  // sub
  if (isMatch($text, 'sub')) {
    textNode.sub = true
  }

  // sup
  if (isMatch($text, 'sup')) {
    textNode.sup = true
  }

  // code
  if (isMatch($text, 'code')) {
    textNode.code = true
  }

  return textNode
}
