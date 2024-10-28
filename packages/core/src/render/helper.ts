/**
 * @description formats helper
 * @author wangfupeng
 */

import { ElementType } from 'packages/custom-types'

export function genElemId(type:ElementType, id: string) {
  return `w-e-element-${type}-${id}`
}

export function genTextId(id: string) {
  return `w-e-text-${id}`
}
