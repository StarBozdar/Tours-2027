import { getAllTourSlugs, getTourBySlug } from '@/lib/tours'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Callout from '@/components/Callout'
import JsonLd from '@/components/JsonLd'

const BASE_URL = 'https://2027.tours'

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
    const title = `${primaryKeyword}: Dates, Tickets & News | 2027.tours`
    const description = `Latest updates on ${frontmatter.artist}'s ${frontmatter.tourName}: dates, venues, and status.`
    const url = `${BASE_URL}/tours/${params.slug}`

    return {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title,
        description,
        url,
        siteName: '2027.tours',
        type: 'article',
        modifiedTime: frontmatter.lastUpdated
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description
      }
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

const statusToEventStatus: Record<string, string> = {
  confirmed: 'https://schema.org/EventScheduled',
  rescheduled: 'https://schema.org/EventRescheduled',
  cancelled: 'https://schema.org/EventCancelled',
  rumored: 'https://schema.org/EventScheduled'
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
  const pageUrl = `${BASE_URL}/tours/${params.slug}`

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'All Tours', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: primaryKeyword, item: pageUrl }
    ]
  }

  const eventLd =
    frontmatter.dates?.length > 0
      ? frontmatter.dates.map((d) => ({
          '@context': 'https://schema.org',
          '@type': 'MusicEvent',
          name: `${frontmatter.artist}: ${frontmatter.tourName}`,
          startDate: d.date,
          eventStatus: statusToEventStatus[frontmatter.status] || 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          location: {
            '@type': 'Place',
            name: d.venue,
            address: d.city
          },
          performer: {
            '@type': 'MusicGroup',
            name: frontmatter.artist
          },
          ...(d.ticketLink && {
            offers: {
              '@type': 'Offer',
              url: d.ticketLink,
              availability: 'https://schema.org/InStock'
            }
          })
        }))
      : []

  const faqLd =
    frontmatter.faqs && frontmatter.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: frontmatter.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a
            }
          }))
        }
      : null

  return (
    <article>
      <JsonLd data={breadcrumbLd} />
      {eventLd.map((e, i) => (
        <JsonLd key={i} data={e} />
      ))}
      {faqLd && <JsonLd data={faqLd} />}

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

      {frontmatter.faqs && frontmatter.faqs.length > 0 && (
        <div className="mt-10 pt-6 border-t border-black/10">
          <h2 className="font-display text-2xl font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-4">
            {frontmatter.faqs.map((f, i) => (
              <div key={i} className="border border-black/10 rounded-lg p-4">
                <p className="font-semibold mb-1">{f.q}</p>
                <p className="text-sm text-ink/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
