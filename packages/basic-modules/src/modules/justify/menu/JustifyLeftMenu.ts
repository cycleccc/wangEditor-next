/**
 * @description justify left menu
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'
import { Element, Transforms } from 'slate'

import { JUSTIFY_LEFT_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class JustifyLeftMenu extends BaseMenu {
  readonly title = t('justify.left')

  readonly iconSvg = JUSTIFY_LEFT_SVG

  exec(editor: IDomEditor, _value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'left',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) },
    )
  }
}

export default JustifyLeftMenu
