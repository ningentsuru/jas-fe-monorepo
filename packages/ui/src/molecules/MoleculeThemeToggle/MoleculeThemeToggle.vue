<script setup lang="ts">
import { ref, watch } from 'vue'
import { MoleculeModal, AtomToggle, AtomSelect, AtomButton } from '../../'
import { Sun, Moon } from '@lucide/vue'

interface Props {
  isToggled: boolean
  currentTheme: 'light' | 'dark' | 'forest' | 'midnight'
}

const props = withDefaults(defineProps<Props>(), {
  isToggled: false,
  size: 'sm',
  currentTheme: 'light',
})

const emit = defineEmits(['toggle', 'longToggle', 'setTheme'])
const showModal = ref<boolean>(false)
const optionTheme = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Forest',
    value: 'forest',
  },
  {
    label: 'Ocean',
    value: 'ocean',
  },
  {
    label: 'Sunset',
    value: 'sunset',
  },
  {
    label: 'High-contrast',
    value: 'high-contrast',
  },
]

const selectedTheme = ref<string>('')

function modalToggle() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleSubmit() {
  emit('setTheme', selectedTheme.value)
  closeModal()
}

watch(
  () => props.currentTheme,
  (theme) => {
    selectedTheme.value = theme
  },
  { immediate: true },
)
</script>

<template>
  <div class="molecule-theme-toggle" data-testid="molecule-theme-toggle">
    <AtomToggle
      :icon="isToggled ? Moon : Sun"
      :is-toggled="isToggled"
      size="md"
      @toggle="emit('toggle')"
      @long-toggle="modalToggle"
    />

    <span class="sr-only">molecule-theme-toggle</span>
  </div>

  <Teleport to="body">
    <div
      v-if="showModal"
      class="bg-background/50 fixed inset-0 z-50 flex items-center justify-center"
      @click="closeModal"
    >
      <div @click.stop>
        <MoleculeModal
          title="Select more themes"
          :show="showModal"
          @close="closeModal"
          class="bg-background text-foreground border-foreground relative z-50 w-full max-w-md rounded-lg border p-6 shadow-xl"
        >
          <form class="flex justify-between" @submit.prevent="handleSubmit">
            <AtomSelect v-model="selectedTheme" :options="optionTheme" class="cursor-pointer" />
            <AtomButton size="sm" class="cursor-pointer" type="submit">Submit</AtomButton>
          </form>
        </MoleculeModal>
      </div>
    </div>
  </Teleport>
</template>
