/**
 * @description table menu test
 * @author luochao
 */

import createEditor from '../../../tests/utils/create-editor'
import withTable from '../src/module/plugin'
import * as core from '@wangeditor-next/core'
import * as slate from 'slate'

describe('TableModule module', () => {
  describe('module plugin', () => {
    test('use withTable plugin when break line not split node', () => {
      const editor = createEditor()
      const newEditor = withTable(editor)

      vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockReturnValue({
        type: 'table',
        children: [{ text: '' }],
      } as slate.Element)

      const mockFn = vi.fn()
      newEditor.insertText = mockFn

      newEditor.insertBreak()

      expect(mockFn).toBeCalledWith('\n')
    })

    test('use withTable plugin when insertData should insertText to cell', () => {
      const editor = createEditor()
      const newEditor = withTable(editor)

      vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockReturnValue({
        type: 'table',
        children: [{ text: '' }],
      } as slate.Element)

      const mockFn = vi.fn()
      slate.Editor.insertText = mockFn

      newEditor.insertData({ getData: () => 'test' } as unknown as DataTransfer)

      expect(mockFn).toBeCalled()
    })

    test('use withTable plugin when insertData should invoke original insertData if selection not in table node', () => {
      const editor = createEditor()
      const mockInsertDataFn = vi.fn()
      editor.insertData = mockInsertDataFn

      const newEditor = withTable(editor)

      vi.spyOn(core.DomEditor, 'getSelectedNodeByType').mockReturnValue(null)

      newEditor.insertData({} as DataTransfer)

      expect(mockInsertDataFn).toBeCalled()
    })
  })
})
