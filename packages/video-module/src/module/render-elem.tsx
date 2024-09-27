/**
 * @description video render elem
 * @author wangfupeng
 */

import { Element } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor, DomEditor } from '@wangeditor-next/core'
import { VideoElement } from './custom-types'
import { genSizeStyledIframeHtml } from '../utils/dom'

function renderVideo(elemNode: Element, children: VNode[] | null, editor: IDomEditor): VNode {
  const {
    src = '',
    poster = '',
    key = '',
    width = 'auto',
    height = 'auto',
    style = {},
    textAlign = 'center',
  } = elemNode as VideoElement

  // 是否选中
  const selected = DomEditor.isNodeSelected(editor, elemNode)

  let vnode: VNode
  if (src.trim().indexOf('<iframe ') === 0) {
    // 增加尺寸样式
    const iframeHtml = genSizeStyledIframeHtml(src, width, height, style)

    // iframe 形式，第三方视频
    vnode = h('div', {
      class: {
        'w-e-textarea-video-container': true,
      },
      attrs: {
        'data-selected': selected ? 'true' : '', // 标记为选中
      },
      style: { textAlign },
      props: {
        innerHTML: iframeHtml, // 内嵌第三方 iframe 视频
      },
    })
  } else {
    // 其他，mp4 格式
    const videoVnode = h(
      'video',
      {
        key,
        attrs: {
          poster,
          controls: true,
        },
        style,
      },
      [
        h('source', { attrs: { src, type: 'video/mp4' } }),
        `Sorry, your browser doesn't support embedded videos.\n 抱歉，浏览器不支持 video 视频`,
      ]
    )

    // 添加尺寸
    if (width !== 'auto') {
      videoVnode.data = videoVnode.data || {}
      videoVnode.data.attrs = videoVnode.data.attrs || {}
      videoVnode.data.attrs.width = width
    }
    if (height !== 'auto') {
      videoVnode.data = videoVnode.data || {}
      videoVnode.data.attrs = videoVnode.data.attrs || {}
      videoVnode.data.attrs.height = height
    }

    vnode = h(
      'div',
      {
        class: {
          'w-e-textarea-video-container': true,
        },
        attrs: {
          'data-selected': selected ? 'true' : '', // 标记为选中
        },
        style: { textAlign },
      },
      [videoVnode]
    )
  }

  // 【注意】void node 中，renderElem 不用处理 children 。core 会统一处理。

  const containerVnode = h(
    'div',
    {
      props: {
        contentEditable: false,
      },
      on: {
        mousedown: e => e.preventDefault(),
      },
    },
    vnode
  )

  return containerVnode
}

const renderVideoConf = {
  type: 'video', // 和 elemNode.type 一致
  renderElem: renderVideo,
}

export { renderVideoConf }
