/**
 * @description elem to html
 * @author wangfupeng
 */

import { SlateElement } from '@wangeditor-next/editor'

import { FormulaElement } from './custom-types'

// 生成 html 的函数
function formulaToHtml(elem: SlateElement, _childrenHtml: string): string {
  const { value = '' } = elem as FormulaElement

  return `<span data-w-e-type="formula" data-w-e-is-void data-w-e-is-inline data-value="${value}"></span>`
}

// 配置
const conf = {
  type: 'formula', // 节点 type ，重要！！！
  elemToHtml: formulaToHtml,
}

export default conf
