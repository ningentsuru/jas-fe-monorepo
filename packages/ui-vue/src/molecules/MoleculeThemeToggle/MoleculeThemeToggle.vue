<script setup lang="ts">
import { ref, computed, watch, type Component } from 'vue'
import { AtomToggle } from '#/index'
import { Sun, Moon, Palette, LoaderPinwheel } from '@lucide/vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

type ThemeValues = 'light' | 'dark' | 'forest' | 'ocean' | 'sunset' | 'high-contrast'

interface Props {
  isToggled: boolean
  currentTheme: ThemeValues
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
  (e: 'setTheme', theme: ThemeValues): void
}>()

const showModal = ref<boolean>(false)

const optionTheme = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Forest', value: 'forest' },
  { label: 'Ocean', value: 'ocean' },
  { label: 'Sunset', value: 'sunset' },
  { label: 'High Contrast', value: 'high-contrast' },
] as const

const selectedTheme = ref<ThemeValues>(props.currentTheme)

const getIcon = computed(() => {
  if (showModal.value) return LoaderPinwheel
  if (props.currentTheme === 'dark') return Moon
  if (props.currentTheme === 'light') return Sun
  return Palette
})

function handleTapToggle() {
  emit('toggle')
  if (props.currentTheme === 'light') {
    emit('setTheme', 'dark')
    return
  }
  emit('setTheme', 'light')
}

function modalToggle() {
  showModal.value = true
  emit('longToggle')
}

function closeModal() {
  showModal.value = false
}

function handleApply() {
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
  <div
    class="molecule-theme-toggle inline-block"
    data-testid="molecule-theme-toggle"
    role="region"
    aria-label="Application Theme Configuration Toolbar"
  >
    <AtomToggle
      :class="[showModal && 'animate-spin [animation-duration:2s]']"
      :icon="getIcon"
      :is-toggled="isToggled"
      :size="size"
      aria-label="Toggle light and dark color layout variations"
      aria-haspopup="dialog"
      :aria-expanded="showModal"
      @toggle="handleTapToggle"
      @long-toggle="modalToggle"
    />

    <Dialog :open="showModal" @update:open="showModal = $event">
      <DialogContent aria-describedby="theme-dialog-description" data-testid="molecule-theme-modal">
        <DialogHeader>
          <DialogTitle>Choose more themes!</DialogTitle>
          <DialogDescription id="theme-dialog-description" class="flex flex-col gap-4 pt-2">
            <span>Select from custom tailored background contrast styles below:</span>

            <Select v-model="selectedTheme">
              <SelectTrigger class="w-full cursor-pointer" aria-label="Available color canvas theme templates">
                <SelectValue placeholder="Select a theme skin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="option in optionTheme"
                    :key="option.value"
                    :value="option.value"
                    class="cursor-pointer"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter class="gap-2">
          <Button
            class="cursor-pointer"
            size="sm"
            variant="outline"
            type="button"
            @click="closeModal"
          >
            Cancel
          </Button>
          <Button
            class="cursor-pointer"
            size="sm"
            variant="default"
            type="button"
            @click="handleApply"
          >
            Apply Theme
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
