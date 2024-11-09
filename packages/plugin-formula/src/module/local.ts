/**
 * @description 多语言
 * @author wangfupeng
 */

import { i18nAddResources } from '@wangeditor-next/editor'

i18nAddResources('en', {
  formula: {
    formula: 'Formula',
    placeholder: 'Use LateX syntax',
    insert: 'Insert formula',
    edit: 'Edit formula',
    ok: 'OK',
  },
})

i18nAddResources('zh-CN', {
  formula: {
    formula: '公式',
    placeholder: '使用 LateX 语法',
    insert: '插入公式',
    edit: '编辑公式',
    ok: '确定',
  },
})
