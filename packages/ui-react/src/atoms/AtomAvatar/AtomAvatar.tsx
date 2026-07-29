import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

export interface AtomAvatarProps {
  username: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  round?: boolean
}

export default defineComponent({
  name: 'AtomAvatar',
  props: {
    username: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'md',
    },
    round: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const avatarInitials = computed(() => {
      return props.username.trim().slice(0, 2).toUpperCase() || '??'
    })

    const sizeClass = computed(() => {
      if (typeof props.size === 'number') return 'h-[var(--avatar-size)] w-[var(--avatar-size)]'

      const sizeMap: Record<string, string> = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
      }
      return sizeMap[props.size] || sizeMap.md
    })

    const avatarStyle = computed(() => {
      if (typeof props.size === 'number') {
        return { '--avatar-size': `${props.size}px` }
      }
      return {}
    })

    return () => (
      <div
        class={[
          'atom-avatar border-border bg-card text-card-foreground font-display inline-flex items-center justify-center border font-bold transition-all duration-300 select-none',
          sizeClass.value,
          props.round ? 'rounded-full' : 'rounded-md',
          'hc:border-2 data-[theme=high-contrast]:border-2',
        ]}
        style={avatarStyle.value}
        data-testid="atom-avatar"
      >
        <span>{avatarInitials.value}</span>
      </div>
    )
  },
})
