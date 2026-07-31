// packages/ui-react/src/atoms/AtomMorseKey/AtomMorseKey.tsx
"use client";

import * as React from 'react';
import { useLongPressToggle } from '../../hooks/useLongPressToggle';
import { audioMorsePlayer } from '../../utils/audioMorsePlayer';

export interface AtomMorseKeyProps {
  onDot: () => void;
  onDash: () => void;
  onInteraction?: () => void;
  label?: string;
  signalDelay?: number;
  disabled?: boolean;
}

export const AtomMorseKey = ({
  onDot,
  onDash,
  onInteraction,
  label = "TAP / HOLD",
  signalDelay = 250,
  disabled = false,
}: AtomMorseKeyProps) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const longPressHandlers = useLongPressToggle({
    delay: signalDelay,
    onToggle: () => {
      if (disabled) return;
      audioMorsePlayer.stopSignal();
      setIsActive(false);
      onDot();
    },
    onLongToggle: () => {
      if (disabled) return;
      audioMorsePlayer.stopSignal();
      setIsActive(false);
      onDash();
    },
  });

  const handlePointerDown = React.useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (disabled) return;
    setIsActive(true);
    onInteraction?.();
    audioMorsePlayer.startSignal(600);
    longPressHandlers.onPointerDown(e);
  }, [longPressHandlers, disabled, onInteraction]);

  const handlePointerUp = React.useCallback(() => {
    if (disabled) return;
    setIsActive(false);
    audioMorsePlayer.stopSignal();
    longPressHandlers.onPointerUp();
  }, [longPressHandlers, disabled]);

  const handlePointerLeave = React.useCallback(() => {
    if (disabled) return;
    setIsActive(false);
    audioMorsePlayer.stopSignal();
    longPressHandlers.onPointerLeave();
  }, [longPressHandlers, disabled]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || e.repeat) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setIsActive(true);
      onInteraction?.();
      audioMorsePlayer.startSignal(600);
      longPressHandlers.onKeyDown(e);
    }
  }, [longPressHandlers, disabled, onInteraction]);

  const handleKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      setIsActive(false);
      audioMorsePlayer.stopSignal();
      longPressHandlers.onKeyUp(e);
    }
  }, [longPressHandlers, disabled]);

  return (
    <button
      {...(disabled ? {} : longPressHandlers)}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      className={`
        w-48 h-48 rounded-full font-sans font-bold text-lg tracking-wider
        flex flex-col items-center justify-center select-none outline-hidden
        border-4 shadow-md transition-all duration-500 ease-out
        ${disabled
          ? 'bg-muted border-border text-muted-foreground opacity-40 cursor-not-allowed scale-100 shadow-none'
          : isActive
            ? 'bg-primary border-primary text-primary-foreground scale-95 shadow-inner'
            : 'bg-card border-border text-foreground hover:border-muted-foreground hover:scale-102 cursor-pointer'
        }
      `}
      data-testid="atom-morse-key"
    >
      <span className="text-xs uppercase opacity-60 mb-1">Telegraph Key</span>
      <span className="font-display font-black text-xl">
        {disabled ? "LOCKED" : label}
      </span>
      <div className={`
        w-3 h-3 rounded-full mt-2 transition-colors duration-150
        ${disabled ? 'bg-border' : isActive ? 'bg-primary-foreground animate-ping' : 'bg-muted-foreground'}
      `} />
    </button>
  );
};

// 👈 Essential default fallback mapping to maintain global package.json exports mapping
export default AtomMorseKey;
