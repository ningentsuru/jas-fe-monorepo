'use client'

import * as React from 'react'
import { MoleculeTooltip, AtomButton } from '@repo/ui-react'
import { DIFFICULTY_PRESETS } from '@/types/telegraph'
import type { TelegraphTimings, DifficultyPreset } from '@/types/telegraph'

interface SpeedControlsProps {
  timings: TelegraphTimings
  onTimingChange: (key: keyof TelegraphTimings, value: number) => void
  onApplyPreset: (preset: TelegraphTimings) => void
}

export const TelegraphSpeedControls = ({
  timings,
  onTimingChange,
  onApplyPreset,
}: SpeedControlsProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const maxWordBreak = 3000
  const maxLetterBreak = timings.wordBreakDelay - 150
  const maxSignalDelay = Math.floor(timings.letterBreakDelay / 2.5)

  React.useEffect(() => {
    const handleOutsideInteraction = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideInteraction, true)
    document.addEventListener('touchstart', handleOutsideInteraction, true)
    return () => {
      document.removeEventListener('mousedown', handleOutsideInteraction, true)
      document.removeEventListener('touchstart', handleOutsideInteraction, true)
    }
  }, [])

  const handleContainerBlur = (event: React.FocusEvent) => {
    if (containerRef.current && containerRef.current.contains(event.relatedTarget as Node)) {
      return
    }
    setIsOpen(false)
  }

  const handleTimingChangeWithCascade = (key: keyof TelegraphTimings, value: number) => {
    onTimingChange(key, value)

    if (key === 'wordBreakDelay') {
      const allowedLetterBreakMax = value - 150
      if (timings.letterBreakDelay > allowedLetterBreakMax) {
        onTimingChange('letterBreakDelay', allowedLetterBreakMax)

        const allowedSignalDelayMax = Math.floor(allowedLetterBreakMax / 2.5)
        if (timings.signalDelay > allowedSignalDelayMax) {
          onTimingChange('signalDelay', allowedSignalDelayMax)
        }
      }
    }

    if (key === 'letterBreakDelay') {
      const allowedSignalDelayMax = Math.floor(value / 2.5)
      if (timings.signalDelay > allowedSignalDelayMax) {
        onTimingChange('signalDelay', allowedSignalDelayMax)
      }
    }
  }

  const currentActivePreset = React.useMemo<string | null>(() => {
    for (const [key, value] of Object.entries(DIFFICULTY_PRESETS)) {
      if (
        value.signalDelay === timings.signalDelay &&
        value.letterBreakDelay === timings.letterBreakDelay &&
        value.wordBreakDelay === timings.wordBreakDelay
      ) {
        return key
      }
    }
    return null
  }, [timings])

  return (
    <div
      ref={containerRef}
      onBlur={handleContainerBlur}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="relative inline-block text-left"
    >
      <MoleculeTooltip
        title="Telegraph Hardware Speeds"
        position="right"
        delay={200}
        visible={isOpen}
        content={
          <div
            className="flex w-64 flex-col gap-4 p-1 font-sans text-xs select-none"
            role="region"
            aria-label="Telegraph Speed Adjustments"
          >
            <div className="border-border/40 flex flex-col gap-1.5 border-b pb-3">
              <span
                id="rank-preset-label"
                className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase"
              >
                Select Transmission Rank:
              </span>
              <div
                className="grid grid-cols-3 gap-1.5"
                role="group"
                aria-labelledby="rank-preset-label"
              >
                {(Object.keys(DIFFICULTY_PRESETS) as DifficultyPreset[]).map((presetKey) => {
                  const isActive = currentActivePreset === presetKey
                  return (
                    <AtomButton
                      key={presetKey}
                      type="button"
                      variant={isActive ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => onApplyPreset(DIFFICULTY_PRESETS[presetKey])}
                      aria-pressed={isActive}
                      className="h-7 w-full px-1! text-xs! font-bold capitalize"
                    >
                      {presetKey}
                    </AtomButton>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span id="signal-delay-label" className="text-foreground">
                  Signal Tap Delay:
                </span>
                <span className="text-primary font-mono" aria-live="polite">
                  {timings.signalDelay}ms
                </span>
              </div>
              <input
                type="range"
                min="30"
                max={maxSignalDelay}
                step="5"
                value={timings.signalDelay}
                aria-labelledby="signal-delay-label"
                aria-valuemin={30}
                aria-valuemax={maxSignalDelay}
                aria-valuenow={timings.signalDelay}
                aria-valuetext={`${timings.signalDelay} milliseconds`}
                onChange={(e) =>
                  handleTimingChangeWithCascade('signalDelay', Number(e.target.value))
                }
                className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span id="letter-break-label" className="text-foreground">
                  Next Action (Letter Break):
                </span>
                <span className="text-primary font-mono" aria-live="polite">
                  {timings.letterBreakDelay}ms
                </span>
              </div>
              <input
                type="range"
                min="150"
                max={maxLetterBreak}
                step="25"
                value={timings.letterBreakDelay}
                aria-labelledby="letter-break-label"
                aria-valuemin={150}
                aria-valuemax={maxLetterBreak}
                aria-valuenow={timings.letterBreakDelay}
                aria-valuetext={`${timings.letterBreakDelay} milliseconds`}
                onChange={(e) =>
                  handleTimingChangeWithCascade('letterBreakDelay', Number(e.target.value))
                }
                className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-bold">
                <span id="word-break-label" className="text-foreground">
                  Next Wording (Word Break):
                </span>
                <span className="text-primary font-mono" aria-live="polite">
                  {timings.wordBreakDelay}ms
                </span>
              </div>
              <input
                type="range"
                min="500"
                max={maxWordBreak}
                step="100"
                value={timings.wordBreakDelay}
                aria-labelledby="word-break-label"
                aria-valuemin={500}
                aria-valuemax={maxWordBreak}
                aria-valuenow={timings.wordBreakDelay}
                aria-valuetext={`${timings.wordBreakDelay} milliseconds`}
                onChange={(e) =>
                  handleTimingChangeWithCascade('wordBreakDelay', Number(e.target.value))
                }
                className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              />
            </div>
          </div>
        }
      >
        <AtomButton
          variant="ghost"
          size="sm"
          onFocus={() => setIsOpen(true)}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen((prev) => !prev)
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Adjust Key and Morse Timing Speeds"
          className="text-muted-foreground hover:text-foreground h-8 text-xs font-semibold tracking-wider uppercase"
        >
          🔧 Adjust Key & Timing Speeds
        </AtomButton>
      </MoleculeTooltip>
    </div>
  )
}

export default TelegraphSpeedControls
