/**
 * @description formula menu entry
 * @author wangfupeng
 */

import EditFormulaMenu from './EditFormula'
import InsertFormulaMenu from './InsertFormula'

export const insertFormulaMenuConf = {
  key: 'insertFormula', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new InsertFormulaMenu()
  },
}

export const editFormulaMenuConf = {
  key: 'editFormula', // menu key ，唯一。注册之后，可配置到工具栏
  factory() {
    return new EditFormulaMenu()
  },
}
