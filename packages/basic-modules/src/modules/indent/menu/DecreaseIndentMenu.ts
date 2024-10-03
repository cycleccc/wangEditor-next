/**
 * @description 减少缩进
 * @author wangfupeng
 */

import { IDomEditor, t } from '@wangeditor-next/core'
import { Element, Transforms } from 'slate'

import { INDENT_LEFT_SVG } from '../../../constants/icon-svg'
import { IndentElement } from '../custom-types'
import BaseMenu from './BaseMenu'

class DecreaseIndentMenu extends BaseMenu {
  readonly title = t('indent.decrease')

  readonly iconSvg = INDENT_LEFT_SVG

  isDisabled(editor: IDomEditor): boolean {
    const matchNode = this.getMatchNode(editor)

    if (matchNode == null) { return true } // 未匹配 p header 等，则禁用

    const { indent } = matchNode as IndentElement

    if (!indent) {
      // 没有 indent ，则禁用
      return true
    }

    return false // 其他情况，不禁用
  }

  exec(editor: IDomEditor, _value: string | boolean): void {
    Transforms.setNodes(
      editor,
      {
        indent: null,
      },
      { match: n => Element.isElement(n) },
    )
  }
}

export default DecreaseIndentMenu
