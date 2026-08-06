import type { Directive } from 'vue'

export interface LongPressOptions {
  delay?: number
  onToggle?: () => void
  onLongToggle?: () => void
}

export const vLongPressToggle: Directive<
  HTMLElement & { _cleanup?: () => void },
  LongPressOptions
> = {
  mounted(el, binding) {
    const { delay = 200, onToggle, onLongToggle } = binding.value || {}
    let timer: ReturnType<typeof setTimeout> | null = null
    let isLongPressed = false

    const start = (e: Event) => {
      if (timer || (e as KeyboardEvent).repeat) return
      isLongPressed = false
      timer = setTimeout(() => {
        isLongPressed = true
        onLongToggle?.()
      }, delay)
    }

    const clear = (e: Event) => {
      if (timer) clearTimeout(timer)
      timer = null

      if (
        !isLongPressed &&
        (e.type === 'pointerup' ||
          (e as KeyboardEvent).key === ' ' ||
          (e as KeyboardEvent).key === 'Enter')
      ) {
        onToggle?.()
      }
      isLongPressed = false
    }

    const onKeyDown = (e: KeyboardEvent) => (e.key === ' ' || e.key === 'Enter') && start(e)
    const onKeyUp = (e: KeyboardEvent) => (e.key === ' ' || e.key === 'Enter') && clear(e)
    const onPointerDown = (e: PointerEvent) => e.button === 0 && start(e)

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('pointerup', clear)
    el.addEventListener('pointerleave', handleResetAndBlur)
    el.addEventListener('blur', handleResetAndBlur)
    el.addEventListener('keydown', onKeyDown)
    el.addEventListener('keyup', onKeyUp)

    function handleResetAndBlur() {
      if (timer) clearTimeout(timer)
      timer = null
      isLongPressed = false
    }

    el._cleanup = () => {
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('pointerup', clear)
      el.removeEventListener('pointerleave', handleResetAndBlur)
      el.removeEventListener('blur', handleResetAndBlur)
      el.removeEventListener('keydown', onKeyDown)
      el.removeEventListener('keyup', onKeyUp)
    }
  },
  unmounted(el) {
    el._cleanup?.()
    delete el._cleanup
  },
}
