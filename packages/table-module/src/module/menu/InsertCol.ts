/**
 * @description insert col menu
 * @author wangfupeng
 */

import { Editor, Transforms, Range, Node, Path } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, t } from '@wangeditor-next/core'
import { ADD_COL_SVG } from '../../constants/svg'
import { TableCellElement, TableElement } from '../custom-types'
import { isTableWithHeader } from '../helpers'
import { filledMatrix } from '../../utils'

class InsertCol implements IButtonMenu {
  readonly title = t('tableModule.insertCol')
  readonly iconSvg = ADD_COL_SVG
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
    const [selectedCellNode, selectedCellPath] = cellEntry

    const rowNode = DomEditor.getParentNode(editor, selectedCellNode)
    if (rowNode == null) return
    const tableNode = DomEditor.getParentNode(editor, rowNode) as TableElement
    if (tableNode == null) return

    const matrix = filledMatrix(editor)
    let tdIndex = 0
    out: for (let x = 0; x < matrix.length; x++) {
      for (let y = 0; y < matrix[x].length; y++) {
        const [[, path]] = matrix[x][y]

        if (Path.equals(selectedCellPath, path)) {
          tdIndex = y
          break out
        }
      }
    }

    Editor.withoutNormalizing(editor, () => {
      const exitMerge: number[] = []

      for (let x = 0; x < matrix.length; x++) {
        const [, { ltr, rtl }] = matrix[x][tdIndex]

        // 向左找到 1 元素为止
        if (ltr > 1 || rtl > 1) {
          if (rtl == 1) continue

          const [[element, path]] = matrix[x][tdIndex - (rtl - 1)]
          const colSpan = element.colSpan || 1

          exitMerge.push(x)
          if (!element.hidden) {
            Transforms.setNodes<TableCellElement>(
              editor,
              {
                colSpan: colSpan + 1,
              },
              { at: path }
            )
          }
        }
      }

      // 遍历所有 rows ，挨个添加 cell
      for (let x = 0; x < matrix.length; x++) {
        const newCell: TableCellElement = {
          type: 'table-cell',
          hidden: exitMerge.includes(x),
          children: [{ text: '' }],
        }
        if (x === 0 && isTableWithHeader(tableNode)) {
          newCell.isHeader = true
        }
        const [[, insertPath]] = matrix[x][tdIndex]
        Transforms.insertNodes(editor, newCell, { at: insertPath })
      }

      // 需要调整 columnWidths
      const [tableEntry] = Editor.nodes(editor, {
        match: n => DomEditor.checkNodeType(n, 'table'),
        universal: true,
      })
      const [elemNode, tablePath] = tableEntry
      const { columnWidths = [] } = elemNode as TableElement
      const adjustColumnWidths = [...columnWidths]
      adjustColumnWidths.splice(tdIndex, 0, 60)

      Transforms.setNodes(editor, { columnWidths: adjustColumnWidths } as TableElement, {
        at: tablePath,
      })
    })
  }
}

export default InsertCol
