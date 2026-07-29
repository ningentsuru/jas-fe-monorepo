

export interface LongPressOptions {
  delay?: number
  onToggle?: () => void
  onLongToggle?: () => void
}

interface ExtendedHTMLElement extends HTMLElement {
  __longPressCleanup?: () => void
}

export const vLongPressToggle: Directive<ExtendedHTMLElement, LongPressOptions> = {
  mounted(el, binding) {
    const options = binding.value || {}
    const delay = options.delay ?? 1000

    let timer: ReturnType<typeof setTimeout> | null = null
    let isLongPressed = false

    const start = () => {
      if (timer) return
      isLongPressed = false

      timer = setTimeout(() => {
        isLongPressed = true
        options.onLongToggle?.()
      }, delay)
    }

    const cancel = () => {
      const wasLongPressed = isLongPressed
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (!wasLongPressed) {
        options.onToggle?.()
      }
      isLongPressed = false
    }

    const handleLeave = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      isLongPressed = false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        start()
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        cancel()
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        el.style.webkitUserSelect = 'none'
        el.style.userSelect = 'none'
      }
      start()
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', cancel)
    el.addEventListener('pointerleave', handleLeave)
    el.addEventListener('contextmenu', (e) => e.preventDefault())
    el.addEventListener('keydown', handleKeyDown)
    el.addEventListener('keyup', handleKeyUp)

    el.__longPressCleanup = () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', cancel)
      el.removeEventListener('pointerleave', handleLeave)
      el.removeEventListener('keydown', handleKeyDown)
      el.removeEventListener('keyup', handleKeyUp)
      if (timer) clearTimeout(timer)
    }
  },

  unmounted(el) {
    el.__longPressCleanup?.()
    delete el.__longPressCleanup
  },
}
