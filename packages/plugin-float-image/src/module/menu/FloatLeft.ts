/**
 * @description float image left
 * @author cycleccc
 */

import { t } from '@wangeditor-next/editor'

import { LEFT_FLOAT_SVG } from '../../constants/icon-svg'
import ImageFloatBaseClass from './FloatBase'

class FloatLeft extends ImageFloatBaseClass {
  readonly title = t('float.left') // 菜单标题

  readonly value = 'left' // css float 的值

  readonly iconSvg = LEFT_FLOAT_SVG
}

export default FloatLeft
