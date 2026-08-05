import type { MetadataRoute } from 'next'
import { getAllTours } from '@/lib/tours'

const BASE_URL = 'https://2027.tours'

export default function sitemap(): MetadataRoute.Sitemap {
  const tours = getAllTours()
  const mostRecentUpdate = tours[0]?.lastUpdated ? new Date(tours[0].lastUpdated) : new Date()

  return [
    {
      url: BASE_URL,
      lastModified: mostRecentUpdate,
      changeFrequency: 'daily',
      priority: 1
    },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.1 },
    ...tours.map((tour) => ({
      url: `${BASE_URL}/tours/${tour.slug}`,
      lastModified: new Date(tour.lastUpdated),
      changeFrequency: 'daily' as const,
      priority: tour.status === 'confirmed' ? 0.9 : 0.7
    }))
  ]
}
