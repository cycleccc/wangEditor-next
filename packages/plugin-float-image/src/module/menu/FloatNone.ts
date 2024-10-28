/**
 * @description float image none
 * @author cycleccc
 */

import { t } from '@wangeditor-next/editor'

import { DEFAULT_FLOAT_SVG } from '../../constants/icon-svg'
import ImageFloatBaseClass from './FloatBase'

class FloatNone extends ImageFloatBaseClass {
  readonly title = t('float.none') // 菜单标题

  readonly value = 'none' // css float 的值

  readonly iconSvg = DEFAULT_FLOAT_SVG
}

export default FloatNone
