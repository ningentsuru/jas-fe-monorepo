<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  AtomSkeleton,
  MoleculeThemeToggle,
  MoleculeSpamChallenge,
  OrganismHeader,
  OrganismFooter,
  TemplateProfile,
} from '@repo/ui-vue'
import { useAppTheme } from '@/shared/composables/useAppTheme'
import { useApi } from '@/shared/composables/useApi'
import type { Themes } from '@/types'

const { isDark, theme, toggleTheme, setTheme } = useAppTheme()
const { sendMessage } = useApi()

const isLoadingClient = ref(true)
const footerRef = ref<InstanceType<typeof OrganismFooter> | null>(null)
const formSubmitting = ref(false)
const formSuccess = ref(false)
const formError = ref(false)

const hasSentMessage = ref(false)
const LOCAL_STORAGE_KEY = 'jas_portfolio_message_dispatched'

const showPuzzleModal = ref(false)
const generatedCode = ref(0)
const userInputValue = ref('')
const puzzleError = ref(false)
const pendingPayload = ref<{ email: string; message: string } | null>(null)

const getTheme = computed(() => {
  const t = theme.value as string
  if (t === 'auto') return (isDark.value ? 'dark' : 'light') as Themes
  return t as Themes
})

function handleFormIntercept(payload: { email: string; message: string }) {
  if (hasSentMessage.value) {
    generatedCode.value = Math.floor(Math.random() * 1000000)
    userInputValue.value = ''
    puzzleError.value = false
    pendingPayload.value = payload
    showPuzzleModal.value = true
  } else {
    executeSubmit(payload)
  }
}

async function executeSubmit(payload: { email: string; message: string }) {
  formSubmitting.value = true
  formError.value = false

  try {
    await sendMessage(payload)

    formSuccess.value = true
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true')
    hasSentMessage.value = true

    footerRef.value?.resetForm()
    closePuzzle()

    setTimeout(() => {
      formSuccess.value = false
    }, 5000)
  } catch (error) {
    formError.value = true
    console.error('Contact submission fallback error:', error)
  } finally {
    formSubmitting.value = false
  }
}

function handlePuzzleVerify() {
  if (parseInt(userInputValue.value) === generatedCode.value) {
    if (pendingPayload.value) {
      executeSubmit(pendingPayload.value)
    }
  } else {
    puzzleError.value = true
  }
}

function handleOtpInput(value: string) {
  userInputValue.value = value
  if (userInputValue.value.length < 6) {
    puzzleError.value = false
  }
}

function closePuzzle() {
  showPuzzleModal.value = false
  pendingPayload.value = null
  userInputValue.value = ''
  puzzleError.value = false
}

onMounted(() => {
  isLoadingClient.value = false

  if (localStorage.getItem(LOCAL_STORAGE_KEY) === 'true') {
    hasSentMessage.value = true
  }
})
</script>

<template>
  <TemplateProfile class="default-layout" data-testid="default-layout">
    <template #header>
      <OrganismHeader :is-loading="isLoadingClient">
        <template #branding>
          <NuxtLink to="/" class="text-sm font-bold tracking-tight">PORTFOLIO</NuxtLink>
        </template>

        <template #navigation>
          <NuxtLink to="about-me" class="text-muted-foreground text-sm"> About Me </NuxtLink>
        </template>
        <template #theme-toggle>
          <ClientOnly>
            <MoleculeThemeToggle
              :is-toggled="isDark"
              :current-theme="getTheme"
              size="md"
              @toggle="toggleTheme"
              @set-theme="setTheme($event as Themes)"
            />
            <template #fallback>
              <AtomSkeleton class="bg-muted-foreground m-1 h-8 w-8 rounded-full" />
            </template>
          </ClientOnly>
        </template>
      </OrganismHeader>
    </template>

    <main class="mx-auto w-full max-w-sm px-2 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
      <NuxtPage />
    </main>

    <template #footer>
      <OrganismFooter
        ref="footerRef"
        :is-loading="isLoadingClient"
        :is-submitting="formSubmitting"
        :submit-success="formSuccess"
        :submit-error="formError"
        @submit="handleFormIntercept"
      />
    </template>
    <template #overlay>
      <MoleculeSpamChallenge
        :model-value="userInputValue"
        :open="showPuzzleModal"
        :code="generatedCode"
        :has-error="puzzleError"
        :is-submitting="formSubmitting"
        @update:model-value="handleOtpInput"
        @update:open="showPuzzleModal = $event"
        @verify="handlePuzzleVerify"
        @cancel="closePuzzle"
      />
      <ChatWidget />
    </template>
  </TemplateProfile>
</template>
