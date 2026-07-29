<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue'
import { MoleculeModal, AtomToggle, AtomSelect, AtomButton } from '../../'
import { Sun, Moon, Palette, LoaderPinwheel } from '@lucide/vue'

interface Props {
  isToggled: boolean
  currentTheme: 'light' | 'dark' | 'forest' | 'midnight' | 'ocean' | 'sunset' | 'high-contrast'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
  icon?: Component
}

const props = withDefaults(defineProps<Props>(), {
  isToggled: false,
  size: 'md',
  currentTheme: 'light',
})

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'longToggle'): void
  (e: 'setTheme', theme: string): void
}>()

const showModal = ref<boolean>(false)

const optionTheme = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Forest', value: 'forest' },
  { label: 'Ocean', value: 'ocean' },
  { label: 'Sunset', value: 'sunset' },
  { label: 'High Contrast', value: 'high-contrast' },
]

const selectedTheme = ref<string>(props.currentTheme)

const getIcon = computed(() =>
  showModal.value
    ? LoaderPinwheel
    : !['light', 'dark'].includes(selectedTheme.value)
      ? Palette
      : props.isToggled
        ? Moon
        : Sun,
)

function modalToggle() {
  showModal.value = true
  emit('longToggle')
}

function closeModal() {
  showModal.value = false
}

function handleSubmit(event: Event) {
  event.preventDefault()
  emit('setTheme', selectedTheme.value)
  closeModal()
}

watch(
  () => props.currentTheme,
  (theme) => {
    selectedTheme.value = theme
  },
)
</script>

<template>
  <div class="theme-toggle-wrapper font-display">
    <div class="molecule-theme-toggle" data-testid="molecule-theme-toggle">
      <AtomToggle
        :class="[{ 'animate-spin [animation-duration:2s]': showModal === true }]"
        :icon="getIcon"
        :is-toggled="isToggled"
        :size="size"
        @toggle="emit('toggle')"
        @long-toggle="modalToggle"
      />
      <span class="sr-only">molecule-theme-toggle</span>
    </div>

    <Teleport to="body">
      <MoleculeModal
        title="Choose more themes!"
        :show="showModal"
        hide-close
        @close="closeModal"
        class="border-border bg-card text-card-foreground relative z-50 w-full max-w-md rounded-lg border p-6 shadow-xl"
      >
        <form class="flex flex-col justify-between gap-4" @submit.prevent="handleSubmit">
          <AtomSelect v-model="selectedTheme" :options="optionTheme" class="cursor-pointer" />
          <div class="flex justify-between gap-2">
            <AtomButton size="md" variant="primary" type="submit">
              <span>Apply</span>
            </AtomButton>
            <AtomButton size="md" variant="destructive" type="button" @click="closeModal">
              <span>Close</span>
            </AtomButton>
          </div>
        </form>
      </MoleculeModal>
    </Teleport>
  </div>
</template>
