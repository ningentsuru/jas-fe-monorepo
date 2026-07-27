<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue'

interface Props {
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  position: 'top',
  delay: 200,
})

const isVisible = ref(false)
const isCalculating = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const coords = ref({ top: 0, left: 0 })
const arrowCoords = ref({ top: '', left: '', bottom: '', right: '', transform: '', borders: '' })

let timer: ReturnType<typeof setTimeout> | null = null
let resizeObserver: ResizeObserver | null = null
let rafId: number | null = null

onUnmounted(() => {
  cleanup()
})

function show() {
  if (timer) clearTimeout(timer)

  isCalculating.value = true
  isVisible.value = true

  nextTick(() => {
    recalculatePosition()
    isCalculating.value = false
    setupListeners()
  })
}

function hide() {
  destroyListeners()

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    isVisible.value = false
  }, props.delay)
}

function setupListeners() {
  destroyListeners()

  window.addEventListener('resize', recalculatePosition)
  window.addEventListener('scroll', recalculatePosition, { passive: true })

  if (tooltipRef.value) {
    resizeObserver = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        recalculatePosition()
      })
    })
    resizeObserver.observe(tooltipRef.value)
  }
}

function destroyListeners() {
  window.removeEventListener('resize', recalculatePosition)
  window.removeEventListener('scroll', recalculatePosition)

  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function cleanup() {
  if (timer) clearTimeout(timer)
  destroyListeners()
}

function recalculatePosition() {
  if (!triggerRef.value || !tooltipRef.value) return

  const trigger = triggerRef.value.getBoundingClientRect()

  const tooltipWidth = tooltipRef.value.offsetWidth
  const tooltipHeight = tooltipRef.value.offsetHeight

  const pad = 12
  const gap = 8
  const vw = window.innerWidth
  const vh = window.innerHeight

  let actualPos = props.position

  if (actualPos === 'left' || actualPos === 'right') {
    const fitsLeft = trigger.left - tooltipWidth - gap >= pad
    const fitsRight = trigger.right + tooltipWidth + gap <= vw - pad

    if (actualPos === 'left' && !fitsLeft) {
      actualPos = fitsRight ? 'right' : trigger.top - tooltipHeight - gap >= pad ? 'top' : 'bottom'
    } else if (actualPos === 'right' && !fitsRight) {
      actualPos = fitsLeft ? 'left' : trigger.top - tooltipHeight - gap >= pad ? 'top' : 'bottom'
    }
  }

  if (actualPos === 'top' && trigger.top - tooltipHeight - gap < pad) {
    actualPos = 'bottom'
  } else if (actualPos === 'bottom' && trigger.bottom + tooltipHeight + gap > vh - pad) {
    actualPos = 'top'
  }

  let idealLeft = 0
  let idealTop = 0

  if (actualPos === 'top' || actualPos === 'bottom') {
    idealLeft = trigger.left + (trigger.width - tooltipWidth) / 2
    idealTop = actualPos === 'top' ? trigger.top - tooltipHeight - gap : trigger.bottom + gap
  } else {
    idealLeft = actualPos === 'left' ? trigger.left - tooltipWidth - gap : trigger.right + gap
    idealTop = trigger.top + (trigger.height - tooltipHeight) / 2
  }

  if (idealLeft < pad) idealLeft = pad
  if (idealLeft + tooltipWidth > vw - pad) idealLeft = vw - tooltipWidth - pad

  if (idealTop < pad) idealTop = pad
  if (idealTop + tooltipHeight > vh - pad) idealTop = vh - tooltipHeight - pad

  coords.value = {
    left: idealLeft - trigger.left,
    top: idealTop - trigger.top,
  }

  const triggerCenterH = trigger.left + trigger.width / 2
  const triggerCenterV = trigger.top + trigger.height / 2

  const arrow = {
    top: '',
    left: '',
    bottom: '',
    right: '',
    transform: 'rotate(45deg)',
    borders: '',
  }

  if (actualPos === 'top' || actualPos === 'bottom') {
    arrow[actualPos === 'top' ? 'bottom' : 'top'] = '-4px'
    const arrowLeft = triggerCenterH - idealLeft - 4
    arrow.left = `${Math.max(8, Math.min(tooltipWidth - 16, arrowLeft))}px`
    arrow.borders = actualPos === 'top' ? 'border-r border-b' : 'border-l border-t'
  } else {
    arrow[actualPos === 'left' ? 'right' : 'left'] = '-4px'
    const arrowTop = triggerCenterV - idealTop - 4
    arrow.top = `${Math.max(8, Math.min(tooltipHeight - 16, arrowTop))}px`
    arrow.borders = actualPos === 'left' ? 'border-r border-t' : 'border-l border-b'
  }

  arrowCoords.value = arrow
}
</script>

<template>
  <div
    ref="triggerRef"
    class="molecule-tooltip relative inline-block"
    data-testid="molecule-tooltip"
    @mouseenter="show"
    @mouseleave="hide"
  >
    <slot>
      <span class="border-foreground cursor-help border-b border-dotted">
        {{ title }}
      </span>
    </slot>

    <transition
      :enter-active-class="isCalculating ? '' : 'transition duration-150 ease-out'"
      :enter-from-class="isCalculating ? '' : 'opacity-0 scale-95'"
      :enter-to-class="isCalculating ? '' : 'opacity-100 scale-100'"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :style="
          isCalculating
            ? { top: '-9999px', left: '-9999px', visibility: 'hidden' }
            : { top: `${coords.top}px`, left: `${coords.left}px` }
        "
        class="border-border bg-card text-foreground absolute z-50 w-max max-w-xs transform rounded-md border p-3 shadow-lg"
        @mouseenter="show"
        @mouseleave="hide"
      >
        <p
          v-if="title"
          class="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase"
        >
          {{ title }}
        </p>
        <div class="text-sm">
          <slot name="content">{{ title }}</slot>
        </div>

        <div
          v-if="!isCalculating"
          :style="{
            top: arrowCoords.top,
            left: arrowCoords.left,
            bottom: arrowCoords.bottom,
            right: arrowCoords.right,
            transform: arrowCoords.transform,
          }"
          :class="['border-border bg-card absolute h-2 w-2', arrowCoords.borders]"
        />
      </div>
    </transition>
  </div>
</template>
