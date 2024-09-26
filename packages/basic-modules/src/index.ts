/**
 * @description basic index
 * @author wangfupeng
 */

import './assets/index.less'
// 配置多语言
import './locale/index'

import wangEditorBlockQuoteModule from './modules/blockquote'
import wangEditorCodeBlockModule from './modules/code-block'
import wangEditorColorModule from './modules/color'
import wangEditorCommonModule from './modules/common'
import wangEditorDividerModule from './modules/divider'
import wangEditorEmotionModule from './modules/emotion'
import wangEditorFontSizeAndFamilyModule from './modules/font-size-family'
import wangEditorFormatPainterModule from './modules/format-painter'
import wangEditorFullScreenModule from './modules/full-screen'
import wangEditorHeaderModule from './modules/header'
import wangEditorImageModule from './modules/image'
import wangEditorIndentModule from './modules/indent'
import wangEditorJustifyModule from './modules/justify'
import wangEditorLineHeightModule from './modules/line-height'
import wangEditorLinkModule from './modules/link'
import wangEditorParagraphModule from './modules/paragraph'
import wangEditorTextStyleModule from './modules/text-style'
import wangEditorTodoModule from './modules/todo'
import wangEditorUndoRedoModule from './modules/undo-redo'

export default [
  // text style
  wangEditorTextStyleModule,
  wangEditorColorModule,
  wangEditorFontSizeAndFamilyModule,

  // elem style
  wangEditorIndentModule,
  wangEditorJustifyModule,
  wangEditorLineHeightModule,

  // void node
  wangEditorImageModule,
  wangEditorDividerModule,

  // inline node
  wangEditorEmotionModule,
  wangEditorLinkModule,

  // block node —— 【注意】要放在 void-node 和 inline-node 后面！！！
  wangEditorCodeBlockModule,
  wangEditorBlockQuoteModule,
  wangEditorHeaderModule,
  wangEditorParagraphModule,
  wangEditorTodoModule,

  // command
  wangEditorFormatPainterModule,
  wangEditorUndoRedoModule,
  wangEditorFullScreenModule,
  wangEditorCommonModule,
]

// 输出 image 操作，供 updateImageModule 使用
export * from './modules/image/helper'
