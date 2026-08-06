<script setup lang="ts">
import { ref, computed } from 'vue'
import { Mail, Phone, MapPin, Send, CheckCircle2 } from '@lucide/vue'
import { Button } from '#/components/ui/button'
import { AtomSkeleton } from '#/index'

interface Props {
  title?: string
  isSubmitting?: boolean
  submitSuccess?: boolean
  submitError?: boolean
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: "Let's Connect",
  isSubmitting: false,
  submitSuccess: false,
  submitError: false,
  isLoading: false,
})

const emit = defineEmits<{
  (e: 'submit', payload: { email: string; message: string }): void
}>()

const currentYear = computed(() => new Date().getFullYear())

// Local state isolated inside the UI package
const formEmail = ref('')
const formMessage = ref('')

function handleLocalSubmit() {
  if (!formEmail.value || !formMessage.value) return

  emit('submit', {
    email: formEmail.value,
    message: formMessage.value,
  })
}

// Expose reset method so parent can invoke it after successful API transmission
defineExpose({
  resetForm: () => {
    formEmail.value = ''
    formMessage.value = ''
  },
})
</script>

<template>
  <footer
    class="organism-footer border-border bg-background mx-auto w-full border-t py-12 transition-colors duration-200"
    data-testid="organism-footer"
    role="contentinfo"
  >
    <div class="mx-auto max-w-2xl space-y-10 px-4">
      <template v-if="isLoading">
        <div
          class="grid animate-pulse grid-cols-1 items-start gap-8 md:grid-cols-2"
          role="img"
          aria-label="Loading contact form and footer elements..."
        >
          <div class="space-y-4">
            <div class="space-y-2.5">
              <AtomSkeleton class="h-6 w-36 rounded" />
              <AtomSkeleton class="h-4 w-full rounded" />
            </div>
          </div>
          <div class="space-y-3">
            <AtomSkeleton class="h-9 w-full rounded-md" />
            <AtomSkeleton class="h-20 w-full rounded-md" />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="animate-fade-in grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div class="space-y-4">
            <div class="space-y-2">
              <h2 class="text-foreground text-xl font-bold tracking-tight">
                {{ title }}
              </h2>
              <p class="text-muted-foreground text-sm leading-relaxed">
                Have an advanced Vue/Nuxt migration task, monorepos question, or a framework
                opportunity? Drop me a direct message!
              </p>
            </div>

            <div class="space-y-2.5 pl-0.5 text-sm font-medium">
              <a
                href="mailto:ja.sardido@outlook.com"
                class="text-muted-foreground hover:text-primary group flex items-center gap-2.5 transition-colors"
                aria-label="Send an email message to ja.sardido@outlook.com"
              >
                <Mail
                  class="size-4 transition-transform group-hover:scale-105"
                  aria-hidden="true"
                />
                <span>ja.sardido@outlook.com</span>
              </a>
              <a
                href="tel:09174028632"
                class="text-muted-foreground hover:text-primary group flex items-center gap-2.5 transition-colors"
                aria-label="Call Joshua directly at 0917-402-8632"
              >
                <Phone
                  class="size-4 transition-transform group-hover:scale-105"
                  aria-hidden="true"
                />
                <span>0917-402-8632</span>
              </a>
              <div class="text-muted-foreground flex items-center gap-2.5">
                <MapPin class="size-4 shrink-0" aria-hidden="true" />
                <span>General Trias City, Cavite, PH</span>
              </div>
            </div>
          </div>

          <form
            @submit.prevent="handleLocalSubmit"
            class="space-y-3"
            aria-label="Direct message contact form"
          >
            <div class="space-y-1">
              <label for="footer-email" class="sr-only">Your Email Address</label>
              <input
                id="footer-email"
                v-model="formEmail"
                type="email"
                required
                :disabled="isSubmitting"
                placeholder="your.email@domain.com"
                class="border-input placeholder:text-muted-foreground/60 focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-all focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div class="space-y-1">
              <label for="footer-message" class="sr-only">Your Message Text</label>
              <textarea
                id="footer-message"
                v-model="formMessage"
                required
                rows="3"
                :disabled="isSubmitting"
                placeholder="Project description, architecture needs..."
                class="border-input placeholder:text-muted-foreground/60 focus-visible:ring-ring flex w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm transition-all focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="sm"
              class="w-full cursor-pointer font-semibold transition-all"
              :disabled="isSubmitting"
              :aria-live="'polite'"
            >
              <template v-if="isSubmitting">
                <span class="animate-pulse">Dispatching...</span>
              </template>
              <template v-else-if="submitSuccess">
                <CheckCircle2 class="mr-1.5 size-4 text-emerald-400" aria-hidden="true" />
                <span>Message Received!</span>
              </template>
              <template v-else>
                <Send class="mr-1.5 size-3.5" aria-hidden="true" />
                <span>Send Message</span>
              </template>
            </Button>

            <p
              v-if="submitError"
              class="text-destructive animate-fade-in text-center text-[11px] font-medium tracking-tight"
              role="alert"
              aria-live="assertive"
            >
              Transmission failed. Please reach me directly via email.
            </p>
          </form>
        </div>
      </template>

      <div
        class="border-border/60 text-muted-foreground flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs font-medium sm:flex-row"
      >
        <template v-if="isLoading">
          <div class="w-full sm:w-auto" role="img" aria-label="Loading copyright details...">
            <AtomSkeleton class="h-4 w-48 rounded" />
          </div>
        </template>
        <template v-else>
          <p>&copy; {{ currentYear }} Joshua Alexis Sardido. All rights reserved.</p>
        </template>
      </div>
    </div>
  </footer>
</template>
