export interface TelegraphTimings {
  signalDelay: number
  letterBreakDelay: number
  wordBreakDelay: number
}

export type DifficultyPreset = 'starter' | 'pro' | 'expert'

export const DIFFICULTY_PRESETS: Record<DifficultyPreset, TelegraphTimings> = {
  starter: {
    signalDelay: 150,
    letterBreakDelay: 600,
    wordBreakDelay: 1800,
  },
  pro: {
    signalDelay: 100,
    letterBreakDelay: 450,
    wordBreakDelay: 1400,
  },
  expert: {
    signalDelay: 70,
    letterBreakDelay: 350,
    wordBreakDelay: 1200,
  },
}
