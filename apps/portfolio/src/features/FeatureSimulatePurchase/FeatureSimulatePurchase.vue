<script setup lang="ts">
import { ref } from 'vue'
import { AtomButton } from '@repo/ui-vue'

const items = ref([
  {
    name: 'item 1',
    price: 10,
    quantity: 5,
  },
  {
    name: 'item 2',
    price: 10,
    quantity: 5,
  },
])
</script>

<template>
  <div class="feature-simulate-purchase" data-testid="feature-simulate-purchase">
    <h1>Purchase simulation</h1>
    <div class="border-card-foreground bg-card rounded border-2 p-4">
      <div class="flex gap-2">
        <div class="border-card-foreground border-2 p-2" v-for="item of items" :key="item.name">
          <p>{{ item.name }}</p>
          <p>Price: {{ item.price }}</p>
          <p>Remaining: {{ item.quantity }}</p>
          <AtomButton variant="primary" size="sm">Purchase</AtomButton>
        </div>
      </div>
    </div>
    <span class="sr-only">feature-simulate-purchase</span>
  </div>
</template>
