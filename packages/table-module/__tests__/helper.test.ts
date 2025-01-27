import * as core from '@wangeditor-next/core'
import * as slate from 'slate'

import createEditor from '../../../tests/utils/create-editor'
import { TableCellElement, TableElement } from '../src/module/custom-types'
import { isCellInFirstRow } from '../src/module/helpers'

function setEditorSelection(
  editor: core.IDomEditor,
  selection: slate.Selection = {
    anchor: { path: [0, 0], offset: 0 },
    focus: { path: [0, 0], offset: 0 },
  },
) {
  editor.selection = selection
}

describe('hasCommon', () => {
  const content = [
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'table',
      width: 'auto',
      children: [
        {
          type: 'table-row',
          children: [
            {
              type: 'table-cell',
              children: [
                {
                  text: '',
                },
              ],
              isHeader: true,
            },
            {
              type: 'table-cell',
              children: [
                {
                  text: '',
                },
              ],
              isHeader: true,
            },
          ],
        },
        {
          type: 'table-row',
          children: [
            {
              type: 'table-cell',
              children: [
                {
                  text: '',
                },
              ],
            },
            {
              type: 'table-cell',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
        },
      ],
      columnWidths: [
        60,
        60,
      ],
      scrollWidth: 120,
      height: 62,
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
  ]

  const editor = createEditor({ content })

  setEditorSelection(editor)

  it('should return true if paths have a common ancestor of type table', () => {
    const result = isCellInFirstRow(editor, (editor.children[1] as TableElement).children[0].children[0])

    expect(result).toBe(true)
    // @Todo: test other cases
    // @ts-ignore
    const result1 = isCellInFirstRow(editor, editor.children[1].children[0])

    expect(result1).toBe(false)
  })
})
