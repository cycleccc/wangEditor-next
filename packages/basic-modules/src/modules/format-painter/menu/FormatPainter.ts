/**
 * @description Format Painter
 * @author CodePencil
 */

import { IButtonMenu, IDomEditor, t } from '@wangeditor-next/core'
import { SlateEditor } from '@wangeditor-next/editor'
import { FORMAT_PAINTER } from '../../../constants/icon-svg'
import { Text } from 'slate'
import { clearAllMarks } from '../helper'

interface FormatPaintAttributes {
  isSelect: boolean
  formatStyle: Omit<Text, 'text'> | null
}

class FormatPainter implements IButtonMenu {
  title = t('formatPainter.title')
  iconSvg = FORMAT_PAINTER
  tag = 'button'
  static attrs: FormatPaintAttributes = {
    isSelect: false,
    formatStyle: null,
  }

  getValue(editor: IDomEditor): string | boolean {
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    return FormatPainter.attrs.isSelect
  }

  isDisabled(editor: IDomEditor): boolean {
    return false
  }

  setFormatHtml(editor: IDomEditor) {
    if (!editor.getSelectionText().length) return
    if (FormatPainter.attrs.formatStyle) {
      clearAllMarks(editor)
      for (const [key, value] of Object.entries(FormatPainter.attrs.formatStyle)) {
        editor.addMark(key, value)
      }
    }
    FormatPainter.attrs.formatStyle = {}
    FormatPainter.attrs.isSelect = false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    // 如果已经选中了格式刷则取消选中，反之保存已经选中文本的样式
    if (FormatPainter.attrs.isSelect) {
      FormatPainter.attrs.isSelect = false
    } else {
      // 判断是否选中文本
      if (editor.getSelectionText().length) {
        FormatPainter.attrs.formatStyle = SlateEditor.marks(editor)
        FormatPainter.attrs.isSelect = true
      }
    }

    editor.blur()
    editor.focus()
  }
}

export default FormatPainter
