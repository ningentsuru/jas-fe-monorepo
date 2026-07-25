<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from '@lucide/vue'
import { AtomIcon, AtomNavLink } from '../../'

interface NavItem {
  label: string
  href?: string
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

// Generate a deterministic unique layout id string for accessible tracking
const menuId = computed(
  () => `accordion-menu-${props.item.label.toLowerCase().replace(/\s+/g, '-')}`,
)

/**
 * Handles clicks on the entire row container.
 * This guarantees the toggle fires regardless of how AtomNavLink is built.
 */
function handleContainerClick(event: MouseEvent) {
  // If a child has children, block navigation and toggle the accordion
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
  <div class="molecule-nav-accordion w-full" data-testid="molecule-nav-accordion">
    <!-- Parent Row (Unified single focus and click target) -->
    <div
      class="group hover:bg-muted flex cursor-pointer items-center justify-between rounded-md transition-colors"
      @click="handleContainerClick"
    >
      <!-- One single link element handles the entire row, focus state, and icons -->
      <AtomNavLink
        :label="item.label"
        :to="item.children ? undefined : item.href"
        variant="ghost"
        size="md"
        class="flex-1 justify-start text-left font-medium"
        :aria-expanded="item.children ? isOpen : undefined"
        :aria-controls="item.children ? menuId : undefined"
      >
        <!-- Pass the matching chevron indicator as a trailing slot asset if item has kids -->
        <template v-if="item.children" #trailing>
          <AtomIcon
            :icon="ChevronRight"
            size="sm"
            class="text-muted-foreground group-hover:text-foreground transition-transform duration-200"
            :class="isOpen ? 'rotate-90' : 'rotate-0'"
          />
        </template>
      </AtomNavLink>
    </div>

    <!-- Smooth Accordion Panel Expansion -->
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
            :to="child.href"
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
