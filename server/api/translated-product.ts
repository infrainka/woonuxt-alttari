import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const slug = query.slug as string
  const targetLang = (query.lang as string) || 'en'

  const storage = useStorage('translations')
  const cacheKey = `product:${slug}:${targetLang}`

  const cachedProduct = await storage.getItem(cacheKey)
  if (cachedProduct) {
    return cachedProduct
  }

  const runtimeConfig = useRuntimeConfig()
  const wooData = await $fetch(runtimeConfig.public.GQL_HOST, {
    method: 'POST',
    body: {
      query: `
        query getProduct($slug: ID!) {
          product(id: $slug, idType: SLUG) {
            id
            name
            description
            shortDescription
          }
        }
      `,
      variables: { slug }
    }
  })

  const product = wooData.data?.product
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  if (targetLang === 'en') {
    await storage.setItem(cacheKey, product)
    return product
  }

  const translatedProduct = { ...product }
  
  try {
    const response = await $fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: {
        text: [product.name, product.description || '', product.shortDescription || ''],
        target_lang: targetLang.toUpperCase()
      }
    })

    const translations = response.translations
    translatedProduct.name = translations[0].text
    translatedProduct.description = translations[1].text
    translatedProduct.shortDescription = translations[2].text

    await storage.setItem(cacheKey, translatedProduct)
    
  } catch (error) {
    console.error('Translation failed:', error)
    return product 
  }

  return translatedProduct
})
