import { Editor, Location, NodeEntry } from 'slate'
import { NodeEntryWithContext, CellElement } from './types'
import { isOfType } from './is-of-type'

/** Generates a matrix for each table section (`thead`, `tbody`, `tfoot`) */
export function* matrices(
  editor: Editor,
  options: { at?: Location } = {}
): Generator<NodeEntry<CellElement>[][]> {
  const [table] = Editor.nodes(editor, {
    match: isOfType(editor, 'table'),
    at: options.at,
  })

  if (!table) {
    return []
  }

  const [, tablePath] = table

  for (const [, path] of Editor.nodes(editor, {
    // match: isOfType(editor, "thead", "tbody", "tfoot"),
    match: isOfType(editor, 'table'),
    at: tablePath,
  })) {
    const matrix: NodeEntry<CellElement>[][] = []

    for (const [, trPath] of Editor.nodes(editor, {
      match: isOfType(editor, 'tr'),
      at: path,
    })) {
      matrix.push([
        ...Editor.nodes<CellElement>(editor, {
          match: isOfType(editor, 'th', 'td'),
          at: trPath,
        }),
      ])
    }

    yield matrix
  }
}

export function filledMatrix(
  editor: Editor,
  options: { at?: Location } = {}
): NodeEntryWithContext[][] {
  const filled: NodeEntryWithContext[][] = []

  // Expand each section separately to avoid sections collapsing into each other.
  for (const matrix of matrices(editor, { at: options.at })) {
    const filledSection: NodeEntryWithContext[][] = []

    for (let x = 0; x < matrix.length; x++) {
      if (!filledSection[x]) {
        filledSection[x] = []
      }

      for (let y = 0; y < matrix[x].length; y++) {
        const [{ rowSpan = 1, colSpan = 1 }] = matrix[x][y]

        for (let c = 0, occupied = 0; c < colSpan + occupied; c++) {
          for (let r = 0; r < rowSpan; r++) {
            if (!filledSection[x + r]) {
              filledSection[x + r] = []
            }
            if (filledSection[x + r][y + c]) {
              continue
            }
            filledSection[x + r][y + c] = [
              matrix[x + r][y + c],
              {
                rtl: c - occupied + 1,
                ltr: colSpan - c + occupied,
                ttb: r + 1,
                btt: rowSpan - r,
              },
            ]
          }
        }
      }
    }

    filled.push(...filledSection)
  }

  return filled
}
