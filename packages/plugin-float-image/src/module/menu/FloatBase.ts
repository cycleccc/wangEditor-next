/**
 * @description image float base class
 * @author cycleccc
 */

import {
  DomEditor, IButtonMenu, IDomEditor, SlateNode, SlateTransforms,
} from '@wangeditor-next/editor'

import { ImageElement } from '../custom-types'

abstract class ImageFloatBaseClass implements IButtonMenu {
  abstract readonly title: string // 菜单标题

  abstract readonly iconSvg: string // 图标

  abstract readonly value: string // css float 的值

  readonly tag = 'button'

  getValue(_editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  private getSelectedNode(editor: IDomEditor): SlateNode | null {
    return DomEditor.getSelectedNodeByType(editor, 'image')
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) { return true }

    const imageNode = this.getSelectedNode(editor)

    return imageNode == null
  }

  exec(editor: IDomEditor, _value: string | boolean) {
    if (this.isDisabled(editor)) { return }

    const imageNode = this.getSelectedNode(editor)

    if (imageNode == null) { return }

    // 隐藏 hoverbar
    const hoverbar = DomEditor.getHoverbar(editor)

    if (hoverbar) { hoverbar.hideAndClean() }

    const { style = {} } = imageNode as ImageElement
    const props: Partial<ImageElement> = {
      style: {
        ...style,
        float: this.value, // 修改 float 的值
      },
    }

    SlateTransforms.setNodes(editor, props, {
      match: n => DomEditor.checkNodeType(n, 'image'),
    })
  }
}

export default ImageFloatBaseClass
