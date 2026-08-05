import Link from 'next/link'
import type { TourFrontmatter } from '@/lib/tours'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  rescheduled: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  rumored: 'bg-gray-100 text-gray-700'
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00Z').getTime()
  const now = Date.now()
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24))
}

export default function TourCard({ tour }: { tour: TourFrontmatter }) {
  const nextDate = tour.dates
    ?.filter((d) => daysUntil(d.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))[0]
  const countdown = nextDate ? daysUntil(nextDate.date) : null

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group block border border-black/10 rounded-xl p-5 bg-white hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold group-hover:text-accent transition-colors">{tour.artist}</h2>
          <p className="text-muted text-sm mt-1">{tour.tourName}</p>
        </div>
        <span className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[tour.status] || ''}`}>
          {tour.status}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {tour.genre && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-black/5 text-ink/70 font-medium">{tour.genre}</span>
        )}
        {countdown !== null && countdown <= 60 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
            {countdown === 0 ? 'Today' : `In ${countdown} days`}
          </span>
        )}
      </div>

      {nextDate ? (
        <p className="text-sm text-muted mt-3">
          Next: {nextDate.city} — {nextDate.venue}
        </p>
      ) : (
        <p className="text-sm text-muted mt-3">No dates announced yet</p>
      )}
      <p className="text-xs text-muted mt-3">Updated {tour.lastUpdated}</p>
    </Link>
  )
}
