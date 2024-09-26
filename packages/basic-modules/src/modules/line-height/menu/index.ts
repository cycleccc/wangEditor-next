/**
 * @description line-height menu entry
 * @author wangfupeng
 */

import { genLineHeightConfig } from './config'
import LineHeightMenu from './LineHeightMenu'

export const lineHeightMenuConf = {
  key: 'lineHeight',
  factory() {
    return new LineHeightMenu()
  },

  // 默认的菜单菜单配置，将存储在 editorConfig.MENU_CONF[key] 中
  // 创建编辑器时，可通过 editorConfig.MENU_CONF[key] = {...} 来修改
  config: {
    lineHeightList: genLineHeightConfig(),
  },
}
