/**
 * @description del col menu
 * @author wangfupeng
 */

import { Editor, Transforms, Range, Node, Path } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, t } from '@wangeditor-next/core'
import { DEL_COL_SVG } from '../../constants/svg'
import { filledMatrix } from '../../utils'
import { TableCellElement, TableElement } from '../custom-types'

class DeleteCol implements IButtonMenu {
  readonly title = t('tableModule.deleteCol')
  readonly iconSvg = DEL_COL_SVG
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

    const cellNode = DomEditor.getSelectedNodeByType(editor, 'table-cell')
    if (cellNode == null) {
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

    // 如果只有一列，则删除整个表格
    const rowNode = DomEditor.getParentNode(editor, selectedCellNode)
    const colLength = rowNode?.children.length || 0
    if (!rowNode || colLength <= 1) {
      Transforms.removeNodes(editor, { mode: 'highest' }) // 删除整个表格
      return
    }

    // ------------------------- 不只有 1 列，则继续 -------------------------

    const tableNode = DomEditor.getParentNode(editor, rowNode)
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
      for (let x = 0; x < matrix.length; x++) {
        const [[{ hidden }], { rtl, ltr }] = matrix[x][tdIndex]

        if (rtl > 1 || ltr > 1) {
          // 找到显示中 colSpan 节点
          const [[{ rowSpan = 1, colSpan = 1 }, path]] = matrix[x][tdIndex - (rtl - 1)]

          if (hidden) {
            Transforms.setNodes<TableCellElement>(
              editor,
              {
                rowSpan,
                colSpan: Math.max(colSpan - 1, 1),
              },
              { at: path }
            )
          } else {
            const [[, rightPath]] = matrix[x][tdIndex + 1]
            Transforms.setNodes<TableCellElement>(
              editor,
              {
                rowSpan,
                colSpan: colSpan - 1,
                hidden: false,
              },
              { at: rightPath }
            )
            // 移动单元格 文本、图片等元素
            for (const [, childPath] of Node.children(editor, path, { reverse: true })) {
              Transforms.moveNodes(editor, {
                to: [...rightPath, 0],
                at: childPath,
              })
            }
          }
        }
      }

      // 挨个删除 cell
      for (let x = 0; x < matrix.length; x++) {
        const [[, path]] = matrix[x][tdIndex]
        Transforms.removeNodes(editor, { at: path })
      }

      // 需要调整 columnWidths
      const [tableEntry] = Editor.nodes(editor, {
        match: n => DomEditor.checkNodeType(n, 'table'),
        universal: true,
      })
      const [elemNode, tablePath] = tableEntry
      const { columnWidths = [] } = elemNode as TableElement
      const adjustColumnWidths = [...columnWidths]
      adjustColumnWidths.splice(tdIndex, 1)

      Transforms.setNodes(editor, { columnWidths: adjustColumnWidths } as TableElement, {
        at: tablePath,
      })
    })

  }
}

export default DeleteCol
