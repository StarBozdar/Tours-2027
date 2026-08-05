import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for 2027.tours.'
}

export default function DisclaimerPage() {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display">
      <h1>Disclaimer</h1>
      <p>
        2027.tours is an independent, unofficial resource. It is not operated, sponsored, or endorsed
        by any of the artists, bands, labels, venues, or ticketing platforms mentioned on this site.
      </p>
      <p>
        Tour information changes frequently. While we verify information against official sources at
        the time of publishing or updating each page, we cannot guarantee that information remains
        accurate after that point. Always check the official source linked on each page before making
        travel or purchase decisions.
      </p>
      <p>
        Where a page identifies a specific claim circulating elsewhere as false or unverified, that
        assessment reflects the information available to us at the time of writing and may be revised
        if new official information emerges.
      </p>
    </article>
  )
}
