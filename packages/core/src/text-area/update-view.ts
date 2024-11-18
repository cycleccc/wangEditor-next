/**
 * @description patch textarea view
 * @author wangfupeng
 */

import { Descendant, Range } from 'slate'
import { h, VNode } from 'snabbdom'

import { IDomEditor } from '../editor/interface'
import { node2Vnode } from '../render/node2Vnode'
import $, { Dom7Array, getDefaultView, getElementById } from '../utils/dom'
import { genPatchFn, normalizeVnodeData } from '../utils/vdom'
import {
  EDITOR_TO_ELEMENT,
  EDITOR_TO_WINDOW,
  ELEMENT_TO_NODE,
  IS_FIRST_PATCH,
  NODE_TO_ELEMENT,
  TEXTAREA_TO_PATCH_FN,
  TEXTAREA_TO_SELECTION,
  TEXTAREA_TO_VNODE,
} from '../utils/weak-maps'
import TextArea from './TextArea'

function genElemId(id: number) {
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

function diffBySelection(
  prevVnode: VNode,
  content: Descendant[],
  editor: IDomEditor,
): VNode[] {
  const selection = editor.selection

  if (!selection) {
    return prevVnode.children as VNode[]
  }

  const { anchor, focus } = selection

  // 确定更新范围
  const startIndex = Math.min(anchor.path[0], focus.path[0])

  // 克隆数组并更新指定位置
  const newChildren = [...(prevVnode.children || [])] as VNode[]
  const newNode = node2Vnode(content[startIndex], startIndex, editor, editor)

  normalizeVnodeData(newNode)
  newChildren[startIndex] = newNode

  return newChildren
}

/**
 * 获取 editor.children 渲染 DOM
 * @param textarea textarea
 * @param editor editor
 */
function updateView(textarea: TextArea, editor: IDomEditor) {
  const $scroll = textarea.$scroll
  const elemId = genElemId(textarea.id)
  const { readOnly, autoFocus } = editor.getConfig()

  // 生成 newVnode
  const newVnode = genRootVnode(elemId, readOnly)
  const content = editor.children || []
  const prevVnode = TEXTAREA_TO_VNODE.get(textarea) // 获取上一次的 vnode
  const cacheSelection = TEXTAREA_TO_SELECTION.get(textarea)

  if (
    prevVnode
    && cacheSelection
    && Range.isCollapsed(cacheSelection)
  ) {
    newVnode.children = diffBySelection(prevVnode, content, editor)
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

  const selection = editor.selection

  if (selection) {
    TEXTAREA_TO_SELECTION.set(textarea, selection)
  }
  EDITOR_TO_ELEMENT.set(editor, textareaElem) // 存储 editor -> elem 对应关系
  NODE_TO_ELEMENT.set(editor, textareaElem)
  ELEMENT_TO_NODE.set(textareaElem, editor)
  TEXTAREA_TO_VNODE.set(textarea, newVnode) // 存储 vnode
}

export default updateView
