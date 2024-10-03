/**
 * @description 两端对齐
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'
import { Element, Transforms } from 'slate'

import { JUSTIFY_JUSTIFY_SVG } from '../../../constants/icon-svg'
import BaseMenu from './BaseMenu'

class JustifyJustifyMenu extends BaseMenu {
  readonly title = t('justify.justify')

  readonly iconSvg = JUSTIFY_JUSTIFY_SVG

  exec(editor: IDomEditor, _value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        textAlign: 'justify',
      },
      { match: n => Element.isElement(n) && !editor.isInline(n) },
    )
  }
}

export default JustifyJustifyMenu
