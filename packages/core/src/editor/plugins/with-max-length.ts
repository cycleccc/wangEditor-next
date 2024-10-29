/**
 * @description slate 插件 - maxLength
 * @author wangfupeng
 */

// 【注意】拼音输入时 maxLength 限制在 CompositionEnd 事件中处理

import { Editor, Node } from 'slate'

import { DomEditor, IDomEditor } from '../..'
import { IGNORE_TAGS } from '../../constants'
import { isDOMElement, isDOMText } from '../../utils/dom'

export const withMaxLength = <T extends Editor>(editor: T) => {
  const e = editor as T & IDomEditor
  const {
    insertText, insertNode, insertFragment, dangerouslyInsertHtml,
  } = e

  // 处理 text
  e.insertText = (text: string) => {
    const { maxLength } = e.getConfig()

    if (!maxLength) {
      insertText(text)
      return
    }

    const leftLength = DomEditor.getLeftLengthOfMaxLength(e)

    if (leftLength <= 0) {
      // 已经触发 maxLength ，不再输入文字
      return
    }

    if (leftLength < text.length) {
      // 剩余长度小于 text 长度，则截取 text
      insertText(text.slice(0, leftLength))
      return
    }

    insertText(text)
  }

  // 处理 node
  e.insertNode = (node: Node) => {
    const { maxLength } = e.getConfig()

    if (!maxLength) {
      insertNode(node)
      return
    }

    const leftLength = DomEditor.getLeftLengthOfMaxLength(e)

    if (leftLength <= 0) {
      // 已经触发 maxLength ，不再插入
      return
    }

    const text = Node.string(node)

    if (leftLength < text.length) {
      // 剩余长度，不够 node text 长度，不再插入
      return
    }

    insertNode(node)
  }

  // 处理 fragment
  e.insertFragment = (fragment: Node[]) => {
    const { maxLength } = e.getConfig()

    if (!maxLength) {
      // 无 maxLength
      insertFragment(fragment)
      return
    }

    // 有 maxLength ，则分别插入 node
    if (fragment.length > 0) {
      const firstNode = fragment[0]
      const leftLength = DomEditor.getLeftLengthOfMaxLength(e)
      const firstNodeTextLength = Node.string(firstNode).length

      // 第一个或只有一个 node 时，使用 insertFragment ，防止换行
      if (leftLength < firstNodeTextLength) {
        // 已经触发 maxLength ，不再插入
        return
      }

      insertFragment([firstNode])

      // 从第二个节点开始，使用 e.insertNode
      for (let i = 1; i < fragment.length; i += 1) {
        e.insertNode(fragment[i])
      }
    }
  }

  e.dangerouslyInsertHtml = (html: string = '', isRecursive = false) => {
    if (!html) { return }

    const { maxLength } = e.getConfig()

    if (!maxLength) {
      // 无 maxLength
      dangerouslyInsertHtml(html, isRecursive)
      return
    }
    const leftLength = DomEditor.getLeftLengthOfMaxLength(e)

    if (leftLength <= 0) {
      // 已经触发 maxLength ，不再输入文字
      return
    }

    // ------------- 把 html 转换为 DOM nodes -------------
    const div = document.createElement('div')

    div.innerHTML = html
    const text = Array.from(div.childNodes).reduce<string>((acc, node) => {
      const { nodeName } = node

      if (!node) {
        return acc
      }
      // Text Node
      if (isDOMText(node)) { return acc + (node.textContent || '') }

      // Element Node
      if (isDOMElement(node)) {
        // 过滤掉忽略的 tag
        if (IGNORE_TAGS.has(nodeName.toLowerCase())) { return acc }
        return acc + (node.textContent || '')
      }
      return acc
    }, '')

    if (leftLength < text.length) {
      return
    }

    dangerouslyInsertHtml(html, isRecursive)
  }

  return e // 返回 editor 实例
}
