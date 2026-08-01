'use client'

import {
  useState,
  useMemo,
  type ChangeEvent,
  type MouseEvent,
  type KeyboardEvent,
  type CSSProperties,
  type SelectHTMLAttributes,
} from 'react'
import { ChevronRight } from 'lucide-react'
import { AtomIcon } from '../../'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface AtomSelectProps {
  modelValue?: string | number
  value?: string | number
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  error?: boolean
  id?: string
  name?: string
  ariaLabel?: string
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  onUpdateModelValue?: (value: string | number) => void
  className?: string
  style?: CSSProperties
}

export const AtomSelect = ({
  modelValue = '',
  value,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  size = 'md',
  error = false,
  id,
  name,
  ariaLabel,
  onChange,
  onUpdateModelValue,
  className = '',
  style,
  ...attrs
}: AtomSelectProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'value' | 'onChange'>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function closeDropdown() {
    setTimeout(() => {
      setIsOpen(false)
    }, 100)
  }

  function toggleDropdown(event: MouseEvent) {
    if (disabled) return
    if (event.clientX > 0 && event.clientY > 0) {
      setIsOpen(!isOpen)
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (disabled) return
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      setIsOpen(!isOpen)
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    onUpdateModelValue?.(target.value)
    onChange?.(event)
    closeDropdown()
  }

  const selectClass = useMemo(() => {
    if (typeof size === 'number') {
      return 'pl-4 text-base h-[var(--select-size)]'
    }

    const sizeClasses: Record<string, string> = {
      sm: 'h-9 py-1.5 pl-3 text-sm',
      md: 'h-11 py-2 pl-4 text-base',
      lg: 'h-14 py-3 pl-4 text-lg',
      xl: 'h-16 py-4 pl-4 text-xl',
    }

    return sizeClasses[size] || sizeClasses.md
  }, [size])

  const selectStyle = useMemo<CSSProperties>(() => {
    if (typeof size === 'number') {
      return { '--select-size': `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  const displayValue = value !== undefined ? value : modelValue

  return (
    <div className="atom-select-container font-display relative w-full">
      <select
        {...attrs}
        id={id}
        name={name}
        data-testid="atom-select"
        value={displayValue}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-label={ariaLabel}
        onMouseDown={toggleDropdown}
        onBlur={closeDropdown}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        style={{ ...selectStyle, ...style }}
        className={[
          'atom-select border-border bg-card text-card-foreground focus-visible:ring-ring focus-visible:ring-offset-background hc:border-2 block w-full cursor-pointer appearance-none rounded-md border pr-10 shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2',
          selectClass,
          error
            ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'
            : 'hover:bg-muted/40',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <option value="" disabled hidden className="bg-card text-card-foreground">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="checked:bg-primary checked:text-primary-foreground bg-card text-card-foreground"
          >
            {option.label}
          </option>
        ))}
      </select>

      <div
        className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
        aria-hidden="true"
      >
        <AtomIcon
          icon={ChevronRight}
          size={size}
          className={[
            'transition-transform duration-200 ease-in-out',
            isOpen ? 'rotate-90' : 'rotate-0',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

export default AtomSelect
