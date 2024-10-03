/**
 * @description video render elem
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/core'
import { Element } from 'slate'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, jsx, VNode } from 'snabbdom'

import { genSizeStyledIframeHtml } from '../utils/dom'
import { VideoElement } from './custom-types'

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
    vnode = (
      <div
        className="w-e-textarea-video-container"
        data-selected={selected ? 'true' : ''} // 标记为 选中
        style={{ textAlign }}
        innerHTML={iframeHtml} // 内嵌第三方 iframe 视频
      ></div>
    )
  } else {
    // 其他，mp4 格式
    const videoVnode = (
      <video key={key} poster={poster} controls style={style}>
        <source src={src} type="video/mp4" />
        {'Sorry, your browser doesn\'t support embedded videos.\n 抱歉，浏览器不支持 video 视频'}
      </video>
    )
    // @ts-ignore 添加尺寸

    if (width !== 'auto') { videoVnode.data.width = width }
    // @ts-ignore
    if (height !== 'auto') { videoVnode.data.height = height }

    vnode = (
      <div
        className="w-e-textarea-video-container"
        data-selected={selected ? 'true' : ''} // 标记为 选中
        style={{ textAlign }}
      >
        {videoVnode}
      </div>
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
    vnode,
  )

  return containerVnode
}

const renderVideoConf = {
  type: 'video', // 和 elemNode.type 一致
  renderElem: renderVideo,
}

export { renderVideoConf }
