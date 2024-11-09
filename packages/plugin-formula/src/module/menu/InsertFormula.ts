/**
 * @description insert formula menu
 * @author wangfupeng
 */

import {
  DomEditor,
  genModalButtonElems,
  genModalTextareaElems,
  IDomEditor,
  IModalMenu,
  SlateNode,
  SlateRange,
  t,
} from '@wangeditor-next/editor'

import { SIGMA_SVG } from '../../constants/icon-svg'
import $, { Dom7Array, DOMElement } from '../../utils/dom'
import { genRandomStr } from '../../utils/util'
import { FormulaElement } from '../custom-types'

/**
 * 生成唯一的 DOM ID
 */
function genDomID(): string {
  return genRandomStr('w-e-insert-formula')
}

class InsertFormulaMenu implements IModalMenu {
  readonly title = t('formula.insert')

  readonly iconSvg = SIGMA_SVG

  readonly tag = 'button'

  readonly showModal = true // 点击 button 时显示 modal

  readonly modalWidth = 300

  private $content: Dom7Array | null = null

  private readonly textareaId = genDomID()

  private readonly buttonId = genDomID()

  getValue(_editor: IDomEditor): string | boolean {
    // 插入菜单，不需要 value
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    // 任何时候，都不用激活 menu
    return false
  }

  exec(_editor: IDomEditor, _value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor

    if (selection == null) { return true }
    if (SlateRange.isExpanded(selection)) { return true } // 选区非折叠，禁用

    const selectedElems = DomEditor.getSelectedElems(editor)

    const hasVoidElem = selectedElems.some(elem => editor.isVoid(elem))

    if (hasVoidElem) { return true } // 选中了 void 元素，禁用

    const hasPreElem = selectedElems.some(elem => DomEditor.getNodeType(elem) === 'pre')

    if (hasPreElem) { return true } // 选中了 pre 原则，禁用

    return false
  }

  getModalPositionNode(_editor: IDomEditor): SlateNode | null {
    return null // modal 依据选区定位
  }

  getModalContentElem(editor: IDomEditor): DOMElement {
    const { textareaId, buttonId } = this

    const [textareaContainerElem, textareaElem] = genModalTextareaElems(
      t('formula.formula'),
      textareaId,
      t('formula.placeholder'),
    )
    const $textarea = $(textareaElem)
    const [buttonContainerElem] = genModalButtonElems(buttonId, t('formula.ok'))

    if (this.$content == null) {
      // 第一次渲染
      const $content = $('<div></div>')

      // 绑定事件（第一次渲染时绑定，不要重复绑定）
      $content.on('click', `#${buttonId}`, e => {
        e.preventDefault()
        const value = $content.find(`#${textareaId}`).val().trim()

        this.insertFormula(editor, value)
        editor.hidePanelOrModal() // 隐藏 modal
      })

      // 记录属性，重要
      this.$content = $content
    }

    const $content = this.$content

    $content.html('') // 先清空内容

    // append textarea and button
    $content.append(textareaContainerElem)
    $content.append(buttonContainerElem)

    // 设置 input val
    $textarea.val('')

    // focus 一个 input（异步，此时 DOM 尚未渲染）
    setTimeout(() => {
      $textarea.focus()
    })

    return $content[0]
  }

  private insertFormula(editor: IDomEditor, value: string) {
    if (!value) { return }

    // 还原选区
    editor.restoreSelection()

    if (this.isDisabled(editor)) { return }

    const formulaElem: FormulaElement = {
      type: 'formula',
      value,
      children: [{ text: '' }], // void node 需要有一个空 text
    }

    editor.insertNode(formulaElem)
  }
}

export default InsertFormulaMenu
