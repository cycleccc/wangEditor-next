/**
 * @description 处理 copy 事件
 * @author wangfupeng
 */

import { IDomEditor } from '../../editor/interface'
import { hasEditableTarget } from '../helpers'
// import { DomEditor } from '../../editor/dom-editor'
import TextArea from '../TextArea'

function handleOnCopy(e: Event, textarea: TextArea, editor: IDomEditor) {
  const event = e as ClipboardEvent

  if (!hasEditableTarget(editor, event.target)) { return }
  event.preventDefault()

  const data = event.clipboardData

  if (data == null) { return }
  editor.setFragmentData(data)
}

export default handleOnCopy
