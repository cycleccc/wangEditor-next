/**
 * @description table module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'

import { tableCellToHtmlConf, tableRowToHtmlConf, tableToHtmlConf } from './elem-to-html'
import {
  deleteTableColConf,
  deleteTableMenuConf,
  deleteTableRowConf,
  insertTableColConf,
  insertTableMenuConf,
  insertTableRowConf,
  mergeTableCellConf,
  setTableCellPropertyConf,
  setTablePropertyConf,
  splitTableCellConf,
  tableFullWidthMenuConf,
  tableHeaderMenuConf,
} from './menu/index'
import { parseCellHtmlConf, parseRowHtmlConf, parseTableHtmlConf } from './parse-elem-html'
import { parseStyleHtml } from './parse-style-html'
import withTable from './plugin'
import { preParseTableHtmlConf } from './pre-parse-html'
import { renderTableCellConf, renderTableConf, renderTableRowConf } from './render-elem/index'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'

const table: Partial<IModuleConf> = {
  renderStyle,
  styleToHtml,
  parseStyleHtml,
  renderElems: [renderTableConf, renderTableRowConf, renderTableCellConf],
  elemsToHtml: [tableToHtmlConf, tableRowToHtmlConf, tableCellToHtmlConf],
  preParseHtml: [preParseTableHtmlConf],
  parseElemsHtml: [parseCellHtmlConf, parseRowHtmlConf, parseTableHtmlConf],
  menus: [
    insertTableMenuConf,
    deleteTableMenuConf,
    insertTableRowConf,
    deleteTableRowConf,
    insertTableColConf,
    deleteTableColConf,
    tableHeaderMenuConf,
    tableFullWidthMenuConf,
    mergeTableCellConf,
    splitTableCellConf,
    setTablePropertyConf,
    setTableCellPropertyConf,
  ],
  editorPlugin: withTable,
}

export default table
