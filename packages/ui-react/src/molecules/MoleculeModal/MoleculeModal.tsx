'use client'

import { useEffect, useRef, type ReactNode, type SyntheticEvent } from 'react'

export interface MoleculeModalProps {
  title?: string
  show?: boolean
  hideClose?: boolean
  onClose?: () => void
  header?: ReactNode
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

export const MoleculeModal = ({
  title = '',
  show = false,
  hideClose = false,
  onClose,
  header,
  footer,
  children,
  className = '',
}: MoleculeModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const toggleScrollLock = (lock: boolean) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = lock ? 'hidden' : ''
  }

  useEffect(() => {
    if (!dialogRef.current) return

    if (show) {
      if (!dialogRef.current.open) {
        dialogRef.current.showModal()
        toggleScrollLock(true)
      }
    } else {
      if (dialogRef.current.open) {
        dialogRef.current.close()
        toggleScrollLock(false)
      }
    }
  }, [show])

  useEffect(() => {
    return () => toggleScrollLock(false)
  }, [])

  const handleCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    onClose?.()
  }

  return (
    <dialog
      ref={dialogRef}
      data-testid="molecule-modal"
      onCancel={handleCancel}
      className="fixed inset-0 z-50 m-auto overflow-visible border-none bg-transparent p-0 outline-none open:flex"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => onClose?.()}
        className="animate-in fade-in fixed inset-0 h-full w-full bg-black/40 backdrop-blur-xs duration-300 outline-none"
      />

      <div
        className={[
          'border-border bg-card text-card-foreground animate-in fade-in zoom-in-95 slide-in-from-bottom-3 relative m-auto flex w-full max-w-lg flex-col gap-6 rounded-lg border p-6 shadow-xl duration-300 outline-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {(title || header) && (
          <header
            data-testid="modal-header"
            className="border-border flex items-center justify-between border-b pb-3"
          >
            {header ? (
              header
            ) : (
              <h1
                data-testid="modal-title"
                className="font-display text-card-foreground text-xl font-semibold tracking-tight"
              >
                {title}
              </h1>
            )}

            {!hideClose && (
              <button
                type="button"
                className="text-muted-foreground hover:text-card-foreground focus-visible:ring-ring focus-visible:ring-offset-card cursor-pointer rounded-md p-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label="Close modal"
                onClick={() => onClose?.()}
                data-testid="modal-close-button"
              >
                <span aria-hidden="true" className="text-lg font-bold">
                  ✕
                </span>
              </button>
            )}
          </header>
        )}

        <main className="modal-body text-card-foreground/90 max-h-[65vh] flex-1 overflow-y-auto p-1 text-sm leading-relaxed">
          {children}
        </main>

        {footer && (
          <footer
            data-testid="modal-footer"
            className="border-border flex flex-col-reverse justify-end gap-3 border-t pt-4 sm:flex-row"
          >
            {footer}
          </footer>
        )}
      </div>

      <span className="sr-only">molecule-modal screen anchor active</span>
    </dialog>
  )
}

export default MoleculeModal
