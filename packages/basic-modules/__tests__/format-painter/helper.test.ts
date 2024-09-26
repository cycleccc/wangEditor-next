/**
 * @description format painter helper test
 * @author CodePencil
 */

import { Editor } from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import { clearAllMarks } from '../../src/modules/format-painter/helper'

describe('format painter helper', () => {
  let editor: any
  let startLocation: any

  beforeEach(() => {
    editor = createEditor()
    startLocation = Editor.start(editor, [])
  })

  afterEach(() => {
    editor = null
    startLocation = null
  })

  it('clear all marks ', () => {
    editor.select(startLocation)

    editor.addMark('bold', true)
    editor.addMark('italic', true)

    expect(Editor.marks(editor)).toEqual({ bold: true, italic: true })

    clearAllMarks(editor)

    expect(Editor.marks(editor)).toEqual({})
  })
})
