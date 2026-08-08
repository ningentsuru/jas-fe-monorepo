<script setup lang="ts">
import { ref } from 'vue'
import { MoleculeForm } from '@repo/ui-vue'

// Instantiate reactive state matching your inputs
const name = ref<string>('John Doe')
const age = ref<number>(25)
</script>

<template>
  <div class="test-page h-100">
    <div>Name reactivity: {{ name }}</div>
    <div>Age reactivity: {{ age }}</div>

    <MoleculeForm title="Form info" v-model:name="name" v-model:age="age" />
  </div>
</template>
