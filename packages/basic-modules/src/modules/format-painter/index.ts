/**
 * @description format painter
 * @author CodePencil
 */

import { IModuleConf } from '@wangeditor-next/core'
import { formatPainterConf } from './menu/index'
import withFormatPainter from './plugin'

const formatPainter: Partial<IModuleConf> = {
  menus: [formatPainterConf],
  editorPlugin: withFormatPainter,
}

export default formatPainter
