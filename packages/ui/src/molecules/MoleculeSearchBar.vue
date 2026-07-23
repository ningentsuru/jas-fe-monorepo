<template>
  <div class="molecule-search">
    <AtomInput v-model="query" placeholder="Search..." />
    <AtomButton @click="handleSearch">Go</AtomButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AtomInput from '../atoms/AtomInput.vue' // Explicit import
import AtomButton from '../atoms/AtomButton.vue'

const query = ref('')
const emit = defineEmits<{ search: [q: string] }>()

const handleSearch = () => emit('search', query.value)
</script>
