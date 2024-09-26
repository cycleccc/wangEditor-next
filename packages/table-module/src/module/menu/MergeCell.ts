import { IButtonMenu, IDomEditor, t } from '@wangeditor-next/core'
import {
  Editor, Node, Path, Transforms,
} from 'slate'

import { MERGE_CELL_SVG } from '../../constants/svg'
import {
  CellElement, filledMatrix, hasCommon, isOfType,
} from '../../utils'
import { TableCellElement } from '../custom-types'
import { TableCursor } from '../table-cursor'
import { EDITOR_TO_SELECTION } from '../weak-maps'

class MergeCell implements IButtonMenu {
  readonly title = t('tableModule.mergeCell')

  readonly iconSvg = MERGE_CELL_SVG

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
    return !this.canMerge(editor)
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) { return }

    this.merge(editor)
    // 释放选区
    TableCursor.unselect(editor)
  }

  /**
   * Checks if the current selection can be merged. Merging is not possible when any of the following conditions are met:
   * - The selection is empty.
   * - The selection is not within the same "thead", "tbody," or "tfoot" section.
   * @returns {boolean} `true` if the selection can be merged, otherwise `false`.
   */
  canMerge(editor: Editor): boolean {
    const matrix = EDITOR_TO_SELECTION.get(editor)

    // cannot merge when selection is empty
    if (!matrix || !matrix.length) {
      return false
    }

    // prettier-ignore
    const [[, lastPath]] = matrix[matrix.length - 1][matrix[matrix.length - 1].length - 1]
    const [[, firstPath]] = matrix[0][0]

    // cannot merge when selection is not in common section
    if (!hasCommon(editor, [firstPath, lastPath], 'table')) {
      return false
    }

    return true
  }

  /**
   * Merges the selected cells in the table.
   * @returns void
   */
  merge(editor: Editor): void {
    if (!this.canMerge(editor)) {
      return
    }

    const selection = EDITOR_TO_SELECTION.get(editor)

    if (!selection || !selection.length) {
      return
    }

    const [[, basePath]] = selection[0][0]
    const [[, lastPath]] = Node.children(editor, basePath, { reverse: true })

    const matrix = filledMatrix(editor, { at: basePath })

    Editor.withoutNormalizing(editor, () => {
      let rowSpan = 0
      let colSpan = 0

      for (let x = selection.length - 1; x >= 0; x--, rowSpan++) {
        colSpan = 0
        for (let y = selection[x].length - 1; y >= 0; y--, colSpan++) {
          const [[, path], { ttb }] = selection[x][y]

          // skip first cell and "fake" cells which belong to a cell with a `rowspan`
          if (Path.equals(basePath, path) || ttb > 1) {
            continue
          }

          // prettier-ignore
          for (const [, childPath] of Node.children(editor, path, { reverse: true })) {
            Transforms.moveNodes(editor, {
              to: Path.next(lastPath),
              at: childPath,
            })
          }

          const [[, trPath]] = Editor.nodes(editor, {
            match: isOfType(editor, 'tr'),
            at: path,
          })

          const [, sibling] = Node.children(editor, trPath)

          if (sibling) {
            /**
             * 删除节点调整成隐藏节点
             * 隐藏节点不会影响 table 布局
             */
            Transforms.setNodes(editor, { hidden: true } as TableCellElement, { at: path })
            continue
          }
        }
      }

      Transforms.setNodes<CellElement>(editor, { rowSpan, colSpan }, { at: basePath })
    })
  }
}

export default MergeCell
