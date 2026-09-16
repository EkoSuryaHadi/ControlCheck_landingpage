export type ProductMedia = {
  screenshot: string
  demoUrl?: string
  badge?: string
}

export const productMedia: Record<string, ProductMedia> = {
  'controlcheck-ai': {
    screenshot: '/products/controlcheck-ai/dashboard.png',
    demoUrl: 'https://rabbit-testimonials-earliest-kits.trycloudflare.com',
    badge: 'Beta',
  },

  'valoris': {
    screenshot: '/products/valoris/dashboard.png',
    demoUrl: 'https://cost-control-six.vercel.app/',
    badge: 'Beta',
  },

  'epc-delay-predictor': {
    screenshot: '/products/epc-delay-predictor/dashboard.png',
    demoUrl: 'https://epc-delay-predictor-web.vercel.app/',
    badge: 'Beta',
  },

  'risk-analyst-pro': {
    screenshot: '/products/risk-analyst-pro/dashboard.png',
    demoUrl: '',
    badge: 'Development',
  },

  'epc-schedule-optimizer': {
    screenshot: '/products/epc-schedule-optimizer/dashboard.png',
    demoUrl: '',
    badge: 'Development',
  },

  'qaqc-intelligence': {
    screenshot: '/products/qaqc-intelligence/dashboard.png',
    demoUrl: 'https://quali-core-ai.vercel.app/',
    badge: 'Beta',
  },
}

export function getProductMedia(slug: string): ProductMedia {
  return (
    productMedia[slug] || {
      screenshot: '',
      demoUrl: '',
      badge: 'Beta',
    }
  )
}
