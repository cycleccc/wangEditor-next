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

export function styleStringToObject(styleString) {
  const styleObject = {}

  // 去掉字符串两端的空格，然后按分号分割
  const styles = styleString.trim().split(';')

  // 迭代每一个样式属性对
  styles.forEach(style => {
    if (style) {
      // 忽略空字符串
      const [property, value] = style.split(':')

      if (property && value) {
        // 去掉两端的空格并将结果存储在对象中
        styleObject[property.trim()] = value.trim()
      }
    }
  })

  return styleObject
}
