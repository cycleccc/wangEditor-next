/**
 * @description style to html
 * @author hsuna
 */

import $, { getOuterHTML } from '../utils/dom'

export function styleToHtml(node, elemHtml) {
  if (node.type !== 'table' && node.type !== 'table-cell') return elemHtml

  const { backgroundColor, borderWidth, borderStyle, borderColor, textAlign } = node

  if (!(backgroundColor || borderWidth || borderStyle || borderColor || textAlign)) return elemHtml

  // 设置样式
  const $elem = $(elemHtml)
  backgroundColor && $elem.css('background-color', backgroundColor)
  borderWidth && $elem.css('border-width', `${borderWidth}px`)
  borderStyle && $elem.css('border-style', borderStyle)
  borderColor && $elem.css('border-color', borderColor)
  textAlign && $elem.css('text-align', textAlign)

  // 输出 html
  return getOuterHTML($elem)
}
