/**
 * @description code-highlight decorate test
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import createEditor from '../../../tests/utils/create-editor'
import codeHighLightDecorate from '../src/decorate/index'
import { content, textNode, textNodePath } from './content'
import { getPrismTokenLength } from '../src/vendor/prism'

describe('code-highlight decorate', () => {
  let editor: IDomEditor | null = null

  beforeAll(() => {
    // 把 content 创建到一个编辑器中
    editor = createEditor({
      content,
    })
  })

  afterAll(() => {
    // 销毁 editor
    if (editor == null) return
    editor.destroy()
    editor = null
  })

  it('code-highlight decorate 拆分代码字符串', () => {
    const ranges = codeHighLightDecorate([textNode, textNodePath])
    expect(ranges.length).toBe(4) // 把 textNode 内容拆分为 4 段
  })

  it('getPrismTokenLength', () => {
    const token = {
      type: 'example',
      content: [
        'hello', // length 5
        { type: 'nested', content: 'world' }, // length 5
        { type: 'nested', content: ['foo', { type: 'deepNested', content: 'bar' }] }, // length 3 + 3 = 6
      ],
    }

    const result = getPrismTokenLength(token)
    expect(result).toBe(16) // 'hello' (5) + 'world' (5) + 'foo' (3) + 'bar' (3) = 16
  })
})
