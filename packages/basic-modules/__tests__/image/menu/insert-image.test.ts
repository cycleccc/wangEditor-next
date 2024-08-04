/**
 * @description insert image menu test
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'
import createEditor from '../../../../../tests/utils/create-editor'
import InsertImage from '../../../src/modules/image/menu/InsertImage'
import { waitFor } from '@testing-library/dom'
import * as helper from '../../../src/modules/image/helper'

// 在测试文件中
beforeEach(() => {
  jest.spyOn(helper, 'insertImageNode').mockImplementation(jest.fn())
})

describe('insert image menu', () => {
  const menu = new InsertImage()
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

  it('get value', () => {
    expect(menu.getValue(editor)).toBe('')
  })

  it('is active', () => {
    expect(menu.isActive(editor)).toBeFalsy()
  })

  it('is disabled', () => {
    editor.deselect()
    expect(menu.isDisabled(editor)).toBeTruthy()

    editor.select(startLocation)
    expect(menu.isDisabled(editor)).toBeFalsy()

    editor.insertText('xxx')
    editor.select([]) // 全选文字
    expect(menu.isDisabled(editor)).toBeTruthy() // 非折叠选区，则不可用

    editor.select(startLocation)
    Transforms.setNodes(editor, { type: 'header1' })
    expect(menu.isDisabled(editor)).toBeTruthy() // header 中不可用

    Transforms.setNodes(editor, { type: 'blockquote' })
    expect(menu.isDisabled(editor)).toBeTruthy() // blockquote 中不可用
  })

  it('get modal position node', () => {
    editor.select(startLocation)
    expect(menu.getModalPositionNode(editor)).toBeNull()
  })

  it('get modal content elem', () => {
    const elem = menu.getModalContentElem(editor)
    expect(elem.tagName).toBe('DIV')

    // insertImage 在 helper.test.ts 中测试
  })

  it('should call insertImage on button click', () => {
    const spy = jest.spyOn(menu as any, 'insertImage')

    // Generate modal content and simulate button click
    const elem = menu.getModalContentElem(editor)
    expect(elem).not.toBeNull()

    // Non-null assertion for button
    const button = elem.querySelector(`#${(menu as any).buttonId}`) as HTMLButtonElement
    expect(button).not.toBeNull()

    // Non-null assertion for input fields
    const srcInput = elem.querySelector(`#${(menu as any).srcInputId}`) as HTMLInputElement
    const altInput = elem.querySelector(`#${(menu as any).altInputId}`) as HTMLInputElement
    const hrefInput = elem.querySelector(`#${(menu as any).hrefInputId}`) as HTMLInputElement
    expect(srcInput).not.toBeNull()
    expect(altInput).not.toBeNull()
    expect(hrefInput).not.toBeNull()

    // Set input values
    srcInput.value = 'https://example.com/new-image.jpg'
    altInput.value = 'new alt text'
    hrefInput.value = 'https://example.com'

    // Force a DOM update (if necessary)
    document.body.appendChild(elem)

    // Simulate button click
    editor.deselect()
    button!.click()

    expect(spy).toHaveBeenCalledWith(
      expect.any(Object),
      'https://example.com/new-image.jpg',
      'new alt text',
      'https://example.com'
    )

    editor.select(startLocation)
    button!.click()
  })

  it('focus input asynchronously', async () => {
    menu.getModalContentElem(editor)
    const inputSrc = document.getElementById((menu as any).srcInputId) as HTMLInputElement
    jest.spyOn(inputSrc, 'focus')

    await waitFor(() => {
      expect(inputSrc.focus).toHaveBeenCalled()
    })
  })
})
