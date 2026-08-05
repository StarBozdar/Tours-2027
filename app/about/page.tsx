import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'What 2027.tours is, how it works, and how tour information is verified.'
}

export default function AboutPage() {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display">
      <h1>About 2027.tours</h1>
      <p>
        2027.tours tracks concert tour announcements for the year 2027. Each artist gets one page,
        updated as real information becomes available — confirmed dates when they exist, an honest
        "nothing announced yet" when they don't.
      </p>
      <h2>How we verify information</h2>
      <p>
        Every page is built from official sources: artist and band websites, verified press releases,
        and reputable music press (Billboard, Rolling Stone, and similar outlets). We don't rely on fan
        forums, unverified social media posts, or other tour-tracking sites as primary sources.
      </p>
      <h2>Confirmed vs. rumor</h2>
      <p>
        Every page clearly separates what's officially confirmed from what's rumored or speculative.
        We also actively call out fabricated "leaked" tour dates when we find them circulating for a
        given artist, rather than staying silent on misinformation.
      </p>
      <h2>What we're not</h2>
      <p>
        We don't sell tickets, and we're not affiliated with any artist, label, venue, or ticketing
        platform. Every ticket link points to an official source.
      </p>
    </article>
  )
}
