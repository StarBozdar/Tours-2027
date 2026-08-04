import Link from 'next/link'
import type { TourFrontmatter } from '@/lib/tours'

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  rescheduled: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  rumored: 'bg-gray-100 text-gray-700'
}

export default function TourCard({ tour }: { tour: TourFrontmatter }) {
  const nextDate = tour.dates?.[0]
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="block border border-black/10 rounded-lg p-5 hover:border-accent/50 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">{tour.artist}</h2>
          <p className="text-muted text-sm mt-1">{tour.tourName}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[tour.status] || ''}`}>
          {tour.status}
        </span>
      </div>
      {nextDate && (
        <p className="text-sm text-muted mt-4">
          Next: {nextDate.city} — {nextDate.venue}
        </p>
      )}
      <p className="text-xs text-muted mt-3">Updated {tour.lastUpdated}</p>
    </Link>
  )
}
