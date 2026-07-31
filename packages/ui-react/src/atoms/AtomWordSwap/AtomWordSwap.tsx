'use client'

import { useState, useEffect, useMemo } from 'react'

export type WordSwapTransition =
  'fade' | 'slide-up' | 'slide-down' | 'scale-up' | 'scale-down' | 'blur' | 'flip'

export interface AtomWordSwapProps {
  words?: string[]
  interval?: number
  transition?: WordSwapTransition
}

interface RenderedWord {
  id: number
  text: string
  stage: 'enter-from' | 'enter-active' | 'leave-to'
}

export const AtomWordSwap = ({
  words = ['Hello', 'World'],
  interval = 2000,
  transition = 'fade',
}: AtomWordSwapProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [visibleItems, setVisibleItems] = useState<RenderedWord[]>([
    { id: 0, text: words[0] || '', stage: 'enter-active' },
  ])

  const maxWidth = useMemo(() => {
    if (!words || words.length === 0) return '0ch'
    const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '')
    return `${longest.length}ch`
  }, [words])

  useEffect(() => {
    if (!words || words.length <= 1) return

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length
      const nextWord = words[nextIndex] || ''
      const newId = Date.now()

      setCurrentIndex(nextIndex)

      setVisibleItems((prev) => {
        const flaggedLeaving = prev.map((item) => ({
          ...item,
          stage: 'leave-to' as const,
        }))
        return [...flaggedLeaving, { id: newId, text: nextWord, stage: 'enter-from' as const }]
      })

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisibleItems((current) =>
            current.map((item) =>
              item.id === newId ? { ...item, stage: 'enter-active' as const } : item,
            ),
          )
        })
      })

      setTimeout(() => {
        setVisibleItems((current) => current.filter((item) => item.id === newId))
      }, 500)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval, currentIndex])

  return (
    <span
      className="atom-word-swap text-foreground font-display relative inline-block text-center select-none"
      style={{ minWidth: maxWidth, height: '1.2em' }}
      data-testid="atom-word-swap"
    >
      {visibleItems.map((item) => {
        const isEntering = item.stage !== 'leave-to'
        const activeClass = `transition-${transition}-${isEntering ? 'enter' : 'leave'}-active`
        const stateClass = `transition-${transition}-${item.stage}`

        return (
          <span
            key={item.id}
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap ${activeClass} ${stateClass}`}
            data-testid={isEntering ? 'atom-word-swap-inner' : 'atom-word-swap-leaving'}
          >
            {item.text}
          </span>
        )
      })}
    </span>
  )
}

export default AtomWordSwap
