'use client'

import { useState, useMemo, useEffect, type ElementType, type FormEvent } from 'react'
import { MoleculeModal, AtomToggle, AtomSelect, AtomButton } from '../../'
import { Sun, Moon, Palette, LoaderPinwheel } from 'lucide-react'
import { createPortal } from 'react-dom'

export type ThemeType =
  | 'light'
  | 'dark'
  | 'forest'
  | 'midnight'
  | 'ocean'
  | 'sunset'
  | 'high-contrast'

export interface MoleculeThemeToggleProps {
  isToggled?: boolean
  currentTheme?: ThemeType
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  icon?: ElementType
  onToggle?: () => void
  onLongToggle?: () => void
  onSetTheme?: (theme: string) => void
}

export const MoleculeThemeToggle = ({
  isToggled = false,
  currentTheme = 'light',
  size = 'md',
  icon,
  onToggle,
  onLongToggle,
  onSetTheme
}: MoleculeThemeToggleProps) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const optionTheme = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Forest', value: 'forest' },
    { label: 'Ocean', value: 'ocean' },
    { label: 'Sunset', value: 'sunset' },
    { label: 'High Contrast', value: 'high-contrast' },
  ]

  const getIcon = useMemo(() => {
    if (showModal) return LoaderPinwheel
    if (!['light', 'dark'].includes(selectedTheme)) return Palette
    return isToggled ? Moon : Sun
  }, [showModal, selectedTheme, isToggled])

  function modalToggle() {
    setShowModal(true)
    onLongToggle?.()
  }

  function closeModal() {
    setShowModal(false)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onSetTheme?.(selectedTheme)
    closeModal()
  }

  useEffect(() => {
    setSelectedTheme(currentTheme)
  }, [currentTheme])

  return (
    <div className="theme-toggle-wrapper font-display">
      <div className="molecule-theme-toggle" data-testid="molecule-theme-toggle">
        <AtomToggle
          icon={icon || getIcon}
          isToggled={isToggled}
          size={size}
          onToggle={() => onToggle?.()}
          onLongToggle={modalToggle}
        />
        <span className="sr-only">molecule-theme-toggle</span>
      </div>

      {mounted && createPortal(
        <MoleculeModal
          title="Choose more themes!"
          show={showModal}
          hideClose
          onClose={closeModal}
        >
          <form data-testid="theme-form" className="flex flex-col justify-between gap-4" onSubmit={handleSubmit}>
            <AtomSelect
              value={selectedTheme}
              onUpdateModelValue={(val) => setSelectedTheme(val as string)}
              options={optionTheme}
            />
            <div className="flex justify-between gap-2">
              <AtomButton size="md" variant="primary" type="submit">
                <span>Apply</span>
              </AtomButton>
              <AtomButton size="md" variant="destructive" type="button" onClick={closeModal}>
                <span>Close</span>
              </AtomButton>
            </div>
          </form>
        </MoleculeModal>,
        document.body
      )}
    </div>
  )
}

export default MoleculeThemeToggle
