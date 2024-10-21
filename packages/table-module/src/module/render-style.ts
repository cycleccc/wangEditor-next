import { Descendant, Element } from 'slate'
import { VNode } from 'snabbdom'

import { addVnodeStyle } from '../utils/vdom'
import { TableCellElement, TableCellProperty } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  if (!Element.isElement(node)) { return vnode }

  const {
    backgroundColor, borderWidth, borderStyle, borderColor, textAlign,
  } = node as TableCellElement

  const props: TableCellProperty = {}

  if (backgroundColor) { props.backgroundColor = backgroundColor }
  if (borderWidth) { props.borderWidth = `${borderWidth}px` }
  if (borderStyle) { props.borderStyle = borderStyle === 'none' ? '' : borderStyle }
  if (borderColor) { props.borderColor = borderColor }
  if (textAlign) { props.textAlign = textAlign }

  const styleVnode: VNode = vnode

  if (node.type === 'table') {
    addVnodeStyle((styleVnode.children?.[0] as VNode).children?.[0] as VNode, props)
  } else {
    addVnodeStyle(styleVnode, props)
  }
  return styleVnode
}
