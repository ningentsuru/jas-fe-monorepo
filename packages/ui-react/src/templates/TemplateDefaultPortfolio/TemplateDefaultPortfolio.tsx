import { defineComponent } from 'vue'

export const TemplateDefaultPortfolio = defineComponent({
  name: 'TemplateDefaultPortfolio',
  setup(_props, { slots }) {
    return () => (
      <div
        class="template-default-portfolio flex min-h-dvh flex-col"
        data-testid="template-default-portfolio"
      >
        {slots.header?.()}

        <div class="flex min-h-0 w-full flex-1 flex-col">
          {slots.default?.()}
        </div>

        {slots.footer?.()}
        <span class="sr-only">template-default-portfolio</span>
      </div>
    )
  },
})

export default TemplateDefaultPortfolio
