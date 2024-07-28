/**
 * @description list plugin test
 * @author wangfupeng
 */

import withList from '../src/module/plugin'
import createEditor from '../../../tests/utils/create-editor'

describe('list plugin test', () => {
  it('insert tab - increase level', () => {
    const listItem = { type: 'list-item', children: [{ text: 'hello' }] }
    let editor = createEditor({
      content: [listItem],
    })
    editor = withList(editor) // 使用插件
    editor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头

    editor.handleTab() // tab

    const children = editor.children
    expect(children).toEqual([
      {
        ...listItem,
        level: 1, // 增加 level
      },
    ])
  })

  it('insert delete - decrease level', () => {
    // 没有选区
    let emptyEditor = createEditor()
    emptyEditor = withList(emptyEditor) // 使用插件
    expect(emptyEditor.children).toEqual([{ type: 'paragraph', children: [{ text: '' }] }])

    //没有 list
    emptyEditor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头
    emptyEditor.deleteBackward('character')
    expect(emptyEditor.children).toEqual([{ type: 'paragraph', children: [{ text: '' }] }])

    //单个 list
    const listItem = { type: 'list-item', children: [{ text: 'hello' }], level: 1 }
    let editor = createEditor({
      content: [listItem],
    })
    editor = withList(editor) // 使用插件
    editor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头

    editor.deleteBackward('character') // delete
    expect(editor.children).toEqual([
      {
        ...listItem,
        level: 0, // 减少 level
      },
    ])

    // 选区为 expanded
    editor.select([]) // 全选
    editor.deleteForward('character') // delete
    expect(editor.children).toEqual([
      {
        ...listItem,
        level: 0,
      },
    ])

    // 删除list变为空行
    editor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头
    editor.deleteBackward('character')
    expect(emptyEditor.children).toEqual([{ type: 'paragraph', children: [{ text: '' }] }])
  })

  it('insert enter - increase level', () => {
    //没有 list
    let emptyEditor = createEditor()
    emptyEditor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头
    emptyEditor.insertBreak()
    expect(emptyEditor.children).toEqual([
      { type: 'paragraph', children: [{ text: '' }] },
      { type: 'paragraph', children: [{ text: '' }] },
    ])
    const listItem = { type: 'list-item', children: [{ text: '' }] }
    let editor = createEditor({
      content: [listItem],
    })
    editor = withList(editor) // 使用插件
    editor.select({ path: [0, 0], offset: 0 }) // 选中 list-item 开头

    editor.insertBreak()
    expect(editor.children).toEqual([{ type: 'paragraph', children: [{ text: '' }] }])
  })

  it('兼容之前的 JSON 格式', () => {
    const listItem = { type: 'list-item', children: [{ text: 'hello' }] }
    let editor = createEditor({
      // 之前的 JSON 格式
      content: [
        {
          type: 'bulleted-list',
          children: [listItem],
        },
      ],
    })
    editor = withList(editor) // 使用插件

    expect(editor.children).toEqual([listItem])
  })
})
