/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'
import { VideoElement } from './custom-types'
import { genSizeStyledIframeHtml } from '../utils/dom'

function videoToHtml(elemNode: Element, childrenHtml?: string): string {
  const {
    src = '',
    poster = '',
    width = 'auto',
    height = 'auto',
    style = {},
    textAlign = 'center',
  } = elemNode as VideoElement
  let res = `<div data-w-e-type="video" data-w-e-is-void style="text-align: ${textAlign};">\n`

  if (src.trim().indexOf('<iframe ') === 0) {
    // iframe 形式
    const iframeHtml = genSizeStyledIframeHtml(src, width, height, style)
    res += iframeHtml
  } else {
    // 其他，mp4 等 url 格式
    const { width: styleWidth = '', height: styleHeight = '' } = style
    let styleStr = ''
    if (styleWidth) styleStr += `width: ${styleWidth};`
    if (styleHeight) styleStr += `height: ${styleHeight};`
    res += `<video poster="${poster}" controls="true" width="${width}" height="${height}" style="${styleStr}"><source src="${src}" type="video/mp4"/></video>`
  }
  res += '\n</div>'

  return res
}

export const videoToHtmlConf = {
  type: 'video',
  elemToHtml: videoToHtml,
}
