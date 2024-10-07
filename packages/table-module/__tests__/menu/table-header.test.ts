import * as core from '@wangeditor-next/core'
import * as slate from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import { TABLE_HEADER_SVG } from '../../src/constants/svg'
import locale from '../../src/locale/zh-CN'
import TableHeader from '../../src/module/menu/TableHeader'

function setEditorSelection(
  editor: core.IDomEditor,
  selection: slate.Selection = {
    anchor: { path: [0, 0], offset: 0 },
    focus: { path: [0, 0], offset: 0 },
  },
) {
  editor.selection = selection
}
describe('Table Module Table Header Menu', () => {
  test('it should create TableHeader object', () => {
    const tableHeaderMenu = new TableHeader()

    expect(typeof tableHeaderMenu).toBe('object')
    expect(tableHeaderMenu.tag).toBe('button')
    expect(tableHeaderMenu.iconSvg).toBe(TABLE_HEADER_SVG)
    expect(tableHeaderMenu.title).toBe(locale.tableModule.header)
  })

  test('getValue should get falsy value if editor selected node is not table', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => null)

    expect(tableHeaderMenu.getValue(editor)).toBeFalsy()
  })

  test('isActive should get falsy value if editor selected node is not table', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => null)

    expect(tableHeaderMenu.isActive(editor)).toBeFalsy()
  })

  test('isDisabled should get truthy value if editor selection is null', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    editor.selection = null
    expect(tableHeaderMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get truthy value if editor selection is collapsed', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    setEditorSelection(editor)

    vi.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => false)

    expect(tableHeaderMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get truthy value if editor current selected node is not table cell', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    setEditorSelection(editor)

    vi.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => true)
    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => null)

    expect(tableHeaderMenu.isDisabled(editor)).toBeTruthy()
  })

  test('isDisabled should get falsy value if editor current selected node is table cell', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    setEditorSelection(editor)

    vi.spyOn(slate.Range, 'isCollapsed').mockImplementation(() => true)
    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => ({}) as any)

    expect(tableHeaderMenu.isDisabled(editor)).toBeFalsy()
  })

  test('exec should return directly if menu is disabled', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    setEditorSelection(editor, null)

    expect(tableHeaderMenu.exec(editor, '')).toBeUndefined()
  })

  test('exec should return directly if current selected node is not table', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    vi.spyOn(tableHeaderMenu, 'isDisabled').mockReturnValue(false)
    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => null)

    expect(tableHeaderMenu.exec(editor, '')).toBeUndefined()
  })

  test('exec should invoke setNodes to set table header if current selected node table', () => {
    const tableHeaderMenu = new TableHeader()
    const editor = createEditor()

    vi.spyOn(tableHeaderMenu, 'isDisabled').mockReturnValue(false)
    vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockImplementation(() => ({
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [
            { type: 'table-cell', children: [] },
            { type: 'table-cell', children: [] },
          ],
        },
        {
          type: 'table-row',
          children: [
            { type: 'table-cell', children: [] },
            { type: 'table-cell', children: [] },
          ],
        },
      ],
    }))

    const fn = vi.fn()

    vi.spyOn(slate.Transforms, 'setNodes').mockImplementation(fn)
    vi.spyOn(core.DomEditor, 'findPath').mockImplementation(() => [0, 1])

    tableHeaderMenu.exec(editor, '')

    expect(fn).toBeCalledTimes(2)
  })
})
