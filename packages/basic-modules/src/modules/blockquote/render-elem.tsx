/**
 * @description render elem
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode } from 'snabbdom'

/**
 * render block quote elem
 * @param elemNode slate elem
 * @param children children
 * @param editor editor
 * @returns vnode
 */
function renderBlockQuote(
  _elemNode: SlateElement,
  children: VNode[] | null,
  _editor: IDomEditor,
): VNode {
  const vnode = <blockquote>{children}</blockquote>

  return vnode
}

export const renderBlockQuoteConf = {
  type: 'blockquote',
  renderElem: renderBlockQuote,
}
