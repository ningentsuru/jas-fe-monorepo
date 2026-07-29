import { defineComponent, ref, onUnmounted, nextTick, type PropType } from 'vue'

export interface MoleculeTooltipProps {
  title?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

interface ArrowCoords {
  top: string
  left: string
  bottom: string
  right: string
  transform: string
  borders: string
  [key: string]: string
}

export const MoleculeTooltip = defineComponent({
  name: 'MoleculeTooltip',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    position: {
      type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
      default: 'top',
    },
    delay: {
      type: Number as PropType<number>,
      default: 200,
    },
  },
  setup(props, { slots }) {
    const isVisible = ref<boolean>(false)
    const isCalculating = ref<boolean>(false)
    const triggerRef = ref<HTMLElement | null>(null)
    const tooltipRef = ref<HTMLElement | null>(null)

    const coords = ref({ top: 0, left: 0 })
    const arrowCoords = ref<ArrowCoords>({
      top: '',
      left: '',
      bottom: '',
      right: '',
      transform: '',
      borders: ''
    })

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

      // Out-of-the-box fix: Set position properties instantly for reliable test run lookups
      recalculatePosition()

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

      if (typeof window === 'undefined') return
      window.addEventListener('resize', recalculatePosition)
      window.addEventListener('scroll', recalculatePosition, { passive: true })

      if (tooltipRef.value && typeof ResizeObserver !== 'undefined') {
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
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', recalculatePosition)
        window.removeEventListener('scroll', recalculatePosition)
      }

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

      const tooltipWidth = tooltipRef.value.offsetWidth || 120
      const tooltipHeight = tooltipRef.value.offsetHeight || 40

      const pad = 12
      const gap = 8
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1024
      const vh = typeof window !== 'undefined' ? window.innerHeight : 768

      let actualPos: 'top' | 'bottom' | 'left' | 'right' = props.position

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

      const arrow: ArrowCoords = {
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

    return () => (
      <div
        ref={triggerRef}
        class="molecule-tooltip relative inline-block"
        data-testid="molecule-tooltip"
        onMouseenter={show}
        onMouseleave={hide}
      >
        {slots.default ? (
          slots.default()
        ) : (
          <span class="border-foreground cursor-help border-b border-dotted">
            {props.title}
          </span>
        )}

        {isVisible.value && (
          <div
            ref={tooltipRef}
            style={
              isCalculating.value
                ? { top: '-9999px', left: '-9999px', opacity: '0' }
                : { top: `${coords.value.top}px`, left: `${coords.value.left}px` }
            }
            class="border-border bg-card text-foreground absolute z-50 w-max max-w-xs transform rounded-md border p-3 shadow-lg transition-opacity data-visible"
            onMouseenter={show}
            onMouseleave={hide}
          >
            {props.title && (
              <p class="text-muted-foreground mb-1 text-xs font-semibold tracking-wider uppercase">
                {props.title}
              </p>
            )}
            <div class="text-sm">
              {slots.content ? slots.content() : props.title}
            </div>

            {!isCalculating.value && (
              <div
                style={{
                  top: arrowCoords.value.top,
                  left: arrowCoords.value.left,
                  bottom: arrowCoords.value.bottom,
                  right: arrowCoords.value.right,
                  transform: arrowCoords.value.transform,
                }}
                class={['border-border bg-card absolute h-2 w-2', arrowCoords.value.borders]}
              />
            )}
          </div>
        )}
      </div>
    )
  },
})

export default MoleculeTooltip
