<!-- components/molecules/MoleculeNavDropdown.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { AtomButton, AtomIcon, AtomNavLink } from '../../'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

interface Props {
  item: NavItem
  index: number
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
})

const emit = defineEmits(['toggle', 'navigate'])

const isHovered = ref(false)
</script>

<template>
  <div class="molecule-nav-dropdown group relative" data-testid="molecule-nav-dropdown">
    <!-- Trigger -->
    <AtomButton
      variant="ghost"
      size="sm"
      :to="item.children ? undefined : item.href"
      @click.stop="item.children ? emit('toggle', index) : null"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      class="inline-flex cursor-pointer items-center gap-1 px-3 py-2 font-medium hover:bg-transparent"
    >
      <span class="text-foreground hover:text-primary transition-colors">
        {{ item.label }}
      </span>
      <AtomIcon
        v-if="item.children"
        :icon="ChevronDown"
        size="sm"
        :class="
          ['transition-transform', isOpen ? 'rotate-180' : 'group-hover:rotate-180'].join(' ')
        "
      />
    </AtomButton>

    <!-- Dropdown -->
    <div
      v-if="item.children"
      :class="[
        'absolute top-full left-0 mt-2 w-48 origin-top-left scale-95 transition-all duration-200 ease-out',
        isOpen || isHovered
          ? 'visible scale-100 opacity-100'
          : 'invisible scale-95 opacity-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100',
      ]"
    >
      <div
        class="ring-opacity-5 border-border bg-card overflow-hidden rounded-md border shadow-lg ring-1 ring-black"
      >
        <div class="p-1 flex flex-col gap-2">
          <AtomNavLink
            v-for="child in item.children"
            :key="child.label"
            :label="child.label"
            :to="child.href"
            variant="ghost"
            size="sm"
            class="px-4 py-2"
            @click="emit('navigate')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
