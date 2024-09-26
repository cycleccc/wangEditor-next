/**
 * @description bold menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { BOLD_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class BoldMenu extends BaseMenu {
  readonly mark = 'bold'

  readonly title = t('textStyle.bold')

  readonly iconSvg = BOLD_SVG

  readonly hotkey = 'mod+b'
}

export default BoldMenu
