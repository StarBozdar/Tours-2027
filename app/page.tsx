import type { Metadata } from 'next'
import { getAllTours } from '@/lib/tours'
import { homepageFaqs } from '@/lib/homepageFaqs'
import JsonLd from '@/components/JsonLd'
import TourExplorer from '@/components/TourExplorer'
import FAQAccordion from '@/components/FAQAccordion'
import NewsletterForm from '@/components/NewsletterForm'

export const metadata: Metadata = {
  title: '2027 Concert Tours: Confirmed Dates, Tickets & Tour News',
  description:
    'Track every confirmed and rumored 2027 concert tour in one place. Real dates, official ticket links, and honest status updates — no fabricated schedules.'
}

export default function HomePage() {
  const tours = getAllTours()
  const confirmedCount = tours.filter((t) => t.status === 'confirmed').length
  const confirmedTours = tours.filter((t) => t.status === 'confirmed')
  const unconfirmedTours = tours.filter((t) => t.status !== 'confirmed')
  const genres = Array.from(new Set(tours.map((t) => t.genre).filter(Boolean) as string[]))
  const totalDates = tours.reduce((sum, t) => sum + (t.dates?.length || 0), 0)

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

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }

  return (
    <div>
      <JsonLd data={websiteLd} />
      {tours.length > 0 && <JsonLd data={itemListLd} />}
      <JsonLd data={faqLd} />

      {/* Hero */}
      <section className="mb-4 pt-6 pb-12 border-b border-black/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:border-0 sm:pb-0">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl">
          Find the latest 2027 concert tours
        </h1>
        <p className="text-muted mt-4 max-w-xl text-lg">
          Real dates when they're confirmed. Honest "nothing announced yet" when they're not.
          No fabricated schedules, ever.
        </p>

        <div className="flex items-center gap-6 mt-6 text-sm text-muted">
          <span>
            <strong className="text-ink font-semibold">{tours.length}</strong> artists tracked
          </span>
          <span>
            <strong className="text-ink font-semibold">{confirmedCount}</strong> with confirmed dates
          </span>
          <span>
            <strong className="text-ink font-semibold">{totalDates}</strong> tour dates listed
          </span>
        </div>
      </section>

      {/* Search + filter + grid */}
      <section className="mb-16 pt-10">
        <TourExplorer tours={tours} />
      </section>

      {/* Crawlable summary content - confirmed tours */}
      {confirmedTours.length > 0 && (
        <section className="mb-16 py-10 border-t border-black/10">
          <h2 className="font-display text-2xl font-bold mb-4">Confirmed 2027 tour dates so far</h2>
          <p className="text-muted mb-6 max-w-2xl">
            As of {tours[0]?.lastUpdated}, {confirmedCount} of the {tours.length} artists we're tracking
            have officially confirmed 2027 tour dates{genres.length > 0 ? `, spanning genres including ${genres.join(', ')}` : ''}.
            Here's the current confirmed list:
          </p>
          <ul className="space-y-2">
            {confirmedTours.map((t) => (
              <li key={t.slug} className="text-sm">
                <a href={`/tours/${t.slug}`} className="font-semibold text-accent hover:underline">
                  {t.artist}
                </a>
                <span className="text-muted"> — {t.tourName}, {t.dates.length} confirmed date{t.dates.length !== 1 ? 's' : ''}, first show {t.dates[0]?.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Crawlable summary content - unconfirmed / rumored */}
      {unconfirmedTours.length > 0 && (
        <section className="mb-16 py-10 border-t border-black/10">
          <h2 className="font-display text-2xl font-bold mb-4">2027 tours that haven't been confirmed yet</h2>
          <p className="text-muted mb-6 max-w-2xl">
            Not every artist has announced 2027 plans yet. These pages track the real state of things —
            rumors, hints from the artist, or a plain "nothing announced" — updated as new information
            comes out.
          </p>
          <ul className="space-y-2">
            {unconfirmedTours.map((t) => (
              <li key={t.slug} className="text-sm">
                <a href={`/tours/${t.slug}`} className="font-semibold text-accent hover:underline">
                  {t.artist}
                </a>
                <span className="text-muted capitalize"> — status: {t.status}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Why this site */}
      <section className="mb-16 py-10 border-t border-black/10">
        <h2 className="font-display text-2xl font-bold mb-6">Why trust this over other tour sites</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-semibold mb-1">✅ Confirmed vs. rumor, always separated</p>
            <p className="text-sm text-muted">We never present a fan tweet as an official announcement. Every page tells you exactly how certain each piece of information is.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">🔍 Misinformation gets called out</p>
            <p className="text-sm text-muted">When a fake "leaked" schedule is circulating for an artist, we name it and explain why it isn't real — not just stay silent on it.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">🔗 Official sources, every time</p>
            <p className="text-sm text-muted">Every page links directly to the artist's official site or verified press coverage — never resale sites or unverified aggregators.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16 py-10 border-t border-black/10">
        <h2 className="font-display text-2xl font-bold mb-6">Frequently asked questions</h2>
        <FAQAccordion />
      </section>

      {/* Newsletter */}
      <section className="py-10 border-t border-black/10">
        <h2 className="font-display text-2xl font-bold mb-2">Never miss a tour announcement</h2>
        <p className="text-muted mb-5 max-w-md">Get notified when a tracked artist's tour status changes.</p>
        <NewsletterForm />
      </section>
    </div>
  )
}
