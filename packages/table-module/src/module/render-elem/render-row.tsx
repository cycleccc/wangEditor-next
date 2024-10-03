/**
 * @description render row
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode } from 'snabbdom'

function renderTableRow(
  _elemNode: SlateElement,
  children: VNode[] | null,
  _editor: IDomEditor,
): VNode {
  const vnode = <tr>{children}</tr>

  return vnode
}

export default renderTableRow
