/**
 * @description color menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { FONT_COLOR_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class ColorMenu extends BaseMenu {
  readonly title = t('color.color')

  readonly iconSvg = FONT_COLOR_SVG

  readonly mark = 'color'
}

export default ColorMenu
