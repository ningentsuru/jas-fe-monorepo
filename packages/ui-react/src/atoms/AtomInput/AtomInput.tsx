import { useMemo, type ReactNode, type ChangeEvent, type CSSProperties, type InputHTMLAttributes } from 'react'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'

export interface AtomInputProps {
  modelValue?: string | number
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onUpdateModelValue?: (value: string | number) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  id?: string
  name?: string
  type?: InputType
  ariaLabel?: string
  prefix?: ReactNode
  suffix?: ReactNode
  className?: string
  style?: CSSProperties
}

export const AtomInput = ({
  modelValue = '',
  value,
  onChange,
  onUpdateModelValue,
  placeholder = '',
  disabled = false,
  error = false,
  size = 'md',
  id,
  name,
  type = 'text',
  ariaLabel,
  prefix,
  suffix,
  className = '',
  style,
  ...attrs
}: AtomInputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix' | 'value' | 'onChange' | 'type'>) => {
  const inputClass = useMemo(() => {
    if (typeof size === 'number') {
      return 'px-4 text-base h-[var(--input-size)]'
    }

    const sizeClasses: Record<string, string> = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-4 text-base',
      lg: 'h-14 px-4 text-lg',
      xl: 'h-16 px-5 text-xl',
    }

    return sizeClasses[size] || sizeClasses.md
  }, [size])

  const inputStyle = useMemo<CSSProperties>(() => {
    if (typeof size === 'number') {
      return { '--input-size': `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event)
    onUpdateModelValue?.(event.target.value)
  }

  const hasPrefix = !!prefix
  const hasSuffix = !!suffix
  const displayValue = value !== undefined ? value : modelValue

  return (
    <div className="atom-input-container font-display relative flex w-full items-center">
      {hasPrefix && (
        <div className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
          {prefix}
        </div>
      )}

      <input
        {...attrs}
        id={id}
        name={name}
        type={type}
        data-testid="atom-input"
        value={displayValue}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-label={ariaLabel}
        style={{ ...inputStyle, ...style }}
        onChange={handleInput}
        className={[
          'atom-input border-border bg-card text-card-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring focus-visible:ring-offset-background hc:border-2 block w-full rounded-md border shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2',
          inputClass,
          error
            ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'
            : 'hover:bg-muted/20',
          hasPrefix ? 'pl-10' : '',
          hasSuffix ? 'pr-10' : '',
          className
        ].filter(Boolean).join(' ')}
      />

      {hasSuffix && (
        <div className="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
          {suffix}
        </div>
      )}
    </div>
  )
}

export default AtomInput
