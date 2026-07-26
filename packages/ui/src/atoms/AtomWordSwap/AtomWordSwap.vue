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
let isUnmounted = false // Flag to prevent state updates after unmount

const maxWidth = computed(() => {
  if (!props.words.length) return '0ch'
  const longest = props.words.reduce((a, b) => (a.length > b.length ? a : b))
  return `${longest.length + 0.5}ch`
})

function swapWord() {
  if (isUnmounted || props.words.length <= 1) return

  key.value++
  currentIndex.value = (currentIndex.value + 1) % props.words.length

  // Only schedule next tick if still mounted
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
    class="color-foreground relative inline-block text-center"
    :style="{ minWidth: maxWidth, height: '0.6em' }"
  >
    <Transition
      :enter-active-class="`transition-${transition}-enter-active`"
      :enter-from-class="`transition-${transition}-enter-from`"
      :enter-to-class="`transition-${transition}-enter-to`"
      :leave-active-class="`transition-${transition}-leave-active`"
      :leave-from-class="`transition-${transition}-leave-from`"
      :leave-to-class="`transition-${transition}-leave-to`"
    >
      <span :key="key" class="absolute inset-0 flex items-center justify-center">
        {{ words[currentIndex] }}
      </span>
    </Transition>
  </span>
</template>

<style scoped lang="css">
/* --- 1. Fade --- */
.transition-fade-enter-active,
.transition-fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.transition-fade-enter-from,
.transition-fade-leave-to {
  opacity: 0;
}

/* --- 2. Slide Up --- */
.transition-slide-up-enter-active,
.transition-slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.transition-slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.transition-slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* --- 3. Slide Down --- */
.transition-slide-down-enter-active,
.transition-slide-down-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.transition-slide-down-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.transition-slide-down-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* --- 4. Scale Up --- */
.transition-scale-up-enter-active,
.transition-scale-up-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.transition-scale-up-enter-from {
  opacity: 0;
  transform: scale(1);
}
.transition-scale-up-leave-to {
  opacity: 0;
  transform: scale(3);
}

/* --- 4. Scale Down --- */
.transition-scale-down-enter-active,
.transition-scale-down-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.transition-scale-down-enter-from {
  opacity: 0;
  transform: scale(3);
}
.transition-scale-down-leave-to {
  opacity: 0;
  transform: scale(1);
}

/* --- 5. Blur --- */
.transition-blur-enter-active,
.transition-blur-leave-active {
  transition: all 0.5s ease-in-out;
}
.transition-blur-enter-from,
.transition-blur-leave-to {
  opacity: 0;
  filter: blur(8px);
}

/* --- 6. Flip --- */
.transition-flip-enter-active,
.transition-flip-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
}
.transition-flip-enter-from {
  opacity: 0;
  transform: perspective(400px) rotateX(-90deg);
}
.transition-flip-leave-to {
  opacity: 0;
  transform: perspective(400px) rotateX(90deg);
}
</style>
