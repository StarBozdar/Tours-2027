import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '2027 Tours | Concert & Tour Updates',
  description: 'The latest 2027 concert tour announcements, dates, venues, and ticket updates.',
  metadataBase: new URL('https://2027.tours')
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-body antialiased">
        <header className="border-b border-black/10">
          <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
            <a href="/" className="font-display text-2xl font-bold tracking-tight">
              2027<span className="text-accent">.</span>tours
            </a>
            <nav className="text-sm text-muted">
              <a href="/" className="hover:text-ink">All Tours</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-black/10 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 text-sm text-muted">
            <p>&copy; {new Date().getFullYear()} 2027.tours — Independent tour update tracker. Not affiliated with any artist or ticketing platform.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
