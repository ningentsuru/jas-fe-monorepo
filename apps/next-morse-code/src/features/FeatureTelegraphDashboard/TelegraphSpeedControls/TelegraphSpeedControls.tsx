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
  const maxWordBreak = 3000
  const maxLetterBreak = timings.wordBreakDelay - 150
  const maxSignalDelay = Math.floor(timings.letterBreakDelay / 2.5)

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
    <MoleculeTooltip
      title="Telegraph Hardware Speeds"
      position="top"
      delay={200}
      content={
        <div className="flex w-64 flex-col gap-4 p-1 font-sans text-xs">
          {/* --- Difficulty Presets Button Cluster --- */}
          <div className="border-border/40 flex flex-col gap-1.5 border-b pb-3">
            <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Select Transmission Rank:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(Object.keys(DIFFICULTY_PRESETS) as DifficultyPreset[]).map((presetKey) => {
                const isActive = currentActivePreset === presetKey
                return (
                  /* 
                    1. Leverages AtomButton component types natively.
                    2. Uses the smaller padding configuration class modifier string ("h-7 text-xs! px-1!")
                       to balance your internal grid size without visual text clipping.
                  */
                  <AtomButton
                    key={presetKey}
                    variant={isActive ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => onApplyPreset(DIFFICULTY_PRESETS[presetKey])}
                    className="h-7 w-full px-1! text-xs! font-bold capitalize"
                  >
                    {presetKey}
                  </AtomButton>
                )
              })}
            </div>
          </div>

          {/* Slider 1: Hardware Signal Tap Delay */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Signal Tap Delay:</span>
              <span className="text-primary font-mono">{timings.signalDelay}ms</span>
            </div>
            <input
              type="range"
              min="30"
              max={maxSignalDelay}
              step="5"
              value={timings.signalDelay}
              onChange={(e) => handleTimingChangeWithCascade('signalDelay', Number(e.target.value))}
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>

          {/* Slider 2: Next Action / Character Letter Break */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Next Action (Letter Break):</span>
              <span className="text-primary font-mono">{timings.letterBreakDelay}ms</span>
            </div>
            <input
              type="range"
              min="150"
              max={maxLetterBreak}
              step="25"
              value={timings.letterBreakDelay}
              onChange={(e) =>
                handleTimingChangeWithCascade('letterBreakDelay', Number(e.target.value))
              }
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>

          {/* Slider 3: Next Wording / Word Break */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Next Wording (Word Break):</span>
              <span className="text-primary font-mono">{timings.wordBreakDelay}ms</span>
            </div>
            <input
              type="range"
              min="500"
              max={maxWordBreak}
              step="100"
              value={timings.wordBreakDelay}
              onChange={(e) =>
                handleTimingChangeWithCascade('wordBreakDelay', Number(e.target.value))
              }
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-1.5 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>
        </div>
      }
    >
      {/* Root Tooltip Opener Target Button Trigger */}
      <AtomButton
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground h-8 text-xs font-semibold tracking-wider uppercase"
      >
        🔧 Adjust Key & Timing Speeds
      </AtomButton>
    </MoleculeTooltip>
  )
}

export default TelegraphSpeedControls
