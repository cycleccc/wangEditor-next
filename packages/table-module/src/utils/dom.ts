/**
 * @description DOM 操作
 * @author wangfupeng
 */

import $, {
  addClass,
  append,
  attr,
  children,
  data,
  dataset,
  Dom7Array,
  each,
  find,
  focus,
  hide,
  html,
  on,
  removeClass,
  show,
  val,
} from 'dom7'

// COMPAT: This is required to prevent TypeScript aliases from doing some very
// weird things for Slate's types with the same name as globals. (2019/11/27)
// https://github.com/microsoft/TypeScript/issues/35002
import DOMNode = globalThis.Node
import DOMComment = globalThis.Comment
import DOMElement = globalThis.Element
import DOMText = globalThis.Text
import DOMRange = globalThis.Range
import DOMSelection = globalThis.Selection
import DOMStaticRange = globalThis.StaticRange

export { Dom7Array } from 'dom7'

if (append) { $.fn.append = append }
if (on) { $.fn.on = on }
if (focus) { $.fn.focus = focus }
if (attr) { $.fn.attr = attr }
if (val) { $.fn.val = val }
if (html) { $.fn.html = html }
if (dataset) { $.fn.dataset = dataset }
if (addClass) { $.fn.addClass = addClass }
if (removeClass) { $.fn.removeClass = removeClass }
if (children) { $.fn.children = children }
if (each) { $.fn.each = each }
if (find) { $.fn.find = find }
if (data) { $.fn.data = data }
if (hide) { $.fn.hide = hide }
if (show) { $.fn.show = show }

export default $

/**
 * 获取 tagName lower-case
 * @param $elem $elem
 */
export function getTagName($elem: Dom7Array): string {
  if ($elem.length) { return $elem[0].tagName.toLowerCase() }
  return ''
}

/**
 * 获取 $elem 某一个 style 值
 * @param $elem $elem
 * @param styleKey style key
 */
export function getStyleValue($elem: Dom7Array, styleKey: string): string {
  let res = ''

  const styleStr = $elem.attr('style') || '' // 如 'line-height: 2.5; color: red;'
  const styleArr = styleStr.split(';') // 如 ['line-height: 2.5', ' color: red', '']
  const length = styleArr.length

  for (let i = 0; i < length; i += 1) {
    const styleItemStr = styleArr[i] // 如 'line-height: 2.5'

    if (styleItemStr) {
      const arr = styleItemStr.split(':') // ['line-height', ' 2.5']

      if (arr[0].trim() === styleKey) {
        res = arr[1].trim()
      }
    }
  }

  return res
}

/**
 * 获取 outerHTML
 * @param $elem dom7 elem
 */
export function getOuterHTML($elem: Dom7Array) {
  if ($elem.length === 0) { return '' }
  return $elem[0].outerHTML
}
export {
  DOMComment, DOMElement, DOMNode, DOMRange, DOMSelection, DOMStaticRange, DOMText,
}
