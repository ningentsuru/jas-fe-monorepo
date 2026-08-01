<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from '@lucide/vue'
import { AtomIcon, AtomNavLink } from '../../'

interface NavItem {
  label: string
  href?: string
  to?: string
  children?: NavItem[]
}

interface Props {
  item: NavItem
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'navigate'): void
}>()

const menuId = computed(
  () => `accordion-menu-${props.item.label.toLowerCase().replace(/\s+/g, '-')}`,
)

function handleLinkClick(event: MouseEvent) {
  if (props.item.children) {
    event.preventDefault()
    event.stopPropagation()
    emit('toggle')
  } else {
    emit('navigate')
  }
}
</script>

<template>
  <div class="molecule-nav-accordion font-display w-full" data-testid="molecule-nav-accordion">
    <AtomNavLink
      :label="item.label"
      :to="item.children && !(item.href || item.to) ? undefined : item.to"
      variant="ghost"
      size="md"
      class="hover:bg-muted/60 w-full items-center justify-between rounded-md text-left font-medium transition-colors"
      :aria-expanded="item.children ? isOpen : undefined"
      :aria-controls="item.children ? menuId : undefined"
      @click="handleLinkClick"
    >
      <template v-if="item.children" #trailing>
        <AtomIcon
          :icon="ChevronRight"
          size="sm"
          class="text-muted-foreground transition-transform duration-200"
          :class="isOpen ? 'rotate-90' : 'rotate-0'"
        />
      </template>
    </AtomNavLink>

    <div
      :id="menuId"
      class="grid overflow-hidden transition-all duration-200 ease-in-out"
      :class="
        isOpen
          ? 'visible mt-1 grid-rows-[1fr] opacity-100'
          : 'invisible mt-0 grid-rows-[0fr] opacity-0'
      "
    >
      <div class="min-h-0">
        <div class="border-border ml-4 space-y-1 border-l-2 py-1 pr-1 pl-2">
          <AtomNavLink
            v-for="child in item.children"
            :key="child.label"
            :label="child.label"
            :to="child.to ? child.to : undefined"
            :href="child.href ? child.href : undefined"
            variant="link"
            size="sm"
            @click="emit('navigate')"
            class="w-full justify-start px-3 py-2 text-left font-normal"
          />
        </div>
      </div>
    </div>
  </div>
</template>
