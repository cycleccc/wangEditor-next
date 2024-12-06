/**
 * @description render elem
 * @author wangfupeng
 */

import { DomEditor, IDomEditor, SlateElement } from '@wangeditor-next/editor'
import { h, VNode } from 'snabbdom'

import { LinkCardElement } from './custom-types'

const DEFAULT_ICON_IMG_SRC = 'data:image/png;base64,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'

function renderLinkCard(elem: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  const selected = DomEditor.isNodeSelected(editor, elem) // 当前节点是否选中
  const { title, link, iconImgSrc } = elem as LinkCardElement

  // 文字部分
  const infoVnode = h(
    'div',
    {
      props: {
        className: 'w-e-textarea-link-card-text-container',
      },
    },
    [h('p', {}, title), h('span', {}, link)],
  )

  // 图片部分
  const iconVnode = h(
    'div',
    {
      props: {
        className: 'w-e-textarea-link-card-icon-container',
      },
    },
    [h('img', { props: { src: iconImgSrc || DEFAULT_ICON_IMG_SRC } })],
  )

  // 容器
  const vnode = h(
    'div',
    {
      props: {
        contentEditable: false,
        className: 'w-e-textarea-link-card-container',
      },
      dataset: {
        selected: selected ? 'true' : '', // 标记为 选中
      },
      on: {
        mousedown: event => event.preventDefault(),
      },
    },
    [infoVnode, iconVnode],
  )

  return vnode
}

const conf = {
  type: 'link-card', // 节点 type ，重要！！！
  renderElem: renderLinkCard,
}

export default conf
