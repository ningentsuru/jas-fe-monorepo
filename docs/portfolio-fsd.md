```
portfolio/
┃
┣ app/                           <--- FRONTEND CONTEXT (FSD Layers live here)
┃ ┣ assets/                      <--- [Shared Layer: Assets]
┃ ┃ ┗ css/
┃ ┃   ┣ fonts.css
┃ ┃   ┗ main.css
┃ ┃
┃ ┣ composables/                 <--- [Shared Layer: Code Segment] Rename to match Nuxt auto-discovery
┃ ┃ ┣ useApi.ts                  <--- Auto-imported across widgets/features/entities
┃ ┃ ┣ useAppTheme.ts
┃ ┃ ┗ useDateFormat.ts
┃ ┃
┃ ┣ entities/                    <--- [Entity Layer] Business domain schemas and low-level state
┃ ┃ ┣ chat/
┃ ┃ ┃ ┣ model/
┃ ┃ ┃ ┃ ┗ state.ts               <--- Global localized composition states (pinia or ref hooks)
┃ ┃ ┃ ┣ ui/
┃ ┃ ┃ ┃ ┗ ChatMessageBubble.vue  <--- Dummy layout atom bound to domain data
┃ ┃ ┃ ┗ index.ts                 <--- PUBLIC API: Exports types, states, component refs
┃ ┃ ┗ profile/
┃ ┃   ┣ data/
┃ ┃   ┃ ┗ profile.ts
┃ ┃   ┗ index.ts
┃ ┃
┃ ┣ features/                    <--- [Feature Layer] Action-oriented user operations
┃ ┃ ┗ floating-chat/
┃ ┃   ┣ ui/
┃ ┃   ┃ ┗ FloatingChatButton.vue
┃ ┃   ┗ index.ts                 <--- PUBLIC API
┃ ┃
┃ ┣ layouts/                     <--- [App Layer Segment] Explicitly required at app/ level by Nuxt 4
┃ ┃ ┗ default.vue
┃ ┃
┃ ┣ pages/                       <--- [Page Layer] THIN wrappers. Absolute minimal logic.
┃ ┃ ┣ about-me.vue               <--- Imports and passes configuration into <AboutMeWidget />
┃ ┃ ┣ index.vue                  <--- Imports and passes configuration into <LandingBioWidget />
┃ ┃ ┗ test.vue
┃ ┃
┃ ┣ plugins/                     <--- [App Layer Segment] Required at app/ level by Nuxt 4
┃ ┃ ┗ sanitizer.ts
┃ ┃
┃ ┣ types/                       <--- [Shared Layer: Pure Types]
┃ ┃ ┗ index.ts
┃ ┃
┃ ┣ widgets/                     <--- [Widget Layer] Combines Entities + Features into modular layout blocks
┃ ┃ ┣ about-me/
┃ ┃ ┃ ┣ ui/
┃ ┃ ┃ ┃ ┗ AboutMeWidget.vue
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ chat-box/
┃ ┃ ┃ ┣ ui/
┃ ┃ ┃ ┃ ┗ ChatWidget.vue         <--- Imports FloatingChatButton + ChatMessageBubble + state
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┗ landing-bio/
┃ ┃   ┗ ui/
┃ ┃     ┗ LandingBioWidget.vue
┃ ┃
┃ ┣ app.vue                      <--- [App Layer Entry] Root view wrapper mount selector
┃ ┗ error.vue                    <--- [App Layer Entry] Application error layout interceptor
┃
┣ e2e/                           <--- INTEGRATION TESTING
┃ ┗ LandingPage.spec.ts          <--- Playwright automated user paths checking the file router
┃
┣ public/                        <--- ASSETS DIRECT ACCESS
┃ ┣ fonts/
┃ ┃ ┗ inter-v20-latin-regular.woff2
┃ ┣ robots.txt
┃ ┗ sitemap.xml
┃
┣ server/                        <--- BACKEND CONTEXT (Nitro Engine) - Strict top-level placement
┃ ┗ api/
┃   ┣ chat/                      <--- [FSD Alignment] Group your backend APIs matching entities
┃   ┃ ┣ index.get.ts             <--- Fetch message logs (Replaces old server/api/chat.ts)
┃   ┃ ┗ index.post.ts            <--- Dispatches message payloads
┃   ┗ contact/
┃     ┗ index.post.ts            <--- Sends contact forms (Replaces old contact.post.ts)
┃
┣ shared/                        <--- CONTEXTLESS DATA LAYER (New Nuxt 4 Feature)
┃ ┗ types/
┃   ┗ contracts.ts               <--- Pure Data Contracts (Shared safely between frontend & server APIs)
┃
┣ nuxt.config.ts                 <--- Core framework configuration configuration targets
┣ playwright.config.ts           <--- Automation framework execution variables
┣ package.json
┗ tsconfig.json

```
