import { defineComponent, computed, h, type Component, type PropType } from 'vue'

export type VueClassBinding = string | unknown[] | Record<string, unknown>

export interface AtomIconProps {
  name?: string
  icon?: Component
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  class?: unknown
}

export default defineComponent({
  name: 'AtomIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    icon: {
      type: Object as PropType<Component>,
      default: undefined,
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'md',
    },
    class: {
      type: [String, Array, Object] as PropType<VueClassBinding>,
      default: '',
    },
  },
  setup(props) {
    const iconClass = computed(() => {
      const baseClasses = 'text-[var(--color-foreground)] transition-colors'

      const incomingClasses = Array.isArray(props.class)
        ? props.class.filter(Boolean).join(' ')
        : typeof props.class === 'object' && props.class !== null
          ? Object.keys(props.class)
              .filter((key) => (props.class as unknown as Record<string, unknown>)[key])
              .join(' ')
          : (props.class as string) || ''

      const customSizeClass = incomingClasses.trim()

      if (typeof props.size === 'number') {
        return `${baseClasses} w-[var(--icon-size)] h-[var(--icon-size)] ${customSizeClass}`.trim()
      }

      const sizeMap: Record<string, string> = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
      }

      const currentSize = sizeMap[props.size] || sizeMap.md
      return `${baseClasses} ${currentSize} ${customSizeClass}`.trim()
    })

    const iconStyle = computed(() => {
      if (typeof props.size === 'number') {
        return { '--icon-size': `${props.size}px` }
      }
      return {}
    })

    return () => {
      return (
        <div
          class="atom-icon inline-flex items-center justify-center"
          data-testid="atom-icon"
          style={iconStyle.value}
        >
          {props.icon ? (
            h(props.icon, { class: iconClass.value })
          ) : props.name ? (
            <span class="text-sm">{props.name}</span>
          ) : null}

          <span class="sr-only">atom-icon</span>
        </div>
      )
    }
  },
})
