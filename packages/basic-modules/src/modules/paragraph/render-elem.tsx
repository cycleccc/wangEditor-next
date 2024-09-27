/**
 * @description render paragraph elem
 * @author wangfupeng
 */

import { Element as SlateElement } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor } from '@wangeditor-next/core'

/**
 * render paragraph elem
 * @param elemNode slate elem
 * @param children children
 * @param editor editor
 * @returns vnode
 */
function renderParagraph(
  elemNode: SlateElement,
  children: VNode[] | null,
  editor: IDomEditor
): VNode {
  const vnode = h('p', children)
  return vnode
}

export const renderParagraphConf = {
  type: 'paragraph',
  renderElem: renderParagraph,
}
