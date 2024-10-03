/**
 * @description render font-size font-family style
 * @author wangfupeng
 */

import { Descendant } from 'slate'
import { VNode } from 'snabbdom'

import { addVnodeStyle } from '../../utils/vdom'
import { FontSizeAndFamilyText } from './custom-types'

/**
 * 添加样式
 * @param node slate elem
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  const { fontSize, fontFamily } = node as FontSizeAndFamilyText
  const styleVnode: VNode = vnode

  if (fontSize) {
    addVnodeStyle(styleVnode, { fontSize })
  }
  if (fontFamily) {
    addVnodeStyle(styleVnode, { fontFamily })
  }

  return styleVnode
}
