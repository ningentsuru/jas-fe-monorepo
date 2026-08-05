<script setup lang="ts">
import { useId, computed } from 'vue'
import { AlertCircle } from '@lucide/vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '#/components/ui/dialog'
import { Button } from '#/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '#/components/ui/input-otp'

interface Props {
  open: boolean
  code: number
  modelValue: string
  hasError?: boolean
  isSubmitting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hasError: false,
  isSubmitting: false,
})

const emit = defineEmits<{
  (e: 'update:open', val: boolean): void
  (e: 'update:modelValue', val: string): void
  (e: 'verify'): void
  (e: 'cancel'): void
}>()

const formattedCode = computed(() => {
  return String(props.code).padStart(6, '0')
})

const internalOtpValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const titleId = useId()
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader class="space-y-2">
        <DialogTitle :id="titleId" class="flex items-center gap-2">
          <AlertCircle class="text-primary size-5" />
          Anti-Spam Verification
        </DialogTitle>
        <DialogDescription class="text-muted-foreground text-xs leading-relaxed">
          It looks like you've sent a message recently! To help protect this inbox from automated
          spam, please enter the matching 6-digit verification code below to submit another message.
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col items-center justify-center space-y-6 py-6">
        <div
          class="bg-muted border-border text-primary animate-pulse rounded-lg border px-8 py-3 font-mono text-4xl font-black tracking-widest select-none"
        >
          {{ formattedCode }}
        </div>

        <div class="flex w-full flex-col items-center space-y-2">
          <InputOTP
            v-model="internalOtpValue"
            :maxlength="6"
            :disabled="isSubmitting"
            class="font-mono"
            @complete="emit('verify')"
          >
            <InputOTPGroup class="gap-1">
              <InputOTPSlot
                v-for="(_, index) in 6"
                :key="index"
                :index="index"
                class="border-input focus-visible:ring-ring rounded-md border text-lg font-bold transition-all focus-visible:ring-1"
                :class="[
                  hasError &&
                    'border-destructive text-destructive focus-visible:ring-destructive bg-destructive/5',
                ]"
              />
            </InputOTPGroup>
          </InputOTP>

          <p v-if="hasError" class="text-destructive animate-bounce pt-1 text-[10px] font-bold">
            Code sequence mismatch!
          </p>
        </div>
      </div>

      <DialogFooter class="grid grid-cols-2 gap-2 sm:space-x-0">
        <Button
          variant="outline"
          type="button"
          class="cursor-pointer font-semibold"
          @click="emit('cancel')"
        >
          Cancel
        </Button>
        <Button
          variant="default"
          type="button"
          class="cursor-pointer font-semibold"
          :disabled="isSubmitting || internalOtpValue.length < 6"
          @click="emit('verify')"
        >
          {{ isSubmitting ? 'Sending...' : 'Verify & Send' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
