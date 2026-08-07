### 📋 COPY AND PASTE THIS EXACT PROMPT INTO YOUR NEXT AI COLLABORATOR:

```text
Act as a Senior Nuxt 4 Architecture Engineer. Your objective is to build a hyper-optimized, zero-dependency, type-safe AI streaming chatbot module from scratch in a single response using modern TypeScript/JavaScript.

Apply these 4 strict architectural mandates to prevent compilation leaks and serverless boot crashes:
1. PURE DATA SEPARATION: Isolate the system instructions, variables, and raw prompt structures inside a standalone static data ledger file entirely decoupled from frontend components and styling utilities.
2. BACKEND STATELESSNESS: The serverless endpoint must be a pure execution channel that acts on incoming requests, applies an aggressive sliding context lookback (.slice(-4)) to preserve free-tier token allocations, and hand-rolls a native `TransformStream` formatting chunks to the strict Vercel AI Protocol format (`0:JSON_STRING_OF_TEXT\n`). It must use standard fetch, not $fetch, to prevent buffering.
3. CLIENT-SIDE HYDRATION PROTECTION: The main widget component must protect local storage reads within an `onMounted` lifecycle wrapper using a client-readiness confirmation flag to completely prevent Nuxt 4 Server-Side Rendering (SSR) hydration mismatches.
4. ABSOLUTE XSS PROTECTION & COMPLIANCE: Escapes dangerous input characters before parsing any Markdown elements, stripping inline styles or dangerous element nodes without importing native compilation utilities like isomorphic-dompurify. Text wrappers must map directly to theme-agnostic variables (text-current) to preserve 4.5:1 WCAG contrast compliance.

Deliver the code for these 4 interconnected files in your response:
1. `profile.ts` (The pure system instructions payload data file)
2. `useApi.ts` (The non-blocking streaming composable wrapper)
3. `chat.ts` (The server API endpoint utilizing streamText from 'ai' with fallback layers)
4. `ChatWidget.vue` (The orchestration component handling real-time stream token accumulation, localStorage updates via a deep watch loop, and a message deletion/clear filter)
```
