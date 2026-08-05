import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How 2027.tours handles data.'
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-none prose-headings:font-display">
      <h1>Privacy Policy</h1>
      <p>Last updated: August 2026</p>
      <p>
        2027.tours does not currently collect personal data through account creation, since there are
        no user accounts on this site. Standard web server logs (IP address, browser type, pages
        visited) may be collected automatically by our hosting provider for security and performance
        purposes.
      </p>
      <h2>Email signup</h2>
      <p>
        Any email signup form on this site is not currently connected to an active mailing list. If
        and when email notifications are enabled, this policy will be updated to describe what's
        collected and how it's used, and you'll only receive emails you explicitly opted into.
      </p>
      <h2>Third-party links</h2>
      <p>
        This site links to official artist, ticketing, and press websites. We aren't responsible for
        the privacy practices of those external sites.
      </p>
      <h2>Contact</h2>
      <p>Questions about this policy can be directed through the site owner's contact channels.</p>
    </article>
  )
}
