import { CursorEditor, CursorState, RemoteCursorChangeEventListener } from '@wangeditor-next/yjs'
import { BaseEditor } from 'slate'

import { Store } from '../types'
import { useRemoteCursorEditor } from './useRemoteCursorEditor'

export type CursorStore<TCursorData extends Record<string, unknown> = Record<string, unknown>> =
  Store<Record<string, CursorState<TCursorData>>>

const EDITOR_TO_CURSOR_STORE: WeakMap<BaseEditor, CursorStore> = new WeakMap()

function createRemoteCursorStateStore<TCursorData extends Record<string, unknown>>(
  editor: CursorEditor<TCursorData>,
): CursorStore<TCursorData> {
  let cursors: Record<string, CursorState<TCursorData>> = {}

  const changed = new Set<number>()
  const addChanged = changed.add.bind(changed)
  const onStoreChangeListeners: Set<() => void> = new Set()

  let changeHandler: RemoteCursorChangeEventListener | null = null

  const subscribe = (onStoreChange: () => void) => {
    onStoreChangeListeners.add(onStoreChange)
    if (!changeHandler) {
      changeHandler = event => {
        event.added.forEach(addChanged)
        event.removed.forEach(addChanged)
        event.updated.forEach(addChanged)
        onStoreChangeListeners.forEach(listener => listener())
      }
      CursorEditor.on(editor, 'change', changeHandler)
    }

    return () => {
      onStoreChangeListeners.delete(onStoreChange)
      if (changeHandler && onStoreChangeListeners.size === 0) {
        CursorEditor.off(editor, 'change', changeHandler)
        changeHandler = null
      }
    }
  }

  const getSnapshot = () => {
    if (changed.size === 0) {
      return cursors
    }

    changed.forEach(clientId => {
      const state = CursorEditor.cursorState(editor, clientId)

      if (state === null) {
        delete cursors[clientId.toString()]
        return
      }

      cursors[clientId] = state
    })

    changed.clear()
    cursors = { ...cursors }
    return cursors
  }

  return [subscribe, getSnapshot]
}

function getCursorStateStore<TCursorData extends Record<string, unknown>>(
  editor: CursorEditor<TCursorData>,
): CursorStore<TCursorData> {
  const existing = EDITOR_TO_CURSOR_STORE.get(editor)

  if (existing) {
    return existing as CursorStore<TCursorData>
  }

  const store = createRemoteCursorStateStore(editor)

  if (editor) { EDITOR_TO_CURSOR_STORE.set(editor, store) }
  return store
}

export function useRemoteCursorStateStore<
  TCursorData extends Record<string, unknown> = Record<string, unknown>,
>() {
  const editor = useRemoteCursorEditor<TCursorData>()

  return getCursorStateStore(editor)
}
