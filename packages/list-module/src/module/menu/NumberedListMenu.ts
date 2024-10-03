/**
 * @description numbered list menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { NUMBERED_LIST_SVG } from '../../constants/svg'
import BaseMenu from './BaseMenu'

class NumberedListMenu extends BaseMenu {
  readonly ordered = true

  readonly title = t('listModule.orderedList')

  readonly iconSvg = NUMBERED_LIST_SVG
}

export default NumberedListMenu
