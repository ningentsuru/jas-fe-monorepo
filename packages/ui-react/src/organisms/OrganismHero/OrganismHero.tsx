'use client'

import { useMemo } from 'react'
import { AtomButton } from '../../'

export type HeroTarget = '_blank' | '_self' | '_parent' | '_top'
export type HeroAlign = 'left' | 'center' | 'right'

export interface OrganismHeroProps {
  title?: string
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

export const OrganismHero = ({
  title = '',
  subtitle = '',
  ctaLabel = '',
  ctaTo,
  ctaHref = '',
  ctaTarget = '_self',
  secondaryLabel = '',
  secondaryTo,
  secondaryHref = '',
  secondaryTarget = '_blank',
  align = 'center',
  backgroundImage = '',
  backgroundVideo = '',
}: OrganismHeroProps) => {
  const alignClasses = {
    left: 'text-left justify-start items-center',
    center: 'text-center justify-center items-center',
    right: 'text-right justify-end items-center',
  }

  const hasBackground = useMemo(() => {
    return !!backgroundImage || !!backgroundVideo
  }, [backgroundImage, backgroundVideo])

  return (
    <section
      className={[
        'organism-hero relative flex min-h-150 w-full overflow-hidden',
        alignClasses[align],
      ]
        .filter(Boolean)
        .join(' ')}
      data-testid="organism-hero"
    >
      {backgroundVideo && (
        <video
          poster={backgroundImage}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          data-testid="hero-video"
        >
          <source src={backgroundVideo} type="video/mp4" data-testid="hero-video-source" />
        </video>
      )}

      {hasBackground && (
        <div
          className="bg-background/60 dark:bg-background/80 absolute inset-0 backdrop-blur-[2px]"
          data-testid="hero-overlay"
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <h1
          className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
          data-testid="hero-title"
        >
          {title}
        </h1>

        {subtitle && (
          <p
            data-testid="hero-subtitle"
            className={[
              'text-muted-foreground mx-auto max-w-2xl text-lg',
              align !== 'center' && 'mx-0',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {subtitle}
          </p>
        )}

        {(ctaLabel || secondaryLabel) && (
          <div
            className={[
              'flex flex-wrap justify-center gap-4',
              align === 'left' && 'justify-start',
              align === 'right' && 'justify-end',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {ctaLabel && (
              <AtomButton to={ctaTo} href={ctaHref} target={ctaTarget} variant="primary" size="lg">
                <span>{ctaLabel}</span>
              </AtomButton>
            )}

            {secondaryLabel && (
              <AtomButton
                to={secondaryTo}
                href={secondaryHref}
                target={secondaryTarget}
                variant="secondary"
                size="lg"
              >
                <span>{secondaryLabel}</span>
              </AtomButton>
            )}
          </div>
        )}
      </div>
      <span className="sr-only">organism-hero</span>
    </section>
  )
}

export default OrganismHero
