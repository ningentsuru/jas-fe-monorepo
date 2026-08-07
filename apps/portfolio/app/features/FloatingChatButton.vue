<script setup lang="ts">
import { MessageSquare, X } from '@lucide/vue'
import { Button } from '@repo/ui-vue/components/ui/button'

interface Props {
  isOpen: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <Button
    :class="[
      'bg-foreground text-background fixed right-2 z-49 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white shadow-2xl transition-all duration-300 hover:scale-105 md:right-6 md:bottom-6 md:h-14 md:w-14 dark:bg-zinc-100 dark:text-black',
      isOpen ? 'bottom-18' : 'bottom-2',
    ]"
    size="icon"
    aria-label="Toggle Assistant Chatbot"
    @click="$emit('toggle')"
  >
    <X v-if="isOpen" class="h-5 w-5 rotate-0 transition-transform duration-200 md:h-6 md:w-6" />
    <MessageSquare v-else class="h-5 w-5 transition-transform duration-200 md:h-6 md:w-6" />
  </Button>
</template>
