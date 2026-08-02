'use client'

import * as React from 'react'
import { MoleculeModal, AtomButton } from '@repo/ui-react'
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
  const [isModalOpen, setIsModalOpen] = React.useState(false)

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
    <>
      <AtomButton
        variant="ghost"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        aria-label="Open Telegraph Hardware Speed Configurations"
        className="text-muted-foreground hover:text-foreground h-8 text-xs font-semibold tracking-wider uppercase"
      >
        🔧 Adjust Key & Timing Speeds
      </AtomButton>

      <MoleculeModal
        title="Telegraph Hardware Speeds"
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-sm sm:max-w-md"
      >
        <div className="flex flex-col gap-5 font-sans text-xs select-none">
          <p className="text-muted-foreground leading-relaxed">
            Fine-tune code delays and transmission thresholds. Changes update the core signal
            oscillator parsing rules in real-time.
          </p>

          <div className="border-border/40 flex flex-col gap-2 border-b pb-4">
            <span
              id="modal-rank-label"
              className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase"
            >
              Select Transmission Rank:
            </span>
            <div
              className="grid grid-cols-3 gap-1.5"
              role="group"
              aria-labelledby="modal-rank-label"
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
                    className="h-8 w-full text-xs font-bold capitalize"
                  >
                    {presetKey}
                  </AtomButton>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span id="modal-signal-delay-label" className="text-foreground">
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
              aria-labelledby="modal-signal-delay-label"
              aria-valuemin={30}
              aria-valuemax={maxSignalDelay}
              aria-valuenow={timings.signalDelay}
              aria-valuetext={`${timings.signalDelay} milliseconds`}
              onChange={(e) => handleTimingChangeWithCascade('signalDelay', Number(e.target.value))}
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-2 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span id="modal-letter-break-label" className="text-foreground">
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
              aria-labelledby="modal-letter-break-label"
              aria-valuemin={150}
              aria-valuemax={maxLetterBreak}
              aria-valuenow={timings.letterBreakDelay}
              aria-valuetext={`${timings.letterBreakDelay} milliseconds`}
              onChange={(e) =>
                handleTimingChangeWithCascade('letterBreakDelay', Number(e.target.value))
              }
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-2 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span id="modal-word-break-label" className="text-foreground">
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
              aria-labelledby="modal-word-break-label"
              aria-valuemin={500}
              aria-valuemax={maxWordBreak}
              aria-valuenow={timings.wordBreakDelay}
              aria-valuetext={`${timings.wordBreakDelay} milliseconds`}
              onChange={(e) =>
                handleTimingChangeWithCascade('wordBreakDelay', Number(e.target.value))
              }
              className="bg-muted accent-primary border-border focus-visible:ring-ring h-2 w-full cursor-pointer appearance-none rounded-lg border outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            />
          </div>
        </div>
      </MoleculeModal>
    </>
  )
}

export default TelegraphSpeedControls
