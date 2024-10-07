/**
 * @description table menu test
 * @author luochao
 */

import * as core from '@wangeditor-next/core'
import { Ancestor } from 'slate'

import {
  tableCellToHtmlConf,
  tableRowToHtmlConf,
  tableToHtmlConf,
} from '../src/module/elem-to-html'

describe('TableModule module', () => {
  describe('module elem-to-html', () => {
    test('tableCellToHtmlConf should return object that include "type" and "elemToHtml" property', () => {
      expect(tableCellToHtmlConf.type).toBe('table-cell')
      expect(typeof tableCellToHtmlConf.elemToHtml).toBe('function')
    })

    test('tableCellToHtmlConf elemToHtml should throw Error if tableCell do not have parent', () => {
      const element = {
        type: 'table-cell',
        children: [],
      }

      try {
        tableCellToHtmlConf.elemToHtml(element, '<span>123</span>')
      } catch (err) {
        expect((err as Error).message).toBe(
          `Cannot get table row node by cell node ${JSON.stringify(element)}`,
        )
      }
    })

    test('tableCellToHtmlConf elemToHtml should throw Error if tableRow do not have parent', () => {
      const element = {
        type: 'table-cell',
        children: [],
      }

      vi.spyOn(core.DomEditor, 'getParentNode').mockReturnValue({
        type: 'table-row',
        children: [{ text: '' }],
      } as any)
      try {
        tableCellToHtmlConf.elemToHtml(element, '<span>123</span>')
      } catch (err) {
        expect((err as Error).message).toBe(
          `Cannot get table node by cell node ${JSON.stringify(element)}`,
        )
      }
    })

    test('tableCellToHtmlConf elemToHtml should return html element td string', () => {
      const element = {
        type: 'table-cell',
        children: [],
      }

      vi.spyOn(core.DomEditor, 'getParentNode')
        .mockReturnValueOnce({ type: 'table-row', children: [{ text: '' }] } as any)
        .mockReturnValueOnce({ type: 'table', children: [{ text: '' }] } as Ancestor)

      const res = tableCellToHtmlConf.elemToHtml(element, '<span>123</span>')

      expect(res).toBe('<td colSpan="1" rowSpan="1" width="auto" style=""><span>123</span></td>')
    })

    test('tableRowToHtmlConf should return object that include "type" and "elemToHtml" property', () => {
      expect(tableRowToHtmlConf.type).toBe('table-row')
      expect(typeof tableRowToHtmlConf.elemToHtml).toBe('function')
    })

    test('tableRowToHtmlConf elemToHtml should return html table row string', () => {
      const element = {
        type: 'table-row',
        children: [],
      }
      const res = tableRowToHtmlConf.elemToHtml(element, '<td>123</td>')

      expect(res).toBe('<tr><td>123</td></tr>')
    })

    test('tableToHtmlConf should return object that include "type" and "elemToHtml" property', () => {
      expect(tableToHtmlConf.type).toBe('table')
      expect(typeof tableToHtmlConf.elemToHtml).toBe('function')
    })

    test('tableToHtmlConf should return html table string', () => {
      const element = {
        type: 'table',
        children: [],
      }
      const res = tableToHtmlConf.elemToHtml(element, '<tr><td>123</td></tr>')

      expect(res).toBe(
        '<table style="width: auto;table-layout: fixed;height:auto"><tbody><tr><td>123</td></tr></tbody></table>',
      )
    })

    test('tableToHtmlConf should return html table string with full width style if element is set fullWith value true', () => {
      const element = {
        type: 'table',
        width: '100%',
        height: '60px',
        children: [],
      }
      const res = tableToHtmlConf.elemToHtml(element, '<tr><td>123</td></tr>')

      expect(res).toBe(
        '<table style="width: 100%;table-layout: fixed;height:60px"><tbody><tr><td>123</td></tr></tbody></table>',
      )
    })
  })
})
