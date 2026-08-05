<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { Loader } from '@lucide/vue'
import { AtomIcon } from '../../'

interface Props {
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const showContent = ref(!props.isLoading)
const isFullyOpaque = ref(!props.isLoading)

let delayTimer: ReturnType<typeof setTimeout> | null = null
let frameTimer: ReturnType<typeof setTimeout> | null = null

function clearActiveTimers() {
  if (delayTimer) clearTimeout(delayTimer)
  if (frameTimer) clearTimeout(frameTimer)
}

watch(
  () => props.isLoading,
  (newLoading) => {
    clearActiveTimers()

    if (!newLoading) {
      delayTimer = setTimeout(() => {
        showContent.value = true

        frameTimer = setTimeout(() => {
          isFullyOpaque.value = true
        }, 20)
      }, 500)
    } else {
      isFullyOpaque.value = false
      showContent.value = false
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  clearActiveTimers()
})
</script>

<template>
  <header class="bg-bacgkround/40 sticky top-0 z-50 flex h-15 p-2 backdrop-blur-xl">
    <nav
      class="border-border bg-muted mx-auto flex flex-1 items-center rounded-full border-2 px-5 py-1 shadow-lg transition-all duration-1000 ease-in-out"
      :class="[
        isLoading
          ? 'max-w-10 justify-center'
          : 'max-w-sm justify-between sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl',
      ]"
    >
      <template v-if="showContent">
        <div
          class="flex w-full items-center justify-between transition-opacity duration-1000 ease-in-out"
          :class="[isFullyOpaque ? 'opacity-100' : 'opacity-0']"
        >
          <slot name="branding" />
          <div class="flex items-center gap-2">
            <slot name="navigation" />
            <slot name="theme-toggle" />
          </div>
        </div>
      </template>

      <AtomIcon
        v-if="isLoading"
        class="text-muted-foreground animate-spin [animation-duration:2s]"
        :icon="Loader"
        size="md"
      />
    </nav>
  </header>
</template>
