'use client'

import { useMemo, useState } from 'react'
import type { TourFrontmatter } from '@/lib/tours'
import TourCard from './TourCard'

type FilterTab = 'all' | 'confirmed' | 'rumored'

export default function TourExplorer({ tours }: { tours: TourFrontmatter[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterTab>('all')

  const genres = useMemo(() => {
    const set = new Set(tours.map((t) => t.genre).filter(Boolean) as string[])
    return Array.from(set)
  }, [tours])

  const [genreFilter, setGenreFilter] = useState<string | null>(null)

  const filtered = tours.filter((t) => {
    const matchesQuery =
      query.trim() === '' ||
      t.artist.toLowerCase().includes(query.toLowerCase()) ||
      t.tourName.toLowerCase().includes(query.toLowerCase())
    const matchesStatus =
      filter === 'all' ||
      (filter === 'confirmed' && t.status === 'confirmed') ||
      (filter === 'rumored' && (t.status === 'rumored' || t.status === 'cancelled' || t.status === 'rescheduled'))
    const matchesGenre = !genreFilter || t.genre === genreFilter
    return matchesQuery && matchesStatus && matchesGenre
  })

  const confirmedCount = tours.filter((t) => t.status === 'confirmed').length

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artists or tours..."
          className="w-full border border-black/15 rounded-xl px-5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 bg-white"
        />
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {(['all', 'confirmed', 'rumored'] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition ${
              filter === tab ? 'bg-ink text-paper' : 'bg-black/5 text-ink/70 hover:bg-black/10'
            }`}
          >
            {tab === 'all' ? `All (${tours.length})` : tab === 'confirmed' ? `Confirmed (${confirmedCount})` : 'Not Confirmed'}
          </button>
        ))}
      </div>

      {/* Genre filter chips */}
      {genres.length > 0 && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setGenreFilter(null)}
            className={`text-xs px-3 py-1 rounded-full border transition ${
              !genreFilter ? 'border-accent text-accent' : 'border-black/10 text-muted hover:border-black/20'
            }`}
          >
            All genres
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setGenreFilter(g === genreFilter ? null : g)}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                genreFilter === g ? 'border-accent text-accent' : 'border-black/10 text-muted hover:border-black/20'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-muted py-10 text-center">No tours match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      )}
    </div>
  )
}
