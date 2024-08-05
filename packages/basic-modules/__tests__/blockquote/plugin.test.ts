/**
 * @description blockquote plugin test
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'
import createEditor from '../../../../tests/utils/create-editor'
import withBlockquote from '../../src/modules/blockquote/plugin'

describe('blockquote plugin', () => {
  let editor = withBlockquote(createEditor())
  let startLocation = Editor.start(editor, [])

  beforeEach(() => {
    editor = withBlockquote(createEditor())
    startLocation = Editor.start(editor, [])
  })

  it('insert break', () => {
    // 无选区换行
    editor.deselect()
    editor.insertBreak()
    let pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(1)

    // 有选区无 blockquote 换行
    editor.select(startLocation)
    editor.insertBreak()
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(2)
    editor.deleteBackward('character')
    // @ts-ignore
    Transforms.setNodes(editor, { type: 'blockquote' }) // 设置 blockquote
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(0)
    editor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头
    editor.insertText('hello')
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(0)

    editor.insertBreak() // 再一次换行，生成 p
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(1)

    editor.insertBreak() // 再一次换行，无 set 记录 path , 退出 bloackquote 换行
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(2)
  })
})
