/**
 * @description parse elem html
 * @author Yanghc
 */

import { IDomEditor, SlateDescendant } from '@wangeditor-next/editor'

import { DOMElement } from '../utils/dom'
import { ImageElement } from './custom-types'

function parseHtml(elem: DOMElement, _children: SlateDescendant[], _editor: IDomEditor): ImageElement {
  let href = elem.getAttribute('data-href') || ''

  href = decodeURIComponent(href) // 兼容 V4

  return {
    type: 'image',
    src: elem.getAttribute('src') || '',
    alt: elem.getAttribute('alt') || '',
    href,
    style: {
      width: elem.getAttribute('width') || '',
      height: elem.getAttribute('height') || '',
      float: elem.getAttribute('float') || '',
    },
    children: [{ text: '' }], // void node 有一个空白 text
  }
}

export const parseHtmlConf = {
  selector: 'img:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseHtml,
}
