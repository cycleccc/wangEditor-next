/**
 * @description formula element
 * @author wangfupeng
 */

type EmptyText = {
  text: ''
}

export type FormulaElement = {
  type: 'formula'
  value: string
  children: EmptyText[]
}
