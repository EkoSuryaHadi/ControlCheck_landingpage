import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KurvaUp AI Lab',
    short_name: 'KurvaUp AI',
    description: 'Practical AI products for project control, engineering, analytics, and assurance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07111f',
    theme_color: '#07111f',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
