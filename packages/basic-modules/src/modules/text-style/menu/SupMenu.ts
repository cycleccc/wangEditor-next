/**
 * @description sup menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { SUP_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class SupMenu extends BaseMenu {
  readonly mark = 'sup'

  readonly marksNeedToRemove = ['sub'] // sup 和 sub 不能共存

  readonly title = t('textStyle.sup')

  readonly iconSvg = SUP_SVG

  readonly hotkey = ''
}

export default SupMenu
