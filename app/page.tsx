import { getAllTours } from '@/lib/tours'
import TourCard from '@/components/TourCard'
import JsonLd from '@/components/JsonLd'

export default function HomePage() {
  const tours = getAllTours()

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '2027.tours',
    url: 'https://2027.tours',
    description: 'Independent tracker for 2027 concert tour announcements, dates, venues, and ticket updates.'
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: tours.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://2027.tours/tours/${t.slug}`,
      name: `${t.artist} Tour 2027`
    }))
  }

  return (
    <div>
      <JsonLd data={websiteLd} />
      {tours.length > 0 && <JsonLd data={itemListLd} />}
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
