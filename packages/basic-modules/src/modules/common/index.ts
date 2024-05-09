/**
 * @description common module
 * @author wangfupeng
 */
import { IModuleConf } from '@wangeditor-next/core'
import { enterMenuConf } from './menu/index'

const commonModule: Partial<IModuleConf> = {
  menus: [enterMenuConf],
}

export default commonModule
