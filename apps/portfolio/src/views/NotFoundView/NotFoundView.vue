<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerStyle = ref<{ height: string }>({ height: '100vh' })

const calculateHeight = () => {
  const header = document.querySelector('header')
  const footer = document.querySelector('footer')

  const headerHeight = header?.offsetHeight || 0
  const footerHeight = footer?.offsetHeight || 0

  const height = window.innerHeight - headerHeight - footerHeight

  containerStyle.value = { height: `${height}px` }
}

onMounted(() => {
  calculateHeight()

  window.addEventListener('resize', calculateHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateHeight)
})
</script>

<template>
  <div
    class="not-found-view flex w-full items-center justify-center"
    :style="containerStyle"
    data-testid="not-found-view"
  >
    <div class="text-center">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-xl">Not Found!</p>
    </div>
    <span class="sr-only">not-found-view</span>
  </div>
</template>
