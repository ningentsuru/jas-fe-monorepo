import { defineComponent, computed, type PropType } from 'vue'
import { AtomButton } from '../../'

export type HeroTarget = '_blank' | '_self' | '_parent' | '_top'
export type HeroAlign = 'left' | 'center' | 'right'

export interface OrganismHeroProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
  ctaHref?: string
  ctaTarget?: HeroTarget
  secondaryLabel?: string
  secondaryTo?: string
  secondaryHref?: string
  secondaryTarget?: HeroTarget
  align?: HeroAlign
  backgroundImage?: string
  backgroundVideo?: string
}

export const OrganismHero = defineComponent({
  name: 'OrganismHero',
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    subtitle: {
      type: String as PropType<string>,
      default: '',
    },
    ctaLabel: {
      type: String as PropType<string>,
      default: '',
    },
    ctaTo: {
      type: String as PropType<string>,
    },
    ctaHref: {
      type: String as PropType<string>,
      default: '',
    },
    ctaTarget: {
      type: String as PropType<HeroTarget>,
      default: '_self',
    },
    secondaryLabel: {
      type: String as PropType<string>,
      default: '',
    },
    secondaryTo: {
      type: String as PropType<string>,
    },
    secondaryHref: {
      type: String as PropType<string>,
      default: '',
    },
    secondaryTarget: {
      type: String as PropType<HeroTarget>,
      default: '_blank',
    },
    align: {
      type: String as PropType<HeroAlign>,
      default: 'center',
    },
    backgroundImage: {
      type: String as PropType<string>,
      default: '',
    },
    backgroundVideo: {
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const alignClasses = {
      left: 'text-left justify-start items-center',
      center: 'text-center justify-center items-center',
      right: 'text-right justify-end items-center',
    }

    const hasBackground = computed(() => {
      return !!props.backgroundImage || !!props.backgroundVideo
    })

    return () => (
      <section
        class={[
          'organism-hero relative flex min-h-150 w-full overflow-hidden',
          alignClasses[props.align],
        ]}
        data-testid="organism-hero"
      >
        {props.backgroundVideo && (
          <video
            poster={props.backgroundImage}
            autoplay
            muted
            loop
            playsinline
            class="absolute inset-0 -z-10 h-full w-full object-cover"
          >
            <source src={props.backgroundVideo} type="video/mp4" />
          </video>
        )}

        {hasBackground.value && (
          <div class="bg-background/60 dark:bg-background/80 absolute inset-0 backdrop-blur-[2px]" />
        )}

        <div class="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {props.title}
          </h1>

          {props.subtitle && (
            <p
              class={[
                'text-muted-foreground mx-auto max-w-2xl text-lg',
                props.align !== 'center' && 'mx-0',
              ]}
            >
              {props.subtitle}
            </p>
          )}

          {(props.ctaLabel || props.secondaryLabel) && (
            <div
              class={[
                'flex flex-wrap justify-center gap-4',
                props.align === 'left' && 'justify-start',
                props.align === 'right' && 'justify-end',
              ]}
            >
              {props.ctaLabel && (
                <AtomButton
                  to={props.ctaTo}
                  href={props.ctaHref}
                  target={props.ctaTarget}
                  variant="primary"
                  size="lg"
                  class="cursor-pointer"
                >
                  <span>{props.ctaLabel}</span>
                </AtomButton>
              )}

              {props.secondaryLabel && (
                <AtomButton
                  to={props.secondaryTo}
                  href={props.secondaryHref}
                  target={props.secondaryTarget}
                  variant="secondary"
                  size="lg"
                  class="cursor-pointer"
                >
                  <span>{props.secondaryLabel}</span>
                </AtomButton>
              )}
            </div>
          )}
        </div>
        <span class="sr-only">organism-hero</span>
      </section>
    )
  },
})

export default OrganismHero
