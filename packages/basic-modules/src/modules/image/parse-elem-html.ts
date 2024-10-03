/**
 * @description parse html
 * @author wangfupeng
 */

import { IDomEditor } from '@wangeditor-next/core'
import { Descendant } from 'slate'

import $, { DOMElement, getStyleValue } from '../../utils/dom'
import { ImageElement } from './custom-types'

function parseHtml(elem: DOMElement, _children: Descendant[], _editor: IDomEditor): ImageElement {
  const $elem = $(elem)
  let href = $elem.attr('data-href') || ''

  href = decodeURIComponent(href) // 兼容 V4

  return {
    type: 'image',
    src: $elem.attr('src') || '',
    alt: $elem.attr('alt') || '',
    href,
    style: {
      width: getStyleValue($elem, 'width'),
      height: getStyleValue($elem, 'height'),
    },
    width: $elem.attr('width') || '',
    height: $elem.attr('height') || '',
    children: [{ text: '' }], // void node 有一个空白 text
  }
}

export const parseHtmlConf = {
  selector: 'img:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
