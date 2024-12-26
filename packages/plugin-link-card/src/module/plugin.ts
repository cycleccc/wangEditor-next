/**
 * @description link-card plugin
 * @author wangfupeng
 */

import { DomEditor, IDomEditor, SlateTransforms } from '@wangeditor-next/editor'

function withLinkCard<T extends IDomEditor>(editor: T) {
  const { isVoid, normalizeNode } = editor
  const newEditor = editor

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)

    if (type === 'link-card') {
      return true
    }

    return isVoid(elem)
  }

  // 重新 normalize
  newEditor.normalizeNode = ([node, path]) => {
    const type = DomEditor.getNodeType(node)

    if (type !== 'link-card') {
      // 未命中 link-card ，执行默认的 normalizeNode
      return normalizeNode([node, path])
    }

    // editor 顶级 node
    const topLevelNodes = newEditor.children || []

    // --------------------- link-card 后面必须跟一个 p header blockquote（否则后面无法继续输入文字） ---------------------
    const nextNode = topLevelNodes[path[0] + 1] || {}
    const nextNodeType = DomEditor.getNodeType(nextNode)

    if (
      nextNodeType !== 'paragraph'
      && nextNodeType !== 'blockquote'
      && !nextNodeType.startsWith('header')
    ) {
      // link-card node 后面不是 p 或 header ，则插入一个空 p
      const p = { type: 'paragraph', children: [{ text: '' }] }
      const insertPath = [path[0] + 1]

      SlateTransforms.insertNodes(newEditor, p, {
        at: insertPath, // 在 link-card 后面插入
      })
    }
  }

  return newEditor
}

export default withLinkCard
