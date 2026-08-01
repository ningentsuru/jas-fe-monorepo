'use client'

import * as React from 'react'
import { AtomMorseKey, AtomButton, audioMorsePlayer } from '@repo/ui-react'
import { translateMorseSequence, MORSE_DICTIONARY } from '../../utils/morseTranslator'

export const FeatureTelegraphDashboard = () => {
  const [isSystemOn, setIsSystemOn] = React.useState<boolean>(false)
  const [signalBuffer, setSignalBuffer] = React.useState<string[]>([])
  const [translatedText, setTranslatedText] = React.useState<string>('')
  const [showCheatSheet, setShowCheatSheet] = React.useState<boolean>(false)

  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const wordBreakTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Target word for interactive practice tracking
  const targetWord = 'SOS'

  // Clean shutdown sequence
  const handleSystemDisable = React.useCallback(() => {
    setIsSystemOn(false)
    audioMorsePlayer.stopDummySilence()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (wordBreakTimerRef.current) clearTimeout(wordBreakTimerRef.current)
    setSignalBuffer([])
  }, [])

  // 15-second structural inactivity countdown guard
  const resetInactivityTimer = React.useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      handleSystemDisable()
    }, 15000)
  }, [handleSystemDisable])

  // Master power toggle action
  const handleToggleSystem = React.useCallback(() => {
    if (isSystemOn) {
      handleSystemDisable()
    } else {
      setIsSystemOn(true)
      audioMorsePlayer.startDummySilence()
      resetInactivityTimer()
    }
  }, [isSystemOn, handleSystemDisable, resetInactivityTimer])

  const handleStrokeRegister = React.useCallback(() => {
    resetInactivityTimer()
    if (wordBreakTimerRef.current) {
      clearTimeout(wordBreakTimerRef.current)
      wordBreakTimerRef.current = null
    }
  }, [resetInactivityTimer])

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
    resetInactivityTimer()
  }, [resetInactivityTimer])

  // Reactive Multi-Tiered Character & Word Break Decoder Loop
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
      }, 1400)
    }, 700) // 700ms letter break threshold

    return () => clearTimeout(decodeTimer)
  }, [signalBuffer])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (wordBreakTimerRef.current) clearTimeout(wordBreakTimerRef.current)
    }
  }, [])

  // Determine alignment with our target phrase assistant metric
  const isMatchSuccessful = translatedText.trim().toUpperCase() === targetWord

  return (
    <div className="feature-telegraph-dashboard mt-4 flex flex-col gap-6">
      {/* 1. Master Power Connection Control */}
      <div className="bg-card border-border flex w-full items-center justify-between rounded-xl border p-4 shadow-xs">
        <div className="flex flex-col text-left">
          <span className="font-sans text-sm font-bold">Power Connection</span>
          <span className="text-muted-foreground text-xs">
            {isSystemOn ? 'Audio hardware line warm' : 'Telegraph offline'}
          </span>
        </div>
        <AtomButton
          variant={isSystemOn ? 'secondary' : 'primary'}
          size="sm"
          onClick={handleToggleSystem}
          className="text-xs font-bold tracking-wider uppercase"
        >
          {isSystemOn ? 'Disconnect' : 'Connect Key'}
        </AtomButton>
      </div>

      {/* 2. Interactive Target Word Practice Assistant Panel */}
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

      {/* 3. Output Stream Display Terminal */}
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
            className="text-destructive! text-xs font-bold"
            disabled={!(signalBuffer.length > 0 || translatedText.length > 0)}
          >
            Clear Message Display
          </AtomButton>
        </div>
      </div>

      {/* 4. Interactive Physical Key Node */}
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <AtomMorseKey
          onDot={handleDot}
          onDash={handleDash}
          onInteraction={handleStrokeRegister}
          disabled={!isSystemOn}
          label="TRANSMIT"
          signalDelay={250}
        />

        {/* Toggle Button for the Code Reference Matrix */}
        <AtomButton
          variant="ghost"
          size="sm"
          onClick={() => setShowCheatSheet(!showCheatSheet)}
          className="text-primary text-xs font-bold"
        >
          {showCheatSheet ? 'Hide Morse Code Cheat Sheet' : 'Show Morse Code Cheat Sheet'}
        </AtomButton>

        {/* 5. Morse Code Table Cheat Sheet Grid */}
        {showCheatSheet && (
          <div className="bg-muted/60 border-border grid max-h-40 w-full grid-cols-4 gap-2 overflow-y-auto rounded-xl border p-4 text-center font-mono text-xs">
            {Object.entries(MORSE_DICTIONARY)
              .sort((a, b) => a[1].localeCompare(b[1]))
              .map(([code, char]) => (
                <div
                  key={char}
                  className="bg-card border-border/40 flex justify-between rounded-md border p-1.5 px-2"
                >
                  <span className="text-foreground font-bold">{char}:</span>
                  <span className="text-primary font-black tracking-tighter">{code}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FeatureTelegraphDashboard
