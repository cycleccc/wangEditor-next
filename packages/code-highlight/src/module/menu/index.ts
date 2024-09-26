/**
 * @description code-highlight menu
 * @author wangfupeng
 */

import { genCodeLangs } from './config'
import SelectLangMenu from './SelectLangMenu'

export const selectLangMenuConf = {
  key: 'codeSelectLang',
  factory() {
    return new SelectLangMenu()
  },
  config: {
    codeLangs: genCodeLangs(),
  },
}
