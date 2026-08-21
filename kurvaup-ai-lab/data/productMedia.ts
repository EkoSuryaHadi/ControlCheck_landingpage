export type ProductMedia = {
  screenshot: string
  demoUrl?: string
  badge?: string
}

export const productMedia: Record<string, ProductMedia> = {
  'controlcheck-ai': {
    screenshot: '/products/controlcheck-ai/dashboard.png',
    demoUrl: '',
    badge: 'Featured Product',
  },

  'valoris': {
    screenshot: '/products/valoris/dashboard.png',
    demoUrl: '',
    badge: 'Beta',
  },

  'epc-delay-predictor': {
    screenshot: '/products/epc-delay-predictor/dashboard.png',
    demoUrl: '',
    badge: 'Beta',
  },

  'risk-analyst-pro': {
    screenshot: '/products/risk-analyst-pro/dashboard.png',
    demoUrl: '',
    badge: 'Beta',
  },

  'epc-schedule-optimizer': {
    screenshot: '/products/epc-schedule-optimizer/dashboard.png',
    demoUrl: '',
    badge: 'Beta',
  },

  'qaqc-intelligence': {
    screenshot: '/products/qaqc-intelligence/dashboard.png',
    demoUrl: '',
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