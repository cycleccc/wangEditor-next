/**
 * @description to html
 * @author wangfupeng
 */

import { Element } from 'slate'

function dividerToHtml(_elem: Element, _childrenHtml: string): string {
  return '<hr/>'
}

export const dividerToHtmlConf = {
  type: 'divider',
  elemToHtml: dividerToHtml,
}
