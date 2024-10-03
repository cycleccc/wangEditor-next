/**
 * @description delete image menu
 * @author wangfupeng
 */

import {
  DomEditor, IButtonMenu, IDomEditor, t,
} from '@wangeditor-next/core'
import { Transforms } from 'slate'

import { TRASH_SVG } from '../../../constants/icon-svg'

class DeleteImage implements IButtonMenu {
  readonly title = t('image.delete')

  readonly iconSvg = TRASH_SVG

  readonly tag = 'button'

  getValue(_editor: IDomEditor): string | boolean {
    // 无需获取 val
    return ''
  }

  isActive(_editor: IDomEditor): boolean {
    // 无需 active
    return false
  }

  isDisabled(editor: IDomEditor): boolean {
    if (editor.selection == null) { return true }

    const imageNode = DomEditor.getSelectedNodeByType(editor, 'image')

    if (imageNode == null) {
      // 选区未处于 image node ，则禁用
      return true
    }
    return false
  }

  exec(editor: IDomEditor, _value: string | boolean) {
    if (this.isDisabled(editor)) { return }

    // 删除图片
    Transforms.removeNodes(editor, {
      match: n => DomEditor.checkNodeType(n, 'image'),
    })
  }
}

export default DeleteImage
