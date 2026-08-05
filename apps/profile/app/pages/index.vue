<script setup lang="ts"></script>

<template>
  <div class="home-page flex flex-1 items-center justify-center" data-testid="home-page">
    <div class="flex flex-col">
      <div v-for="num of 100" :key="num">Hello world!</div>
    </div>
  </div>
</template>
