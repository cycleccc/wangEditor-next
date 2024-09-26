/**
 * @description blockquote plugin test
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'

import createEditor from '../../../../tests/utils/create-editor'
import { BlockQuoteElement } from '../../src/modules/blockquote/custom-types'
import withBlockquote from '../../src/modules/blockquote/plugin'

describe('blockquote plugin', () => {
  let editor: any = withBlockquote(createEditor())
  let startLocation: any = Editor.start(editor, [])

  beforeEach(() => {
    editor = withBlockquote(
      createEditor({
        content: [{ type: 'blockquote', children: [{ text: 'hello\n' }] }],
      }),
    )
    startLocation = Editor.start(editor, [])
  })
  afterEach(() => {
    editor = null
    startLocation = null
  })

  it('insert break', () => {
    // 无选区换行
    editor.deselect()
    editor.insertBreak()
    let pList = editor.getElemsByType('paragraph')

    expect(pList.length).toBe(0)

    editor.select({ path: [0, 0], offset: 5 })
    editor.insertBreak()
    let bqList = editor.getElemsByType('blockquote') as unknown as BlockQuoteElement[]
    let text = bqList[0].children[0].text

    expect(text).toBe('hello\n\n')

    editor.select({ path: [0, 0], offset: 6 })
    editor.insertBreak()
    bqList = editor.getElemsByType('blockquote') as unknown as BlockQuoteElement[]
    text = bqList[0].children[0].text
    expect(text).toBe('hello')

    editor.insertBreak()
    pList = editor.getElemsByType('paragraph')
    expect(pList.length).toBe(2)
  })

  it('insert break new line', () => {
    editor.select({ path: [0, 0], offset: 6 })
    editor.insertBreak()
    const bqList = editor.getElemsByType('blockquote') as unknown as BlockQuoteElement[]
    const text = bqList[0].children[0].text

    expect(text).toBe('hello')
  })
})
