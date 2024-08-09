/**
 * @description table module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'
import withTable from './plugin'
import { renderTableConf, renderTableRowConf, renderTableCellConf } from './render-elem/index'
import { tableToHtmlConf, tableRowToHtmlConf, tableCellToHtmlConf } from './elem-to-html'
import { preParseTableHtmlConf } from './pre-parse-html'
import { renderStyle } from './render-style'
import { styleToHtml } from './style-to-html'
import { parseStyleHtml } from './parse-style-html'
import { parseCellHtmlConf, parseRowHtmlConf, parseTableHtmlConf } from './parse-elem-html'
import {
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
} from './menu/index'

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
