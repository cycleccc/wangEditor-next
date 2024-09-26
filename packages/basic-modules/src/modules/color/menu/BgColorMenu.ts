/**
 * @description bg color menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { BG_COLOR_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class BgColorMenu extends BaseMenu {
  readonly title = t('color.bgColor')

  readonly iconSvg = BG_COLOR_SVG

  readonly mark = 'bgColor'
}

export default BgColorMenu
