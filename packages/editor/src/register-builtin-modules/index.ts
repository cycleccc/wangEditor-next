/**
 * @description register builtin modules
 * @author wangfupeng
 */

// basic-modules
import '@wangeditor-next/basic-modules/dist/css/style.css'
import basicModules from '@wangeditor-next/basic-modules'

import '@wangeditor-next/list-module/dist/css/style.css'
import wangEditorListModule from '@wangeditor-next/list-module'

// table-module
import '@wangeditor-next/table-module/dist/css/style.css'
import wangEditorTableModule from '@wangeditor-next/table-module'

// video-module
import '@wangeditor-next/video-module/dist/css/style.css'
import wangEditorVideoModule from '@wangeditor-next/video-module'

// upload-image-module
import '@wangeditor-next/upload-image-module/dist/css/style.css'
import wangEditorUploadImageModule from '@wangeditor-next/upload-image-module'

// code-highlight
import '@wangeditor-next/code-highlight/dist/css/style.css'
import { wangEditorCodeHighlightModule } from '@wangeditor-next/code-highlight'

import registerModule from './register'

basicModules.forEach(module => registerModule(module))
registerModule(wangEditorListModule)
registerModule(wangEditorTableModule)
registerModule(wangEditorVideoModule)
registerModule(wangEditorUploadImageModule)
registerModule(wangEditorCodeHighlightModule)
