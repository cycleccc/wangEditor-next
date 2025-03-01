/**
 * @description 处理 copy 事件
 * @author wangfupeng
 */

import { IDomEditor } from '../../editor/interface'
import { hasEditableTarget } from '../helpers'
import TextArea from '../TextArea'

function handleOnCopy(e: Event, _textarea: TextArea, editor: IDomEditor) {
  const event = e as ClipboardEvent

  if (!hasEditableTarget(editor, event.target)) { return }
  const { readOnly } = editor.getConfig()

  if (!readOnly) { event.preventDefault() }

  const data = event.clipboardData

  if (data == null) { return }
  editor.setFragmentData(data)

  const { customCopy } = editor.getConfig()

  if (customCopy) {
    customCopy(editor, event)
  }
}

export default handleOnCopy
