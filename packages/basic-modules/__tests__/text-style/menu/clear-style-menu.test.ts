/**
 * @description clear style menu test
 * @author wangfupeng
 */

import { Editor } from 'slate'
import createEditor from '../../../../../tests/utils/create-editor'
import ClearStyleMenu from '../../../src/modules/text-style/menu/ClearStyleMenu'

describe('clear style menu', () => {
  let editor = createEditor()
  const startLocation = Editor.start(editor, [])
  const menu = new ClearStyleMenu()

  afterEach(() => {
    editor.select(startLocation)
    editor.clear()
  })

  it('get value', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('is active', () => {
    expect(menu.isActive(editor)).toBeFalsy()
  })

  it('is disabled', () => {
    editor.select(startLocation)
    expect(menu.isDisabled(editor)).toBeFalsy()
  })

  it('exec', () => {
    editor.select(startLocation)
    editor.insertText('hello')

    editor.select([])
    editor.addMark('bold', true)
    editor.addMark('italic', true)

    menu.exec(editor, '') // 清空样式

    const marks = Editor.marks(editor) as any
    expect(marks.bold).toBeUndefined()
    expect(marks.italic).toBeUndefined()
  })
})
