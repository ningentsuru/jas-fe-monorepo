<script setup lang="ts">
import { computed, ref } from 'vue'
import { AtomIcon } from '../../'

type AtomIconProps = InstanceType<typeof AtomIcon>['$props']
type AllowedIconType = AtomIconProps['icon']
type QuadrantIconsTuple = [AllowedIconType, AllowedIconType, AllowedIconType, AllowedIconType]

type QuadrantKey = 'tl' | 'tr' | 'bl' | 'br'

interface Props {
  icons: QuadrantIconsTuple
  shape?: 'circle' | 'square'
  size?: 'sm' | 'md' | 'lg' | 'xl' | number
}

const props = withDefaults(defineProps<Props>(), {
  shape: 'circle',
  size: 'lg',
})

const activeQuadrant = ref<QuadrantKey | null>(null)

const sizeClass = computed(() => {
  if (typeof props.size === 'number') return 'h-[var(--quadrant-size)] w-[var(--quadrant-size)]'

  const sizeMap: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32',
  }
  return sizeMap[props.size as keyof typeof sizeMap] || sizeMap.lg
})

const componentStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { '--quadrant-size': `${props.size}px` }
  }
  return {}
})

const CLIPS = {
  tl: 'inset(0 50% 50% 0)',
  tr: 'inset(0 0 50% 50%)',
  bl: 'inset(50% 50% 0 0)',
  br: 'inset(50% 0 0 50%)',
} as const
</script>

<template>
  <div
    class="molecule-quadrant-icon bg-card relative inline-block overflow-hidden shadow-inner transition-colors duration-300"
    :class="[sizeClass, shape === 'circle' ? 'rounded-full' : 'rounded-none']"
    :style="componentStyle"
    data-testid="quadrant-icon"
    @mouseleave="activeQuadrant = null"
  >
    <div
      class="absolute inset-0 h-full w-full cursor-pointer transition-all duration-300 ease-out"
      :class="[
        activeQuadrant === 'tl' ? 'z-30 opacity-100' : '',
        activeQuadrant !== null && activeQuadrant !== 'tl' ? 'z-10 opacity-20' : 'z-10',
      ]"
      :style="{ clipPath: activeQuadrant === 'tl' ? 'inset(0 0 0 0)' : CLIPS.tl }"
      @mouseenter="activeQuadrant = 'tl'"
    >
      <AtomIcon
        :icon="props.icons[0]"
        :size="props.size"
        class="!absolute !inset-0 flex !h-full !w-full items-center justify-center"
      />
    </div>

    <div
      class="absolute inset-0 h-full w-full cursor-pointer transition-all duration-300 ease-out"
      :class="[
        activeQuadrant === 'tr' ? 'z-30 opacity-100' : '',
        activeQuadrant !== null && activeQuadrant !== 'tr' ? 'z-10 opacity-20' : 'z-10',
      ]"
      :style="{ clipPath: activeQuadrant === 'tr' ? 'inset(0 0 0 0)' : CLIPS.tr }"
      @mouseenter="activeQuadrant = 'tr'"
    >
      <AtomIcon
        :icon="props.icons[1]"
        :size="props.size"
        class="!absolute !inset-0 flex !h-full !w-full items-center justify-center"
      />
    </div>

    <div
      class="absolute inset-0 h-full w-full cursor-pointer transition-all duration-300 ease-out"
      :class="[
        activeQuadrant === 'bl' ? 'z-30 opacity-100' : '',
        activeQuadrant !== null && activeQuadrant !== 'bl' ? 'z-10 opacity-20' : 'z-10',
      ]"
      :style="{ clipPath: activeQuadrant === 'bl' ? 'inset(0 0 0 0)' : CLIPS.bl }"
      @mouseenter="activeQuadrant = 'bl'"
    >
      <AtomIcon
        :icon="props.icons[2]"
        :size="props.size"
        class="!absolute !inset-0 flex !h-full !w-full items-center justify-center"
      />
    </div>

    <div
      class="absolute inset-0 h-full w-full cursor-pointer transition-all duration-300 ease-out"
      :class="[
        activeQuadrant === 'br' ? 'z-30 opacity-100' : '',
        activeQuadrant !== null && activeQuadrant !== 'br' ? 'z-10 opacity-20' : 'z-10',
      ]"
      :style="{ clipPath: activeQuadrant === 'br' ? 'inset(0 0 0 0)' : CLIPS.br }"
      @mouseenter="activeQuadrant = 'br'"
    >
      <AtomIcon
        :icon="props.icons[3]"
        :size="props.size"
        class="!absolute !inset-0 flex !h-full !w-full items-center justify-center"
      />
    </div>

    <div
      class="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
      :class="activeQuadrant !== null ? 'opacity-0' : 'opacity-100'"
    >
      <div class="absolute top-1/2 left-0 h-[1px] w-full" />
      <div class="absolute top-0 left-1/2 h-full w-[1px]" />
    </div>
  </div>
</template>
