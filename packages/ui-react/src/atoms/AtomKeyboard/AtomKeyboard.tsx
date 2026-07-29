import { defineComponent } from 'vue'

export interface AtomKeyboardProps {
  character: string
}

export default defineComponent({
  name: 'AtomKeyboard',
  props: {
    character: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => (
      <kbd
        class="atom-keyboard bg-card border-border text-foreground rounded border px-1 font-mono shadow-sm"
        data-testid="atom-keyboard"
      >
        {props.character}
        <span class="sr-only">atom-keyboard</span>
      </kbd>
    )
  },
})
