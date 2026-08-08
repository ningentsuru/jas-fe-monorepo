<script setup lang="ts">
/**
 * IMPORTS
 **/

/**
 * COMPILER MACROS
 **/
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

const name = defineModel<string>('name')
const age = defineModel<number>('age')

/**
 * NUXT / VUE COMPOSABLES
 **/

/**
 * LOCAL STATE & COMPUTED PROPERTIES
 **/

/**
 * WATCHERS
 **/

/**
 * LIFECYCLE HOOKS
 **/

/**
 * METHODS / FUNCTIONS
 **/

/**
 * EXPOSE
 **/
</script>

<template>
  <div class="molecule-form" data-testid="molecule-form">
    <form>
      <h1>{{ title }}</h1>
      <label>Name</label>
      <input v-model="name" />
      <label>Age</label>
      <input v-model="age" />
    </form>
  </div>
</template>
