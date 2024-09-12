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
  withYjs,
  WithYjsOptions,
  YjsEditor,
  // History plugin
  withYHistory,
  WithYHistoryOptions,
  YHistoryEditor,
  // Base cursor plugin
  CursorEditor,
  WithCursorsOptions,
  withCursors,
  CursorState,
  RemoteCursorChangeEventListener,
  CursorStateChangeEvent,
  // Utils
  RelativeRange,
  yTextToSlateElement,
  slateNodesToInsertDelta,
  slateRangeToRelativeRange,
  relativeRangeToSlateRange,
  slatePointToRelativePosition,
  relativePositionToSlatePoint,
}
