/**
 * @description parse node html
 * @author wangfupeng
 */

import $, { Dom7Array } from 'dom7'
import { Descendant } from 'slate'

import { IDomEditor } from '../editor/interface'
import { PRE_PARSE_HTML_CONF_LIST, TEXT_TAGS } from '../index'
import { getTagName, NodeType } from '../utils/dom'
import parseCommonElemHtml from './parse-common-elem-html'
import parseTextElemHtml from './parse-text-elem-html'

/**
 * 处理 DOM Elem html
 * @param $elem $elem
 * @param editor editor
 * @returns slate Descendant
 */
function parseElemHtml($elem: Dom7Array, editor: IDomEditor): Descendant | Descendant[] {
  // pre-parse
  PRE_PARSE_HTML_CONF_LIST.forEach(conf => {
    const { selector, preParseHtml } = conf

    if ($elem[0].matches(selector)) {
      $elem = $(preParseHtml($elem[0]))
    }
  })

  const tagName = getTagName($elem)

  // <span> 判断有没有 data-w-e-type 属性。有则是 elem ，没有则是 text
  if (tagName === 'span') {
    if ($elem.attr('data-w-e-type')) {
      return parseCommonElemHtml($elem, editor)
    }
    if ($elem[0].childNodes.length > 1) {
      const childNodes = $elem[0].childNodes

      return Array.from(childNodes).map(child => {
        const $childElem = $(child)

        if ($childElem[0].nodeType === NodeType.TEXT_NODE) { return { text: $childElem[0].textContent || '' } }
        return parseTextElemHtml($childElem, editor)
      })
    }
    return parseTextElemHtml($elem, editor)

  }

  // <code> 特殊处理
  if (tagName === 'code') {
    const parentTagName = getTagName($elem.parent())

    if (parentTagName === 'pre') {
      // <code> 在 <pre> 内，则是 elem
      return parseCommonElemHtml($elem, editor)
    }
    // <code> 不在 <pre> 内，则是 text
    return parseTextElemHtml($elem, editor)

  }

  // 非 <code> ，正常处理
  if (TEXT_TAGS.includes(tagName)) {
    if ($elem[0].childNodes.length > 0 && $elem[0].childNodes[0].nodeType !== 3) {
      const childNodes = $elem[0].childNodes

      return { ...parseElemHtml($(childNodes[0]), editor), ...parseTextElemHtml($elem, editor) }
    }
    // text node
    return parseTextElemHtml($elem, editor)
  }
  // elem node
  return parseCommonElemHtml($elem, editor)

}

export default parseElemHtml
