import { defineComponent, computed, type PropType } from 'vue'
import { ChevronRight } from '@lucide/vue'
import { AtomIcon, AtomNavLink } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export const MoleculeNavAccordion = defineComponent({
  name: 'MoleculeNavAccordion',
  props: {
    item: {
      type: Object as PropType<NavItem>,
      required: true,
    },
    isOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  emits: {
    toggle: () => true,
    navigate: () => true,
  },
  setup(props, { emit }) {
    const menuId = computed(
      () => `accordion-menu-${props.item.label.toLowerCase().replace(/\s+/g, '-')}`,
    )

    function handleLinkClick(event: MouseEvent) {
      if (props.item.children) {
        event.preventDefault()
        event.stopPropagation()
        emit('toggle')
      } else {
        emit('navigate')
      }
    }

    return () => (
      <div class="molecule-nav-accordion font-display w-full" data-testid="molecule-nav-accordion">
        <AtomNavLink
          label={props.item.label}
          to={props.item.children ? undefined : props.item.href}
          variant="ghost"
          size="md"
          class="hover:bg-muted/60 w-full items-center justify-between rounded-md text-left font-medium transition-colors"
          aria-expanded={props.item.children ? props.isOpen : undefined}
          aria-controls={props.item.children ? menuId.value : undefined}
          onClick={handleLinkClick}
          v-slots={{
            trailing: () =>
              props.item.children && (
                <AtomIcon
                  icon={ChevronRight}
                  size="sm"
                  class={[
                    'text-muted-foreground transition-transform duration-200',
                    props.isOpen ? 'rotate-90' : 'rotate-0',
                  ]}
                />
              ),
          }}
        />

        <div
          id={menuId.value}
          class={[
            'grid overflow-hidden transition-all duration-200 ease-in-out',
            props.isOpen
              ? 'visible mt-1 grid-rows-[1fr] opacity-100'
              : 'invisible mt-0 grid-rows-[0fr] opacity-0',
          ]}
        >
          <div class="min-h-0">
            <div class="border-border ml-4 space-y-1 border-l-2 py-1 pr-1 pl-2">
              {props.item.children?.map((child) => (
                <AtomNavLink
                  key={child.label}
                  label={child.label}
                  to={child.href}
                  variant="link"
                  size="sm"
                  onClick={() => emit('navigate')}
                  class="w-full justify-start px-3 py-2 text-left font-normal"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  },
})

export default MoleculeNavAccordion
