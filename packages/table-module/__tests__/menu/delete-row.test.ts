import * as core from '@wangeditor-next/core'
import * as slate from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import { DEL_ROW_SVG } from '../../src/constants/svg'
import locale from '../../src/locale/zh-CN'
import DeleteRow from '../../src/module/menu/DeleteRow'
import * as utils from '../../src/utils'

jest.mock('../../src/utils', () => ({
  filledMatrix: jest.fn(),
}))
const mockedUtils = utils as jest.Mocked<typeof utils>

function setEditorSelection(
  editor: core.IDomEditor,
  selection: slate.Selection = {
    anchor: { path: [0, 0], offset: 0 },
    focus: { path: [0, 0], offset: 0 },
  },
) {
  editor.selection = selection
}
describe('Table Module Delete Row Menu', () => {
  test('it should create DeleteRow object', () => {
    const deleteRowMenu = new DeleteRow()

    expect(typeof deleteRowMenu).toBe('object')
    expect(deleteRowMenu.tag).toBe('button')
    expect(deleteRowMenu.iconSvg).toBe(DEL_ROW_SVG)
    expect(deleteRowMenu.title).toBe(locale.tableModule.deleteRow)
  })

  test('it should get empty string if invoke getValue method', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    expect(deleteRowMenu.getValue(editor)).toBe('')
  })

  test('it should get falsy value if invoke isActive method', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    expect(deleteRowMenu.isActive(editor)).toBeFalsy()
  })

  test('isDisabled should get truthy value if editor selection is null', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    editor.selection = null
    expect(deleteRowMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get truthy value if editor selection is collapsed', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    setEditorSelection(editor)

    jest.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => false)

    expect(deleteRowMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get truthy value if editor current selected node is not table cell', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    setEditorSelection(editor)

    jest.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => true)
    jest.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => null)

    expect(deleteRowMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get falsy value if editor current selected node is table cell', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    setEditorSelection(editor)

    jest.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => true)
    jest.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => ({} as any))

    expect(deleteRowMenu.isDisabled(editor)).toBeFalsy()
  })

  test('exec should return directly if menu is disabled', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    setEditorSelection(editor, null)

    expect(deleteRowMenu.exec(editor, '')).toBeUndefined()
  })

  test('exec should invoke removeNodes method to remove whole table if menu is not disabled and table row length less than 1', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    jest.spyOn(deleteRowMenu, 'isDisabled').mockImplementation(() => false)
    jest.spyOn(core.DomEditor, 'getParentNode').mockImplementation(() => ({
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [],
        },
      ],
    }))

    const path = [0, 1]
    const fn = function* a() {
      yield [
        {
          type: 'table-cell',
          children: [],
        } as slate.Element,
        path,
      ] as slate.NodeEntry<slate.Element>
    }

    jest.spyOn(slate.Editor, 'nodes').mockReturnValue(fn())
    const removeNodesFn = jest.fn()

    jest.spyOn(slate.Transforms, 'removeNodes').mockImplementation(removeNodesFn)

    deleteRowMenu.exec(editor, '')
    expect(removeNodesFn).toBeCalled()
  })

  test('exec should invoke removeNodes method to remove current row if menu is not disabled and table row length greater than 1', () => {
    const deleteRowMenu = new DeleteRow()
    const editor = createEditor()

    jest.spyOn(deleteRowMenu, 'isDisabled').mockImplementation(() => false)
    jest.spyOn(core.DomEditor, 'getParentNode').mockImplementation(() => ({
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [],
        },
        {
          type: 'table-row',
          children: [],
        },
      ],
    }))

    const path = [0, 0, 0]
    const fn = function* a() {
      yield [
        {
          type: 'table-cell',
          children: [],
        } as slate.Element,
        path,
      ] as slate.NodeEntry<slate.Element>
    }

    jest.spyOn(slate.Editor, 'nodes').mockImplementation(() => fn())
    mockedUtils.filledMatrix.mockImplementation(() => {
      return [
        [
          [
            [{ type: 'table-cell', children: [{ text: '' }], isHeader: false }, [0, 0, 0]],
            {
              rtl: 1, ltr: 1, ttb: 1, btt: 1,
            },
          ],
          [
            [{ type: 'table-cell', children: [{ text: '' }], isHeader: false }, [0, 0, 1]],
            {
              rtl: 1, ltr: 1, ttb: 1, btt: 1,
            },
          ],
        ],
        [
          [
            [{ type: 'table-cell', children: [{ text: '' }] }, [0, 1, 0]],
            {
              rtl: 1, ltr: 1, ttb: 1, btt: 1,
            },
          ],
          [
            [{ type: 'table-cell', children: [{ text: '' }] }, [0, 1, 1]],
            {
              rtl: 1, ltr: 1, ttb: 1, btt: 1,
            },
          ],
        ],
      ]
    })
    const removeNodesFn = jest.fn()

    jest.spyOn(slate.Transforms, 'removeNodes').mockImplementation(removeNodesFn)

    deleteRowMenu.exec(editor, '')
    expect(removeNodesFn).toBeCalledWith(editor, { at: path })
  })
})
