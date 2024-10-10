/**
 * @description slate 插件 - config 相关
 * @author wangfupeng
 */

import { Editor } from 'slate'

import { getMenuConfigReturnType, IDomEditor } from '../..'
import { AlertType, IEditorConfig } from '../../config/interface'
import { MENU_ITEM_FACTORIES } from '../../menus/register'
import { EDITOR_TO_CONFIG } from '../../utils/weak-maps'

export const withConfig = <T extends Editor>(editor: T) => {
  const e = editor as T & IDomEditor

  e.getAllMenuKeys = (): string[] => {
    const arr: string[] = []

    // eslint-disable-next-line guard-for-in
    for (const key in MENU_ITEM_FACTORIES) {
      arr.push(key)
    }
    return arr
  }

  // 获取 editor 配置信息
  e.getConfig = (): IEditorConfig => {
    const config = EDITOR_TO_CONFIG.get(e)

    if (config == null) { throw new Error('Can not get editor config') }
    return config
  }

  // 获取 menu config
  e.getMenuConfig = <K extends string>(menuKey: string): getMenuConfigReturnType<K> => {
    const { MENU_CONF = {} } = e.getConfig()

    return MENU_CONF[menuKey] || {}
  }

  // alert
  e.alert = (info: string, type: AlertType = 'info') => {
    const { customAlert } = e.getConfig()

    if (customAlert) { customAlert(info, type) }
  }

  return e
}
