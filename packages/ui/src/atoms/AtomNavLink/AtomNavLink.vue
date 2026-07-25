<script setup lang="ts">
import { AtomButton } from '../../'

interface Props {
  label: string
  href?: string
  to?: string
  variant?: 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'md',
  active: false,
  href: undefined,
  to: undefined,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <AtomButton
    :variant="variant"
    :size="size"
    :href="href"
    :to="to"
    @click="emit('click', $event)"
    class="w-full items-center justify-between"
    :class="[
      active ? 'text-primary' : 'text-foreground',
      variant === 'link' ? 'px-3 py-2 font-normal' : 'px-3 py-2 font-medium',
    ]"
  >
    <!-- Left-aligned text label -->
    <span class="flex-1 text-left">{{ label }}</span>

    <!-- Slotted component content (such as chevrons) stays right-aligned -->
    <slot name="trailing" />
  </AtomButton>
</template>
