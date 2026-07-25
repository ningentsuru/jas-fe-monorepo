<script setup lang="ts">
import { AtomButton } from '../../'

type target = '_blank' | '_self' | '_parent' | '_top'

interface Props {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
  ctaHref?: string
  ctaTarget?: target
  secondaryLabel?: string
  secondaryTo?: string
  secondaryHref?: string
  secondaryTarget?: target
  align?: 'left' | 'center' | 'right'
  backgroundImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  ctaLabel: '',
  ctaHref: '',
  ctaTarget: '_self',
  secondaryLabel: '',
  secondaryHref: '',
  secondaryTarget: '_blank',
  align: 'center',
  backgroundImage: '',
})

const alignClasses = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}
</script>

<template>
  <section
    class="organism-hero relative flex min-h-150 w-full items-center justify-center overflow-hidden"
    :class="alignClasses[align]"
    :style="
      backgroundImage
        ? `background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`
        : ''
    "
    data-testid="organism-hero"
  >
    <!-- Overlay for readability on images -->
    <div
      v-if="backgroundImage"
      class="bg-background/60 dark:bg-background/80 absolute inset-0 backdrop-blur-[2px]"
    />

    <!-- Content Container -->
    <div class="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
      <h1 class="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        {{ title }}
      </h1>

      <p
        v-if="subtitle"
        class="text-muted-foreground mx-auto max-w-2xl text-lg"
        :class="{ 'mx-0': align !== 'center' }"
      >
        {{ subtitle }}
      </p>

      <!-- Actions -->
      <div
        v-if="ctaLabel || secondaryLabel"
        class="flex flex-wrap justify-center gap-4"
        :class="{ 'justify-start': align === 'left', 'justify-end': align === 'right' }"
      >
        <AtomButton
          v-if="ctaLabel"
          :to="ctaTo"
          :href="ctaHref"
          :target="ctaTarget"
          variant="primary"
          size="lg"
          class="cursor-pointer"
        >
          <span>
            {{ ctaLabel }}
          </span>
        </AtomButton>

        <AtomButton
          v-if="secondaryLabel"
          :to="secondaryTo"
          :href="secondaryHref"
          :target="secondaryTarget"
          variant="secondary"
          size="lg"
          class="cursor-pointer"
        >
          <span>
            {{ secondaryLabel }}
          </span>
        </AtomButton>
      </div>
    </div>
    <span class="sr-only">organism-hero</span>
  </section>
</template>
