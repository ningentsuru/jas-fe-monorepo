import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  computed,
  Transition,
  type PropType,
} from 'vue'

export type WordSwapTransition =
  'fade' | 'slide-up' | 'slide-down' | 'scale-up' | 'scale-down' | 'blur' | 'flip'

export interface AtomWordSwapProps {
  words: string[]
  interval?: number
  transition?: WordSwapTransition
}

export default defineComponent({
  name: 'AtomWordSwap',
  props: {
    words: {
      type: Array as PropType<string[]>,
      default: () => ['Hello', 'World'],
    },
    interval: {
      type: Number,
      default: 2000,
    },
    transition: {
      type: String as PropType<WordSwapTransition>,
      default: 'fade',
    },
  },
  setup(props) {
    const currentIndex = ref(0)
    const key = ref(0)
    let timer: ReturnType<typeof setTimeout> | null = null
    let isUnmounted = false

    const maxWidth = computed(() => {
      if (!props.words.length) return '0ch'
      const longest = props.words.reduce((a, b) => (a.length > b.length ? a : b))
      return `${longest.length + 0.5}ch`
    })

    function swapWord() {
      if (isUnmounted || props.words.length <= 1) return

      key.value++
      currentIndex.value = (currentIndex.value + 1) % props.words.length

      if (!isUnmounted) {
        timer = setTimeout(swapWord, props.interval)
      }
    }

    onMounted(() => {
      timer = setTimeout(swapWord, props.interval)
    })

    onUnmounted(() => {
      isUnmounted = true
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    })

    return () => (
      <span
        class="atom-word-swap text-foreground font-display relative inline-block text-center font-medium transition-all duration-300 select-none"
        style={{ minWidth: maxWidth.value, height: '1.2em' }}
        data-testid="atom-word-swap"
      >
        <Transition
          enterActiveClass={`transition-${props.transition}-enter-active`}
          enterFromClass={`transition-${props.transition}-enter-from`}
          enterToClass={`transition-${props.transition}-enter-to`}
          leaveActiveClass={`transition-${props.transition}-leave-active`}
          leaveFromClass={`transition-${props.transition}-leave-from`}
          leaveToClass={`transition-${props.transition}-leave-to`}
        >
          <span
            key={key.value}
            class="absolute inset-0 flex items-center justify-center whitespace-nowrap"
          >
            {props.words[currentIndex.value]}
          </span>
        </Transition>
      </span>
    )
  },
})
