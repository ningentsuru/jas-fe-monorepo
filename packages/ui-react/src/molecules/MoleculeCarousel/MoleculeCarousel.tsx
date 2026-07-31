'use client'

import { useState, useMemo, useEffect, useRef, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AtomButton, AtomIcon } from '../../'

export interface CarouselItem {
  id: string | number
  image?: string
  title?: string
  description?: string
  alt?: string
}

export interface MoleculeCarouselProps {
  items?: CarouselItem[]
  autoPlay?: boolean
  interval?: number
  loop?: boolean
  onChange?: (activeIndex: number) => void
}

export const MoleculeCarousel = ({
  items = [],
  autoPlay = false,
  interval = 4000,
  loop = true,
  onChange
}: MoleculeCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const canNext = useMemo(() => loop || activeIndex < items.length - 1, [loop, activeIndex, items.length])
  const canPrev = useMemo(() => loop || activeIndex > 0, [loop, activeIndex])

  function next() {
    if (!items.length) return
    setActiveIndex((prev) => {
      if (prev < items.length - 1) return prev + 1
      if (loop) return 0
      return prev
    })
  }

  function prev() {
    if (!items.length) return
    setActiveIndex((prev) => {
      if (prev > 0) return prev - 1
      if (loop) return items.length - 1
      return prev
    })
  }

  function goTo(index: number) {
    if (index >= 0 && index < items.length) {
      setActiveIndex(index)
    }
  }

  function startAutoPlay() {
    stopAutoPlay()
    if (!autoPlay || items.length <= 1) return
    timerRef.current = setInterval(next, interval)
  }

  function stopAutoPlay() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft' && canPrev) {
      event.preventDefault()
      prev()
    } else if (event.key === 'ArrowRight' && canNext) {
      event.preventDefault()
      next()
    }
  }

  useEffect(() => {
    onChange?.(activeIndex)
  }, [activeIndex, onChange])

  useEffect(() => {
    if (autoPlay) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return stopAutoPlay
  }, [autoPlay, items.length, interval])

  return (
    <div
      className="molecule-carousel font-display border-border bg-card text-card-foreground relative w-full overflow-hidden rounded-xl border shadow-sm"
      data-testid="molecule-carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
      onFocus={stopAutoPlay}
      onBlur={startAutoPlay}
      tabIndex={0}
      role="region"
      aria-label="Content Carousel"
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        data-testid="carousel-track"
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative flex aspect-video min-h-[300px] w-full shrink-0 items-center justify-center overflow-hidden"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${items.length}`}
            aria-hidden={index !== activeIndex}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.alt || item.title || 'Carousel background asset image'}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}

            {(item.title || item.description) && (
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-white">
                {item.title && (
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{item.title}</h3>
                )}
                {item.description && (
                  <p className="max-w-2xl text-sm leading-relaxed opacity-90">{item.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          {canPrev && (
            <AtomButton
              variant="ghost"
              size="sm"
              className="bg-background/30 hover:bg-background/80 text-foreground absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 shadow backdrop-blur-sm"
              onClick={prev}
              aria-label="Previous slide"
              data-testid="prev-btn"
            >
              <AtomIcon icon={ChevronLeft} size="md" />
            </AtomButton>
          )}

          {canNext && (
            <AtomButton
              variant="ghost"
              size="sm"
              className="bg-background/30 hover:bg-background/80 text-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 shadow backdrop-blur-sm"
              onClick={next}
              aria-label="Next slide"
              data-testid="next-btn"
            >
              <AtomIcon icon={ChevronRight} size="md" />
            </AtomButton>
          )}

          <div
            className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
            data-testid="carousel-indicators"
          >
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                className={[
                  'h-2 cursor-pointer rounded-full transition-all duration-300 outline-none',
                  index === activeIndex
                    ? 'bg-primary w-6'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/70 w-2',
                ].join(' ')}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}

      <span className="sr-only">molecule-carousel</span>
    </div>
  )
}

export default MoleculeCarousel
