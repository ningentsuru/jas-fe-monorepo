<script setup lang="ts">
interface Props {
  title?: string
  description?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  className: '',
})
</script>

<template>
  <div
    class="molecule-card bg-card text-card-foreground border-border/50 flex flex-col gap-4 rounded-xl border p-5 shadow-xs transition-all duration-200 hover:shadow-md"
    :class="className"
    data-testid="molecule-card"
  >
    <header v-if="title || description || $slots.header" class="flex flex-col gap-1">
      <slot name="header">
        <h3
          v-if="title"
          class="font-display text-foreground text-2xl font-bold tracking-tight uppercase"
        >
          {{ title }}
        </h3>
        <p v-if="description" class="text-muted-foreground text-sm leading-relaxed">
          {{ description }}
        </p>
      </slot>
    </header>

    <main v-if="$slots.default" class="text-foreground/90 text-sm leading-relaxed">
      <slot />
    </main>

    <footer
      v-if="$slots.footer"
      class="border-border/40 mt-auto flex items-center justify-end gap-2 border-t pt-3"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>
