<script setup lang="ts">
import { computed, ref } from 'vue'
import { marked } from 'marked'
import { Check, Copy, Trash2 } from '@lucide/vue'
import { Card, CardContent } from '#/components/ui/card'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'

interface MessagePart {
  type: string
  text?: string
}

interface Props {
  message: {
    id?: string
    role: string
    parts: MessagePart[]
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const isCopied = ref(false)

marked.setOptions({
  breaks: true,
  gfm: true,
})

const parsedParts = computed(() => {
  if (!props.message.parts || !Array.isArray(props.message.parts)) return []

  return props.message.parts.map((part: MessagePart) => {
    if (part.type === 'text' && part.text) {
      try {
        const rawHtml = marked.parse(part.text, { async: false }) as string
        return {
          type: 'text',
          html: rawHtml,
        }
      } catch (error) {
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
      <CardContent class="min-w-[120px] p-3 pr-5 text-sm leading-relaxed">
        <div
          class="absolute top-2 right-2 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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

          <Button
            v-if="message.id !== 'welcome-system-node'"
            type="button"
            size="icon"
            variant="ghost"
            class="text-muted-foreground hover:bg-destructive/20 hover:text-destructive h-6 w-6 cursor-pointer rounded-md transition-colors"
            title="Delete this message"
            @click="emit('delete')"
          >
            <Trash2 class="h-3.5 w-3.5" />
          </Button>
        </div>

        <div v-for="(part, index) in parsedParts" :key="index">
          <div
            v-if="part.type === 'text' && part.html"
            :class="[
              'prose prose-sm dark:prose-invert max-w-none text-current',
              'prose-p:text-current prose-headings:text-current prose-strong:text-current prose-em:text-current prose-li:text-current prose-blockquote:text-current',
              'prose-code:text-current prose-code:before:content-[\'\'] prose-code:after:content-[\'\']',
              'prose-pre:bg-zinc-950/60 prose-pre:border prose-pre:border-zinc-800/80 prose-pre:text-zinc-100',
              message.role === 'user'
                ? 'prose-a:text-current prose-a:underline prose-a:font-bold hover:prose-a:opacity-80'
                : 'prose-a:text-primary prose-a:underline prose-a:font-bold hover:prose-a:opacity-80 dark:prose-a:text-teal-400 forest-theme:prose-a:text-teal-300 ocean-theme:prose-a:text-sky-300 sunset-theme:prose-a:text-amber-400 high-contrast-theme:prose-a:text-[oklch(0.96_0.20_95)]',
            ]"
            v-html="
              ($parent as any)?.$sanitizeHtml
                ? ($parent as any).$sanitizeHtml(part.html)
                : part.html
            "
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>
