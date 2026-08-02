'use client'

import React, { useState, useRef, useEffect, useCallback, useId } from 'react'

export interface MoleculeTooltipProps {
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children?: React.ReactNode
  content?: React.ReactNode
  visible?: boolean
}

interface Coords {
  top: number
  left: number
}

interface ArrowCoords {
  top: string
  left: string
  bottom: string
  right: string
  transform: string
  borders: string
}

export const MoleculeTooltip = ({
  title = '',
  position = 'top',
  delay = 200,
  children,
  content,
  visible,
}: MoleculeTooltipProps) => {
  const isControlled = visible !== undefined
  const [internalVisible, setInternalVisible] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  const isVisible = isControlled ? visible : internalVisible
  const tooltipId = useId()

  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 })
  const [arrowCoords, setArrowCoords] = useState<ArrowCoords>({
    top: '',
    left: '',
    bottom: '',
    right: '',
    transform: '',
    borders: '',
  })

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  const rafIdRef = useRef<number | null>(null)

  const recalculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const tooltipWidth = tooltipRef.current.offsetWidth
    const tooltipHeight = tooltipRef.current.offsetHeight

    const pad = 12
    const gap = 8
    const vw = window.innerWidth
    const vh = window.innerHeight

    let actualPos = position

    if (actualPos === 'left' || actualPos === 'right') {
      const fitsLeft = trigger.left - tooltipWidth - gap >= pad
      const fitsRight = trigger.right + tooltipWidth + gap <= vw - pad

      if (actualPos === 'left' && !fitsLeft) {
        actualPos = fitsRight
          ? 'right'
          : trigger.top - tooltipHeight - gap >= pad
            ? 'top'
            : 'bottom'
      } else if (actualPos === 'right' && !fitsRight) {
        actualPos = fitsLeft ? 'left' : trigger.top - tooltipHeight - gap >= pad ? 'top' : 'bottom'
      }
    }

    if (actualPos === 'top' && trigger.top - tooltipHeight - gap < pad) {
      actualPos = 'bottom'
    } else if (actualPos === 'bottom' && trigger.bottom + tooltipHeight + gap > vh - pad) {
      actualPos = 'top'
    }

    let idealLeft = 0
    let idealTop = 0

    if (actualPos === 'top' || actualPos === 'bottom') {
      idealLeft = trigger.left + (trigger.width - tooltipWidth) / 2
      idealTop = actualPos === 'top' ? trigger.top - tooltipHeight - gap : trigger.bottom + gap
    } else {
      idealLeft = actualPos === 'left' ? trigger.left - tooltipWidth - gap : trigger.right + gap
      idealTop = trigger.top + (trigger.height - tooltipHeight) / 2
    }

    if (idealLeft < pad) idealLeft = pad
    if (idealLeft + tooltipWidth > vw - pad) idealLeft = vw - tooltipWidth - pad

    if (idealTop < pad) idealTop = pad
    if (idealTop + tooltipHeight > vh - pad) idealTop = vh - tooltipHeight - pad

    setCoords({
      left: idealLeft - trigger.left,
      top: idealTop - trigger.top,
    })

    const triggerCenterH = trigger.left + trigger.width / 2
    const triggerCenterV = trigger.top + trigger.height / 2

    const arrow: ArrowCoords = {
      top: '',
      left: '',
      bottom: '',
      right: '',
      transform: 'rotate(45deg)',
      borders: '',
    }

    if (actualPos === 'top' || actualPos === 'bottom') {
      arrow[actualPos === 'top' ? 'bottom' : 'top'] = '-4px'
      const arrowLeft = triggerCenterH - idealLeft - 4
      arrow.left = `${Math.max(8, Math.min(tooltipWidth - 16, arrowLeft))}px`
      arrow.borders = actualPos === 'top' ? 'border-r border-b' : 'border-l border-t'
    } else {
      arrow[actualPos === 'left' ? 'right' : 'left'] = '-4px'
      const arrowTop = triggerCenterV - idealTop - 4
      arrow.top = `${Math.max(8, Math.min(tooltipHeight - 16, arrowTop))}px`
      arrow.borders = actualPos === 'left' ? 'border-r border-t' : 'border-l border-b'
    }

    setArrowCoords(arrow)
  }, [position])

  const destroyListeners = useCallback(() => {
    window.removeEventListener('resize', recalculatePosition)
    window.removeEventListener('scroll', recalculatePosition)

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
      resizeObserverRef.current = null
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [recalculatePosition])

  const setupListeners = useCallback(() => {
    destroyListeners()

    window.addEventListener('resize', recalculatePosition)
    window.addEventListener('scroll', recalculatePosition, { passive: true })

    if (tooltipRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = requestAnimationFrame(() => {
          recalculatePosition()
        })
      })
      resizeObserverRef.current.observe(tooltipRef.current)
    }
  }, [recalculatePosition, destroyListeners])

  const show = useCallback(() => {
    if (isControlled) return
    if (timerRef.current) clearTimeout(timerRef.current)

    setIsCalculating(true)
    setInternalVisible(true)
  }, [isControlled])

  useEffect(() => {
    if (isControlled && visible) {
      setIsCalculating(true)
    }
  }, [isControlled, visible])

  useEffect(() => {
    if (isVisible && isCalculating) {
      recalculatePosition()
      setIsCalculating(false)
      setupListeners()
    }
  }, [isVisible, isCalculating, recalculatePosition, setupListeners])

  const hide = useCallback(() => {
    if (isControlled) return
    destroyListeners()

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setInternalVisible(false)
    }, delay)
  }, [isControlled, delay, destroyListeners])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isControlled) return

      if (e.key === 'Escape') {
        if (isVisible) {
          e.stopPropagation()
          hide()
        }
        return
      }

      if (e.key === 'Enter' || e.key === ' ') {
        const activeEl = document.activeElement
        const isInteractiveElement =
          activeEl &&
          (activeEl.tagName === 'BUTTON' ||
            activeEl.tagName === 'INPUT' ||
            activeEl.tagName === 'SELECT' ||
            activeEl.tagName === 'TEXTAREA' ||
            activeEl.getAttribute('role') === 'button')

        if (isInteractiveElement && activeEl !== triggerRef.current?.firstElementChild) {
          return
        }

        e.preventDefault()
        if (isVisible) {
          hide()
        } else {
          show()
        }
      }
    },
    [isControlled, isVisible, show, hide],
  )

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('resize', recalculatePosition)
      window.removeEventListener('scroll', recalculatePosition)
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect()
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [recalculatePosition])

  return (
    <div
      ref={triggerRef}
      className="molecule-tooltip relative inline-block"
      data-testid="molecule-tooltip"
      onMouseEnter={isControlled ? undefined : show}
      onMouseLeave={isControlled ? undefined : hide}
      onFocus={isControlled ? undefined : show}
      onBlur={isControlled ? undefined : hide}
      onKeyDown={handleKeyDown}
    >
      {children || (
        <span
          className="border-foreground focus-visible:ring-ring cursor-help rounded border-b border-dotted px-0.5 outline-hidden transition-all focus-visible:ring-2 focus-visible:ring-offset-2"
          tabIndex={0}
          role="button"
          aria-describedby={isVisible ? tooltipId : undefined}
          onClick={() => !isControlled && setInternalVisible((prev) => !prev)}
        >
          {title}
        </span>
      )}

      {isVisible && (
        <div
          id={tooltipId}
          ref={tooltipRef}
          role="tooltip"
          style={
            isCalculating
              ? { top: '-9999px', left: '-9999px', visibility: 'hidden' }
              : { top: `${coords.top}px`, left: `${coords.left}px` }
          }
          className={`border-border bg-card text-foreground absolute z-50 w-max max-w-xs transform rounded-md border p-3 shadow-lg transition duration-150 ${
            isCalculating ? 'scale-95 opacity-0' : 'scale-100 opacity-100 ease-out'
          }`}
          onMouseEnter={isControlled ? undefined : show}
          onMouseLeave={isControlled ? undefined : hide}
        >
          {title && (
            <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
              {title}
            </p>
          )}
          <div className="text-sm">{content || title}</div>

          {!isCalculating && (
            <div
              style={{
                top: arrowCoords.top,
                left: arrowCoords.left,
                bottom: arrowCoords.bottom,
                right: arrowCoords.right,
                transform: arrowCoords.transform,
              }}
              className={`border-border bg-card absolute h-2 w-2 ${arrowCoords.borders}`}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default MoleculeTooltip
