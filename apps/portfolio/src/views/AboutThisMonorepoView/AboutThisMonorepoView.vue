<script setup lang="ts">
import { MoleculeCard } from '@repo/ui-vue'
</script>

<template>
  <div class="about-this-monorepo-view py-8" data-testid="about-this-monorepo-view">
    <MoleculeCard title="This Monorepo">
      <div class="flex flex-col gap-6 text-md leading-relaxed select-none">
        <p>
          This repository is structured as a cutting-edge, high-performance frontend monorepo
          orchestrated by <strong>Turborepo</strong> and <strong>pnpm workspaces</strong>. It
          bridges two entirely distinct engineering ecosystems—React/Next.js and Vue 3/Nuxt—under a
          single, unified, and highly optimized build pipeline.
        </p>

        <div class="flex flex-col gap-2">
          <h4 class="font-display text-primary text-sm font-bold tracking-wider uppercase">
            Ecosystem Layout & Workspace Contracts:
          </h4>
          <pre
            class="bg-muted border-border/40 text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-normal"
          >
jas-fe-monorepo/
├── apps/
│   ├── portfolio/             # This Web Core (Vue 3 / Vite)
│   ├── next-morse-code/       # Telegraph Microfrontend Sub-Zone (React 19 / Next.js)
│   └── nuxt-weather/          # Forecast Microservice Module (Vue 3 / Nuxt 3)
├── packages/
│   ├── typescript-config/     # Centralized TS Blueprint Authority (base, vue configs)
│   ├── eslint-config/         # Shared Monorepo Linting Rule Definitions
│   ├── ui-vue/                # Shared Atomic Core Library (Atoms, Molecules, Organisms)
│   └── ui-react/              # Mirror-Matched Symmetrical React Core Library
├── turbo.json                 # Smart Build Orchestration Caching Matrix
├── pnpm-workspace.yaml        # Workspace Package Relationship Definitions
└── plopfile.cjs               # Framework-Aware Scaffolding Automation Engine
          </pre>
        </div>

        <div class="flex flex-col gap-4 pt-2">
          <h4 class="font-display text-primary text-sm font-bold tracking-wider uppercase">
            Monorepo Pillar Modules Explainer:
          </h4>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >1. Build Pipeline & Orchestration Core (Turborepo & pnpm)</span
            >
            <p class="text-muted-foreground pl-4">
              <strong>`turbo.json` Cache Matrix:</strong> Controls pipeline tasks natively (<code
                class="bg-muted rounded px-1 font-mono text-[11px]"
                >build</code
              >, <code class="bg-muted rounded px-1 font-mono text-[11px]">check-types</code>,
              <code class="bg-muted rounded px-1 font-mono text-[11px]">test:unit</code>,
              <code class="bg-muted rounded px-1 font-mono text-[11px]">test:e2e</code>). If code
              inside a sibling package does not alter its fingerprint, its compilation logs are
              replayed instantly from local machine artifacts, reducing build times.
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>`pnpm-workspace.yaml` Package Contracts:</strong> Drives strict package
              resolution boundaries, symlinking core internal modules directly into local workspace
              node pathways under high-security configuration parameters.
            </p>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >2. Microfrontend Core & Deployment Sub-Zones (The Multi-Zone Matrix)</span
            >
            <p class="text-muted-foreground pl-4">
              <strong>The Host Core (`apps/portfolio`):</strong> Built using a modular Vue 3
              Composition API setup. It owns the macro layout shells, asset pipelines, and view
              systems. It intercepts multi-zone parameters through its local edge router rules
              (<code class="bg-muted rounded px-1 font-mono text-[11px]">vercel.json</code>).
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>The Sub-Zone (`apps/next-morse-code`):</strong> An isolated microfrontend
              running React 19 and Next.js. It features complex, low-latency telegraph cascading
              calculations and is mapped underneath a customized asset prefix route, preventing
              network 404 code breaks when loaded via the primary site domain context.
            </p>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >3. Symmetrical Shared Packages Library (`packages/`)</span
            >
            <p class="text-muted-foreground pl-4">
              <strong>Prisitime Config Authority:</strong> Internal tools like
              <code class="bg-muted rounded px-1 font-mono text-[11px]"
                >@repo/typescript-config</code
              >
              pass standardized compiler configurations natively down to consumer projects. This
              ensures modern target configurations (like top-level ECMAScript execution parameters)
              are shared equally by compilers.
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>Atomic Component Contracts:</strong> Symmetrical component boundaries divide
              libraries (<code class="bg-muted rounded px-1 font-mono text-[11px]">ui-vue</code> and
              <code class="bg-muted rounded px-1 font-mono text-[11px]">ui-react</code>) into
              unified design tokens. By utilizing raw source code exports linked directly to
              application-tier <strong>Tailwind CSS v4</strong> layers, component interfaces render
              with perfect subpixel, pixel-matched spatial rendering tracking metrics.
            </p>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >4. Generation Automation Engine (`plopfile.cjs`)</span
            >
            <p class="text-muted-foreground pl-4">
              <strong>Framework-Aware Generators:</strong> An interactive CLI utility handles
              scaffolding. Running a single workspace execution command auto-detects destination
              folder targets. It creates component instances ending cleanly in
              <code class="bg-muted text-success rounded px-1 font-mono text-[11px]">.vue</code> or
              <code class="bg-muted text-primary rounded px-1 font-mono text-[11px]">.tsx</code>,
              generates corresponding Storybook design configurations, hooks up testing scripts, and
              appends reference code streams into library export indexes instantly.
            </p>
          </div>
        </div>
      </div>
    </MoleculeCard>
    <span class="sr-only">about-this-monorepo-view</span>
  </div>
</template>
