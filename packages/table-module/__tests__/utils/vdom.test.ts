import { h, VNode } from 'snabbdom'

import { addVnodeStyle } from '../../src/utils/vdom'

describe('addVnodeStyle', () => {
  it('should add style to vnode', () => {
    const vnode: VNode = { data: {} } as VNode
    const newStyle = { color: 'red', fontSize: '16px' }

    addVnodeStyle(vnode, newStyle)

    expect(vnode.data?.style).toEqual(newStyle)
  })

  it('should merge styles if vnode already has styles', () => {
    const vnode: VNode = h('div', { style: { color: 'blue' } })
    const newStyle = { fontSize: '16px' }

    addVnodeStyle(vnode, newStyle)

    expect(vnode.data?.style).toEqual({ color: 'blue', fontSize: '16px' })
  })

  it('should initialize data and style if they are not present', () => {
    const vnode: VNode = {} as VNode
    const newStyle = { color: 'red' }

    addVnodeStyle(vnode, newStyle)

    expect(vnode.data?.style).toEqual(newStyle)
  })
})
