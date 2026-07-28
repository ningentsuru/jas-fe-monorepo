import 'vue'

declare module 'vue' {
  export interface HTMLAttributes {
    children?: import('vue').VNodeChild | import('vue').VNodeChild[]
  }

  export interface AllowedComponentProps {
    children?: import('vue').VNodeChild | import('vue').VNodeChild[]
  }
}
