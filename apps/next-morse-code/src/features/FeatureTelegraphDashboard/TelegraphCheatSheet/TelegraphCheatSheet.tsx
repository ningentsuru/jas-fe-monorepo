'use client'

import { MoleculeTooltip } from '@repo/ui-react'

interface TelegraphCheatSheetProps {
  morseDictionary: Record<string, string>
}

export const TelegraphCheatSheet = ({ morseDictionary }: TelegraphCheatSheetProps) => {
  return (
    <MoleculeTooltip
      title="Morse Code Reference Matrix"
      position="left"
      delay={200}
      content={
        <div
          className="grid max-h-38 w-72 grid-cols-2 gap-2 overflow-y-auto p-1 font-mono text-xs lg:max-h-46"
          role="region"
          aria-label="Morse Code Character Reference Matrix"
        >
          {Object.entries(morseDictionary)
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([code, char]) => {
              const accessibleMorseSpeech = code
                .split('')
                .map((signal) => (signal === '.' ? 'dit' : 'dah'))
                .join(' ')

              return (
                <div
                  key={char}
                  className="bg-muted border-border/40 flex justify-between rounded-md border p-1.5 px-2"
                  role="listitem"
                  aria-label={`Character ${char === ' ' ? 'Space' : char} is represented in morse code as: ${accessibleMorseSpeech}`}
                >
                  <span className="text-foreground font-bold" aria-hidden="true">
                    {char}:
                  </span>
                  <span className="text-primary font-black tracking-tighter" aria-hidden="true">
                    {code}
                  </span>
                </div>
              )
            })}
        </div>
      }
    >
      <button
        className="text-primary focus-visible:ring-ring cursor-pointer rounded px-2 py-1 text-xs font-bold transition-all outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-haspopup="true"
        aria-label="View Morse Code Cheat Sheet Reference Matrix"
      >
        Hover to view Morse Code Cheat Sheet
      </button>
    </MoleculeTooltip>
  )
}

export default TelegraphCheatSheet
