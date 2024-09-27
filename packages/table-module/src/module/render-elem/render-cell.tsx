/**
 * @description render cell
 * @author wangfupeng
 */

import { Element as SlateElement } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor } from '@wangeditor-next/core'
import { TableCellElement } from '../custom-types'
import { isCellInFirstRow } from '../helpers'
import { TableCursor } from '../table-cursor'

function renderTableCell(
  cellNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const isFirstRow = isCellInFirstRow(editor, cellNode as TableCellElement)
  const {
    colSpan = 1,
    rowSpan = 1,
    isHeader = false,
    hidden = false,
  } = cellNode as TableCellElement
  const selected = TableCursor.isSelected(editor, cellNode)

  // ------------------ 不是第一行，直接渲染 <td> ------------------
  if (!isFirstRow) {
    return h(
      'td',
      {
        attrs: {
          colSpan: colSpan,
          rowSpan: rowSpan,
          'data-block-type': 'table-cell',
        },
        class: {
          'w-e-selected': selected, // 仅当 selected 为 true 时添加类名
        },
        style: { display: hidden ? 'none' : '' },
      },
      children // 这里的 children 可以是一个 VNode 或数组
    )
  }

  // ------------------ 是第一行：1. 判断 th ；2. 拖拽列宽 ------------------
  const Tag = isHeader ? 'th' : 'td'

  const vnode = h(
    Tag,
    {
      attrs: {
        colSpan: colSpan,
        rowSpan: rowSpan,
        'data-block-type': 'table-cell',
      },
      class: {
        'w-e-selected': selected, // 仅当 selected 为 true 时添加类名
      },
      style: {
        display: hidden ? 'none' : '', // 如果 hidden 为 true，则设置 display: none
      },
    },
    children // 子节点
  )

  return vnode
}

export default renderTableCell
