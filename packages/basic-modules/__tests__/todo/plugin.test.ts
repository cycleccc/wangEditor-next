/**
 * @description todo plugin test
 * @author wangfupeng
 */

import createEditor from '../../../../tests/utils/create-editor'
import withTodo from '../../src/modules/todo/plugin'

describe('todo - plugin', () => {
  it('delete backward', () => {
    const editor = withTodo(
      createEditor({
        content: [{ type: 'todo', children: [{ text: '' }] }],
      }),
    )

    // test without selection
    editor.deleteBackward('character')
    editor.select({
      path: [0, 0],
      offset: 0,
    })

    const todoElems1 = editor.getElemsByType('todo')

    expect(todoElems1.length).toBe(1)

    editor.deleteBackward('character')

    const todoElems2 = editor.getElemsByType('todo')

    expect(todoElems2.length).toBe(0)
  })
})
