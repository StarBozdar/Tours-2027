import type { MetadataRoute } from 'next'
import { getAllTours } from '@/lib/tours'

const BASE_URL = 'https://2027.tours'

export default function sitemap(): MetadataRoute.Sitemap {
  const tours = getAllTours()

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    ...tours.map((tour) => ({
      url: `${BASE_URL}/tours/${tour.slug}`,
      lastModified: new Date(tour.lastUpdated),
      changeFrequency: 'daily' as const,
      priority: tour.status === 'confirmed' ? 0.9 : 0.7
    }))
  ]
}
