<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Menu, X } from '@lucide/vue'
import { AtomButton, MoleculeNavDropdown, MoleculeNavAccordion } from '../../'

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

function toggleDropdown(index: number, event?: Event) {
  if (event) event.stopPropagation() // Prevent immediate document backdrop auto-dismiss triggers
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

// Global click-outside handling registration for desktop menu trees
const handleDocumentClick = () => {
  closeDropdown()
}

// Trap system keyboard Esc key cancellations to close mobile drawers gracefully
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobile()
    closeDropdown()
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleKeyDown)
}

// Lock layout canvas views when mobile modal viewport targets open configurations
watch(isMobileOpen, (newVal) => {
  if (typeof window === 'undefined') return
  document.body.style.overflow = newVal ? 'hidden' : ''
})

// Proper garbage memory safe variable layer cleanups on unmounting stages
onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav class="relative z-40 w-full" data-testid="organism-navigation">
    <!-- DESKTOP VIEW -->
    <div class="hidden w-full items-center justify-between md:flex">
      <!-- Added stop propagation modifier to cleanly isolate navigation clicks -->
      <div class="flex space-x-1" @click.stop>
        <MoleculeNavDropdown
          v-for="(item, index) in items"
          :key="item.label"
          :item="item"
          :index="index"
          :is-open="openDropdownIndex === index"
          @toggle="toggleDropdown(index, $event)"
          @navigate="closeDropdown"
        />
      </div>
    </div>

    <!-- MOBILE TOGGLE -->
    <div class="flex justify-end md:hidden">
      <AtomButton variant="ghost" size="sm" @click="toggleMobile" aria-label="Toggle menu">
        <Menu class="text-foreground h-5 w-5" />
      </AtomButton>
    </div>

    <!-- MOBILE DRAWER -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isMobileOpen"
        class="fixed inset-0 z-50 flex md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <!-- Overlay Layer pulling tokens dynamically based on your custom stylesheet variables -->
        <div
          class="fixed inset-0 bg-black/40 backdrop-blur-sm data-[theme=high-contrast]:bg-black/75 data-[theme=high-contrast]:backdrop-blur-none"
          @click="closeMobile"
        />

        <div
          class="hc:border-2 border-border bg-card text-card-foreground relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-l shadow-xl transition-all duration-300 data-[theme=high-contrast]:border-2"
        >
          <div class="px-4 pt-5 pb-4">
            <!-- Header -->
            <div class="mb-6 flex items-center justify-between">
              <slot name="branding" />
              <AtomButton variant="ghost" size="sm" @click="closeMobile" aria-label="Close menu">
                <X class="text-foreground h-5 w-5" />
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
