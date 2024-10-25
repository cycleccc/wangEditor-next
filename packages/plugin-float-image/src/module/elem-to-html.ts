/**
 * @description elem to html
 * @author Yanghc
 */

import { SlateElement } from '@wangeditor-next/editor'

import { ImageElement } from './custom-types'

// 生成 html 的函数
function imageToHtml(elem: SlateElement, _childrenHtml: string): string {
  const {
    src, alt = '', href = '', style = {},
  } = elem as ImageElement
  const { width = '', height = '', float = '' } = style
  let styleStr = ''

  if (width) { styleStr += `width: ${width};` }
  if (height) { styleStr += `height: ${height};` }
  if (float) { styleStr += `float: ${float};` }
  return `<img src="${src}" alt="${alt}" data-href="${href}" style="${styleStr}"/>`
}

// 配置
const conf = {
  type: 'image', // 节点 type ，重要！！！
  elemToHtml: imageToHtml,
}

export default conf
