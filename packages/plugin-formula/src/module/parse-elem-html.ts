/**
 * @description parse elem html
 * @author wangfupeng
 */

import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor-next/editor'

import { DOMElement } from '../utils/dom'
import { FormulaElement } from './custom-types'

function parseHtml(
  elem: DOMElement,
  _children: SlateDescendant[],
  _editor: IDomEditor,
): SlateElement {
  const value = elem.getAttribute('data-value') || ''

  return {
    type: 'formula',
    value,
    children: [{ text: '' }], // void node 必须有一个空白 text
  } as FormulaElement
}

const parseHtmlConf = {
  selector: 'span[data-w-e-type="formula"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
