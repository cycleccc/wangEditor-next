/**
 * @description indent - render text style
 * @author wangfupeng
 */

import { h } from 'snabbdom'
import { renderStyle } from '../../src/modules/indent/render-style'

describe('indent - render text style', () => {
  it('render text style', () => {
    const indent = '2em'
    const elem = { type: 'paragraph', indent, children: [] }
    const vnode = h('p', {}, 'hello')

    // @ts-ignore
    const newVnode = renderStyle(elem, vnode)
    // @ts-ignore
    expect(newVnode.data.style.textIndent).toBe(indent)
  })
})
