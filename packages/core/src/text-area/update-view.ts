/**
 * @description patch textarea view
 * @author wangfupeng
 */

import { Descendant, Element } from 'slate'
import { h, VNode } from 'snabbdom'

import { DomEditor } from '../editor/dom-editor'
import { IDomEditor } from '../editor/interface'
import { genElemId, genTextId } from '../render/helper'
import { node2Vnode } from '../render/node2Vnode'
import $, { Dom7Array, getDefaultView, getElementById } from '../utils/dom'
import { promiseResolveThen } from '../utils/util'
import { genPatchFn, normalizeVnodeData } from '../utils/vdom'
import {
  EDITOR_TO_ELEMENT,
  EDITOR_TO_WINDOW,
  ELEMENT_TO_NODE,
  IS_FIRST_PATCH,
  KEY_TO_ELEMENT,
  NODE_TO_ELEMENT,
  TEXTAREA_TO_CHILDREN,
  TEXTAREA_TO_PATCH_FN,
  TEXTAREA_TO_VNODE,
} from '../utils/weak-maps'
import TextArea from './TextArea'

function genTextareaId(id: number) {
  return `w-e-textarea-${id}`
}

/**
 * 生成编辑区域节点的 vnode
 * @param elemId elemId
 * @param readOnly readOnly
 */
function genRootVnode(elemId: string, readOnly = false): VNode {
  return h(`div#${elemId}`, {
    props: {
      contentEditable: !readOnly,
    },
  })
  // 其他属性在 genRootElem 中定，这里不用重复写
}

/**
 * 生成编辑区域的 elem
 * @param elemId elemId
 * @param readOnly readOnly
 */
function genRootElem(elemId: string, _readOnly = false): Dom7Array {
  const $elem = $(`<div
        id="${elemId}"
        data-slate-editor
        data-slate-node="value"
        suppressContentEditableWarning
        role="textarea"
        spellCheck="true"
        autoCorrect="true"
        autoCapitalize="true"
    ></div>`)

  // role="textarea" - 增强语义，div 语义太弱

  return $elem
}
/**
 * 判断两个 Descendant 节点是否可以复用
 * @param prevChild 上一次的节点
 * @param newChild 当前的节点
 */
function canReuseDescendant(prevChild: Descendant, newChild: Descendant): boolean {
  // 默认复用规则：type 和 textAlign 相同
  return JSON.stringify(prevChild) === JSON.stringify(newChild)
}
function setNodeKey(editor:IDomEditor, prevElemNode:Element, node) {
  const key = DomEditor.findKey(editor, node)
  const prevKey = DomEditor.findKey(editor, prevElemNode)
  const domId = prevElemNode.type ? genElemId(prevElemNode.type, prevKey.id) : genTextId(prevKey.id)

  // 更新 element 相关的 weakMap
  promiseResolveThen(() => {
    // 异步，否则拿不到 DOM 节点
    const dom = getElementById(domId)

    if (dom == null) { return }
    KEY_TO_ELEMENT.set(key, dom)
    NODE_TO_ELEMENT.set(prevElemNode, dom)
    ELEMENT_TO_NODE.set(dom, prevElemNode)

  })

  if (node.children && prevElemNode.children) {
    for (let i = 0; i < node.children.length; i += 1) {
      setNodeKey(editor, prevElemNode.children[i] as Element, node.children[i])
    }
  }
}
function diffChildren(
  preVnode:VNode[],
  preChildren: Descendant[],
  children: Descendant[],
  editor : IDomEditor,
): VNode[] {
  const result: VNode[] = []

  // 双端指针
  let preStart = 0
  let preEnd = preChildren.length - 1
  let curStart = 0
  let curEnd = children.length - 1

  while (preStart <= preEnd && curStart <= curEnd) {
    const prevStartChild = preChildren[preStart]
    const prevEndChild = preChildren[preEnd]
    const curStartChild = children[curStart]
    const curEndChild = children[curEnd]

    // 前端比较
    if (canReuseDescendant(prevStartChild, curStartChild)) {
      result[curStart] = preVnode[preStart] // 复用旧的 VNode

      setNodeKey(editor, prevStartChild as Element, curStartChild)
      preStart += 1
      curStart += 1
    // eslint-disable-next-line brace-style
    }
    // 后端比较
    else if (canReuseDescendant(prevEndChild, curEndChild)) {
      result[curEnd] = preVnode[preEnd] // 复用旧的 VNode
      setNodeKey(editor, prevEndChild as Element, curEndChild)

      preEnd -= 1
      curEnd -= 1
    // eslint-disable-next-line brace-style
    }
    // 前端无法复用，创建新节点
    else {
      result[curStart] = node2Vnode(curStartChild, curStart, editor, editor) // 转换为新 VNode
      normalizeVnodeData(result[curStart])
      curStart += 1
    }
  }

  // 处理剩余新增节点
  while (curStart <= curEnd) {
    result[curStart] = node2Vnode(children[curStart], curStart, editor, editor) // 转换为新 VNode
    normalizeVnodeData(result[curStart])
    curStart += 1
  }

  return result
}

/**
 * 获取 editor.children 渲染 DOM
 * @param textarea textarea
 * @param editor editor
 */
function updateView(textarea: TextArea, editor: IDomEditor) {
  const $scroll = textarea.$scroll
  const elemId = genTextareaId(textarea.id)
  const { readOnly, autoFocus } = editor.getConfig()

  // 生成 newVnode
  const newVnode = genRootVnode(elemId, readOnly)
  const content = editor.children || []
  const prevVnode = TEXTAREA_TO_VNODE.get(textarea) // 获取上一次的 vnode
  const preChildren = TEXTAREA_TO_CHILDREN.get(textarea)

  if (preChildren && prevVnode?.children) {
    newVnode.children = diffChildren(prevVnode.children as VNode[], preChildren, content, editor)
  } else {
    newVnode.children = content.map((node, i) => {
      const vnode = node2Vnode(node, i, editor, editor)

      normalizeVnodeData(vnode) // 整理 vnode.data 以符合 snabbdom 的要求
      return vnode
    })
  }

  let textareaElem
  let isFirstPatch = IS_FIRST_PATCH.get(textarea)

  if (isFirstPatch == null) { isFirstPatch = true } // 尚未赋值，也是第一次
  if (isFirstPatch) {
    // 第一次 patch ，先生成 elem
    const $textArea = genRootElem(elemId, readOnly)

    $scroll.append($textArea)
    textarea.$textArea = $textArea // 存储下编辑区域的 DOM 节点
    textareaElem = $textArea[0]

    // 再生成 patch 函数，并执行
    const patchFn = genPatchFn()

    patchFn(textareaElem, newVnode)

    // 存储相关信息
    IS_FIRST_PATCH.set(textarea, false) // 不再是第一次 patch
    TEXTAREA_TO_PATCH_FN.set(textarea, patchFn) // 存储 patch 函数
  } else {
    // 不是第一次 patch
    const curVnode = TEXTAREA_TO_VNODE.get(textarea)
    const patchFn = TEXTAREA_TO_PATCH_FN.get(textarea)

    if (curVnode == null || patchFn == null) { return }
    textareaElem = curVnode.elm

    patchFn(curVnode, newVnode)
  }

  if (textareaElem == null) {
    textareaElem = getElementById(elemId)

    // 通过 getElementById 获取的有可能是 null （销毁、重建时，可能会发生这种情况）
    if (textareaElem == null) { return }
  }

  // focus
  let isFocused

  if (isFirstPatch) {
    // 初次渲染
    isFocused = autoFocus
  } else {
    // 非初次渲染
    isFocused = editor.isFocused()
  }
  if (isFocused) {
    textareaElem.focus({
      preventScroll: true, // 必须添加 preventScroll 选项，否则弹窗或者编辑器失焦会导致编辑区域自动滚动到顶部
    })
  }

  // 存储相关信息
  if (isFirstPatch) {
    const window = getDefaultView(textareaElem)

    // eslint-disable-next-line no-unused-expressions
    window && EDITOR_TO_WINDOW.set(editor, window)
  }

  TEXTAREA_TO_CHILDREN.set(textarea, content)
  EDITOR_TO_ELEMENT.set(editor, textareaElem) // 存储 editor -> elem 对应关系
  NODE_TO_ELEMENT.set(editor, textareaElem)
  ELEMENT_TO_NODE.set(textareaElem, editor)
  TEXTAREA_TO_VNODE.set(textarea, newVnode) // 存储 vnode
}

export default updateView
