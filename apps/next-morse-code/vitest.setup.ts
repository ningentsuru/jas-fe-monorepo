import '@testing-library/jest-dom'
import { vi } from 'vitest'

if (!global.PointerEvent) {
  global.PointerEvent = class PointerEvent extends Event {
    pointerType: string
    constructor(type: string, init: Record<string, unknown> = {}) {
      super(type, init)
      this.pointerType = (init.pointerType as string) || 'mouse'
    }
  } as unknown as typeof PointerEvent
}

interface MockedAudioWindow extends Window {
  AudioContext: unknown;
}

if (typeof window !== 'undefined' && !window.AudioContext) {
  const mockNode = {
    connect: vi.fn(),
    disconnect: vi.fn(),
    setValueAtTime: vi.fn(),
    linearRampToValueAtTime: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    gain: { value: 1, setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
    frequency: { value: 440 }
  };

  (window as unknown as MockedAudioWindow).AudioContext = class {
    state = 'running'
    currentTime = 0
    createOscillator = () => mockNode
    createGain = () => mockNode
    resume = () => Promise.resolve()
    destination = {}
  }
}
