/**
 * @description elem to html
 * @author wangfupeng
 */

import { SlateElement } from '@wangeditor-next/editor'

import { MentionElement } from './custom-types'

// 生成 html 的函数
function mentionToHtml(elem: SlateElement, _childrenHtml: string): string {
  const { value = '', info = {} } = elem as MentionElement
  const infoStr = encodeURIComponent(JSON.stringify(info))

  return `<span data-w-e-type="mention" data-w-e-is-void data-w-e-is-inline data-value="${value}" data-info="${infoStr}">@${value}</span>`
}

// 配置
const conf = {
  type: 'mention', // 节点 type ，重要！！！
  elemToHtml: mentionToHtml,
}

export default conf
