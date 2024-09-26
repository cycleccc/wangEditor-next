/**
 * @description render line-height style
 * @author wangfupeng
 */

import { Descendant, Element } from 'slate'
import { jsx, VNode } from 'snabbdom'

import { addVnodeStyle } from '../../utils/vdom'
import { LineHeightElement } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  if (!Element.isElement(node)) { return vnode }

  const { lineHeight } = node as LineHeightElement // 如 '1' '1.5'
  const styleVnode: VNode = vnode

  if (lineHeight) {
    addVnodeStyle(styleVnode, { lineHeight })
  }

  return styleVnode
}
