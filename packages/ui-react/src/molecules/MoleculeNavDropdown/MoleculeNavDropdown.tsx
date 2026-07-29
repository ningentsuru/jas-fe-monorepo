import { defineComponent, ref, type PropType } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { AtomButton, AtomIcon, AtomNavLink } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export const MoleculeNavDropdown = defineComponent({
  name: 'MoleculeNavDropdown',
  props: {
    item: {
      type: Object as PropType<NavItem>,
      required: true,
    },
    index: {
      type: Number as PropType<number>,
      required: true,
    },
    isOpen: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: {
    toggle: (index: number) => typeof index === 'number',
    navigate: () => true,
  },
  setup(props, { emit }) {
    const isHovered = ref(false)

    return () => (
      <div
        class="molecule-nav-dropdown group font-display relative focus-within:relative"
        data-testid="molecule-nav-dropdown"
        onMouseenter={() => {
          isHovered.value = true
        }}
        onMouseleave={() => {
          isHovered.value = false
        }}
      >
        <AtomButton
          variant="ghost"
          size="sm"
          to={props.item.children ? undefined : props.item.href}
          onClick={(e: MouseEvent) => {
            e.stopPropagation()
            if (props.item.children) {
              emit('toggle', props.index)
            }
          }}
          class="inline-flex cursor-pointer items-center gap-1 px-3 py-2 font-medium hover:bg-transparent"
        >
          <span class="text-foreground hover:text-primary transition-colors">
            {props.item.label}
          </span>
          {props.item.children && (
            <AtomIcon
              icon={ChevronDown}
              size="sm"
              class={[
                'transition-transform duration-200',
                props.isOpen ? 'rotate-180' : 'group-hover:rotate-180',
              ]}
            />
          )}
        </AtomButton>

        {props.item.children && (
          <div
            class={[
              'absolute top-full left-0 z-50 mt-2 w-48 origin-top-left transition-all duration-200 ease-out focus-within:visible focus-within:scale-100 focus-within:opacity-100',
              props.isOpen || isHovered.value
                ? 'visible scale-100 opacity-100'
                : 'invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100',
            ]}
          >
            <div class="border-border bg-card overflow-hidden rounded-md border shadow-lg ring-1 ring-black/5">
              <div class="flex flex-col gap-1 p-1">
                {props.item.children.map((child) => (
                  <AtomNavLink
                    key={child.label}
                    label={child.label}
                    to={child.href}
                    variant="ghost"
                    size="sm"
                    class="px-4 py-2"
                    onClick={() => emit('navigate')}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
})

export default MoleculeNavDropdown
