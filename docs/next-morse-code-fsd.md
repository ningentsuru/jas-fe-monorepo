```
next-morse-code/
┣ src/
┃ ┣ app/                              <--- [App Layer] Next.js File Routing Core Configuration Only
┃ ┃ ┣ (default)/
┃ ┃ ┃ ┣ test/
┃ ┃ ┃ ┃ ┗ page.tsx                    <--- Thin Wrapper: Mounts <TestWidget />
┃ ┃ ┃ ┣ layout.tsx
┃ ┃ ┃ ┗ page.tsx                      <--- Thin Wrapper: Mounts <MorseDashboardWidget />
┃ ┃ ┣ favicon.ico
┃ ┃ ┣ globals.css
┃ ┃ ┗ layout.tsx
┃ ┃
┃ ┣ shared/                           <--- [Shared Layer] Mapped directly by technical segment
┃ ┃ ┣ constants/
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ navigations.ts
┃ ┃ ┣ hooks/
┃ ┃ ┃ ┗ useAppTheme.ts
┃ ┃ ┣ types/
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ telegraph.ts
┃ ┃ ┗ utils/
┃ ┃   ┗ morseTranslator.ts
┃ ┃
┃ ┣ entities/                         <--- [Entity Layer] Core concepts (Domain display elements)
┃ ┃ ┗ telegraph-reference/
┃ ┃   ┣ ui/
┃ ┃   ┃ ┗ TelegraphCheatSheet.tsx
┃ ┃   ┗ index.ts                      <--- Public API Barrel
┃ ┃
┃ ┣ features/                         <--- [Feature Layer] Action-oriented interactive handlers
┃ ┃ ┗ telegraph-controls/
┃ ┃   ┣ ui/
┃ ┃   ┃ ┗ TelegraphSpeedControls.tsx
┃ ┃   ┗ index.ts                      <--- Public API Barrel
┃ ┃
┃ ┣ widgets/                          <--- [Widget Layer] Composition Chamber
┃ ┃ ┗ telegraph-dashboard/
┃ ┃   ┣ ui/
┃ ┃   ┃ ┗ MorseDashboardWidget.vue    <-- Combines CheatSheet + SpeedControls + Translator utils
┃ ┃   ┗ index.ts                      <--- Public API Barrel

```
