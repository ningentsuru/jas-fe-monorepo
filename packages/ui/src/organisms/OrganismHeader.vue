<template>
  <header class="organism-header mx-2 flex items-center justify-between gap-4">
    <AtomLogo />
    <MoleculeSearchBar @search="navigateToResults" />
    <AtomButton variant="secondary">Login</AtomButton>
  </header>
</template>

<script setup lang="ts">
import AtomLogo from '../atoms/AtomLogo.vue'
import AtomButton from '../atoms/AtomButton.vue'
import MoleculeSearchBar from '../molecules/MoleculeSearchBar.vue'

const navigateToResults = (q: string) => {
  console.log('Navigating with:', q)
}
</script>
