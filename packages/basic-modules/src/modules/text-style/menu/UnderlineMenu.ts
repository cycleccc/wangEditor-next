/**
 * @description underline menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { UNDER_LINE_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class UnderlineMenu extends BaseMenu {
  readonly mark = 'underline'

  readonly title = t('textStyle.underline')

  readonly iconSvg = UNDER_LINE_SVG

  readonly hotkey = 'mod+u'
}

export default UnderlineMenu
