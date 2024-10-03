/**
 * @description paragraph plugin test
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/core'
import { Editor, Point, Transforms } from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import withParagraph from '../../src/modules/paragraph/plugin'

let editor: IDomEditor
let startLocation: Point

describe('paragraph plugin', () => {
  beforeEach(() => {
    editor = withParagraph(createEditor())
    startLocation = Editor.start(editor, [])
  })

  it('delete to clear text', () => {
    editor.select(startLocation)

    // default delete
    editor.deleteBackward('character') // 向后删除

    Transforms.setNodes(editor, { type: 'header1' }) // 设置 header
    editor.deleteBackward('character') // 向后删除
    const selectedParagraph1 = DomEditor.getSelectedNodeByType(editor, 'paragraph')

    expect(selectedParagraph1).not.toBeNull() // 执行删除后，header 变为 paragraph

    // default delete
    editor.deleteForward('character') // 向前删除

    Transforms.setNodes(editor, { type: 'blockquote' }) // 设置 blockquote
    editor.deleteForward('character') // 向前删除
    const selectedParagraph2 = DomEditor.getSelectedNodeByType(editor, 'paragraph')

    expect(selectedParagraph2).not.toBeNull() // 执行删除后，header 变为 paragraph
  })
})
