<script setup lang="ts">
import { AtomButton } from '../../'

interface Props {
  label: string
  href?: string
  to?: string | Record<string, any>
  variant?: 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
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
    <span class="flex-1 text-left">{{ label }}</span>

    <slot name="trailing" />
  </AtomButton>
</template>
