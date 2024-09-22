import {
  CursorOverlayData,
  useRemoteCursorOverlayPositions,
} from './src/hooks/useRemoteCursorOverlayPositions'
import { useEditorStatic } from './src/hooks/use-editor-static'
import clsx from 'clsx'
import React, { CSSProperties, PropsWithChildren, useRef } from 'react'
import { CursorData } from '../../types'
import { addAlpha } from '../../utils'

type CaretProps = Pick<CursorOverlayData<CursorData>, 'caretPosition' | 'data'>

function Caret({ caretPosition, data }: CaretProps) {
  const caretStyle: CSSProperties = {
    ...caretPosition,
    background: data?.color,
  }

  const labelStyle: CSSProperties = {
    transform: 'translateY(-100%)',
    background: data?.color,
  }

  return (
    <div style={caretStyle} className="w-0.5 absolute">
      <div
        className="absolute text-xs text-white whitespace-nowrap top-0 rounded rounded-bl-none px-1.5 py-0.5"
        style={labelStyle}
      >
        {data?.name}
      </div>
    </div>
  )
}

export function RemoteSelection({
  data,
  selectionRects,
  caretPosition,
}: CursorOverlayData<CursorData>) {
  if (!data) {
    return null
  }

  const selectionStyle: CSSProperties = {
    // Add a opacity to the background color
    backgroundColor: addAlpha(data.color, 0.5),
  }

  return (
    <React.Fragment>
      {selectionRects.map((position, i) => (
        <div
          style={{ ...selectionStyle, ...position }}
          className="absolute pointer-events-none"
          key={i}
        />
      ))}
      {caretPosition && <Caret caretPosition={caretPosition} data={data} />}
    </React.Fragment>
  )
}

type RemoteCursorsProps = PropsWithChildren<{
  className?: string
}>

export function RemoteCursorOverlay({ className, children }: RemoteCursorsProps) {
  const editor = useEditorStatic()
  const containerRef = useRef<HTMLDivElement>(null)
  //   if (!editor) {
  //     return <div>{children}</div>
  //   }
  const [cursors] = useRemoteCursorOverlayPositions<CursorData>({
    containerRef,
  })

  console.log('🚀 ~ RemoteCursorOverlay ~ cursors:', cursors)

  return (
    <div className={clsx('relative', className)} ref={containerRef}>
      {children}
      {cursors.map(cursor => (
        <RemoteSelection key={cursor.clientId} {...cursor} />
      ))}
    </div>
  )
}
