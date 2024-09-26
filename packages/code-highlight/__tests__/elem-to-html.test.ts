/**
 * @description code-hight elem-to-html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'

import createEditor from '../../../tests/utils/create-editor'
import { codeToHtmlConf } from '../src/module/elem-to-html'
import {
  codeNode, content, language, preNode,
} from './content'

describe('code-highlight elem to html', () => {
  let editor: IDomEditor | null = null

  beforeAll(() => {
    // 把 content 创建到一个编辑器中
    editor = createEditor({
      content,
    })
  })

  afterAll(() => {
    // 销毁 editor
    if (editor == null) { return }
    editor.destroy()
    editor = null
  })

  it('codeNode to html', () => {
    expect(codeToHtmlConf.type).toBe('code')

    if (editor == null) { throw new Error('editor is null') }
    const text = 'var n = 100;'
    let html = codeToHtmlConf.elemToHtml(codeNode, text)

    expect(html).toBe(`<code class="language-${language}">${text}</code>`)
    html = codeToHtmlConf.elemToHtml(preNode, text)
    expect(html).toBe(`<code >${text}</code>`)
  })
})
