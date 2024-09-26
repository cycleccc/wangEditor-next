/**
 * @description 注册菜单 - button menu
 * @author wangfupeng
 */

import { IDomEditor } from '../../../src/editor/interface'
import { IButtonMenu, registerMenu } from '../../../src/menus/index'

class MyButtonMenu implements IButtonMenu {
  readonly title = 'My Button Menu'

  readonly tag = 'button'

  getValue(editor: IDomEditor) {
    return ''
  }

  isActive(editor: IDomEditor) {
    return false
  }

  isDisabled(editor: IDomEditor) {
    return false
  }

  exec(editor: IDomEditor, value: string | boolean) {
    console.log('do..')
  }
}

registerMenu({
  key: 'myButtonMenu',
  factory() {
    return new MyButtonMenu()
  },
})
