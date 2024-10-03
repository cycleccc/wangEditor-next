/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

import { ImageElement } from './custom-types'

function imageToHtml(elemNode: Element, _childrenHtml: string): string {
  const {
    src, alt = '', href = '', width = '', height = '', style = {},
  } = elemNode as ImageElement
  const { width: styleWidth = '', height: styleHeight = '' } = style

  let styleStr = ''

  if (styleWidth) { styleStr += `width: ${styleWidth};` }
  if (styleHeight) { styleStr += `height: ${styleHeight};` }
  return `<img src="${src}" alt="${alt}" data-href="${href}" width="${width}" height="${height}" style="${styleStr}"/>`
}

export const imageToHtmlConf = {
  type: 'image',
  elemToHtml: imageToHtml,
}
