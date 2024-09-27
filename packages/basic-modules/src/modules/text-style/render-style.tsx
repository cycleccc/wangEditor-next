/**
 * @description render text style
 * @author wangfupeng
 */

import { Descendant } from 'slate'
import { h, VNode } from 'snabbdom'
import { StyledText } from './custom-types'

/**
 * 添加样式
 * @param node slate text
 * @param vnode vnode
 * @returns vnode
 */
export function renderStyle(node: Descendant, vnode: VNode): VNode {
  const { bold, italic, underline, code, through, sub, sup } = node as StyledText
  let styleVnode: VNode = vnode

  // color bgColor 在另外的菜单

  if (bold) {
    styleVnode = h('strong', styleVnode)
  }
  if (code) {
    styleVnode = h('code', styleVnode)
  }
  if (italic) {
    styleVnode = h('em', styleVnode)
  }
  if (underline) {
    styleVnode = h('u', styleVnode)
  }
  if (through) {
    styleVnode = h('s', styleVnode)
  }
  if (sub) {
    styleVnode = h('sub', styleVnode)
  }
  if (sup) {
    styleVnode = h('sup', styleVnode)
  }

  return styleVnode
}
