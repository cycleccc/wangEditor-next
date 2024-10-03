/**
 * @description 注册菜单 - modal menu
 * @author wangfupeng
 */

import { IDomEditor } from '../../../src/editor/interface'
import { IModalMenu, registerMenu } from '../../../src/menus/index'

class MyModalMenu implements IModalMenu {
  readonly title = 'My Modal Menu'

  readonly tag = 'button'

  readonly showModal = true

  readonly modalWidth = 300

  getValue(_editor: IDomEditor) {
    return ''
  }

  isActive(_editor: IDomEditor) {
    return false
  }

  isDisabled(_editor: IDomEditor) {
    return false
  }

  exec(_editor: IDomEditor, _value: string | boolean) {
    return false
  }

  getModalContentElem(_editor: IDomEditor) {
    return document.createElement('div')
  }

  getModalPositionNode(_editor: IDomEditor) {
    return null
  }
}

registerMenu({
  key: 'myModalMenu',
  factory() {
    return new MyModalMenu()
  },
})
