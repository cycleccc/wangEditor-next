import { CursorState } from '@wangeditor-next/yjs'
import { useSyncExternalStore } from 'use-sync-external-store/shim'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector'

import { useRemoteCursorStateStore } from './useRemoteCursorStateStore'

export function useRemoteCursorStates<
  TCursorData extends Record<string, unknown> = Record<string, unknown>,
>() {
  const [subscribe, getSnapshot] = useRemoteCursorStateStore<TCursorData>()

  return useSyncExternalStore(subscribe, getSnapshot)
}

export function useRemoteCursorStatesSelector<
  TCursorData extends Record<string, unknown> = Record<string, unknown>,
  TSelection = unknown,
>(
  selector: (cursors: Record<string, CursorState<TCursorData>>) => TSelection,
  isEqual?: (a: TSelection, b: TSelection) => boolean,
): TSelection {
  const [subscribe, getSnapshot] = useRemoteCursorStateStore<TCursorData>()

  return useSyncExternalStoreWithSelector(subscribe, getSnapshot, null, selector, isEqual)
}
