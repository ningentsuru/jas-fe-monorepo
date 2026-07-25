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
})

const emit = defineEmits(['click'])
</script>

<template>
  <AtomButton
    :variant="variant"
    :size="size"
    :href="href"
    :to="to"
    @click="emit('click')"
    class="w-full justify-start"
    :class="[
      active ? 'text-primary' : 'text-foreground',
      variant === 'link' ? 'px-3 py-2 font-normal' : 'px-3 py-2 font-medium',
    ]"
  >
    <span class="block w-full text-left">{{ label }}</span>
  </AtomButton>
</template>
