import { ImageResponse } from 'next/og'
import { getAllTourSlugs, getTourBySlug } from '@/lib/tours'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }))
}

const statusColors: Record<string, string> = {
  confirmed: '#16A34A',
  rescheduled: '#CA8A04',
  cancelled: '#DC2626',
  rumored: '#6B7280'
}

export default function OGImage({ params }: { params: { slug: string } }) {
  let artist = params.slug
  let status = 'rumored'
  try {
    const { frontmatter } = getTourBySlug(params.slug)
    artist = frontmatter.artist
    status = frontmatter.status
  } catch {
    // fall back to slug-based defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: '#0B0F14',
          padding: '80px',
          fontFamily: 'Georgia, serif'
        }}
      >
        <div style={{ fontSize: 28, color: '#9CA3AF', display: 'flex', marginBottom: 20 }}>
          2027<span style={{ color: '#E63946' }}>.</span>tours
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, color: '#FAFAF8', display: 'flex' }}>
          {artist}
        </div>
        <div style={{ fontSize: 40, color: '#FAFAF8', opacity: 0.8, marginTop: 10, display: 'flex' }}>
          Tour 2027
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            color: '#0B0F14',
            background: statusColors[status] || '#6B7280',
            padding: '10px 24px',
            borderRadius: 999,
            textTransform: 'capitalize',
            display: 'flex'
          }}
        >
          {status}
        </div>
      </div>
    ),
    { ...size }
  )
}
