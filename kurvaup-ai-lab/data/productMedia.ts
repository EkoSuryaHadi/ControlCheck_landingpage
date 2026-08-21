export type ProductMedia = {
  screenshot?: string
  demoUrl?: string
  badge?: string
}

const productMedia: Record<string, ProductMedia> = {
  'controlcheck-ai': {
    // Put the real screenshot at: public/products/controlcheck-ai/dashboard.png
    screenshot: '/products/controlcheck-ai/dashboard.png',
    // Replace this with the real ControlCheck AI URL when ready.
    // Example: 'https://controlcheck.kurvaup.com'
    demoUrl: '',
    badge: 'Featured Product',
  },

  // Add media for the next products later, for example:
  // valoris: {
  //   screenshot: '/products/valoris/dashboard.png',
  //   demoUrl: 'https://valoris.kurvaup.com',
  // },
}

export function getProductMedia(slug: string): ProductMedia {
  return productMedia[slug] ?? {}
}
