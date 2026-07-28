import { defineComponent, computed, type PropType } from 'vue'

export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'

export interface AtomInputProps {
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  id?: string
  name?: string
  type?: InputType
  ariaLabel?: string
}

export default defineComponent({
  name: 'AtomInput',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number] as PropType<'sm' | 'md' | 'lg' | 'xl' | number>,
      default: 'md',
    },
    id: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
    type: {
      type: String as PropType<InputType>,
      default: 'text',
    },
    ariaLabel: {
      type: String,
      default: undefined,
    },
  },
  emits: {
    'update:modelValue': () => true,
  },
  setup(props, { emit, slots, attrs }) {
    const inputClass = computed(() => {
      if (typeof props.size === 'number') {
        return 'px-4 text-base h-[var(--input-size)]'
      }

      const sizeClasses: Record<string, string> = {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base',
        lg: 'h-14 px-4 text-lg',
        xl: 'h-16 px-5 text-xl',
      }

      return sizeClasses[props.size] || sizeClasses.md
    })

    const inputStyle = computed(() => {
      if (typeof props.size === 'number') {
        return { '--input-size': `${props.size}px` }
      }
      return {}
    })

    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
    }

    return () => {
      const hasPrefix = !!slots.prefix
      const hasSuffix = !!slots.suffix

      return (
        <div class="atom-input-container font-display relative flex w-full items-center">
          {hasPrefix && (
            <div class="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
              {slots.prefix?.()}
            </div>
          )}

          <input
            {...attrs}
            id={props.id}
            name={props.name}
            type={props.type}
            data-testid="atom-input"
            value={props.modelValue}
            disabled={props.disabled}
            placeholder={props.placeholder}
            aria-invalid={props.error ? 'true' : undefined}
            aria-label={props.ariaLabel}
            style={inputStyle.value}
            onInput={handleInput}
            class={[
              'atom-input border-border bg-card text-card-foreground placeholder:text-muted-foreground/60 focus-visible:ring-ring focus-visible:ring-offset-background hc:border-2 block w-full rounded-md border shadow-sm transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[theme=high-contrast]:border-2',
              inputClass.value,
              props.error
                ? 'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50'
                : 'hover:bg-muted/20',
              hasPrefix ? 'pl-10' : '',
              hasSuffix ? 'pr-10' : '',
            ]}
          />

          {hasSuffix && (
            <div class="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
              {slots.suffix?.()}
            </div>
          )}
        </div>
      )
    }
  },
})
