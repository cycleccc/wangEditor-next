/**
 * @description justify center menu
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'
import { Element, Transforms } from 'slate'

import { JUSTIFY_CENTER_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class JustifyCenterMenu extends BaseMenu {
  readonly title = t('justify.center')

  readonly iconSvg = JUSTIFY_CENTER_SVG

  exec(editor: IDomEditor, value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'center',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) }, // inline 元素设置text-align 是没作用的
    )
  }
}

export default JustifyCenterMenu
