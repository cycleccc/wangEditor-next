/**
 * @description table module
 * @author wangfupeng
 */

import { IModuleConf } from '@wangeditor-next/core'
import withTable from './plugin'
import { renderTableConf, renderTableRowConf, renderTableCellConf } from './render-elem/index'
import { tableToHtmlConf, tableRowToHtmlConf, tableCellToHtmlConf } from './elem-to-html'
import { preParseTableHtmlConf } from './pre-parse-html'
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
} from './menu/index'

const table: Partial<IModuleConf> = {
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
  ],
  editorPlugin: withTable,
}

export default table
