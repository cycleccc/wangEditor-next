/**
 * @description config interface
 * @author wangfupeng
 */

import { ImageElement } from 'packages/basic-modules/src/modules/image/custom-types'
import { VideoElement } from 'packages/video-module/src/module/custom-types'
import { Node, NodeEntry, Range } from 'slate'

import { IDomEditor } from '../editor/interface'
import { IMenuGroup } from '../menus/interface'
import { IUploadConfig } from '../upload'

interface IHoverbarConf {
  // key 即 element type
  [key: string]: {
    match?: (editor: IDomEditor, n: Node) => boolean // 自定义匹配函数，优先级高于“key 即 element type”
    menuKeys: string[]
  }
}

export type AlertType = 'success' | 'info' | 'warning' | 'error'

export interface ISingleMenuConfig {
  [key: string]: any;
  iconSvg?: string;
}

interface IColorConfig {
  colors: string[];
}

interface IFontSizeItem {
  name: string;
  value: string;
}

interface IFontSizeConfig {
  fontSizeList: (string | IFontSizeItem)[];
}

interface IFontFamilyItem {
  name: string;
  value: string;
}

interface IFontFamilyConfig {
  fontFamilyList: (string | IFontFamilyItem)[];
}

interface ILineHeightConfig {
  lineHeightList: string[];
}

interface IImageMenuBaseConfig {
    checkImage?: (src: string, alt: string, url: string) => boolean | undefined | string;
    parseImageSrc?: (src: string) => string;
}

interface IInsertImageConfig extends IImageMenuBaseConfig {
    onInsertedImage?: (imageNode: ImageElement | null) => void;
}

interface IEditImageConfig extends IImageMenuBaseConfig {
    onUpdatedImage?: (imageNode: ImageElement | null) => void;
}
interface IEmotionConfig {
  emotions: string[];
}

interface IInsertTableConfig {
  minWidth: number;
  tableHeader: {
    selected: boolean;
  };
  tableFullWidth: {
    selected: boolean;
  }
}

interface ILinkConfig {
  checkLink: (text:string, url:string)=> string | boolean | undefined
  parseLinkUrl: (url: string) => string
}

interface IInsertVideoConfig {
  onInsertedVideo: (videoNode: VideoElement) => NodeEntry | Range;
  checkVideo: (src:string, poster:string)=> string | boolean | undefined
  parseVideoSrc: (url: string) => string
}

interface IUploadVideoConfig extends IUploadConfig {
    // 视频专属配置
}

interface IUploadImageConfig extends IUploadConfig {
    base64LimitSize?: number;
}

interface ICodeLangConfig {
  codeLangs: { text: string; value: string }[];
}

export interface IMenuConfig {
  bold: ISingleMenuConfig;
  underline: ISingleMenuConfig;
  italic: ISingleMenuConfig;
  through: ISingleMenuConfig;
  code: ISingleMenuConfig;
  sub: ISingleMenuConfig;
  sup: ISingleMenuConfig;
  clearStyle: ISingleMenuConfig;
  color: IColorConfig;
  bgColor: IColorConfig;
  fontSize: IFontSizeConfig;
  fontFamily: IFontFamilyConfig;
  indent: ISingleMenuConfig;
  delIndent: ISingleMenuConfig;
  justifyLeft: ISingleMenuConfig;
  justifyRight: ISingleMenuConfig;
  justifyCenter: ISingleMenuConfig;
  justifyJustify: ISingleMenuConfig;
  lineHeight: ILineHeightConfig;
  insertImage: IInsertImageConfig;
  deleteImage: ISingleMenuConfig;
  editImage: IEditImageConfig;
  viewImageLink: ISingleMenuConfig;
  imageWidth30: ISingleMenuConfig;
  imageWidth50: ISingleMenuConfig;
  imageWidth100: ISingleMenuConfig;
  editorImageSizeMenu: ISingleMenuConfig;
  divider: ISingleMenuConfig;
  emotion: IEmotionConfig;
  insertLink: ILinkConfig;
  editLink: ILinkConfig;
  unLink: ISingleMenuConfig;
  viewLink: ISingleMenuConfig;
  codeBlock: ISingleMenuConfig;
  blockquote: ISingleMenuConfig;
  headerSelect: ISingleMenuConfig;
  header1: ISingleMenuConfig;
  header2: ISingleMenuConfig;
  header3: ISingleMenuConfig;
  header4: ISingleMenuConfig;
  header5: ISingleMenuConfig;
  header6: ISingleMenuConfig;
  todo: ISingleMenuConfig;
  formatPainter: ISingleMenuConfig;
  redo: ISingleMenuConfig;
  undo: ISingleMenuConfig;
  fullScreen: ISingleMenuConfig;
  enter: ISingleMenuConfig;
  bulletedList: ISingleMenuConfig;
  numberedList: ISingleMenuConfig;
  insertTable: ISingleMenuConfig;
  deleteTable: ISingleMenuConfig;
  insertTableRow: IInsertTableConfig;
  deleteTableRow: ISingleMenuConfig;
  insertTableCol: ISingleMenuConfig;
  deleteTableCol: ISingleMenuConfig;
  tableHeader: ISingleMenuConfig;
  tableFullWidth: ISingleMenuConfig;
  mergeTableCell: ISingleMenuConfig;
  splitTableCell: ISingleMenuConfig;
  setTableProperty: ISingleMenuConfig;
  setTableCellProperty: ISingleMenuConfig;
  insertVideo: IInsertVideoConfig;
  uploadVideo: IUploadVideoConfig;
  editVideoSize: ISingleMenuConfig;
  editVideoSrc: ISingleMenuConfig;
  uploadImage: IUploadImageConfig;
  codeSelectLang: ICodeLangConfig;
}

/**
 * editor config
 */
export interface IEditorConfig {
  // 【注意】如增加 onXxx 回调函数时，要同步到 vue2/vue3 组件
  customAlert: (info: string, type: AlertType) => void

  onCreated?: (editor: IDomEditor) => void
  onChange?: (editor: IDomEditor) => void
  onDestroyed?: (editor: IDomEditor) => void

  onMaxLength?: (editor: IDomEditor) => void
  onFocus?: (editor: IDomEditor) => void
  onBlur?: (editor: IDomEditor) => void

  /**
   * 自定义粘贴。返回 true 则继续粘贴，返回 false 则自行实现粘贴，阻止默认粘贴
   */
  customPaste?: (editor: IDomEditor, e: ClipboardEvent) => boolean

  // edit state
  scroll: boolean
  placeholder?: string
  readOnly: boolean
  autoFocus: boolean
  decorate?: (nodeEntry: NodeEntry) => Range[]
  maxLength?: number

  // 各个 menu 的配置汇总，可以通过 key 获取单个 menu 的配置
  MENU_CONF?: Partial<IMenuConfig>

  // 悬浮菜单栏 menu
  hoverbarKeys?: IHoverbarConf

  // 自由扩展其他配置
  EXTEND_CONF?: any
}

/**
 * toolbar config
 */
export interface IToolbarConfig {
  toolbarKeys: Array<string | IMenuGroup>
  insertKeys: { index: number; keys: string | Array<string | IMenuGroup> }
  excludeKeys: Array<string> // 排除哪些菜单
  modalAppendToBody: boolean // modal append 到 body ，而非 $textAreaContainer 内
}
