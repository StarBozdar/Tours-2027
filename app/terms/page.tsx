import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms for using 2027.tours.'
}

export default function TermsPage() {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display">
      <h1>Terms of Use</h1>
      <p>Last updated: August 2026</p>
      <p>
        2027.tours is provided as an informational resource, free to use. By using this site, you
        agree to the following:
      </p>
      <h2>Information accuracy</h2>
      <p>
        We make a genuine effort to verify tour information against official sources before
        publishing, and we label confirmed information separately from rumors and speculation.
        However, tour dates change — always confirm details directly with the official ticketing
        source before making travel plans or purchases.
      </p>
      <h2>No ticket sales</h2>
      <p>
        We do not sell tickets. All ticket links point to official third-party sources. We are not
        responsible for transactions made on those external sites.
      </p>
      <h2>No affiliation</h2>
      <p>
        This site is not affiliated with, endorsed by, or officially connected to any artist, band,
        label, venue, or ticketing platform referenced on this site.
      </p>
    </article>
  )
}
