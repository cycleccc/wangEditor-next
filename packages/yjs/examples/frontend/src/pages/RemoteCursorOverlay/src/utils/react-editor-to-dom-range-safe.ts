import { BaseRange } from 'slate'
import { DomEditor, IDomEditor } from '@wangeditor-next/editor'

export function reactEditorToDomRangeSafe(editor: IDomEditor, range: BaseRange): Range | null {
  try {
    return DomEditor.toDOMRange(editor, range)
  } catch (e) {
    return null
  }
}
