import { vi } from 'vitest'

export const globalLongPressHandlers = {
  onToggle: () => {},
  onLongToggle: () => {},
}

vi.mock('./directives/longPressToggle', () => {
  return {
    vLongPressToggle: {
      mounted(el: HTMLElement, binding: import('vue').DirectiveBinding) {
        globalLongPressHandlers.onToggle = binding.value?.onToggle
        globalLongPressHandlers.onLongToggle = binding.value?.onLongToggle
      },
      updated(el: HTMLElement, binding: import('vue').DirectiveBinding) {
        globalLongPressHandlers.onToggle = binding.value?.onToggle
        globalLongPressHandlers.onLongToggle = binding.value?.onLongToggle
      },
    },
  }
})
