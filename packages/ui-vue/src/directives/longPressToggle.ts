import type { Directive } from 'vue'

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
    const delay = options.delay ?? 200

    let timer: ReturnType<typeof setTimeout> | null = null
    let isLongPressed = false
    let touchStartTime = 0

    const start = (e: Event) => {
      if (timer) return
      isLongPressed = false
      touchStartTime = Date.now()

      timer = setTimeout(() => {
        isLongPressed = true
        options.onLongToggle?.()
      }, delay)
    }

    const cancel = (e: Event) => {
      // Prevent browser click emulation cascades
      if (e.cancelable) {
        e.preventDefault()
        e.stopPropagation()
      }

      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      // Only fire standard toggle if we didn't cross into long press duration limits
      if (!isLongPressed && Date.now() - touchStartTime < delay) {
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
        start(e)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        cancel(e)
      }
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') {
        el.style.webkitUserSelect = 'none'
        el.style.userSelect = 'none'
      }
      start(e)
    }

    // Intercept standard click events to block double execution loops
    const onClickFallback = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', cancel)
    el.addEventListener('pointerleave', handleLeave)
    el.addEventListener('click', onClickFallback)
    el.addEventListener('contextmenu', (e) => e.preventDefault())
    el.addEventListener('keydown', handleKeyDown)
    el.addEventListener('keyup', handleKeyUp)

    el.__longPressCleanup = () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', cancel)
      el.removeEventListener('pointerleave', handleLeave)
      el.removeEventListener('click', onClickFallback)
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
