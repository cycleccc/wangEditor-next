/**
 * @description code menu
 * @author wangfupeng
 */

import { t } from '@wangeditor-next/core'

import { CODE_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class CodeMenu extends BaseMenu {
  readonly mark = 'code'

  readonly title = t('textStyle.code')

  readonly iconSvg = CODE_SVG

  readonly hotkey = 'mod+e'
}

export default CodeMenu
