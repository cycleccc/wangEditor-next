import throttle from 'lodash.throttle'
import { Element as SlateElement, Transforms, Editor } from 'slate'
import { IDomEditor, isHTMLElememt } from '@wangeditor-next/core'
import { TableElement } from './custom-types'
import { isOfType } from '../utils'
import $ from '../utils/dom'

/***
 * 计算 cell border 距离 table 左侧距离
 */
function getCumulativeWidths(columnWidths: number[]) {
  let cumulativeWidths: number[] = []
  let totalWidth = 0

  for (let width of columnWidths) {
    totalWidth += width
    cumulativeWidths.push(totalWidth)
  }

  return cumulativeWidths
}

/***
 * 用于计算拖动 cell 时，cell 宽度变化的比例
 */
export function getColumnWidthRatios(columnWidths: number[]) {
  let columnWidthsRatio: number[] = []
  let totalWidth = columnWidths.reduce((a, b) => a + b, 0)

  for (let width of columnWidths) {
    columnWidthsRatio.push(width / totalWidth)
  }

  return columnWidthsRatio
}

/**
 * 监听 table 内部变化，如新增行、列，删除行列等操作，引起的高度变化。
 * ResizeObserver 需要即时释放，以免引起内存泄露
 */
let resizeObserver: ResizeObserver | null = null
export function observerTableResize(editor: IDomEditor, elm: Node | undefined) {
  if (isHTMLElememt(elm)) {
    const table = elm.querySelector('table')
    if (table) {
      resizeObserver = new ResizeObserver(([{ contentRect }]) => {
        // 当非拖动引起的宽度变化，需要调整 columnWidths
        Transforms.setNodes(
          editor,
          {
            scrollWidth: contentRect.width,
            height: contentRect.height,
          } as TableElement,
          { mode: 'highest' }
        )
      })
      resizeObserver.observe(table)
    }
  }
}

export function unObserveTableResize() {
  if (resizeObserver) {
    resizeObserver?.disconnect()
    resizeObserver = null
  }
}

// 是否为光标选区行为
let isSelectionOperation = false
// 拖拽列宽相关信息
let isMouseDownForResize = false
let clientXWhenMouseDown = 0
let cellWidthWhenMouseDown = 0
let editorWhenMouseDown: IDomEditor | null = null
const $window = $(window)
$window.on('mousedown', onMouseDown)

function onMouseDown(event: Event) {
  const elem = event.target as HTMLElement
  // 判断是否为光标选区行为，对列宽变更行为进行过滤
  // console.log('onMouseDown', elem)
  if (elem.closest('[data-block-type="table-cell"]')) {
    isSelectionOperation = true
  } else if (elem.tagName == 'DIV' && elem.closest('.column-resizer-item')) {
    if (editorWhenMouseDown == null) return

    const [[elemNode]] = Editor.nodes(editorWhenMouseDown, {
      match: isOfType(editorWhenMouseDown, 'table'),
    })
    const {
      width: tableWidth = 'auto',
      columnWidths = [],
      resizingIndex = -1,
    } = elemNode as TableElement
    /**
     * table width 为 100% 模式时，因无法增加Table宽度，不触发 列宽变更行为
     * 如需变更，到底哪个列增宽度，哪个列减去宽度？？
     */
    if (tableWidth == '100%') return

    // 记录必要信息
    isMouseDownForResize = true
    const { clientX } = event as MouseEvent
    clientXWhenMouseDown = clientX
    cellWidthWhenMouseDown = columnWidths[resizingIndex]
    document.body.style.cursor = 'col-resize'
    event.preventDefault()
  }

  $window.on('mousemove', onMouseMove)
  $window.on('mouseup', onMouseUp)
}

const onMouseMove = throttle(function (event: Event) {
  if (!isMouseDownForResize) return
  if (editorWhenMouseDown == null) return
  event.preventDefault()

  const { clientX } = event as MouseEvent
  let newWith = cellWidthWhenMouseDown + (clientX - clientXWhenMouseDown) // 计算新宽度
  newWith = Math.floor(newWith * 100) / 100 // 保留小数点后两位
  if (newWith < 30) newWith = 30 // 最小宽度

  const [[elemNode]] = Editor.nodes(editorWhenMouseDown, {
    match: isOfType(editorWhenMouseDown, 'table'),
  })
  const { columnWidths = [], resizingIndex = -1, scrollWidth = 0 } = elemNode as TableElement

  /**
   * 判断拖动引起的宽度是否最大化了
   * 如果最大化了，则需要调整列的宽度
   *
   * 0.5 很微妙
   */
  const cumulativeTotalWidth = columnWidths.reduce((a, b) => a + b, 0)
  const remainWidth = cumulativeTotalWidth - columnWidths[resizingIndex]
  if (cumulativeTotalWidth > scrollWidth && remainWidth + newWith > scrollWidth) {
    newWith = scrollWidth - remainWidth + 0.5
  }

  const adjustColumnWidths = [...columnWidths].map(width => Math.floor(width))
  adjustColumnWidths[resizingIndex] = newWith

  // 这是宽度
  Transforms.setNodes(editorWhenMouseDown, { columnWidths: adjustColumnWidths } as TableElement, {
    mode: 'highest',
  })
}, 100)

function onMouseUp(event: Event) {
  isSelectionOperation = false
  isMouseDownForResize = false
  editorWhenMouseDown = null
  document.body.style.cursor = ''

  // 解绑事件
  $window.off('mousemove', onMouseMove)
  $window.off('mouseup', onMouseUp)
}
/**
 * 鼠标移动时，判断在哪个 Cell border 上
 * Class 先 visible 后 highlight @跟随飞书
 * 避免光标选区功能收到干扰
 */
export function handleCellBorderVisible(editor: IDomEditor, elemNode: SlateElement, e: MouseEvent) {
  if (editor.isDisabled()) return
  if (isSelectionOperation || isMouseDownForResize) return

  const {
    width: tableWidth = 'auto',
    columnWidths = [],
    isHoverCellBorder,
    resizingIndex,
  } = elemNode as TableElement

  /**
   * table width 为 100% 模式时，因无法增加Table宽度，不触发 列宽变更行为
   * 如需变更，到底哪个列增宽度，哪个列减去宽度？？
   */
  if (tableWidth == '100%') return

  // Cell Border 宽度为 10px
  const { clientX, target } = e
  // 当单元格合并的时候，鼠标在 cell 中间，则不显示 cell border
  if (isHTMLElememt(target)) {
    const rect = target.getBoundingClientRect()

    if (clientX > rect.x + 5 && clientX < rect.x + rect.width - 5) {
      if (isHoverCellBorder) {
        Transforms.setNodes(
          editor,
          { isHoverCellBorder: false, resizingIndex: -1 } as TableElement,
          { mode: 'highest' }
        )
      }
      return
    }
  }
  if (isHTMLElememt(target)) {
    const parent = target.closest('.table')
    if (parent) {
      const { clientX } = e
      const rect = parent.getBoundingClientRect()
      let cumulativeWidths = getCumulativeWidths(columnWidths)

      // 鼠标移动时，计算当前鼠标位置，判断在哪个 Cell border 上
      for (let i = 0; i < cumulativeWidths.length; i++) {
        if (
          clientX - rect.x >= cumulativeWidths[i] - 5 &&
          clientX - rect.x < cumulativeWidths[i] + 5
        ) {
          // 节流，防止多次引起Transforms.setNodes重绘
          if (resizingIndex == i) return
          Transforms.setNodes(
            editor,
            { isHoverCellBorder: true, resizingIndex: i } as TableElement,
            { mode: 'highest' }
          )
          return
        }
      }
    }
  }

  // 鼠标移出时，重置
  if (isHoverCellBorder == true) {
    Transforms.setNodes(editor, { isHoverCellBorder: false, resizingIndex: -1 } as TableElement, {
      mode: 'highest',
    })
  }
}

/**
 * 设置 class highlight
 * 将 render-cell.tsx 拖动功能迁移至 div.column-resize
 */
export function handleCellBorderHighlight(editor: IDomEditor, e: MouseEvent) {
  if (e.type === 'mouseenter') {
    Transforms.setNodes(editor, { isResizing: true } as TableElement, { mode: 'highest' })
  } else {
    Transforms.setNodes(editor, { isResizing: false } as TableElement, { mode: 'highest' })
  }
}

export function handleCellBorderMouseDown(editor: IDomEditor, elemNode: SlateElement) {
  if (isMouseDownForResize) return // 此时正在修改列宽
  editorWhenMouseDown = editor
}
