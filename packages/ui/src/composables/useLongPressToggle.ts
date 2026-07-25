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
  // Track if we are currently handling a touch interaction to ignore mouse emulations
  const isTouchInteraction = ref(false)

  function start(isTouch = false) {
    // Prevent double firing if timer already exists
    if (timer) return

    isTouchInteraction.value = isTouch
    isLongPressed.value = false

    timer = setTimeout(() => {
      isLongPressed.value = true
      onLongToggle?.()
      // Reset touch flag after long press triggers
      if (isTouch) isTouchInteraction.value = false
    }, delay)
  }

  function cancel(isTouch = false) {
    // If this cancel is from a mouse event, but we just finished a touch interaction, ignore it
    if (!isTouch && isTouchInteraction.value) {
      isTouchInteraction.value = false
      return
    }

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    // Only trigger short toggle if long press didn't happen
    if (!isLongPressed.value) {
      onToggle?.()
    }

    // Reset state in next tick to allow UI updates to finish
    setTimeout(() => {
      isLongPressed.value = false
    }, 0)
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

    // Mouse Events
    const onMouseDown = (e: MouseEvent) => {
      // Ignore mouse events if they immediately follow a touch interaction
      if (isTouchInteraction.value) return
      start(false)
    }

    const onMouseUp = (_e: MouseEvent) => cancel(false)
    const onMouseLeave = (_e: MouseEvent) => handleLeave(false)

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseLeave)

    // Touch Events
    // REMOVED { passive: true } so we can call preventDefault()
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault() // Stops mouse emulation
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

    // store for removal via closure
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
