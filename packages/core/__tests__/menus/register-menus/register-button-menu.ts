/**
 * @description 注册菜单 - button menu
 * @author wangfupeng
 */

import { IDomEditor } from '../../../src/editor/interface'
import { IButtonMenu, registerMenu } from '../../../src/menus/index'

class MyButtonMenu implements IButtonMenu {
  readonly title = 'My Button Menu'

  readonly tag = 'button'

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
}

registerMenu({
  key: 'myButtonMenu',
  factory() {
    return new MyButtonMenu()
  },
})
