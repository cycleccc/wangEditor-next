/**
 * @description float image right
 * @author cycleccc
 */

import { t } from '@wangeditor-next/editor'

import { RIGHT_FLOAT_SVG } from '../../constants/icon-svg'
import ImageFloatBaseClass from './FloatBase'

class FloatRight extends ImageFloatBaseClass {
  readonly title = t('float.right') // 菜单标题

  readonly value = 'right' // css float 的值

  readonly iconSvg = RIGHT_FLOAT_SVG
}

export default FloatRight
