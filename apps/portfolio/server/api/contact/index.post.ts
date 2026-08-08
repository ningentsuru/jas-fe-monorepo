export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const endpointId = config.formspreeEndpointId

  if (!endpointId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Server configuration error: Missing form identifier.',
    })
  }

  const body = await readBody(event)

  if (!body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request: Email and message fields are required.',
    })
  }

  try {
    const targetUrl = `https://formspree.io/f/${endpointId}`

    await $fetch(targetUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: {
        email: body.email,
        message: body.message,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Server-side Formspree error:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to dispatch transmission upstream.',
    })
  }
})
