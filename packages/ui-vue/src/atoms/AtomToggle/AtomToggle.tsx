import { defineComponent, withDirectives, type Component, type PropType } from 'vue'
import { AtomIcon } from '../../'
import { vLongPressToggle } from '../../directives/longPressToggle'

export interface AtomToggleProps {
  icon: Component
  isToggled?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
}

export default defineComponent({
  name: 'AtomToggle',
  props: {
    icon: {
      type: Object as PropType<Component>,
      required: true,
    },
    isToggled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'sm',
    },
  },
  emits: {
    toggle: () => true,
    longToggle: () => true,
  },
  setup(props, { emit }) {
    return () => {
      return withDirectives(
        <button
          type="button"
          class="atom-toggle focus-visible:ring-ring focus-visible:ring-offset-background flex cursor-pointer items-center justify-center rounded-md border border-transparent transition-all duration-300 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          data-testid="atom-toggle"
        >
          <AtomIcon icon={props.icon} size={props.size} />
          <span class="sr-only">atom-toggle</span>
        </button>,
        [
          [
            vLongPressToggle,
            {
              delay: 200,
              onToggle: () => emit('toggle'),
              onLongToggle: () => emit('longToggle'),
            },
          ],
        ],
      )
    }
  },
})
