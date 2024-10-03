/**
 * @description header plugin test
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import withHeader from '../../src/modules/header/plugin'

describe('header plugin', () => {
  const editor = withHeader(createEditor())
  const startLocation = Editor.start(editor, [])

  it('header break', () => {
    editor.select(startLocation)

    editor.insertBreak()
    editor.insertText('hello')
    Transforms.setNodes(editor, { type: 'header1', children: [] })
    editor.select({ path: [1, 0], offset: 2 })
    editor.insertBreak() // 在 header 换行，会生成 p
    editor.select({ path: [1, 0], offset: 2 })
    editor.insertBreak()

    const paragraphs = editor.getElemsByTypePrefix('paragraph')

    expect(paragraphs.length).toBe(2)
  })
})
