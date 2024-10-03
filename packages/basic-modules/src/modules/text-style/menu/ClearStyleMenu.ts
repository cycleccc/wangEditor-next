/**
 * @description clear style menu
 * @author wangfupeng
 */

import { IButtonMenu, IDomEditor, t } from '@wangeditor-next/core'
import { Editor, Text } from 'slate'

import { ERASER_SVG } from '../../../constants/icon-svg'
import { isMenuDisabled, removeMarks } from '../helper'

class ClearStyleMenu implements IButtonMenu {
  readonly title = t('textStyle.clear')

  readonly iconSvg = ERASER_SVG

  readonly tag = 'button'

  getValue(_editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    return isMenuDisabled(editor)
  }

  /**
   * 执行命令
   * @param editor editor
   * @param value 是否有 mark
   */
  exec(editor: IDomEditor, _value: string | boolean) {
    // 获取所有 text node
    const nodeEntries = Editor.nodes(editor, {
      match: n => Text.isText(n),
      universal: true,
    })

    for (const nodeEntry of nodeEntries) {
      // 单个 text node
      const n = nodeEntry[0]

      removeMarks(editor, n)
    }
  }
}

export default ClearStyleMenu
