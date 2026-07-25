<!-- components/molecules/MoleculeNavAccordion.vue -->
<script setup lang="ts">
import { ChevronDown, ChevronRight } from '@lucide/vue'
import { AtomButton, AtomIcon, AtomNavLink } from '../../'

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
const emit = defineEmits(['toggle', 'navigate'])
</script>

<template>
  <div>
    <!-- Parent Row -->
    <div class="flex items-center justify-between">
      <AtomNavLink
        :label="item.label"
        :to="item.children ? undefined : item.href"
        variant="ghost"
        size="md"
        @click="item.children ? emit('toggle') : emit('navigate')"
      />

      <AtomButton
        v-if="item.children"
        variant="ghost"
        size="sm"
        @click="emit('toggle')"
        class="ml-2 p-2"
        aria-label="Toggle submenu"
      >
        <AtomIcon
          :icon="isOpen ? ChevronDown : ChevronRight"
          size="sm"
          class="text-muted-foreground transition-transform"
        />
      </AtomButton>
    </div>

    <!-- Children (Accordion Content) -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-96 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-96 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="item.children && isOpen"
        class="border-border mt-1 ml-4 space-y-1 overflow-hidden border-l-2 pl-2"
      >
        <AtomNavLink
          v-for="child in item.children"
          :key="child.label"
          :label="child.label"
          :to="child.href"
          variant="link"
          size="sm"
          @click="emit('navigate')"
          class="px-3 py-2"
        />
      </div>
    </transition>
  </div>
</template>
