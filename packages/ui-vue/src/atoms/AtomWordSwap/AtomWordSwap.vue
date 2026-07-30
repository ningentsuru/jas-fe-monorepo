<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

interface Props {
  words: string[]
  interval?: number
  transition?: 'fade' | 'slide-up' | 'slide-down' | 'scale-up' | 'scale-down' | 'blur' | 'flip'
}

const props = withDefaults(defineProps<Props>(), {
  words: () => ['Hello', 'World'],
  interval: 2000,
  transition: 'fade',
})

const currentIndex = ref(0)
const key = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null
let isUnmounted = false

const maxWidth = computed(() => {
  if (!props.words.length) return '0ch'
  const longest = props.words.reduce((a, b) => (a.length > b.length ? a : b))
  return `${longest.length}ch`
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
</script>

<template>
  <span
    class="atom-word-swap text-foreground font-display relative inline-block text-center transition-all duration-300 select-none"
    :style="{ minWidth: maxWidth, height: '1.2em' }"
    data-testid="atom-word-swap"
  >
    <Transition
      :enter-active-class="`transition-${transition}-enter-active`"
      :enter-from-class="`transition-${transition}-enter-from`"
      :enter-to-class="`transition-${transition}-enter-to`"
      :leave-active-class="`transition-${transition}-leave-active`"
      :leave-from-class="`transition-${transition}-leave-from`"
      :leave-to-class="`transition-${transition}-leave-to`"
    >
      <span :key="key" class="absolute inset-0 flex items-center justify-center whitespace-nowrap">
        {{ words[currentIndex] }}
      </span>
    </Transition>
  </span>
</template>
