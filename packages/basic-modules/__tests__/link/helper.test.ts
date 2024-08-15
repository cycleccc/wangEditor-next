/**
 * @description link module helper test
 * @author wangfupeng
 */

import { Editor, Transforms } from 'slate'
import createEditor from '../../../../tests/utils/create-editor'
import { isMenuDisabled, insertLink, updateLink } from '../../src/modules/link/helper'

describe('link module helper', () => {
  let editor: any
  let startLocation: any

  // 自定义校验链接
  function customCheckLinkFn(text: string, url: string): string | boolean | undefined {
    if (text === 'test null') {
      return
    }
    if (url.indexOf('http') !== 0) {
      return '链接必须以 http/https 开头'
    }
    return true
  }

  // 自定义转换链接 url
  function customParseLinkUrl(url: string): string {
    if (url.indexOf('http') !== 0) {
      return `http://${url}`
    }
    return url
  }

  const editorConfig = { MENU_CONF: {}, maxLength: 20 }
  editorConfig.MENU_CONF['insertLink'] = {
    checkLink: customCheckLinkFn,
    parseLinkUrl: customParseLinkUrl,
  }

  beforeEach(() => {
    editor = createEditor({
      config: editorConfig,
    })
    startLocation = Editor.start(editor, [])
  })

  afterEach(() => {
    editor = null
    startLocation = null
  })

  it('menu disable', () => {
    editor.deselect()
    expect(isMenuDisabled(editor)).toBeTruthy()

    editor.select(startLocation)
    expect(isMenuDisabled(editor)).toBeFalsy()

    editor.insertNode({
      type: 'link',
      url: 'https://www.wangeditor.com/',
      children: [{ text: 'xxx' }],
    })
    expect(isMenuDisabled(editor)).toBeTruthy() // 选中 link ，则禁用

    editor.clear()
    editor.insertNode({
      type: 'pre',
      children: [
        {
          type: 'code',
          children: [{ text: 'var' }],
        },
      ],
    })
    expect(isMenuDisabled(editor)).toBeTruthy() // 选中 code-block ，则禁用
  })

  it('insert link with collapsed selection', async () => {
    editor.select(startLocation)

    const url = 'https://cycleccc.github.io/docs/'
    const inValidUrl = 'cycleccc.github.io/docs'

    await insertLink(editor, 'hello', url)
    await insertLink(editor, 'test null', url)
    await insertLink(editor, 'hello', inValidUrl)

    const links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    const linkElem = links[0]
    expect(linkElem.url).toBe(url)
  })

  it('insert link with collapsed max length', async () => {
    editor.select(startLocation)
    editor.insertText('1234456789012')

    editor.select(startLocation)
    const url = 'https://cycleccc.github.io/docs/'

    await insertLink(editor, 'https://cycleccc.github.io/docs/', url)
    await insertLink(editor, 'hello', url)
    const links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    const linkElem = links[0]
    expect(linkElem.url).toBe(url)
  })

  it('insert link with expand selection', async () => {
    editor.select(startLocation)
    editor.insertText('hello')
    Transforms.move(editor, {
      distance: 3, // 选中 3 个字母
      unit: 'character',
    })
    editor.select([]) // 全选

    const url = 'https://cycleccc.github.io/docs/'
    await insertLink(editor, 'hello', url)

    const links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    const linkElem = links[0]
    expect(linkElem.url).toBe(url)
  })

  it('insert link with expand selection not same text', async () => {
    editor.select(startLocation)
    editor.insertText('test')
    Transforms.move(editor, {
      distance: 3, // 选中 3 个字母
      unit: 'character',
    })
    editor.select([]) // 全选

    const url = 'https://cycleccc.github.io/docs/'
    await insertLink(editor, 'hello', url)

    const links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    const linkElem = links[0]
    expect(linkElem.url).toBe(url)
  })

  it('insert link with expand max length', async () => {
    editor.select(startLocation)
    editor.insertText('1234456789012')
    Transforms.move(editor, {
      distance: 3, // 选中 3 个字母
      unit: 'character',
    })
    editor.select([])
    const url = 'https://cycleccc.github.io/docs/'
    await insertLink(editor, 'hello', url)
    let links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    let linkElem = links[0]
    expect(linkElem.url).toBe(url)
  })

  it('insert link with expand max length uninput', async () => {
    editor.select(startLocation)
    editor.insertText('123445678901234567890')
    editor.select([])
    const url = 'https://cycleccc.github.io/docs/'
    await insertLink(editor, 'hello', url)
    let links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(0)
  })

  it('parse link', async () => {
    const url = 'https://cycleccc.github.io/docs/'
    const editorConfig = { MENU_CONF: {} }
    editorConfig.MENU_CONF['insertLink'] = {
      parseLinkUrl: false,
    }
    const editor = createEditor({
      config: editorConfig,
    })
    editor.select(startLocation)
    await insertLink(editor, 'hello', url)
    const images = editor.getElemsByTypePrefix('image')
    expect(images.length).toBe(0)
  })

  it('update link', async () => {
    editor.select(startLocation)

    const url = 'https://cycleccc.github.io/docs/'
    await insertLink(editor, 'hello', url)

    // 选区移动到 link 内部
    editor.select({
      path: [0, 1, 0],
      offset: 3,
    })

    // 更新链接
    const newUrl = 'https://cycleccc.github.io/docs/index.html'
    await updateLink(editor, '', newUrl)

    const links = editor.getElemsByTypePrefix('link')
    expect(links.length).toBe(1)
    const linkElem = links[0]
    expect(linkElem.url).toBe(newUrl)
  })
})
