import {
  RefObject, useCallback, useEffect, useReducer, useRef, useState,
} from 'react'

export function useRequestRerender() {
  const [, rerender] = useReducer(s => s + 1, 0)
  const animationFrameIdRef = useRef<number | null>(null)

  const clearAnimationFrame = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current)
      animationFrameIdRef.current = 0
    }
  }

  useEffect(clearAnimationFrame)
  useEffect(() => clearAnimationFrame, [])

  return useCallback((immediately = false) => {
    if (immediately) {
      rerender()
      return
    }

    if (animationFrameIdRef.current) {
      return
    }

    animationFrameIdRef.current = requestAnimationFrame(rerender)
  }, [])
}

export function useOnResize<T extends HTMLElement>(
  ref: RefObject<T> | undefined,
  onResize: () => void,
) {
  const onResizeRef = useRef(onResize)

  onResizeRef.current = onResize

  const [observer] = useState(
    () => new ResizeObserver(() => {
      onResizeRef.current()
    }),
  )

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    const { current: element } = ref

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [observer, ref])
}
