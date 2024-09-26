/**
 * @description justify right menu
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'
import { Element, Transforms } from 'slate'

import { JUSTIFY_RIGHT_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class JustifyRightMenu extends BaseMenu {
  readonly title = t('justify.right')

  readonly iconSvg = JUSTIFY_RIGHT_SVG

  exec(editor: IDomEditor, value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'right',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) },
    )
  }
}

export default JustifyRightMenu
