/**
 * @description render indent style
 * @author wangfupeng
 */

import { Descendant, Element } from 'slate'
import { jsx, VNode } from 'snabbdom'

import { addVnodeStyle } from '../../utils/vdom'
import { IndentElement } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  if (!Element.isElement(node)) { return vnode }

  const { indent } = node as IndentElement // 如 '2em'
  const styleVnode: VNode = vnode

  if (indent) {
    addVnodeStyle(styleVnode, { textIndent: indent })
  }

  return styleVnode
}
