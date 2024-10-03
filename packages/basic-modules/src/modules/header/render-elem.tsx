/**
 * @description render header
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Element as SlateElement } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, VNode } from 'snabbdom'

function genRenderElem(level: number) {
  /**
   * render header elem
   * @param elemNode slate elem
   * @param children children
   * @param editor editor
   * @returns vnode
   */
  function renderHeader(
    elemNode: SlateElement,
    children: VNode[] | null,
    _editor: IDomEditor,
  ): VNode {
    const Tag = `h${level}`
    const vnode = <Tag>{children}</Tag>

    return vnode
  }

  return renderHeader
}

const renderHeader1Conf = {
  type: 'header1', // 和 elemNode.type 一致
  renderElem: genRenderElem(1),
}
const renderHeader2Conf = {
  type: 'header2',
  renderElem: genRenderElem(2),
}
const renderHeader3Conf = {
  type: 'header3',
  renderElem: genRenderElem(3),
}
const renderHeader4Conf = {
  type: 'header4',
  renderElem: genRenderElem(4),
}
const renderHeader5Conf = {
  type: 'header5',
  renderElem: genRenderElem(5),
}

const renderHeader6Conf = {
  type: 'header6',
  renderElem: genRenderElem(6),
}

export {
  renderHeader1Conf,
  renderHeader2Conf,
  renderHeader3Conf,
  renderHeader4Conf,
  renderHeader5Conf,
  renderHeader6Conf,
}
