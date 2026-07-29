import { useMemo, type MouseEvent, type ReactNode, type CSSProperties, type HTMLAttributes } from 'react'

export type ButtonTarget = '_blank' | '_self' | '_parent' | '_top'

export interface AtomButtonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  disabled?: boolean
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'link' | 'destructive'
  to?: string | { path?: string;[key: string]: unknown }
  href?: string
  target?: ButtonTarget
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: MouseEvent<HTMLElement>) => void
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

export const AtomButton = ({
  size = 'md',
  disabled = false,
  variant = 'default',
  type = 'button',
  to,
  href,
  target,
  onClick,
  children,
  className = '',
  style,
  ...attrs
}: AtomButtonProps & HTMLAttributes<HTMLElement>) => {
  const componentTag = useMemo(() => {
    if (disabled) return 'button'
    if (to || href) return 'a'
    return 'button'
  }, [disabled, to, href])

  const componentProps = useMemo(() => {
    if (disabled) return { type, disabled: true }
    if (to) {
      const url = typeof to === 'string' ? to : (to.path as string) || '#'
      return { href: url, target }
    }
    if (href) return { href, target }
    return { type }
  }, [disabled, to, href, target, type])

  function handleClick(event: MouseEvent<HTMLElement>) {
    if (disabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  const baseClasses =
    'atom-button inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-all outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none'

  const variantClasses = {
    default: 'bg-transparent text-primary hover:opacity-80 focus-visible:ring-ring',
    primary: 'bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-ring',
    secondary:
      'border border-border bg-card text-card-foreground hover:bg-muted focus-visible:ring-ring',
    ghost: 'bg-transparent text-foreground hover:bg-muted focus-visible:ring-ring',
    link: 'bg-transparent text-primary hover:underline hover:opacity-80 focus-visible:ring-ring p-0! h-auto',
    destructive:
      'bg-destructive text-destructive-foreground hover:opacity-90 focus-visible:ring-destructive',
  }

  const buttonClass = useMemo(() => {
    if (typeof size === 'number') {
      return 'px-4 py-2 text-base h-[var(--button-size)]'
    }

    const sizeClasses: Record<string, string> = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2 text-base h-10',
      lg: 'px-6 py-3 text-lg h-12',
      xl: 'px-8 py-4 text-xl h-16',
    }

    return sizeClasses[size] || sizeClasses.md
  }, [size])

  const buttonStyle = useMemo<CSSProperties>(() => {
    if (typeof size === 'number') {
      return { '--button-size': `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  const finalClass = [
    baseClasses,
    buttonClass,
    variantClasses[variant],
    'focus-visible:ring-offset-background',
    'hc:border-2 data-[theme=high-contrast]:border-2',
    className
  ].filter(Boolean).join(' ')

  const mergedStyle = { ...buttonStyle, ...style }

  if (componentTag === 'a') {
    return (
      <a
        {...componentProps}
        {...attrs}
        data-testid="atom-button"
        className={finalClass}
        style={mergedStyle}
        aria-disabled={disabled ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      {...componentProps}
      {...attrs}
      data-testid="atom-button"
      className={finalClass}
      style={mergedStyle}
      aria-disabled={disabled ? 'true' : undefined}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default AtomButton
