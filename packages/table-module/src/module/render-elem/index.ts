/**
 * @description render elem
 * @author wangfupeng
 */

import renderTableCell from './render-cell'
import renderTableRow from './render-row'
import renderTable from './render-table'

export const renderTableConf = {
  type: 'table',
  renderElem: renderTable,
}

export const renderTableRowConf = {
  type: 'table-row',
  renderElem: renderTableRow,
}

export const renderTableCellConf = {
  type: 'table-cell',
  renderElem: renderTableCell,
}
