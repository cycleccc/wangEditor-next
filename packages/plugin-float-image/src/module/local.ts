/**
 * @description 多语言
 * @author cycleccc
 */

import { i18nAddResources } from '@wangeditor-next/editor'

i18nAddResources('en', {
  float: {
    none: 'Default',
    left: 'Float Left',
    right: 'Float Right',
  },
})

i18nAddResources('zh-CN', {
  float: {
    none: '默认',
    left: '左浮动',
    right: '右浮动',
  },
})
