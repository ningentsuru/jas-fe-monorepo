## 🚀 Building a Production-Ready Nuxt 4 + Next.js FSD Monorepo From Scratch

This comprehensive, end-to-end tutorial covers initializing a high-performance workspace, configuring a multi-framework atomic UI package catalog, setting up Feature-Sliced Design (FSD) architecture, mapping native subpath imports (#), and establishing fully automated component compilation layers.
------------------------------

## 📌 Architecture Philosophy Overview

- Turborepo orchestrates caching pipelines across applications.
- Feature-Sliced Design (FSD) divides business domains cleanly into strict structural layers (shared, entities, features, widgets, pages).
- Cross-Framework Synchronization isolates UI rendering engines while keeping matching property design rules.
- Native Subpath Imports (#) eliminate messy relative lookups (../../) and link components directly to source files—completely removing the need for annoying library watch terminals during local development.

---

## 🛠️ Step 1: Workspace Initialization

Initialize your Turborepo workspace using pnpm as your explicit project runner:

```
pnpm dlx create-turbo@latest
```

- Where would you like to create your workspace? portfolio-monorepo
- Which package manager do you want to use? pnpm

## Clean Slate Routines

Navigate into your project root folder and delete all default template apps and package folders to remove unnecessary baggage: [1]

cd portfolio-monorepo
rm -rf apps/* packages/*

Verify that your root pnpm-workspace.yaml accurately maps both core application layers:

# pnpm-workspace.yaml

```
packages:
- 'apps/*'
- 'packages/*'
```

---

## 📦 Step 2: Multi-Framework Shared Libraries Setup

We will create two independent layout package buckets inside your packages/ directory: @repo/ui-vue and @repo/ui-react.

## 1. Structure Configuration (packages/ui-vue/package.json)

```
{
  "name": "@repo/ui-vue",
  "version": "1.0.0",
  "type": "module",
  "sideEffects": ["src/style.css"],
  "exports": {
    ".": "./src/index.ts",
    "./style.css": "./src/style.css"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "vue": "^3.5.40",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 2. Structure Configuration (packages/ui-react/package.json)

```
{
  "name": "@repo/ui-react",
  "version": "1.0.0",
  "type": "module",
  "sideEffects": ["src/style.css"],
  "exports": {
    ".": "./src/index.ts",
    "./style.css": "./src/style.css"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0"
  }
}
```

## 3. Global Tailwind CSS Setup

Create your primary style configurations inside both packages (packages/ui-vue/src/style.css and packages/ui-react/src/style.css). We use Tailwind's modern @source scanner directive so parent applications can crawl and parse utility classes from our libraries cleanly: [2]

```
@import "tailwindcss";
/* Enforce compile scanners to parse both extensions seamlessly */@source "./**/*.vue";@source "./**/*.tsx";
```

## 4. Setup Public Entry Barrels (packages/ui-vue/src/index.ts)

```
export * from './atoms'export * from './molecules'
```

---

## 🏛️ Step 3: FSD Application Setups

Now we construct your two primary customer-facing viewports inside the apps/ workspace layer.

## Application 1: Nuxt 4 Portfolio Blueprint (apps/portfolio)

Nuxt 4 completely changes directory tracking. The frontend context lives strictly inside the app/ folder, while the Nitro server context stays at the project root level server/.

## 1. apps/portfolio/nuxt.config.ts Configuration

```
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4, // Enforces modern Nuxt 4 file routing structures
  },
  css: ['@repo/ui-vue/style.css'],
  alias: {
    '#entities': fileURLToPath(new URL('./app/entities', import.meta.url)),
    '#features': fileURLToPath(new URL('./app/features', import.meta.url)),
    '#widgets': fileURLToPath(new URL('./app/widgets', import.meta.url)),
    '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
    '#ui': fileURLToPath(new URL('../../packages/ui-vue/src', import.meta.url))
  }
})
```

## 2. Directory Map Compliance Layout

```
apps/portfolio/
┣ app/                          <--- Frontend Context Layer
┃ ┣ composables/                <--- Auto-imported across layers
┃ ┣ entities/chat/index.ts      <--- Public API Barrel Gatekeeper
┃ ┣ features/floating-chat/
┃ ┣ layouts/default.vue
┃ ┣ widgets/chat-box/index.ts
┃ ┣ pages/index.vue             <--- THIN wrapper routing directly to widgets
┃ ┣ app.vue
┃ ┗ error.vue
┣ server/api/chat/index.post.ts <--- Backend Nitro Endpoint (Grouped by Entity name)
┗ shared/types/contracts.ts     <--- Contextless Contracts (Shared safely between Client & Server)
```

---

## Application 2: Next.js App Router Morse Code Blueprint (apps/next-morse-code)

Next.js shifts absolute mapping routing layout hooks straight into TypeScript.

## 1. apps/next-morse-code/tsconfig.json Setup

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Preserve",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "#entities/*": ["./src/entities/*"],
      "#features/*": ["./src/features/*"],
      "#widgets/*": ["./src/widgets/*"],
      "#shared/*": ["./src/shared/*"],
      "#ui/*": ["../../packages/ui-react/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"]
}
```

## 2. Directory Map Compliance Layout

```
apps/next-morse-code/
┣ src/
┃ ┣ app/                        <--- Thin Next.js Layout/Page wrapper nodes only
┃ ┃ ┗ (default)/page.tsx        <--- Simply mounts <MorseDashboardWidget />
┃ ┣ shared/
┃ ┃ ┣ hooks/useAppTheme.ts
┃ ┃ ┗ utils/morseTranslator.ts
┃ ┣ entities/telegraph-reference/index.ts
┃ ┣ features/telegraph-controls/index.ts
┃ ┗ widgets/telegraph-dashboard/index.ts
```

---

## 🛠️ Step 4: Automated Workspace Code Builder Configuration

To enforce these strict design boundaries without repetitive boilerplate coding, we implement a centralized automated Plop.js orchestration engine at your workspace root.

## 1. Root Orchestrator Script Setup (plopfile.cjs)

```
const fs = require('fs')const path = require('path')

module.exports = function (plop) {
  plop.setHelper('eq', (a, b) => a === b)

  plop.setGenerator('component', {
    description: 'Create an FSD framework-aware component with stories and tests',
    prompts: async (inquirer) => {
      const basic = await inquirer.prompt([
        {
          type: 'list',
          name: 'folder',
          message: 'Select target workspace root:',
          choices: ['apps', 'packages'],
        },
        {
          type: 'input',
          name: 'componentName',
          message: 'What is the component name (PascalCase)?',
        },
        {
          type: 'confirm',
          name: 'hasProp',
          message: 'Does this component require props?',
          default: true,
        }
      ])

      const normalProps = []
      const modelProps = []

      if (basic.hasProp) {
        let addAnother = true
        while (addAnother) {
          const prop = await inquirer.prompt([
            {
              type: 'input',
              name: 'propName',
              message: 'Enter property name:',
            },
            {
              type: 'list',
              name: 'propType',
              message: 'Select property TypeScript type:',
              choices: ['string', 'number', 'boolean', 'object', 'array', 'function'],
              default: 'string',
            }
          ])

          const rawName = prop.propName
          const isModelMatched = /^model[A-Z]/.test(rawName)

          if (isModelMatched) {
            const baseSuffix = rawName.substring(5)
            const cleanVarName = baseSuffix.charAt(0).toLowerCase() + baseSuffix.slice(1)
            modelProps.push({ varName: cleanVarName, bindingName: cleanVarName, propType: prop.propType })
          } else {
            normalProps.push({ propName: rawName, propType: prop.propType })
          }

          const { addMore } = await inquirer.prompt({
            type: 'confirm',
            name: 'addMore',
            message: 'Add another prop?',
            default: false,
          })
          addAnother = addMore
        }
      }

      const hasAnyProps = normalProps.length > 0 || modelProps.length > 0
      return { ...basic, normalProps, modelProps, hasAnyProps }
    },
    actions: (data) => {
      // Dynamic rendering pipelines mapping to your .plop-templates location...
      return [
        {
          type: 'add',
          path: 'packages/ui-vue/src/atoms/{{pascalCase componentName}}/{{pascalCase componentName}}.vue',
          templateFile: '.plop-templates/component/vue/component.vue.hbs',
        },
        {
          type: 'add',
          path: 'packages/ui-vue/src/atoms/{{pascalCase componentName}}/{{pascalCase componentName}}.spec.ts',
          templateFile: '.plop-templates/component/vue/component.spec.ts.hbs',
        }
      ]
    }
  })
}
```

---

## 📄 Step 5: Code Templates Blueprint Suite

These template files reside inside your root .plop-templates/ directory to automatically construct framework-agnostic layers.

## 1. Master Vue Component Template (.plop-templates/component/vue/component.vue.hbs)

```
<script setup lang="ts">
/**
 * COMPILER MACROS
 **/
{{#if normalProps.length}}
interface Props {
  {{#each normalProps}}
  {{this.propName}}: {{#if (eq this.propType 'function')}}() => void{{else}}{{this.propType}}{{/if}}
  {{/each}}
}

const props = withDefaults(defineProps<Props>(), {
  {{#each normalProps}}
  {{this.propName}}: {{#if (eq this.propType 'string')}}''{{else if (eq this.propType 'number')}}0{{else if (eq this.propType 'boolean')}}false{{else if (eq this.propType 'object')}}() => ({}){{else}}() => []{{/if}}{{#unless @last}},{{/unless}}
  {{/each}}
})
{{/if}}

{{#if modelProps.length}}
// Modern Vue 3.5+ / Nuxt 4 named two-way bindings
{{#each modelProps}}
const {{this.varName}} = defineModel<{{this.propType}}>('{{this.bindingName}}')
{{/each}}
{{/if}}
</script>

<template>
  <div class="\{{kebabCase componentName}}" :data-testid="\{{kebabCase componentName}}">
    <slot />
  </div>
</template>
```

## 2. Master React Component Template (.plop-templates/component/react/component.tsx.hbs)

```
import React from 'react'

{{#if hasAnyProps}}
interface {{pascalCase componentName}}Props {
  {{#each normalProps}}
  {{this.propName}}?: {{#if (eq this.propType 'function')}}() => void{{else}}{{this.propType}}{{/if}}
  {{/each}}
  {{#each modelProps}}
  {{this.varName}}?: {{this.propType}}
  onUpdate{{pascalCase this.varName}}?: (value: {{this.propType}}) => void
  {{/each}}
}
{{/if}}

export default function {{pascalCase componentName}}({
  {{#each normalProps}}
  {{this.propName}} = {{#if (eq this.propType 'string')}}''{{else if (eq this.propType 'number')}}0{{else if (eq this.propType 'boolean')}}false{{else}}undefined{{/if}},
  {{/each}}
  {{#each modelProps}}
  {{this.varName}} = {{#if (eq this.propType 'string')}}''{{else if (eq this.propType 'number')}}0{{else if (eq this.propType 'boolean')}}false{{else}}undefined{{/if}},
  onUpdate{{pascalCase this.varName}} = () => {},
  {{/each}}
}: {{#if hasAnyProps}}{{pascalCase componentName}}Props{{else}}{}{{/if}}) {
  return (
    <div className="\{{kebabCase componentName}}" data-testid="\{{kebabCase componentName}}">
      <span className="sr-only">\{{kebabCase componentName}}</span>
    </div>
  )
}
```

## 3. Crash-Proof Vitest Spec Template (.plop-templates/component/react/component.spec.tsx.hbs)

```
import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import {{pascalCase componentName}} from './{{pascalCase componentName}}'
import { Default } from './{{pascalCase componentName}}.stories'

{{#if hasAnyProps}}
type {{pascalCase componentName}}Props = React.ComponentProps<typeof {{pascalCase componentName}}>

const getProps = (storyArgs: typeof Default.args): {{pascalCase componentName}}Props => {
  const parsedProps: Record<string, any> = {}

  // ✅ CRITICAL FALLBACK VALUE: Permanently prevents strict TS18048 optional args build crashes
  const args = storyArgs || {}

  {{#each normalProps}}
  if ('{{this.propName}}' in args) { parsedProps['{{this.propName}}'] = args['{{this.propName}}'] }
  {{/each}}

  {{#each modelProps}}
  if ('{{this.varName}}' in args) { parsedProps['{{this.varName}}'] = args['{{this.varName}}'] }
  if ('onUpdate{{pascalCase this.varName}}' in args) { parsedProps['onUpdate{{pascalCase this.varName}}'] = args['onUpdate{{pascalCase this.varName}}'] }
  {{/each}}

  return parsedProps as {{pascalCase componentName}}Props
}
{{/if}}

describe('{{pascalCase componentName}}', () => {
  it('renders properly using Storybook args', () => {
    const props = {{#if hasAnyProps}}getProps(Default.args){{else}}Default.args || {}{{/if}}
    render(<{{pascalCase componentName}} {...props} />)
    expect(screen.getByTestId('\{{kebabCase componentName}}')).toBeDefined()
  })
})
```

---

## 🏁 Step 6: Real-Time Development Workspace Verification Scripts

Because our layer aliases point directly to uncompiled project source configurations (/src), you can safely run code changes without spending compute cycles rebuilding packages continuously.
Add this caching sanitation command array to your root package.json scripts list to keep local cache structures pristine:

```
"scripts": {
  "dev": "turbo run dev",
  "build": "turbo run build",
  "clean": "rm -rf .turbo node_modules/.cache apps/*/.nuxt apps/*/.next packages/*/dist && pnpm install"
}
```

Whenever you run into any cached state errors inside your terminal environment, execute this command to instantly restore perfect type safety across all your FSD architectural segments:

```
pnpm run clean
```

If you'd like, let me know if you want to explore setting up automated path linting rules via ESLint boundaries to prevent layers from accidentally importing each other, or if you are ready to start coding your portfolio page layouts!

[1] [https://pigweed.dev](https://pigweed.dev/pw_system/)
[2] [https://www.assistant-ui.com](https://www.assistant-ui.com/docs/ui/streamdown)
