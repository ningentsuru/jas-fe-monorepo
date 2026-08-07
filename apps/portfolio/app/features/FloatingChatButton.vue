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
    class="fixed right-6 bottom-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-2xl transition-all duration-300 hover:scale-105 dark:bg-zinc-100 dark:text-black"
    size="icon"
    aria-label="Toggle Assistant Chatbot"
    @click="$emit('toggle')"
  >
    <X v-if="isOpen" class="h-6 w-6 rotate-0 transition-transform duration-200" />
    <MessageSquare v-else class="h-6 w-6 transition-transform duration-200" />
  </Button>
</template>
