import { defineComponent, type PropType } from 'vue'
import { OrganismNavigation } from '../../'

export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

export const OrganismHeader = defineComponent({
  name: 'OrganismHeader',
  props: {
    navItems: {
      type: Array as PropType<NavItem[]>,
      default: () => [],
    },
  },
  setup(props, { slots }) {
    return () => (
      <header class="border-border bg-card sticky top-0 z-50 h-16 w-full border-b">
        <div class="container mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          {slots.branding?.()}

          <div class="flex items-center justify-between gap-4">
            <OrganismNavigation items={props.navItems} />

            <div class="border-border border-l pl-4">
              {slots['theme-toggle']?.()}
            </div>
          </div>
        </div>
      </header>
    )
  },
})

export default OrganismHeader
