import { RelativeRange } from './module/custom-types'
import {
  CursorEditor,
  CursorState,
  CursorStateChangeEvent,
  RemoteCursorChangeEventListener,
  withCursors,
  WithCursorsOptions,
  withYHistory,
  WithYHistoryOptions,
  withYjs,
  WithYjsOptions,
  YHistoryEditor,
  YjsEditor,
} from './plugins'
import { slateNodesToInsertDelta, yTextToSlateElement } from './utils/convert'
import {
  relativePositionToSlatePoint,
  relativeRangeToSlateRange,
  slatePointToRelativePosition,
  slateRangeToRelativeRange,
} from './utils/position'

export {
  // Base cursor plugin
  CursorEditor,
  CursorState,
  CursorStateChangeEvent,
  relativePositionToSlatePoint,
  // Utils
  RelativeRange,
  relativeRangeToSlateRange,
  RemoteCursorChangeEventListener,
  slateNodesToInsertDelta,
  slatePointToRelativePosition,
  slateRangeToRelativeRange,
  withCursors,
  WithCursorsOptions,
  // History plugin
  withYHistory,
  WithYHistoryOptions,
  withYjs,
  WithYjsOptions,
  YHistoryEditor,
  YjsEditor,
  yTextToSlateElement,
}
