<script setup lang="ts">
import { ref, watch, nextTick, onBeforeUnmount } from 'vue'

interface Props {
  title?: string
  show: boolean
  hideClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  show: false,
  hideClose: false,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Template DOM reference for executing platform dialog layout mutations
const dialogRef = ref<HTMLDialogElement | null>(null)

/**
 * Handles toggling the native browser dialog subsystem.
 * Using .showModal() registers deep accessibility focus traps and systemic backdrop filters.
 */
watch(
  () => props.show,
  async (newShow) => {
    await nextTick()
    if (!dialogRef.value) return

    if (newShow) {
      if (!dialogRef.value.open) {
        dialogRef.value.showModal()
        document.body.style.overflow = 'hidden' // Trap main canvas background scrolling
      }
    } else {
      if (dialogRef.value.open) {
        dialogRef.value.close()
        document.body.style.overflow = '' // Restore native layout viewport behavior
      }
    }
  },
  { immediate: true },
)

// Intercept physical hardware escape key events to synchronize global framework data states
const handleCancel = (event: Event) => {
  event.preventDefault()
  emit('close')
}

// Ensure proper runtime memory safety cleanup if component unmounts mid-lifecycle
onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <dialog
    ref="dialogRef"
    data-testid="molecule-modal"
    @cancel="handleCancel"
    class="molecule-modal /* Open Animations (Replaces custom @keyframes scale) */ open:animate-in open:fade-in open:zoom-in-95 open:slide-in-from-bottom-3 /* System Backdrop handling & Blurring Configuration */ backdrop:animate-in backdrop:fade-in /* High Contrast Fallback Strategy (Overrides background/blur for WCAG compliance) */ hc:border-2 hc:backdrop:bg-black/75 hc:backdrop:backdrop-blur-none border-border bg-card text-card-foreground fixed inset-0 m-auto flex w-full max-w-lg flex-col gap-6 rounded-lg border p-6 shadow-xl outline-none backdrop:bg-black/40 backdrop:backdrop-blur-sm backdrop:duration-250 backdrop:ease-out open:duration-250 open:ease-out data-[theme=high-contrast]:border-2 data-[theme=high-contrast]:backdrop:bg-black/75 data-[theme=high-contrast]:backdrop:backdrop-blur-none"
  >
    <!-- Modal Structural Header Area -->
    <header
      v-if="title || $slots.header"
      class="border-border flex items-center justify-between border-b pb-3"
    >
      <slot name="header">
        <h1 class="font-display text-card-foreground text-xl font-semibold tracking-tight">
          {{ title }}
        </h1>
      </slot>

      <!-- Native Accessible Action Dismissal System Controller -->
      <button
        v-if="!hideClose"
        type="button"
        class="text-muted-foreground hover:text-card-foreground focus-visible:ring-ring focus-visible:ring-offset-card cursor-pointer rounded-md p-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="Close modal"
        @click="emit('close')"
      >
        <span aria-hidden="true" class="text-lg font-bold">✕</span>
      </button>
    </header>

    <!-- Core Scrollable Data Component Container -->
    <main
      class="modal-body text-card-foreground/90 max-h-[65vh] flex-1 overflow-y-auto p-1 text-sm leading-relaxed"
    >
      <slot name="default" />
    </main>

    <!-- Action Pipeline Trigger Footer Slot Alignment Grid -->
    <footer
      v-if="$slots.footer"
      class="border-border flex flex-col-reverse justify-end gap-3 border-t pt-4 sm:flex-row"
    >
      <slot name="footer" />
    </footer>

    <!-- Assistive Text Node Layer for Layout Tree Optimization -->
    <span class="sr-only">molecule-modal screen anchor active</span>
  </dialog>
</template>
