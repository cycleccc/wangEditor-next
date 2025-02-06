/**
 * @description mention plugin
 * @author wangfupeng
 */

import { DomEditor, IDomEditor } from '@wangeditor-next/editor'

import { IExtendConfig } from './interface'

function getMentionConfig(editor: IDomEditor) {
  const { EXTEND_CONF } = editor.getConfig()
  const { mentionConfig } = EXTEND_CONF as IExtendConfig

  return mentionConfig
}

function withMention<T extends IDomEditor>(editor: T) {
  const { insertText, isInline, isVoid } = editor
  const newEditor = editor

  // 重写 insertText
  newEditor.insertText = t => {
    // 选过选中了 void 元素
    const elems = DomEditor.getSelectedElems(newEditor)
    const isSelectedVoidElem = elems.some(elem => newEditor.isVoid(elem))

    if (isSelectedVoidElem) {
      insertText(t)
      return
    }

    // mention 相关配置
    const { showModal, hideModal } = getMentionConfig(newEditor)

    if (t === '@') {
      setTimeout(() => {
        // 展示 modal （异步，以便准确获取光标位置）
        if (showModal) { showModal(newEditor) }

        // 监听，隐藏 modal（异步，等待 modal 渲染后再监听）
        setTimeout(() => {
          function hide() {
            if (hideModal) { hideModal(newEditor) }
          }
          newEditor.once('fullScreen', hide)
          newEditor.once('unFullScreen', hide)
          newEditor.once('scroll', hide)
          newEditor.once('modalOrPanelShow', hide)
          newEditor.once('modalOrPanelHide', hide)

          function hideOnChange() {
            if (newEditor.selection != null) {
              hide()
              newEditor.off('change', hideOnChange) // 及时解绑
            }
          }
          newEditor.on('change', hideOnChange)
        })
      })
    }

    // 非 '@' 则执行默认行为
    insertText(t)
  }

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'mention') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'mention') {
      return true
    }

    return isVoid(elem)
  }

  return newEditor
}

export default withMention
