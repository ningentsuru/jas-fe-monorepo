// apps/portfolio/src/remote.d.ts

declare module 'repo_ui_remote/OrganismHero' {
  import { DefineComponent } from 'vue'
  // Infers the Vue Single File Component type definition dynamically
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}

declare module 'repo_ui_remote/AtomButton' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>
  export default component
}
