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
        <div className="grid max-h-18 w-72 grid-cols-2 gap-2 overflow-y-auto p-1 font-mono text-xs">
          {Object.entries(morseDictionary)
            .sort((a, b) => a[1].localeCompare(b[1]))
            .map(([code, char]) => (
              <div
                key={char}
                className="bg-muted border-border/40 flex justify-between rounded-md border p-1.5 px-2"
              >
                <span className="text-foreground font-bold">{char}:</span>
                <span className="text-primary font-black tracking-tighter">{code}</span>
              </div>
            ))}
        </div>
      }
    >
      <button className="text-primary focus-visible:ring-ring cursor-pointer rounded px-2 py-1 text-xs font-bold transition-all outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2">
        Hover to view Morse Code Cheat Sheet
      </button>
    </MoleculeTooltip>
  )
}

export default TelegraphCheatSheet
