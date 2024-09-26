/**
 * @description register builtin modules
 * @author wangfupeng
 */

// basic-modules
import '@wangeditor-next/basic-modules/dist/css/style.css'
import '@wangeditor-next/list-module/dist/css/style.css'
// table-module
import '@wangeditor-next/table-module/dist/css/style.css'
// video-module
import '@wangeditor-next/video-module/dist/css/style.css'
// upload-image-module
import '@wangeditor-next/upload-image-module/dist/css/style.css'
// code-highlight
import '@wangeditor-next/code-highlight/dist/css/style.css'

import basicModules from '@wangeditor-next/basic-modules'
import { wangEditorCodeHighlightModule } from '@wangeditor-next/code-highlight'
import wangEditorListModule from '@wangeditor-next/list-module'
import wangEditorTableModule from '@wangeditor-next/table-module'
import wangEditorUploadImageModule from '@wangeditor-next/upload-image-module'
import wangEditorVideoModule from '@wangeditor-next/video-module'

import registerModule from './register'

basicModules.forEach(module => registerModule(module))
registerModule(wangEditorListModule)
registerModule(wangEditorTableModule)
registerModule(wangEditorVideoModule)
registerModule(wangEditorUploadImageModule)
registerModule(wangEditorCodeHighlightModule)
