/**
 * @description Format Painter
 * @author CodePencil
 */

import { IButtonMenu, IDomEditor, t } from '@wangeditor-next/core'
import { Editor, Text } from 'slate'

import { FORMAT_PAINTER } from '../../../constants/icon-svg'
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
    const selectionText = editor.getSelectionText()

    if (!selectionText.length) { return }
    if (FormatPainter.attrs.formatStyle) {
      clearAllMarks(editor)
      for (const [key, value] of Object.entries(FormatPainter.attrs.formatStyle)) {
        editor.addMark(key, value)
      }
    }
    FormatPainter.attrs.formatStyle = null
    FormatPainter.attrs.isSelect = false
  }

  exec(editor: IDomEditor) {
    // 如果已经选中了格式刷则取消选中，反之保存已经选中文本的样式
    if (FormatPainter.attrs.isSelect) {
      FormatPainter.attrs.isSelect = false
      FormatPainter.attrs.formatStyle = null
    } else {
      const selectionText = editor.getSelectionText()
      // 判断是否选中文本

      if (selectionText.length) {
        FormatPainter.attrs.formatStyle = Editor.marks(editor)
        FormatPainter.attrs.isSelect = true
      }
    }

    editor.blur()
    editor.focus()
  }
}

export default FormatPainter
