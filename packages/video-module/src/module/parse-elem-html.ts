/**
 * @description parse html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant } from 'slate'

import $, { DOMElement } from '../utils/dom'
import { styleStringToObject } from '../utils/util'
import { VideoElement, videoStyle } from './custom-types'

function genVideoElem(
  src: string,
  poster = '',
  width = 'auto',
  height = 'auto',
  style: videoStyle = {},
  textAlign = 'center',
): VideoElement {
  return {
    type: 'video',
    src,
    poster,
    width,
    height,
    style,
    children: [{ text: '' }], // void 元素有一个空 text
    textAlign,
  }
}

function parseHtml(elem: DOMElement, _children: Descendant[], _editor: IDomEditor): VideoElement {
  const $elem = $(elem)
  let src = ''
  let poster = ''
  let width = 'auto'
  let height = 'auto'
  let style = {}
  let textAlign = 'center'
  // <iframe> 形式
  const $iframe = $elem.find('iframe')

  if ($iframe.length > 0) {
    width = $iframe.attr('width') || 'auto'
    height = $iframe.attr('height') || 'auto'
    style = $iframe.attr('style') || ''
    style = styleStringToObject(style)
    src = $iframe[0].outerHTML
    textAlign = styleStringToObject($elem.attr('style') || '')['text-align'] || 'center'
    return genVideoElem(src, poster, width, height, style, textAlign)
  }

  // <video> 形式
  const $video = $elem.find('video')

  src = $video.attr('src') || ''
  if (!src) {
    if ($video.length > 0) {
      const $source = $video.find('source')

      src = $source.attr('src') || ''
    }
  }
  width = $video.attr('width') || 'auto'
  height = $video.attr('height') || 'auto'
  poster = $video.attr('poster') || ''
  style = $video.attr('style') || ''
  style = styleStringToObject(style)
  textAlign = styleStringToObject($elem.attr('style') || '')['text-align'] || 'center'
  return genVideoElem(src, poster, width, height, style, textAlign)
}

export const parseHtmlConf = {
  selector: 'div[data-w-e-type="video"]',
  parseElemHtml: parseHtml,
}
