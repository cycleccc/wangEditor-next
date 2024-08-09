/**
 * @description set cell property menu
 * @author hsuna
 */

import { Editor, Transforms, Range } from 'slate'
import { IButtonMenu, IDomEditor, DomEditor, t } from '@wangeditor-next/core'
import {
  CLEAN_SVG,
  JUSTIFY_CENTER_SVG,
  JUSTIFY_JUSTIFY_SVG,
  JUSTIFY_LEFT_SVG,
  JUSTIFY_RIGHT_SVG,
  TABLE_PROPERTY_SVG,
} from '../../constants/svg'
import { isOfType } from '../../utils'
import $ from '../../utils/dom'

class TableProperty implements IButtonMenu {
  readonly title = t('tableModule.tableProperty')
  iconSvg = TABLE_PROPERTY_SVG
  readonly tag = 'button'
  readonly showModal = true
  readonly modalWidth = 300
  readonly borderStyle = [
    { value: 'none', label: t('tableModule.borderStyle.none') },
    { value: 'solid', label: t('tableModule.borderStyle.solid') },
    { value: 'dotted', label: t('tableModule.borderStyle.dotted') },
    { value: 'dashed', label: t('tableModule.borderStyle.dashed') },
    { value: 'double', label: t('tableModule.borderStyle.double') },
    { value: 'groove', label: t('tableModule.borderStyle.groove') },
    { value: 'ridge', label: t('tableModule.borderStyle.ridge') },
    { value: 'inset', label: t('tableModule.borderStyle.inset') },
    { value: 'outset', label: t('tableModule.borderStyle.outset') },
  ]

  getValue(editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(editor: IDomEditor): boolean {
    const { selection } = editor
    if (selection == null) return true
    if (!Range.isCollapsed(selection)) return true

    const tableNode = DomEditor.getSelectedNodeByType(editor, 'table')
    if (tableNode == null) {
      // 选区未处于 table cell node ，则禁用
      return true
    }
    return false
  }

  // 点击菜单时触发的函数1
  exec(editor: IDomEditor, value: string | boolean) {
    // 点击菜单时，弹出 modal 之前，不需要执行其他代码
    // 此处空着即可
  }

  getModalContentNode(editor: IDomEditor) {
    const [node] = Editor.nodes(editor, {
      match: isOfType(editor, 'table'),
    })
    return node
  }

  // 弹出框 modal 的定位：1. 返回某一个 SlateNode； 2. 返回 null （根据当前选区自动定位）
  getModalPositionNode(editor: IDomEditor) {
    // JS 语法
    return null // modal 依据选区定位
  }

  // 定义 modal 内部的 DOM Element
  getModalContentElem(editor: IDomEditor) {
    const node = this.getModalContentNode(editor)
    if (!node) return null

    const [data, path] = node
    const $content = $(`<div>
      <label class="babel-container">
        <span>${t('tableModule.modal.border')}</span>
        <span class="babel-container-border">
          <select name="borderStyle">
            ${this.borderStyle
              .map(item => `<option value="${item.value}">${item.label}</option>`)
              .join('')}
          </select>
          <span class="color-group" data-mark="color">
            <span class="color-group-block"></span>
            <input name="borderColor" type="hidden">
          </span>
          <input name="borderWidth" type="number" placeholder="${t(
            'tableModule.modal.borderWidth'
          )}">
        </span>
      </label>
      <div class="babel-container">
        <span>${t('tableModule.modal.bgColor')}</span>
        <span class="babel-container-background">
          <span class="color-group" data-mark="bgColor">
            <span class="color-group-block"></span>
            <input name="backgroundColor" type="hidden">
          </span>
        </span>
      </div>
      <label class="babel-container">
        <span>${t('tableModule.modal.align')}</span>
        <span class="radio-group">
          <input name="textAlign" type="hidden">
          <span class="radio-item" value="left">${JUSTIFY_LEFT_SVG}</span>
          <span class="radio-item" value="center">${JUSTIFY_CENTER_SVG}</span>
          <span class="radio-item" value="right">${JUSTIFY_RIGHT_SVG}</span>
          <span class="radio-item" value="justify">${JUSTIFY_JUSTIFY_SVG}</span>
        </span>
      </label>
      <div class="button-container">
        <button type="button">${t('tableModule.modal.ok')}</button>
      </div>
    </div>`)

    // 初始化所有表单的值
    $content.find('[name]').each(elem => {
      $(elem).val(data[$(elem).attr('name')])
    })

    $content.find('.radio-group').each(elem => {
      const val = $('[type="hidden"]', elem).val() || 'left'
      $(`.radio-item[value=${val}]`, elem).addClass('is-active')
      $('.radio-item', elem).on('click', evt => {
        const $elemItem = $(evt.currentTarget as EventTarget)
        $elemItem.addClass('is-active').siblings('.radio-item').removeClass('is-active')

        const newVal = $elemItem.attr('value')
        $('[type="hidden"]', elem).val(newVal)
      })
    })

    const setSelectedColor = (elem, color) => {
      if (color) {
        $('.color-group-block', elem).css('background-color', color).empty()
      } else {
        $('.color-group-block', elem).css('background-color', '').html(CLEAN_SVG)
      }
    }
    $content.find('.color-group').each(elem => {
      const selectedColor = $('[type="hidden"]', elem).val() || ''
      setSelectedColor(elem, selectedColor)

      const $elem = $(elem)
      $elem.on('click', () => {
        $content.find('.color-group .w-e-drop-panel').hide()
        let $panel = $elem.data('panel')
        if (!$panel) {
          $panel = this.getPanelContentElem(editor, {
            mark: $elem.data('mark'),
            selectedColor,
            callback: color => {
              $('[type="hidden"]', elem).val(color || '')
              setSelectedColor(elem, color)
              $panel.hide()
            },
          })
          $elem.append($panel)
          $elem.data('panel', $panel)
        } else {
          $panel.show()
        }
      })
    })

    const $button = $content.find('button')
    $button.on('click', () => {
      const props = Array.from($content.find('[name]')).reduce((obj, elem) => {
        obj[$(elem).attr('name')] = $(elem).val()
        return obj
      }, {})
      Transforms.setNodes(
        editor,
        props,
        { at: path } // inline 元素设置text-align 是没作用的
      )

      setTimeout(() => {
        editor.focus()
      })
    })

    return $content[0] // 返回 DOM Element 类型
  }

  getPanelContentElem(editor, { mark, selectedColor, callback }) {
    // 第一次渲染
    const $colorPanel = $('<ul class="w-e-panel-content-color"></ul>')

    // 绑定事件（只在第一次绑定，不要重复绑定）
    $colorPanel.on('click', 'li', e => {
      const { target } = e
      if (!target) return
      e.preventDefault()
      e.stopPropagation()

      const $li = $(target)
      const val = $li.attr('data-value')
      callback(val)
    })

    // 获取菜单配置
    const colorConf = editor.getMenuConfig(mark)
    const { colors = [] } = colorConf
    // 根据菜单配置生成 panel content
    colors.forEach(color => {
      const $block = $(`<div class="color-block" data-value="${color}"></div>`)
      $block.css('background-color', color)

      const $li = $(`<li data-value="${color}"></li>`)
      if (selectedColor === color) {
        $li.addClass('active')
      }
      $li.append($block)

      $colorPanel.append($li)
    })

    // 清除颜色
    let clearText = ''
    if (mark === 'color') clearText = t('tableModule.color.default')
    if (mark === 'bgColor') clearText = t('tableModule.color.clear')
    const $clearLi = $(`
      <li data-value="" class="clear">
        ${CLEAN_SVG}
        ${clearText}
      </li>
    `)
    $colorPanel.prepend($clearLi)

    const $panel = $('<div class="w-e-drop-panel"></div>')
    $panel.append($colorPanel)
    return $panel
  }
}

export default TableProperty
