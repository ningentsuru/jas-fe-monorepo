import { defineComponent, ref, computed, onMounted, onUnmounted, watch, type PropType } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'
import { AtomButton, AtomIcon } from '../../'

export interface CarouselItem {
  id: string | number
  image?: string
  title?: string
  description?: string
  alt?: string
}

export default defineComponent({
  name: 'MoleculeCarousel',
  props: {
    items: {
      type: Array as PropType<CarouselItem[]>,
      default: () => [],
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 4000,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    change: (activeIndex: number) => typeof activeIndex === 'number',
  },
  setup(props, { emit }) {
    const activeIndex = ref(0)
    let timer: ReturnType<typeof setInterval> | null = null

    const canNext = computed(() => props.loop || activeIndex.value < props.items.length - 1)
    const canPrev = computed(() => props.loop || activeIndex.value > 0)

    function next() {
      if (!props.items.length) return
      if (activeIndex.value < props.items.length - 1) {
        activeIndex.value++
      } else if (props.loop) {
        activeIndex.value = 0
      }
    }

    function prev() {
      if (!props.items.length) return
      if (activeIndex.value > 0) {
        activeIndex.value--
      } else if (props.loop) {
        activeIndex.value = props.items.length - 1
      }
    }

    function goTo(index: number) {
      if (index >= 0 && index < props.items.length) {
        activeIndex.value = index
      }
    }

    function startAutoPlay() {
      stopAutoPlay()
      if (!props.autoPlay || props.items.length <= 1) return
      timer = setInterval(next, props.interval)
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft' && canPrev.value) {
        event.preventDefault()
        prev()
      } else if (event.key === 'ArrowRight' && canNext.value) {
        event.preventDefault()
        next()
      }
    }

    watch(activeIndex, (newIndex) => {
      emit('change', newIndex)
    })

    watch(
      () => props.autoPlay,
      (newVal) => {
        if (newVal) startAutoPlay()
        else stopAutoPlay()
      },
    )

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return () => (
      <div
        class="molecule-carousel font-display border-border bg-card text-card-foreground relative w-full overflow-hidden rounded-xl border shadow-sm"
        data-testid="molecule-carousel"
        onKeydown={handleKeyDown}
        onMouseenter={stopAutoPlay}
        onMouseleave={startAutoPlay}
        onFocusin={stopAutoPlay}
        onFocusout={startAutoPlay}
        tabindex={0}
        role="region"
        aria-label="Content Carousel"
      >
        <div
          class="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex.value * 100}%)` }}
          data-testid="carousel-track"
        >
          {props.items.map((item, index) => (
            <div
              key={item.id}
              class="relative flex aspect-video min-h-75 w-full shrink-0 items-center justify-center overflow-hidden"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${props.items.length}`}
              aria-hidden={index !== activeIndex.value}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.alt || item.title || 'Carousel background asset image'}
                  class="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}

              {(item.title || item.description) && (
                <div class="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 pt-20 text-white">
                  {item.title && (
                    <h3 class="text-xl font-bold tracking-tight md:text-2xl">{item.title}</h3>
                  )}
                  {item.description && (
                    <p class="max-w-2xl text-sm leading-relaxed opacity-90">{item.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {props.items.length > 1 && (
          <>
            {canPrev.value && (
              <AtomButton
                variant="ghost"
                size="sm"
                class="bg-background/30 hover:bg-background/80 text-foreground absolute top-1/2 left-4 -translate-y-1/2 rounded-full p-2 shadow backdrop-blur-sm"
                onClick={prev}
                aria-label="Previous slide"
                data-testid="prev-btn"
              >
                <AtomIcon icon={ChevronLeft} size="md" />
              </AtomButton>
            )}

            {canNext.value && (
              <AtomButton
                variant="ghost"
                size="sm"
                class="bg-background/30 hover:bg-background/80 text-foreground absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 shadow backdrop-blur-sm"
                onClick={next}
                aria-label="Next slide"
                data-testid="next-btn"
              >
                <AtomIcon icon={ChevronRight} size="md" />
              </AtomButton>
            )}

            <div
              class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
              data-testid="carousel-indicators"
            >
              {props.items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  class={[
                    'h-2 cursor-pointer rounded-full transition-all duration-300 outline-none',
                    index === activeIndex.value
                      ? 'bg-primary w-6'
                      : 'bg-muted-foreground/40 hover:bg-muted-foreground/70 w-2',
                  ]}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex.value ? 'true' : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </>
        )}

        <span class="sr-only">molecule-carousel</span>
      </div>
    )
  },
})
