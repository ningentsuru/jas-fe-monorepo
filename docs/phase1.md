**Monorepo Checklist** to replicate this setup successfully from scratch in the future.

### 1. Initialization & Structure

- **Start with Turborepo**: Run `pnpm dlx create-turbo@latest` and select **pnpm**.
- **Clean Slate**: Immediately delete the default `apps/*` and `packages/*` content to remove Next.js baggage.
- **Folder Convention**:
  - `apps/`: For deployable applications (e.g., `portfolio`, `admin`).
  - `packages/`: For shared libraries (e.g., `ui`, `utils`, `types`).
- **Workspace Config**: Ensure `pnpm-workspace.yaml` includes both folders:
  ```yaml
  packages:
    - "apps/*"
    - "packages/*"
  ```

### 2. Creating the UI Library (`packages/ui-vue`)

- **Scaffold**: Run `pnpm create vue@latest ui` inside `packages/`.
- **Strip App Files**: Delete `index.html`, `src/main.ts`, `src/App.vue`, and `public/`.
- **Library Mode**: Update `vite.config.ts` to use `build.lib` and set `external: ['vue']`.
- **Exports**: Update `package.json` to export both JS and CSS:
  ```json
  "exports": {
    ".": "./dist/index.js",
    "./style.css": "./dist/style.css"
  }
  ```
- **Peer Dependencies**: Move `vue` to `peerDependencies` to prevent double-bundling.
- **Tailwind v4 Setup**:
  - Install `tailwindcss` and `@tailwindcss/vite`.
  - Create `src/style.css` with `@import "tailwindcss";`.
  - **Crucial**: Add `@source "./**/*.vue";` inside `src/style.css` so apps can scan it.
  - Import this CSS in `src/index.ts`.

### 3. Creating the App (`apps/portfolio`)

- **Scaffold**: Run `pnpm create vue@latest portfolio` inside `apps/`.
- **Link Package**: Install the UI lib using the workspace protocol:
  ```bash
  pnpm add @repo/ui-vue --workspace
  ```
  _(Or manually add `"@repo/ui-vue": "workspace:*"` to `package.json`)_.
- **Tailwind Setup**:
  - Install `tailwindcss` and `@tailwindcss/vite` in the app too.
  - In `src/style.css`, import the UI styles:
    ```css
    @import "tailwindcss";
    @import "@repo/ui-vue/style.css";
    ```
- **Usage**: Import components directly: `import { AtomButton } from '@repo/ui-vue'`.

### 4. Development Workflow Rules

- **Build First**: Before running the app, you **must** build the library once to generate `dist/` and `.d.ts` files:
  ```bash
  pnpm turbo run build --filter=@repo/ui-vue
  ```
- **Watch Mode**: For active development, run the library in watch mode in a separate terminal:
  ```bash
  pnpm turbo run build --filter=@repo/ui-vue -- --watch
  ```
- **TypeScript Errors**: If VS Code says "Cannot find module", restart the **TypeScript Server** (`Ctrl+Shift+P` > `Restart TS Server`).
- **Single Source of Truth**: Keep all atomic components (Atoms, Molecules, Organisms) inside **one** `@repo/ui-vue` package. Do not split them into multiple packages unless absolutely necessary.

### 5. Common Pitfalls to Avoid

- ❌ **Don't** install `vue` as a regular dependency in the UI package (use `peerDependencies`).
- ❌ **Don't** use `@apply` inside `<style scoped>` in library components (use utility classes in the template instead).
- ❌ **Don't** forget the `@source` directive in the UI package's CSS, or Tailwind won't find your classes.
- ❌ **Don't** try to import `src/` files directly from the app; always import the built `dist/` output via the package name.
