'use client'

import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'

export interface MoleculeTooltipProps {
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children?: ReactNode
}

interface ArrowCoords {
  top: string
  left: string
  bottom: string
  right: string
  transform: string
  borders: string
  [key: string]: string
}

export const MoleculeTooltip = ({
  title = '',
  position = 'top',
  delay = 200,
  children,
}: MoleculeTooltipProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isCalculating, setIsCalculating] = useState<boolean>(false)

  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const [arrowCoords, setArrowCoords] = useState<ArrowCoords>({
    top: '',
    left: '',
    bottom: '',
    right: '',
    transform: '',
    borders: '',
  })

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  const destroyListeners = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', recalculatePosition)
      window.removeEventListener('scroll', recalculatePosition)
    }
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect()
      resizeObserverRef.current = null
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [])

  const recalculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    const trigger = triggerRef.current.getBoundingClientRect()
    const tooltipWidth = tooltipRef.current.offsetWidth || 120
    const tooltipHeight = tooltipRef.current.offsetHeight || 40

    const pad = 12
    const gap = 8
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768

    let newTop = 0
    let newLeft = 0
    let actualPosition = position

    if (position === 'top' && trigger.top - tooltipHeight - gap < pad) {
      actualPosition = 'bottom'
    } else if (position === 'bottom' && trigger.bottom + tooltipHeight + gap > vh - pad) {
      actualPosition = 'top'
    } else if (position === 'left' && trigger.left - tooltipWidth - gap < pad) {
      actualPosition = 'right'
    } else if (position === 'right' && trigger.right + tooltipWidth + gap > vw - pad) {
      actualPosition = 'left'
    }

    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const scrollX = typeof window !== 'undefined' ? window.scrollX : 0

    switch (actualPosition) {
      case 'top':
        newTop = trigger.top + scrollY - tooltipHeight - gap
        newLeft = trigger.left + scrollX + trigger.width / 2 - tooltipWidth / 2
        setArrowCoords({
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borders: 'border-t-card border-x-transparent border-b-transparent',
          bottom: '',
          right: '',
        })
        break
      case 'bottom':
        newTop = trigger.bottom + scrollY + gap
        newLeft = trigger.left + scrollX + trigger.width / 2 - tooltipWidth / 2
        setArrowCoords({
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borders: 'border-b-card border-x-transparent border-t-transparent',
          top: '',
          right: '',
        })
        break
      case 'left':
        newTop = trigger.top + scrollY + trigger.height / 2 - tooltipHeight / 2
        newLeft = trigger.left + scrollX - tooltipWidth - gap
        setArrowCoords({
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
          borders: 'border-l-card border-y-transparent border-r-transparent',
          bottom: '',
          right: '',
        })
        break
      case 'right':
        newTop = trigger.top + scrollY + trigger.height / 2 - tooltipHeight / 2
        newLeft = trigger.right + scrollX + gap
        setArrowCoords({
          top: '50%',
          right: '100%',
          transform: 'translateY(-50%)',
          borders: 'border-r-card border-y-transparent border-l-transparent',
          bottom: '',
          left: '',
        })
        break
    }

    if (newLeft < pad) newLeft = pad
    if (newLeft + tooltipWidth > vw - pad) newLeft = vw - pad - tooltipWidth

    setCoords({ top: newTop, left: newLeft })
  }, [position])

  const setupListeners = useCallback(() => {
    destroyListeners()

    if (typeof window === 'undefined') return
    window.addEventListener('resize', recalculatePosition)
    window.addEventListener('scroll', recalculatePosition, { passive: true })

    if (tooltipRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = requestAnimationFrame(() => {
          recalculatePosition()
        })
      })
      resizeObserverRef.current.observe(tooltipRef.current)
    }
  }, [recalculatePosition, destroyListeners])

  const showTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsCalculating(true)
    setIsVisible(true)
    setTimeout(() => {
      recalculatePosition()
      setIsCalculating(false)
      setupListeners()
    }, 0)
  }

  const hideTooltip = () => {
    destroyListeners()
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setIsVisible(false)
    }, delay)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      destroyListeners()
    }
  }, [destroyListeners])

  return (
    <>
      <div
        ref={triggerRef}
        className="molecule-tooltip-trigger inline-block"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
        data-testid="molecule-tooltip-trigger"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          role="tooltip"
          className={[
            'molecule-tooltip bg-card text-card-foreground border-border hc:border-2 absolute z-[100] max-w-xs rounded-md border px-3 py-1.5 text-sm font-medium shadow-md transition-opacity duration-200 ease-in-out data-[theme=high-contrast]:border-2',
            isCalculating ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            pointerEvents: 'none',
          }}
          data-testid="tooltip-content"
        >
          {title}
          <div
            className={['absolute h-0 w-0 border-[6px]', arrowCoords.borders].join(' ')}
            style={{
              top: arrowCoords.top,
              bottom: arrowCoords.bottom,
              left: arrowCoords.left,
              right: arrowCoords.right,
              transform: arrowCoords.transform,
            }}
            aria-hidden="true"
            data-testid="tooltip-arrow"
          />
        </div>
      )}
    </>
  )
}

export default MoleculeTooltip
