/**
 * @description 注册菜单 - select menu
 * @author wangfupeng
 */

import { IDomEditor } from '../../../src/editor/interface'
import { IOption, ISelectMenu, registerMenu } from '../../../src/menus/index'

class MySelectMenu implements ISelectMenu {
  readonly title = 'My Select Menu'

  readonly tag = 'select'

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

  getOptions(): IOption[] {
    return [
      { value: 'a', text: 'a' },
      { value: 'b', text: 'b' },
    ]
  }
}

registerMenu({
  key: 'mySelectMenu',
  factory() {
    return new MySelectMenu()
  },
})
