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

  function start() {
    isLongPressed.value = false
    timer = setTimeout(() => {
      isLongPressed.value = true
      onLongToggle?.()
    }, delay)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (!isLongPressed.value) {
      onToggle?.()
    }

    setTimeout(() => {
      isLongPressed.value = false
    }, 0)
  }

  function handleLeave() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isLongPressed.value = false
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

  onMounted(() => {
    if (!element.value) return
    const el = element.value

    el.addEventListener('mousedown', start)
    el.addEventListener('mouseup', cancel)
    el.addEventListener('mouseleave', handleLeave)

    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', handleLeave)

    el.addEventListener('keydown', handleKeyDown)
    el.addEventListener('keyup', handleKeyUp)
  })

  onUnmounted(() => {
    if (!element.value) return
    const el = element.value

    el.removeEventListener('mousedown', start)
    el.removeEventListener('mouseup', cancel)
    el.removeEventListener('mouseleave', handleLeave)

    el.removeEventListener('touchstart', start)
    el.removeEventListener('touchend', cancel)
    el.removeEventListener('touchcancel', handleLeave)

    el.removeEventListener('keydown', handleKeyDown)
    el.removeEventListener('keyup', handleKeyUp)

    if (timer) clearTimeout(timer)
  })

  return { isLongPressed }
}
