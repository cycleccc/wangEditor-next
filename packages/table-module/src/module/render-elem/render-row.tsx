/**
 * @description render row
 * @author wangfupeng
 */

import { Element as SlateElement } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor } from '@wangeditor-next/core'

function renderTableRow(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const vnode = h('tr', children)
  return vnode
}

export default renderTableRow
