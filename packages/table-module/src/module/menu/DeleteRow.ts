/**
 * @description del row menu
 * @author wangfupeng
 */

import {
  DomEditor, IButtonMenu, IDomEditor, t,
} from '@wangeditor-next/core'
import {
  Editor, Node, Path, Range, Transforms,
} from 'slate'

import { DEL_ROW_SVG } from '../../constants/svg'
import { filledMatrix } from '../../utils'
import { TableCellElement } from '../custom-types'

class DeleteRow implements IButtonMenu {
  readonly title = t('tableModule.deleteRow')

  readonly iconSvg = DEL_ROW_SVG

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

    if (selection == null) { return true }
    if (!Range.isCollapsed(selection)) { return true }

    const rowNode = DomEditor.getSelectedNodeByType(editor, 'table-row')

    if (rowNode == null) {
      // 选区未处于 table row node ，则禁用
      return true
    }
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) { return }

    const [rowEntry] = Editor.nodes(editor, {
      match: n => DomEditor.checkNodeType(n, 'table-row'),
      universal: true,
    })
    const [rowNode, rowPath] = rowEntry

    const tableNode = DomEditor.getParentNode(editor, rowNode)
    const rowsLength = tableNode?.children.length || 0

    if (rowsLength <= 1) {
      // row 只有一行，则删掉整个表格
      Transforms.removeNodes(editor, { mode: 'highest' })
      return
    }

    // row > 1 行，则删掉这一行
    const [cellEntry] = Editor.nodes(editor, {
      match: n => DomEditor.checkNodeType(n, 'table-cell'),
      universal: true,
    })
    const [, cellPath] = cellEntry
    const matrix = filledMatrix(editor)
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
      for (let y = 0; y < matrix[trIndex].length; y++) {
        const [[{ hidden }], { ttb, btt }] = matrix[trIndex][y]

        // 寻找跨行行为
        if (ttb > 1 || btt > 1) {
          // 找到显示中 rowSpan 节点
          const [[{ rowSpan = 1, colSpan = 1 }, path]] = matrix[trIndex - (ttb - 1)][y]
          // 如果当前选中节点为隐藏节点，则向上寻找处理 rowSpan 逻辑

          if (hidden) {
            Transforms.setNodes<TableCellElement>(
              editor,
              {
                rowSpan: Math.max(rowSpan - 1, 1),
                colSpan,
              },
              { at: path },
            )
          } else {
            const [[, belowPath]] = matrix[trIndex + 1][y]

            Transforms.setNodes<TableCellElement>(
              editor,
              {
                rowSpan: rowSpan - 1,
                colSpan,
                hidden: false,
              },
              { at: belowPath },
            )

            // 移动单元格 文本、图片等元素
            for (const [, childPath] of Node.children(editor, path, { reverse: true })) {
              Transforms.moveNodes(editor, {
                to: [...belowPath, 0],
                at: childPath,
              })
            }
          }
        }
      }

      Transforms.removeNodes(editor, { at: rowPath })
    })
  }
}

export default DeleteRow
