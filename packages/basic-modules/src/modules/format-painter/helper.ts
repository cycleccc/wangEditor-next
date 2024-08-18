import { IDomEditor } from '@wangeditor-next/core'
import { Editor } from 'slate'

/** 清空所有标记（文本样式） */
export function clearAllMarks(editor: IDomEditor) {
  const marks = Editor.marks(editor)

  if (marks) {
    Object.keys(marks).forEach(mark => {
      editor.removeMark(mark)
    })
  }
}
