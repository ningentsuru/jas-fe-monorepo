import { defineComponent, type PropType } from 'vue'
import { AtomButton } from '../../'

export interface AtomNavLinkProps {
  label: string
  href?: string
  to?: string | Record<string, unknown>
  variant?: 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  active?: boolean
}

export default defineComponent({
  name: 'AtomNavLink',
  props: {
    label: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: undefined,
    },
    to: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      default: undefined,
    },
    variant: {
      type: String as PropType<'ghost' | 'link'>,
      default: 'ghost',
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'md',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    click: (event: MouseEvent) => event instanceof MouseEvent,
  },
  setup(props, { emit, slots }) {
    function handleClick(event: MouseEvent) {
      emit('click', event)
    }

    return () => (
      <AtomButton
        variant={props.variant}
        size={props.size}
        href={props.href}
        to={props.to}
        onClick={handleClick}
        class={[
          'w-full items-center justify-between',
          props.active ? 'text-primary' : 'text-foreground',
          props.variant === 'link' ? 'px-3 py-2 font-normal' : 'px-3 py-2 font-medium',
        ]}
      >
        <span class="flex-1 text-left">{props.label}</span>
        {slots.trailing?.()}
      </AtomButton>
    )
  },
})
