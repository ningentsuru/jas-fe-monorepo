<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import { Check, Copy } from '@lucide/vue'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'

interface MessagePart {
  type: string
  text?: string
}

interface Props {
  message: {
    role: string
    parts: MessagePart[]
  }
}

const props = defineProps<Props>()
const isCopied = ref(false)

const parsedParts = computed(() => {
  if (!props.message.parts || !Array.isArray(props.message.parts)) return []

  return props.message.parts.map((part: MessagePart) => {
    if (part.type === 'text' && part.text) {
      try {
        const rawHtml = marked.parse(part.text, { async: false }) as string

        const cleanHtml = DOMPurify.sanitize(rawHtml)

        return {
          type: 'text',
          html: cleanHtml,
        }
      } catch (error) {
        console.warn('Markdown string compilation fallback triggered:', error)
        return { type: 'text', html: `<p class="whitespace-pre-wrap">${part.text}</p>` }
      }
    }
    return { type: part.type, html: '' }
  })
})

const handleCopyExecution = async () => {
  if (!props.message.parts || isCopied.value) return

  const rawTextToCopy = props.message.parts
    .filter((part: MessagePart) => part.type === 'text' && part.text)
    .map((part: MessagePart) => part.text)
    .join('\n')

  if (!rawTextToCopy) return

  try {
    await navigator.clipboard.writeText(rawTextToCopy)

    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Clipboard copy sequence failed:', error)
  }
}
</script>

<template>
  <div
    :class="[
      'group relative mb-4 flex max-w-[85%] flex-col gap-1',
      message.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start',
    ]"
  >
    <div class="flex items-center gap-2">
      <Badge
        :variant="message.role === 'user' ? 'default' : 'secondary'"
        class="rounded-sm px-2 py-0.5 text-[10px] tracking-wider"
      >
        {{ message.role === 'user' ? 'You' : "Joshua's AI Assistant" }}
      </Badge>
    </div>

    <Card
      :class="[
        'border-border relative overflow-hidden border shadow-sm transition-colors duration-200',
        message.role === 'user'
          ? 'bg-primary text-primary-foreground'
          : 'bg-card text-card-foreground',
      ]"
    >
      <CardContent class="min-w-[120px] p-3 pr-10 text-sm leading-relaxed">
        <div
          class="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        >
          <Button
            type="button"
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:bg-muted/50 hover:text-foreground h-6 w-6 cursor-pointer rounded-md transition-colors"
            :title="isCopied ? 'Copied text!' : 'Copy contents'"
            @click="handleCopyExecution"
          >
            <Check v-if="isCopied" class="h-3.5 w-3.5 text-green-500" />
            <Copy v-else class="h-3.5 w-3.5" />
          </Button>
        </div>

        <div v-for="(part, index) in parsedParts" :key="index">
          <div
            v-if="part.type === 'text' && part.html"
            :class="[
              'prose prose-sm max-w-none text-current',
              message.role === 'user'
                ? 'prose-a:text-zinc-100 hover:prose-a:opacity-80'
                : 'prose-a:text-blue-600 hover:prose-a:opacity-80',
            ]"
            v-html="part.html"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
