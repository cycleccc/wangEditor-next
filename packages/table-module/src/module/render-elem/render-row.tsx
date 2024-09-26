/**
 * @description render row
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
import { jsx, VNode } from 'snabbdom'

function renderTableRow(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor,
): VNode {
  const vnode = <tr>{children}</tr>

  return vnode
}

export default renderTableRow
