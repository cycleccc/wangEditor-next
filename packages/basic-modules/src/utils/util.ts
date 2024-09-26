/**
 * @description 工具函数
 * @author wangfupeng
 */

import { nanoid } from 'nanoid'

/**
 * 获取随机数字符串
 * @param prefix 前缀
 * @returns 随机数字符串
 */
export function genRandomStr(prefix = 'r'): string {
  return `${prefix}-${nanoid()}`
}

export function replaceSymbols(str: string) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
