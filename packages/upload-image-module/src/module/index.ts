/**
 * @description uploadImage module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { uploadImageMenuConf } from './menu/index'
import withUploadImage from './plugin'

const uploadImage: Partial<IModuleConf> = {
  menus: [uploadImageMenuConf],
  editorPlugin: withUploadImage,
}

export default uploadImage
