/**
 * @description menu index
 * @author cycleccc
 */

import ImageFloatLeft from './FloatLeft'
import ImageFloatNone from './FloatNone'
import ImageFloatRight from './FloatRight'

export const imageFloatNoneMenuConf = {
  key: 'imageFloatNone',
  factory() {
    return new ImageFloatNone()
  },
}

export const imageFloatLeftMenuConf = {
  key: 'imageFloatLeft',
  factory() {
    return new ImageFloatLeft()
  },
}

export const imageFloatRightMenuConf = {
  key: 'imageFloatRight',
  factory() {
    return new ImageFloatRight()
  },
}
