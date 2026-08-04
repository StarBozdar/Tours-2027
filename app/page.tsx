import { getAllTours } from '@/lib/tours'
import TourCard from '@/components/TourCard'

export default function HomePage() {
  const tours = getAllTours()

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl font-bold">2027 Concert & Tour Updates</h1>
        <p className="text-muted mt-3 max-w-2xl">
          Tracking the latest 2027 tour announcements, dates, venues, and ticket news — updated as things change.
        </p>
      </section>

      {tours.length === 0 ? (
        <p className="text-muted">No tour updates published yet. Check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {tours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      )}
    </div>
  )
}
