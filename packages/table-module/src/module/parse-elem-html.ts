/**
 * @description parse html
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/core'
import { Descendant, Text } from 'slate'

import $, { DOMElement, getStyleValue, getTagName } from '../utils/dom'
import { TableCellElement, TableElement, TableRowElement } from './custom-types'

function parseCellHtml(
  elem: DOMElement,
  children: Descendant[],
  editor: IDomEditor,
): TableCellElement {
  const $elem = $(elem)

  children = children.filter(child => {
    if (DomEditor.getNodeType(child) === 'paragraph') { return true }
    if (Text.isText(child)) { return true }
    if (editor.isInline(child)) { return true }
    return false
  })

  // 无 children ，则用纯文本
  if (children.length === 0) {
    children = [{ text: $elem.text().replace(/\s+/gm, ' ') }]
  }

  const colSpan = parseInt($elem.attr('colSpan') || '1', 10)
  const rowSpan = parseInt($elem.attr('rowSpan') || '1', 10)
  const hidden = getStyleValue($elem, 'display') === 'none'
  const width = $elem.attr('width') || 'auto'

  return {
    type: 'table-cell',
    isHeader: getTagName($elem) === 'th',
    colSpan,
    rowSpan,
    width,
    // @ts-ignore
    children,
    hidden,
  }
}

export const parseCellHtmlConf = {
  selector: 'td:not([data-w-e-type]),th:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseCellHtml,
}

function parseRowHtml(
  _elem: DOMElement,
  children: Descendant[],
  _editor: IDomEditor,
): TableRowElement {
  const tableCellChildren: TableCellElement[] = []

  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]

    // 确保是 table-cell 类型
    if (DomEditor.getNodeType(child) === 'table-cell') {
      // @ts-ignore
      const colSpan = child.colSpan || 1

      tableCellChildren.push(child as TableCellElement) // 先添加当前单元格

      // 如果 colSpan > 1，检查是否存在足够的隐藏 table-cell
      for (let j = 1; j < colSpan; j += 1) {
        const nextChild = children[i + j]

        if (
          nextChild
          && DomEditor.getNodeType(nextChild) === 'table-cell'
          // @ts-ignore
          && nextChild.style?.display === 'none'
        ) {
          // 已有隐藏的 table-cell，无需补充
          continue
        } else {
          // 补齐缺少的隐藏 table-cell
          tableCellChildren.push({
            type: 'table-cell',
            children: [{ text: '' }],
            hidden: true,
          })
        }
      }
    }
  }

  return {
    type: 'table-row',
    children: tableCellChildren,
  }
}

export const parseRowHtmlConf = {
  selector: 'tr:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseRowHtml,
}

function parseTableHtml(
  elem: DOMElement,
  children: Descendant[],
  _editor: IDomEditor,
): TableElement {
  const $elem = $(elem)

  // 计算宽度
  let tableWidth = 'auto'

  if (getStyleValue($elem, 'width') === '100%') { tableWidth = '100%' }
  if ($elem.attr('width') === '100%') { tableWidth = '100%' } // 兼容 v4 格式

  // 计算高度
  const height = parseInt(getStyleValue($elem, 'height') || '0', 10)

  const tableELement: TableElement = {
    type: 'table',
    width: tableWidth,
    height,
    // @ts-ignore
    children: children.filter(child => DomEditor.getNodeType(child) === 'table-row'),
  }
  const tdList = $elem.find('tr')[0]?.children || []
  const colgroupElments: HTMLCollection = $elem.find('colgroup')[0]?.children || null
  // @ts-ignore
  const colLength = children[children.length - 1].children.length

  if (colgroupElments && colgroupElments.length === colLength) {
    tableELement.columnWidths = Array.from(colgroupElments).map((col: any) => {
      return parseInt(col.getAttribute('width'), 10)
    })
  } else if (tdList.length > 0) {
    const columnWidths: number[] = []

    Array.from(tdList).forEach(td => {
      const colSpan = parseInt($(td).attr('colSpan') || '1', 10) // 获取 colSpan，默认为 1
      const width = parseInt(getStyleValue($(td), 'width') || '90', 10) // 获取 width，默认为 90

      // 根据 colSpan 的值来填充 columnWidths 数组
      columnWidths.push(width)
      for (let i = 1; i < colSpan; i += 1) {
        columnWidths.push(90)
      }
    })
    tableELement.columnWidths = columnWidths
  }
  return tableELement
}

export const parseTableHtmlConf = {
  selector: 'table:not([data-w-e-type])', // data-w-e-type 属性，留给自定义元素，保证扩展性
  parseElemHtml: parseTableHtml,
}
