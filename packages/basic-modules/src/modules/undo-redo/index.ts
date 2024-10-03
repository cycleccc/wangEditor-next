/**
 * @description undo redo
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { redoMenuConf, undoMenuConf } from './menu/index'

const undoRedo: Partial<IModuleConf> = {
  menus: [redoMenuConf, undoMenuConf],
}

export default undoRedo
