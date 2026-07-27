import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export interface UseLongPressToggleOptions {
  delay?: number
  onToggle?: () => void
  onLongToggle?: () => void
}

export function useLongPressToggle(
  element: Ref<HTMLElement | null>,
  options: UseLongPressToggleOptions = {},
) {
  const { delay = 1000, onToggle, onLongToggle } = options
  let timer: ReturnType<typeof setTimeout> | null = null
  const isLongPressed = ref(false)
  const isTouchInteraction = ref(false)

  function start(isTouch = false) {
    if (timer) return

    isTouchInteraction.value = isTouch
    isLongPressed.value = false

    timer = setTimeout(() => {
      isLongPressed.value = true
      onLongToggle?.()
      if (isTouch) isTouchInteraction.value = false
    }, delay)
  }

  function cancel(isTouch = false) {
    if (!isTouch && isTouchInteraction.value) {
      isTouchInteraction.value = false
      return
    }

    const wasLongPressed = isLongPressed.value

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (!wasLongPressed) {
      onToggle?.()
    }

    isLongPressed.value = false
    isTouchInteraction.value = false
  }

  function handleLeave(isTouch = false) {
    if (!isTouch && isTouchInteraction.value) return

    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isLongPressed.value = false
    isTouchInteraction.value = false
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      start(false)
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      cancel(false)
    }
  }

  onMounted(() => {
    if (!element.value) return
    const el = element.value

    const onMouseDown = () => {
      if (isTouchInteraction.value) return
      start(false)
    }

    const onMouseUp = (_e: MouseEvent) => cancel(false)
    const onMouseLeave = (_e: MouseEvent) => handleLeave(false)

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseLeave)

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      start(true)
    }

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      cancel(true)
    }

    const onTouchCancel = (e: TouchEvent) => {
      e.preventDefault()
      handleLeave(true)
    }

    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchend', onTouchEnd)
    el.addEventListener('touchcancel', onTouchCancel)

    el.addEventListener('keydown', handleKeyDown)
    el.addEventListener('keyup', handleKeyUp)

    ;(el as any).__longPressHandlers = {
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
    }
  })

  onUnmounted(() => {
    if (!element.value) return
    const el = element.value

    const handlers = (el as any).__longPressHandlers
    if (handlers) {
      el.removeEventListener('mousedown', handlers.onMouseDown)
      el.removeEventListener('mouseup', handlers.onMouseUp)
      el.removeEventListener('mouseleave', handlers.onMouseLeave)

      el.removeEventListener('touchstart', handlers.onTouchStart)
      el.removeEventListener('touchend', handlers.onTouchEnd)
      el.removeEventListener('touchcancel', handlers.onTouchCancel)
      delete (el as any).__longPressHandlers
    }

    el.removeEventListener('keydown', handleKeyDown)
    el.removeEventListener('keyup', handleKeyUp)

    if (timer) clearTimeout(timer)
  })

  return { isLongPressed }
}
