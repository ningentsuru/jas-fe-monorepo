import { useState, useEffect, useMemo } from 'react'

export type WordSwapTransition =
  'fade' | 'slide-up' | 'slide-down' | 'scale-up' | 'scale-down' | 'blur' | 'flip'

export interface AtomWordSwapProps {
  words?: string[]
  interval?: number
  transition?: WordSwapTransition
}

export const AtomWordSwap = ({
  words = ['Hello', 'World'],
  interval = 2000,
  transition = 'fade',
}: AtomWordSwapProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const maxWidth = useMemo(() => {
    if (!words || words.length === 0) return '0ch'
    const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '')
    return `${longest.length}ch`
  }, [words])

  useEffect(() => {
    if (!words || words.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [words, interval])

  return (
    <span
      className="atom-word-swap text-foreground font-display relative inline-block text-center transition-all duration-300 select-none"
      style={{ minWidth: maxWidth, height: '1.2em' }}
      data-testid="atom-word-swap"
    >
      <span
        key={currentIndex}
        className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-${transition}-enter-active`}
        style={{ animation: `swap-${transition} 0.5s ease-in-out` }}
        data-testid="atom-word-swap-inner"
      >
        {words[currentIndex]}
      </span>
    </span>
  )
}

export default AtomWordSwap
