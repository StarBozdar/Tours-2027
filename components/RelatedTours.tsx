import type { TourFrontmatter } from '@/lib/tours'
import TourCard from './TourCard'

export default function RelatedTours({
  currentSlug,
  allTours
}: {
  currentSlug: string
  allTours: TourFrontmatter[]
}) {
  const others = allTours.filter((t) => t.slug !== currentSlug)
  if (others.length === 0) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {others.map((tour) => (
        <TourCard key={tour.slug} tour={tour} />
      ))}
    </div>
  )
}
