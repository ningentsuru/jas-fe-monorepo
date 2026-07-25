<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import { AtomButton, AtomIcon, MoleculeNavDropdown, MoleculeNavAccordion } from '../../'

interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}

interface Props {
  items: NavItem[]
}

withDefaults(defineProps<Props>(), {
  items: () => [] as NavItem[],
})

const isMobileOpen = ref(false)
const openDropdownIndex = ref<number | null>(null)
const openAccordionItems = ref<Record<string, boolean>>({})

function toggleMobile() {
  isMobileOpen.value = !isMobileOpen.value
}

function closeMobile() {
  isMobileOpen.value = false
}

function toggleDropdown(index: number) {
  openDropdownIndex.value = openDropdownIndex.value === index ? null : index
}

function closeDropdown() {
  openDropdownIndex.value = null
}

function toggleAccordion(label: string) {
  openAccordionItems.value[label] = !openAccordionItems.value[label]
}

function isOpen(label: string) {
  return !!openAccordionItems.value[label]
}
</script>

<template>
  <nav class="relative z-40 w-full" data-testid="organism-navigation" @click="closeDropdown">
    <!-- DESKTOP VIEW -->
    <div class="hidden w-full items-center justify-between md:flex">
      <div class="flex space-x-8">
        <MoleculeNavDropdown
          v-for="(item, index) in items"
          :key="item.label"
          :item="item"
          :index="index"
          :is-open="openDropdownIndex === index"
          @toggle="toggleDropdown"
          @navigate="closeDropdown"
        />
      </div>
    </div>

    <!-- MOBILE TOGGLE -->
    <div class="flex justify-end md:hidden">
      <AtomButton variant="ghost" size="sm" @click="toggleMobile" aria-label="Toggle menu">
        <AtomIcon :icon="Menu" size="md" class="text-foreground" />
      </AtomButton>
    </div>

    <!-- MOBILE DRAWER -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-50 flex md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div class="bg-background/50 fixed inset-0 backdrop-blur-sm" @click="closeMobile"></div>
        <div
          class="border-border bg-card relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-l shadow-xl"
        >
          <div class="px-4 pt-5 pb-4">
            <!-- Header -->
            <div class="mb-6 flex items-center justify-between">
              <slot name="branding" />
              <AtomButton variant="ghost" size="sm" @click="closeMobile" aria-label="Close menu">
                <AtomIcon :icon="X" size="md" class="text-foreground" />
              </AtomButton>
            </div>

            <!-- Links List -->
            <div class="space-y-1">
              <MoleculeNavAccordion
                v-for="item in items"
                :key="item.label"
                :item="item"
                :is-open="isOpen(item.label)"
                @toggle="toggleAccordion(item.label)"
                @navigate="closeMobile"
              />
            </div>

            <!-- Theme Toggle Slot -->
            <div class="border-border mt-6 border-t pt-6">
              <slot name="theme-toggle" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
