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

const dialogRef = ref<HTMLDialogElement | null>(null)

function toggleScrollLock(lock: boolean) {
  if (typeof document === 'undefined') return
  document.body.style.overflow = lock ? 'hidden' : ''
}

watch(
  () => props.show,
  async (newShow) => {
    await nextTick()
    if (!dialogRef.value) return

    if (newShow) {
      if (!dialogRef.value.open) {
        dialogRef.value.showModal()
        toggleScrollLock(true)
      }
    } else {
      if (dialogRef.value.open) {
        dialogRef.value.close()
        toggleScrollLock(false)
      }
    }
  },
)

watch(
  dialogRef,
  (el) => {
    if (el && props.show && !el.open) {
      el.showModal()
      toggleScrollLock(true)
    }
  },
  { immediate: true },
)

const handleCancel = (event: Event) => {
  event.preventDefault()
  emit('close')
}

onBeforeUnmount(() => {
  toggleScrollLock(false)
})
</script>

<template>
  <dialog
    ref="dialogRef"
    data-testid="molecule-modal"
    @cancel="handleCancel"
    class="molecule-modal border-border bg-card text-card-foreground open:animate-in open:fade-in open:zoom-in-95 open:slide-in-from-bottom-3 backdrop:animate-in backdrop:fade-in hc:border-2 hc:backdrop:bg-black/75 fixed inset-0 m-auto hidden w-full max-w-lg flex-col gap-6 rounded-lg border p-6 shadow-xl transition-[opacity,transform] duration-300 outline-none backdrop:bg-black/40 backdrop:transition-all backdrop:duration-300 open:flex data-[theme=high-contrast]:border-2 data-[theme=high-contrast]:backdrop:bg-black/75"
  >
    <header
      v-if="title || $slots.header"
      class="border-border flex items-center justify-between border-b pb-3"
    >
      <slot name="header">
        <h1 class="font-display text-card-foreground text-xl font-semibold tracking-tight">
          {{ title }}
        </h1>
      </slot>

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

    <main
      class="modal-body text-card-foreground/90 max-h-[65vh] flex-1 overflow-y-auto p-1 text-sm leading-relaxed"
    >
      <slot name="default" />
    </main>

    <footer
      v-if="$slots.footer"
      class="border-border flex flex-col-reverse justify-end gap-3 border-t pt-4 sm:flex-row"
    >
      <slot name="footer" />
    </footer>

    <span class="sr-only">molecule-modal screen anchor active</span>
  </dialog>
</template>
