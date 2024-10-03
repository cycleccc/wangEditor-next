/**
 * @description menu entry
 * @author wangfupeng
 */

import BgColorMenu from './BgColorMenu'
import ColorMenu from './ColorMenu'
import { genBgColors, genColors } from './config'

export const colorMenuConf = {
  key: 'color',
  factory() {
    return new ColorMenu()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: {
    colors: genColors(),
  },
}

export const bgColorMenuConf = {
  key: 'bgColor',
  factory() {
    return new BgColorMenu()
  },
  config: {
    colors: genBgColors(),
  },
}
