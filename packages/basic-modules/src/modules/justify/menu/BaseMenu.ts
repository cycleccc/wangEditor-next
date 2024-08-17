/**
 * @description justify base menu
 * @author wangfupeng
 */

import { Editor, Node, Element } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor } from '@wangeditor-next/core'

abstract class BaseMenu implements IButtonMenu {
  abstract readonly title: string
  abstract readonly iconSvg: string
  readonly tag = 'button'

  getValue(editor: IDomEditor): string | boolean {
    // 不需要 value
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 不需要 active
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) return true

    const selectedElems = DomEditor.getSelectedElems(editor)
    const notMatch = selectedElems.some((elem: Node) => {
      const { type } = elem as unknown as Element
      if (Editor.isVoid(editor, elem) && Editor.isBlock(editor, elem) && type !== 'video')
        return true

      if (['pre', 'code'].includes(type)) return true
    })
    if (notMatch) return true

    return false
  }

  abstract exec(editor: IDomEditor, value: string | boolean): void
}

export default BaseMenu
