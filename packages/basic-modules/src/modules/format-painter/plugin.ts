/**
 * @description editor 插件，重写 editor API
 * @author CodePencil
 */

import { IDomEditor } from '@wangeditor-next/core'

import FormatPainter from './menu/FormatPainter'

function withFormatPainter<T extends IDomEditor>(editor: T): T {
  const formatPainter = new FormatPainter()

  const { onChange } = editor
  const newEditor = editor

  const handleMouseUp = () => {
    formatPainter.setFormatHtml(newEditor)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  newEditor.onChange = () => {
    onChange()

    if (FormatPainter.attrs.isSelect) {
      // 避免重复绑定 mouseup 事件
      document.removeEventListener('mouseup', handleMouseUp)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  // 返回 editor ，重要！
  return newEditor
}

export default withFormatPainter
