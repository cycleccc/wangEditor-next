/**
 * @description utils dom
 * @author cycleccc
 */

import { Dom7Array } from 'dom7'

import { getTagName } from '../../src/utils/dom'

describe('redo menu', () => {
  it('get tag name', () => {
    // 模拟一个空的 Dom7Array 对象
    const emptyElem: Dom7Array = [] as unknown as Dom7Array

    const result = getTagName(emptyElem)

    expect(result).toBe('') // 验证返回的是空字符串
  })
})
