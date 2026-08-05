import { getAllTourSlugs, getTourBySlug } from '@/lib/tours'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Callout from '@/components/Callout'

export async function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const { frontmatter } = getTourBySlug(params.slug)
    const primaryKeyword = frontmatter.primaryKeyword || `${frontmatter.artist} Tour 2027`
    return {
      title: `${primaryKeyword}: Dates, Tickets & News | 2027.tours`,
      description: `Latest updates on ${frontmatter.artist}'s ${frontmatter.tourName}: dates, venues, and status.`
    }
  } catch {
    return {}
  }
}

const statusColors: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  rescheduled: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-red-100 text-red-800',
  rumored: 'bg-gray-100 text-gray-700'
}

export default function TourPage({ params }: { params: { slug: string } }) {
  let tour
  try {
    tour = getTourBySlug(params.slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = tour!
  const primaryKeyword = frontmatter.primaryKeyword || `${frontmatter.artist} Tour 2027`

  return (
    <article>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h1 className="font-display text-3xl font-bold">{frontmatter.artist}</h1>
        <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[frontmatter.status] || ''}`}>
          {frontmatter.status}
        </span>
      </div>
      <h2 className="font-display text-lg font-semibold text-accent mb-3">{primaryKeyword}</h2>
      <p className="text-muted mb-6">{frontmatter.tourName} — Updated {frontmatter.lastUpdated}</p>

      {frontmatter.dates?.length > 0 && (
        <div className="mb-8 border border-black/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/5 text-left">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Venue</th>
                <th className="px-4 py-2">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {frontmatter.dates.map((d, i) => (
                <tr key={i} className="border-t border-black/10">
                  <td className="px-4 py-2">{d.date}</td>
                  <td className="px-4 py-2">{d.city}</td>
                  <td className="px-4 py-2">{d.venue}</td>
                  <td className="px-4 py-2">
                    {d.ticketLink ? (
                      <a href={d.ticketLink} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                        Get tickets
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="prose prose-neutral max-w-none prose-headings:font-display prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-black/10 prose-h2:pb-2 prose-h3:text-lg prose-h3:mt-6 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-table:text-sm prose-blockquote:border-accent prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-muted">
        <MDXRemote source={content} components={{ Callout }} />
      </div>
    </article>
  )
}
