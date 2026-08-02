'use client'

import * as React from 'react'
import { AtomMorseKey, AtomButton } from '@repo/ui-react'
import { translateMorseSequence, MORSE_DICTIONARY } from '../../utils/morseTranslator'
import { TelegraphSpeedControls } from './TelegraphSpeedControls'
import { TelegraphCheatSheet } from './TelegraphCheatSheet'
import { DIFFICULTY_PRESETS } from '../../types/telegraph'
import type { TelegraphTimings } from '../../types/telegraph'

export const FeatureTelegraphDashboard = () => {
  const [, setIsSystemOn] = React.useState<boolean>(false)
  const [signalBuffer, setSignalBuffer] = React.useState<string[]>([])
  const [translatedText, setTranslatedText] = React.useState<string>('')

  const [timings, setTimings] = React.useState<TelegraphTimings>(DIFFICULTY_PRESETS.pro)

  const wordBreakTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const targetWord = 'SOS'

  const handleStrokeRegister = React.useCallback(() => {
    if (wordBreakTimerRef.current) {
      clearTimeout(wordBreakTimerRef.current)
      wordBreakTimerRef.current = null
    }
  }, [])

  const handleDot = React.useCallback(() => {
    setSignalBuffer((prev) => [...prev, '.'])
    handleStrokeRegister()
  }, [handleStrokeRegister])

  const handleDash = React.useCallback(() => {
    setSignalBuffer((prev) => [...prev, '-'])
    handleStrokeRegister()
  }, [handleStrokeRegister])

  const resetDashboard = React.useCallback(() => {
    setSignalBuffer([])
    setTranslatedText('')
  }, [])

  const handleTimingChange = React.useCallback((key: keyof TelegraphTimings, value: number) => {
    setTimings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleApplyPreset = React.useCallback((newTimings: TelegraphTimings) => {
    setTimings(newTimings)
  }, [])

  React.useEffect(() => {
    if (signalBuffer.length === 0) return

    const decodeTimer = setTimeout(() => {
      const character = translateMorseSequence(signalBuffer)

      if (character) {
        setTranslatedText((prev) => prev + character)
      }

      setSignalBuffer([])

      if (wordBreakTimerRef.current) clearTimeout(wordBreakTimerRef.current)

      wordBreakTimerRef.current = setTimeout(() => {
        setTranslatedText((prev) => {
          if (prev.length === 0 || prev.endsWith(' ')) return prev
          return prev + ' '
        })
      }, timings.wordBreakDelay)
    }, timings.letterBreakDelay)

    return () => clearTimeout(decodeTimer)
  }, [signalBuffer, timings.letterBreakDelay, timings.wordBreakDelay])

  const isMatchSuccessful = translatedText.trim().toUpperCase() === targetWord

  return (
    <div className="feature-telegraph-dashboard mt-4 flex flex-col gap-6">
      <div className="bg-card border-border flex w-full items-center justify-between rounded-xl border p-4 text-center shadow-xs">
        <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          Practice Objective:
        </span>
        <div className="flex items-center space-x-3">
          <span
            className={`font-display rounded-md border px-3 py-1 text-xl font-black tracking-widest ${
              isMatchSuccessful
                ? 'bg-success/20 border-success text-success animate-bounce'
                : 'bg-muted border-border text-foreground'
            }`}
          >
            {targetWord}
          </span>
          {isMatchSuccessful && (
            <span className="text-success font-sans text-xs font-bold">Transmission Clear!</span>
          )}
        </div>
      </div>

      <div className="bg-card border-border flex w-full flex-col space-y-4 rounded-2xl border p-6 shadow-xs">
        <div className="text-center">
          <h2 className="text-muted-foreground mb-1 text-xs font-bold tracking-widest uppercase">
            Decoded Message Stream
          </h2>
          <div
            className={`font-display wrap-break-words flex min-h-12 items-center justify-center text-center text-4xl font-black tracking-wide ${
              isMatchSuccessful ? 'text-success' : 'text-foreground'
            }`}
          >
            {translatedText || (
              <span className="block text-xl font-normal tracking-wide opacity-20">
                READY FOR TRANSMISSION...
              </span>
            )}
          </div>
        </div>

        <div className="border-border/60 border-t pt-4 text-center">
          <span className="text-muted-foreground mb-2 block text-[10px] font-bold tracking-widest uppercase">
            Active Character Buffer
          </span>
          <p className="text-primary min-h-6 font-mono text-xl tracking-widest">
            {signalBuffer.length > 0 ? signalBuffer.join(' ') : '_'}
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <AtomButton
            variant="link"
            size="sm"
            onClick={resetDashboard}
            className="text-destructive text-xs! font-bold"
            disabled={!(signalBuffer.length > 0 || translatedText.length > 0)}
          >
            Clear Message Display
          </AtomButton>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <AtomMorseKey
          onDot={handleDot}
          onDash={handleDash}
          onInteraction={handleStrokeRegister}
          signalDelay={timings.signalDelay}
          disabled={false}
          onUnlock={() => setIsSystemOn(true)}
          onShutdown={() => {
            setIsSystemOn(false)
            setSignalBuffer([])
          }}
        />

        <TelegraphCheatSheet morseDictionary={MORSE_DICTIONARY} />

        <TelegraphSpeedControls
          timings={timings}
          onTimingChange={handleTimingChange}
          onApplyPreset={handleApplyPreset}
        />
      </div>
    </div>
  )
}

export default FeatureTelegraphDashboard
