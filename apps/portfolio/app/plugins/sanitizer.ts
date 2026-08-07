import DOMPurify from 'dompurify'

export default defineNuxtPlugin((nuxtApp) => {
  const safeSanitizer =
    typeof window !== 'undefined' ? DOMPurify(window) : { sanitize: (text: string) => text }

  nuxtApp.provide('sanitizeHtml', (rawHtml: string) => {
    return safeSanitizer.sanitize(rawHtml, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'code',
        'pre',
        'ul',
        'li',
        'ol',
        'h1',
        'h2',
        'h3',
        'h4',
        'blockquote',
        'hr',
        'a',
        'span',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    })
  })
})
