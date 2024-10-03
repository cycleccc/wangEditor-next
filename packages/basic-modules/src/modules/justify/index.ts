/**
 * @description justify module entry
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import {
  justifyCenterMenuConf,
  justifyJustifyMenuConf,
  justifyLeftMenuConf,
  justifyRightMenuConf,
} from './menu/index'
import { parseStyleHtml } from './parse-style-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const justify: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  parseStyleHtml,
  menus: [justifyLeftMenuConf, justifyRightMenuConf, justifyCenterMenuConf, justifyJustifyMenuConf],
}

export default justify
