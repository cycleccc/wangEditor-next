/**
 * @description render table
 * @author wangfupeng
 */

import debounce from 'lodash.debounce'
import { Editor, Element as SlateElement, Range, Point, Path } from 'slate'
import { h, VNode } from 'snabbdom'
import { IDomEditor, DomEditor } from '@wangeditor-next/core'
import { TableElement } from '../custom-types'
import { TableCursor } from '../table-cursor'
import {
  observerTableResize,
  unObserveTableResize,
  handleCellBorderVisible,
  handleCellBorderHighlight,
  handleCellBorderMouseDown,
  getColumnWidthRatios,
} from '../column-resize'

/**
 * 计算 table 是否可编辑。如果选区跨域 table 和外部内容，删除，会导致 table 结构打乱。所以，有时要让 table 不可编辑
 * @param editor editor
 * @param tableElem table elem
 */
function getContentEditable(editor: IDomEditor, tableElem: SlateElement): boolean {
  if (editor.isDisabled()) return false

  const { selection } = editor
  if (selection == null) return true
  if (Range.isCollapsed(selection)) return true

  const { anchor, focus } = selection
  const tablePath = DomEditor.findPath(editor, tableElem)

  const tableStart = Editor.start(editor, tablePath)
  const tableEnd = Editor.end(editor, tablePath)
  const isAnchorInTable =
    Point.compare(anchor, tableEnd) <= 0 && Point.compare(anchor, tableStart) >= 0
  const isFocusInTable =
    Point.compare(focus, tableEnd) <= 0 && Point.compare(focus, tableStart) >= 0

  // 选区在 table 内部，且选中了同一个单元格。表格可以编辑
  if (isAnchorInTable && isFocusInTable) {
    if (Path.equals(anchor.path.slice(0, 3), focus.path.slice(0, 3))) {
      return true
    }
  }

  return false
}

function renderTable(elemNode: SlateElement, children: VNode[] | null, editor: IDomEditor): VNode {
  // 是否可编辑
  const editable = getContentEditable(editor, elemNode)

  // 宽度
  const {
    width: tableWidth = 'auto',
    height,
    columnWidths = [],
    scrollWidth = 0,
    isHoverCellBorder,
    resizingIndex,
    isResizing,
  } = elemNode as TableElement

  // 光标是否选中
  const selected = DomEditor.isNodeSelected(editor, elemNode)
  // 光标是否有选区
  const [isSelecting] = TableCursor.selection(editor)
  // 列宽之间比值
  const columnWidthRatios = getColumnWidthRatios(columnWidths)

  const vnode = h(
    'div',
    {
      class: {
        'table-container': true, // 始终应用的类名
      },
      attrs: {
        'data-selected': selected,
      },
      on: {
        mousedown: (e: MouseEvent) => {
          // @ts-ignore 阻止光标定位到 table 后面
          if (e.target.tagName === 'DIV') e.preventDefault()

          if (editor.isDisabled()) return

          // @ts-ignore 如果用户行为是获取焦点输入文本时，需释放选区
          if (e.target.closest('[data-block-type="table-cell"]')) {
            TableCursor.unselect(editor)
          }

          // 是否需要定位到 table 内部
          const tablePath = DomEditor.findPath(editor, elemNode)
          const tableStart = Editor.start(editor, tablePath)
          const { selection } = editor
          if (selection == null) {
            editor.select(tableStart) // 选中 table 内部
            return
          }
          const { path } = selection.anchor
          if (path[0] === tablePath[0]) return // 当前选区，就在 table 内部

          editor.select(tableStart) // 选中 table 内部
        },
      },
    },
    [
      h(
        'table',
        {
          attrs: {
            width: tableWidth,
            contentEditable: editable,
          },
          class: {
            table: true,
            'table-selection-none': !!isSelecting,
          },
          style: {
            width:
              tableWidth === '100%' ? tableWidth : columnWidths.reduce((a, b) => a + b, 0) + 'px',
          },
          on: {
            mousemove: debounce(
              (e: MouseEvent) => handleCellBorderVisible(editor, elemNode, e, scrollWidth),
              25
            ),
          },
        },
        [
          h(
            'colgroup',
            { attrs: { contentEditable: false } },
            columnWidths.map(width => h('col', { attrs: { width } }))
          ),
          h('tbody', {}, children),
        ]
      ),

      h(
        'div',
        {
          class: {
            'column-resizer': true,
          },
          attrs: {
            contenteditable: 'false',
          },
        },
        columnWidths.map((width, index) => {
          let minWidth = width

          // table width 为 100% 模式时
          // columnWidths 表示的是比例
          // 1. 需要计算出真实的宽度
          if (tableWidth === '100%') {
            minWidth = columnWidthRatios[index] * scrollWidth
          }

          return h(
            'div',
            {
              class: {
                'column-resizer-item': true,
              },
              style: { minWidth: `${minWidth}px` },
            },
            [
              h(
                'div',
                {
                  class: {
                    'resizer-line-hotzone': true,
                    visible: !!isHoverCellBorder && index === resizingIndex,
                    highlight: !!isResizing && index === resizingIndex,
                  },
                  style: { height: `${height}px` },
                  on: {
                    mouseenter: (e: MouseEvent) => handleCellBorderHighlight(editor, e),
                    mouseleave: (e: MouseEvent) => handleCellBorderHighlight(editor, e),
                    mousedown: (e: MouseEvent) => handleCellBorderMouseDown(editor, elemNode),
                  },
                },
                [h('div', { class: { 'resizer-line': true } })]
              ),
            ]
          )
        })
      ),
    ]
  )

  /**
   * 移出直接返回 vnode
   * 添加 ObserverResize 监听行为
   * 监听 table 内部变化，更新 table resize-bar 高度
   */
  const containerVnode = h(
    'div',
    {
      hook: {
        insert: ({ elm }: VNode) => observerTableResize(editor, elm),
        destroy: () => {
          unObserveTableResize()
        },
      },
    },
    vnode
  )
  return containerVnode
}

export default renderTable
