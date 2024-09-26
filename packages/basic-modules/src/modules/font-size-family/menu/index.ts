/**
 * @description font-size font-family menu entry
 * @author wangfupeng
 */

import { genFontSizeConfig, getFontFamilyConfig } from './config'
import FontFamilyMenu from './FontFamilyMenu'
import FontSizeMenu from './FontSizeMenu'

export const fontSizeMenuConf = {
  key: 'fontSize',
  factory() {
    return new FontSizeMenu()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: {
    fontSizeList: genFontSizeConfig(),
  },
}

export const fontFamilyMenuConf = {
  key: 'fontFamily',
  factory() {
    return new FontFamilyMenu()
  },
  config: {
    fontFamilyList: getFontFamilyConfig(),
  },
}
