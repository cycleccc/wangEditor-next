/**
 * @description render elem
 * @author wangfupeng
 */

import { Element as SlateElement } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor } from '@wangeditor-next/core'

function renderPre(elemNode: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const vnode = h('pre', children)

  return vnode
}

function renderCode(elemNode: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 和 basic/simple-style module 的“行内代码”并不冲突。一个是根据 mark 渲染，一个是根据 node.type 渲染
  const vnode = h('code', children)
  return vnode
}

export const renderPreConf = {
  type: 'pre',
  renderElem: renderPre,
}

export const renderCodeConf = {
  type: 'code',
  renderElem: renderCode,
}
