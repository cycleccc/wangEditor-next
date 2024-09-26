/**
 * @description 自定义 element
 * @author wangfupeng
 */

import { Text } from 'slate'

// 【注意】需要把自定义的 Element 引入到最外层的 custom-types.d.ts
export type TableCellProperty = {
  /** 用于设置单元格属性 */
  backgroundColor?: string // 背景色
  borderWidth?: string // 边框宽度
  borderStyle?: string // 边框样式
  borderColor?: string // 边框颜色
  textAlign?: string // 对齐方式
}

export type TableCellElement = {
  type: 'table-cell'
  isHeader?: boolean // td/th 只作用于第一行
  colSpan?: number
  rowSpan?: number
  width?: string // 只作用于第一行（尚未考虑单元格合并！）
  children: Text[]

  /** 用于设置单元格的 display 属性 */
  hidden?: boolean
} & TableCellProperty

export type TableRowElement = {
  type: 'table-row'
  children: TableCellElement[]
}

export type TableElement = {
  type: 'table'
  width: string
  children: TableRowElement[]

  /** resize bar */
  scrollWidth?: number
  height?: number // 用于设置 resize-bar 高度
  resizingIndex?: number // 用于标记 resize-bar index
  isResizing?: boolean | null //  用于设置 index resize-bar 的 highlight 属性
  isHoverCellBorder?: boolean // 用于设置 index resize-bar 的 visible 属性
  columnWidths?: number[]
}
