import { defineComponent, computed, type PropType } from 'vue'

export interface OrganismFooterProps {
  title?: string
}

export const OrganismFooter = defineComponent({
  name: 'OrganismFooter',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props, { slots }) {
    const currentYear = computed(() => new Date().getFullYear())

    return () => (
      <footer
        class="organism-footer border-border bg-background mx-auto w-full border-t py-8"
        data-testid="organism-footer"
      >
        <div class="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          <div class="flex flex-col items-start gap-1">
            {props.title && (
              <h2 class="text-foreground text-lg font-semibold">
                {props.title}
              </h2>
            )}
            <p class="text-muted-foreground text-sm">
              &copy; {currentYear.value} All rights reserved.
            </p>
          </div>

          <div class="flex items-center gap-4 text-sm">
            {slots.default?.()}
          </div>
        </div>
        <span class="sr-only">organism-footer</span>
      </footer>
    )
  },
})

export default OrganismFooter
