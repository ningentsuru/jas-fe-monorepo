import { defineComponent } from 'vue'
import type { PropType } from 'vue'

export interface AtomTestProps {
  title?: string
  count?: number
  size?: string
}

export default defineComponent({
  name: 'AtomTest',
  props: {
    title: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: ''
    },
  },
  setup(props, { slots, attrs }) {
    return () => (
      <div
        {...attrs}
        class="atom-test"
        data-testid="atom-test"
      >
        { props.title }
        {slots.default?.()}
        <span class="sr-only">atom-test</span>
      </div>
    )
  }
})
