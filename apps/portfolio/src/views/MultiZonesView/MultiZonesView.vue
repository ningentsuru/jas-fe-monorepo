<script setup lang="ts">
import { MoleculeCard } from '@repo/ui-vue'
</script>

<template>
  <div class="multi-zones-view py-8" data-testid="multi-zones-view">
    <MoleculeCard title="Multi-Zones">
      <div class="flex flex-col gap-4 text-md leading-relaxed select-none">
        <p>
          In a multi-zone architecture within a monorepo, your Vue 3 Portfolio acts as the Host
          application (Main Zone), while your Next.js Morse Code app acts as a Microfrontend
          (Sub-Zone).
        </p>
        <p>
          To the end-user browsing your site, it looks and feels like a single, massive, seamless
          single-page application. However, behind the scenes, requests are being routed to two
          completely independent web servers running entirely different frontend frameworks.
        </p>

        <div class="flex flex-col gap-2 pt-2">
          <h4 class="font-display text-primary text-sm font-bold tracking-wider uppercase">
            Monorepo & Multi-Zone Blueprint:
          </h4>
          <pre
            class="bg-muted border-border/40 text-foreground overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-normal"
          >
                     ┌──────────────────────────────────────────┐
                     │          Vercel Edge Network             │
                     │  (Routing Mesh via proxy rewrites maps)  │
                     └────────────────────┬─────────────────────┘
                                          │
                 ┌────────────────────────┴────────────────────────┐
                 │                                                 │
   Path: / (All other paths)                         Path: /multi-zones-morse-code/*
                 ▼                                                 ▼
┌──────────────────────────────────┐             ┌──────────────────────────────────┐
│         Host Application         │             │          Microfrontend           │
│           (Main Zone)            │             │            (Sub-Zone)            │
│       Vue 3 / Portfolio App      │             │      Next.js Morse Code App      │
│        jas-fawn.vercel.app       │             │  jas-next-morse-code.vercel.app  │
└──────────────────────────────────┘             └──────────────────────────────────┘
                 │                                                 │
                 └─────────────── Shared Workspace ────────────────┘
                                  pnpm workspaces
              (Shared Tailwind v4 Tokens, Atomic Component Contracts)
          </pre>
        </div>

        <div class="flex flex-col gap-4 pt-2">
          <h4 class="font-display text-primary text-sm font-bold tracking-wider uppercase">
            Deep Dive: System Infrastructure Breakdown:
          </h4>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >1. The Monorepo Ecosystem (pnpm & Turborepo)</span
            >
            <p class="text-muted-foreground pl-4">
              Your codebase uses a unified monorepo structure driven by pnpm workspaces and
              Turborepo (<code class="bg-muted rounded px-1 font-mono text-[11px]">turbo.json</code
              >).
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>Shared Configurations:</strong> Instead of duplicating rules, compile targets
              like
              <code class="bg-muted rounded px-1 font-mono text-[11px]">tsconfig.json</code> inherit
              settings directly from a single authority package (<code
                class="bg-muted rounded px-1 font-mono text-[11px]"
                >packages/typescript-config</code
              >).
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>Design Token Symmetrical Mirroring:</strong> Your React package (<code
                class="bg-muted rounded px-1 font-mono text-[11px]"
                >@repo/ui-react</code
              >) and Vue package (<code class="bg-muted rounded px-1 font-mono text-[11px]"
                >@repo/ui-vue</code
              >) mirror each other using identical Tailwind CSS v4 design primitives. This ensures
              that typography metrics and colors look identical, regardless of whether a page is
              served by Vue or Next.js.
            </p>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >2. The Host Application Layer (Vue 3 / Vite Portfolio)</span
            >
            <p class="text-muted-foreground pl-4">
              The Vue 3 application sits at the top-level domain edge (<code
                class="bg-muted rounded px-1 font-mono text-[11px]"
                >/</code
              >). It handles the primary shell layout, bio pages, activity data trackers, and
              overall portfolio framing.
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>The Routing Gatekeeper:</strong> It uses a global proxy layout config file
              (<code class="bg-muted rounded px-1 font-mono text-[11px]">vercel.json</code>). This
              file instructs Vercel's edge CDN nodes to intercept traffic. If a user clicks an
              internal link heading to
              <code class="bg-muted rounded px-1 font-mono text-[11px]"
                >/multi-zones-morse-code/</code
              >, the host site halts local single-page route navigation and lets the edge server
              seamlessly proxy the request down to the React layer.
            </p>
          </div>

          <div class="flex flex-col gap-1.5">
            <span class="text-foreground font-mono font-bold"
              >3. The Microfrontend Sub-Zone Layer (Next.js Morse Code App)</span
            >
            <p class="text-muted-foreground pl-4">
              Your Next.js project is an isolated zone running the high-performance morse engine
              dashboard. It runs completely separated on its own build pipeline, making it an
              independent deployment unit.
            </p>
            <p class="text-muted-foreground pl-4">
              <strong>Path Prefix Engineering:</strong> Next.js is explicitly configured with
              <code class="bg-muted rounded px-1 font-mono text-[11px]">basePath</code> and
              <code class="bg-muted rounded px-1 font-mono text-[11px]">assetPrefix</code> set to
              <code class="bg-muted rounded px-1 font-mono text-[11px]"
                >/multi-zones-morse-code</code
              >. This tells the Next compiler that all generated static assets, chunks, scripts, and
              API routes must look for links under that directory string path name, preventing asset
              404 drops when accessed from the Vue domain.
            </p>
          </div>
        </div>

        <div class="border-border/40 grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <h4 class="font-display text-success text-sm font-bold tracking-wider uppercase">
              💎 Architectural Advantages:
            </h4>
            <ul class="text-muted-foreground flex list-disc flex-col gap-1.5 pl-4">
              <li>
                <strong>Ultimate Tech Agility:</strong> You are not locked into one framework. You
                can build ultra-tactile Morse signal loops in React using modern state patterns
                while maintaining your clean, high-performance profile layout scripts inside Vue 3.
              </li>
              <li>
                <strong>Isolated Blast Radiuses:</strong> If a developer makes a breaking syntax
                crash code deployment inside the Next.js Morse app, your primary Vue portfolio
                remains live, interactive, and completely unaffected.
              </li>
              <li>
                <strong>Blazing Fast Workspace Builds:</strong> Turborepo handles caching outputs.
                If you only adjust files inside the React sub-app, Turborepo completely skips
                typechecking or testing execution calls for your Vue applications.
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-2">
            <h4 class="font-display text-warning text-sm font-bold tracking-wider uppercase">
              ⚠️ Operational Blind Spots:
            </h4>
            <ul class="text-muted-foreground flex list-disc flex-col gap-1.5 pl-4">
              <li>
                <strong>Global State Barriers:</strong> Because they run on separate core framework
                loops, you cannot use native Vue Pinia stores or React Context states to pass
                variables side-by-side between zones. If you need them to share data in real-time,
                you must use browser-level storage channels like
                <code class="bg-muted rounded px-1 font-mono text-[11px]">localStorage</code>,
                Cookies, or the
                <code class="bg-muted rounded px-1 font-mono text-[11px]">BroadcastChannel</code>
                API.
              </li>
              <li>
                <strong>Initial Page Load Payload Cost:</strong> When a user transitions from the
                Vue portfolio pages into the Next.js sub-zone directory, the client browser must
                execute a full network chunk reload to boot up the React 19 runtime engine
                environment files, which incurs a one-time script loading asset cost.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MoleculeCard>
    <span class="sr-only">multi-zones-view</span>
  </div>
</template>
