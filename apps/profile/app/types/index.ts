export type Themes = 'light' | 'dark' | 'forest' | 'ocean' | 'sunset' | 'high-contrast'

export type NavItem = {
  label: string
  href?: string
  children?: NavItem[]
}
