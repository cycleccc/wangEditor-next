/**
 * @description through menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { THROUGH_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class ThroughMenu extends BaseMenu {
  readonly mark = 'through'

  readonly title = t('textStyle.through')

  readonly iconSvg = THROUGH_SVG

  readonly hotkey = 'mod+shift+x'
}

export default ThroughMenu
