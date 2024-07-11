/**
 * @description insert row menu
 * @author wangfupeng
 */

import { Editor, Transforms, Range, Path } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, t } from '@wangeditor-next/core'
import { ADD_ROW_SVG } from '../../constants/svg'
import { TableRowElement, TableCellElement } from '../custom-types'
import { filledMatrix } from '../../utils'

class InsertRow implements IButtonMenu {
  readonly title = t('tableModule.insertRow')
  readonly iconSvg = ADD_ROW_SVG
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (!Range.isCollapsed(selection)) return true

    const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
    if (tableNode == null) {
      // 选区未处于 table cell node ，则禁用
      return true
    }
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return

    const [cellEntry] = Editor.nodes(editor, {
      match: n => DomEditor.checkNodeType(n, 'table-cell'),
      universal: true,
    })
    const [cellNode, cellPath] = cellEntry

    // 获取 cell length ，即多少列
    const rowNode = DomEditor.getParentNode(editor, cellNode)
    const cellsLength = rowNode?.children.length || 0
    if (cellsLength === 0) return

    const matrix = filledMatrix(editor)
    // 向下插入行为，先找到
    // 当前选区所在的 tr 索引
    let trIndex = 0
    outer: for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        const [[, path]] = matrix[x][y]
        if (!Path.equals(cellPath, path)) {
          continue
        }
        trIndex = x
        break outer
      }
    }

    Editor.withoutNormalizing(editor, () => {
      // 向下添加 tr 索引
      const destIndex = trIndex + 1
      const isWithinBounds = destIndex >= 0 && destIndex < matrix.length
      const exitMerge: number[] = []

      for (let y = 0; isWithinBounds && y < matrix[trIndex].length; y++) {
        const [, { ttb, btt }] = matrix[trIndex][y]

        // 向上找到 1 元素为止
        if (ttb > 1 || btt > 1) {
          if (btt == 1) continue
          const [[element, path]] = matrix[trIndex - (ttb - 1)][y]
          const rowSpan = element.rowSpan || 1

          exitMerge.push(y)
          if (!element.hidden) {
            Transforms.setNodes<TableCellElement>(
              editor,
              {
                rowSpan: rowSpan + 1,
              },
              { at: path }
            )
          }
        }
      }

      // 拼接新的 row
      const newRow: TableRowElement = { type: 'table-row', children: [] }
      for (let i = 0; i < cellsLength; i++) {
        const cell: TableCellElement = {
          type: 'table-cell',
          hidden: exitMerge.includes(i),
          children: [{ text: '' }],
        }
        newRow.children.push(cell)
      }

      // 插入 row
      const rowPath = Path.parent(cellPath) // 获取 tr 的 path
      const newRowPath = Path.next(rowPath)
      Transforms.insertNodes(editor, newRow, { at: newRowPath })
    })
  }
}

export default InsertRow
