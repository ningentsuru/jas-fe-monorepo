<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle, Home } from '@lucide/vue'
import { Button } from '#ui/components/ui/button'

interface NuxtError {
  statusCode: number
  statusMessage: string
  message: string
  fatal: boolean
}

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)

function handleClearError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div
    class="bg-background animate-fade-in flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center"
  >
    <div
      class="bg-destructive/10 border-destructive/20 text-destructive inline-flex items-center justify-center rounded-2xl border p-4"
    >
      <AlertTriangle class="size-12" />
    </div>

    <div class="max-w-md space-y-2">
      <h1 class="text-foreground font-mono text-4xl font-black tracking-tight">
        {{ error?.statusCode || 500 }}
      </h1>

      <h2 class="text-foreground text-xl font-bold tracking-tight">
        {{ is404 ? 'Page Not Found' : 'An unexpected error occurred' }}
      </h2>

      <p class="text-muted-foreground text-sm leading-relaxed">
        {{
          is404
            ? 'The path you requested does not exist or has been shifted during an architectural migration update.'
            : error?.message || 'Internal server rendering crash context.'
        }}
      </p>
    </div>

    <Button
      type="button"
      variant="default"
      class="cursor-pointer font-semibold shadow-sm"
      @click="handleClearError"
    >
      <Home class="mr-2 size-4" />
      Back to Home
    </Button>
  </div>
</template>
