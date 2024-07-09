import { Editor, Path, Transforms } from 'slate'
import { IButtonMenu, IDomEditor, t } from '@wangeditor-next/core'
import { SPLIT_CELL_SVG } from '../../constants/svg'
import { EDITOR_TO_SELECTION } from '../weak-maps'
import { filledMatrix, isOfType, CellElement } from '../../utils'
// import { DEFAULT_WITH_TABLE_OPTIONS } from "../../utils/options";

class SplitCell implements IButtonMenu {
  readonly title = t('tableModule.splitCell')
  readonly iconSvg = SPLIT_CELL_SVG
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
    const [td] = Editor.nodes(editor, {
      match: isOfType(editor, 'td'),
    })

    const [{ rowSpan = 1, colSpan = 1 }] = td as CellElement[]

    if (rowSpan > 1 || colSpan > 1) {
      return false
    }

    return true
  }

  exec(editor: IDomEditor, value: string | boolean) {
    if (this.isDisabled(editor)) return

    this.split(editor)
  }

  /**
   * Splits either the cell at the current selection or a specified location. If a range
   * selection is present, all cells within the range will be split.
   * @param {Location} [options.at] - Splits the cell at the specified location. If no
   * location is specified it will split the cell at the current selection
   * @param {boolean} [options.all] - If true, splits all cells in the table
   * @returns void
   */
  split(editor: Editor, options: { at?: Location; all?: boolean } = {}): void {
    const [table, td] = Editor.nodes(editor, {
      match: isOfType(editor, 'table', 'th', 'td'),
      // @ts-ignore
      at: options.at,
    })

    if (!table || !td) {
      return
    }

    const selection = EDITOR_TO_SELECTION.get(editor) || []
    // @ts-ignore
    const matrix = filledMatrix(editor, { at: options.at })

    // const { blocks } = DEFAULT_WITH_TABLE_OPTIONS;

    Editor.withoutNormalizing(editor, () => {
      for (let x = matrix.length - 1; x >= 0; x--) {
        for (let y = matrix[x].length - 1; y >= 0; y--) {
          const [[, path], context] = matrix[x][y]
          const { ltr: colSpan, rtl, btt: rowSpan, ttb } = context

          if (rtl > 1) {
            // get to the start of the colspan
            y -= rtl - 2
            continue
          }

          if (ttb > 1) {
            continue
          }

          if (rowSpan === 1 && colSpan === 1) {
            continue
          }

          let found = !!options.all

          if (selection.length) {
            outer: for (let i = 0; !options.all && i < selection.length; i++) {
              for (let j = 0; j < selection[i].length; j++) {
                const [[, tdPath]] = selection[i][j]

                if (Path.equals(tdPath, path)) {
                  found = true
                  break outer
                }
              }
            }
          } else {
            const [, tdPath] = td
            if (Path.equals(tdPath, path)) {
              found = true
            }
          }

          if (!found) {
            continue
          }

          const [[section]] = Editor.nodes(editor, {
            match: isOfType(editor, 'table'),
            at: path,
          })

          out: for (let r = 1; r < rowSpan; r++) {
            for (let i = y; i >= 0; i--) {
              const [[, path], { ttb }] = matrix[x + r][i]

              if (ttb == 1) {
                continue
              }

              for (let c = 0; c < colSpan; c++) {
                let [[, nextPath]] = matrix[x + r][i + c]

                Transforms.unsetNodes(editor, ['hidden', 'colSpan', 'rowSpan'], { at: nextPath })
              }
              continue out
            }

          }

          for (let c = 1; c < colSpan; c++) {
            let [[, nextPath]] = matrix[x][y + c]

            Transforms.unsetNodes(editor, ['hidden', 'colSpan', 'rowSpan'], { at: nextPath })
          }

          Transforms.setNodes<CellElement>(editor, { rowSpan: 1, colSpan: 1 }, { at: path })
        }
      }
    })
  }
}

export default SplitCell
