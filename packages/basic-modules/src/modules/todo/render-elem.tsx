/**
 * @description render todo
 * @author wangfupeng
 */

import { Element as SlateElement, Transforms } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor, DomEditor } from '@wangeditor-next/core'
import { TodoElement } from './custom-types'

/**
 * render todo elem
 * @param elemNode slate elem
 * @param children children
 * @param editor editor
 * @returns vnode
 */
function renderTodo(elemNode: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 判断 disabled
  let disabled = false
  if (editor.isDisabled()) disabled = true

  const { checked } = elemNode as TodoElement
  const vnode = h('div', { style: { margin: '5px 0' } }, [
    //@ts-ignore
    h('span', { attrs: { contentEditable: 'false', style: { marginRight: '0.5em' } } }, [
      h('input', {
        attrs: {
          type: 'checkbox',
          checked: checked,
          disabled: disabled,
        },
        on: {
          change: event => {
            const path = DomEditor.findPath(editor, elemNode)
            const newProps = {
              //@ts-ignore
              checked: event.target.checked,
            }
            Transforms.setNodes(editor, newProps, { at: path })
          },
        },
      }),
    ]),
    h('span', {}, children),
  ])

  return vnode
}

const renderTodoConf = {
  type: 'todo', // 和 elemNode.type 一致
  renderElem: renderTodo,
}

export { renderTodoConf }
