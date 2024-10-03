/**
 * @description render paragraph elem
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode } from 'snabbdom'

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
  _editor: IDomEditor,
): VNode {
  const vnode = <p>{children}</p>

  return vnode
}

export const renderParagraphConf = {
  type: 'paragraph',
  renderElem: renderParagraph,
}
