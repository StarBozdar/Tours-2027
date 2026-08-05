'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="flex flex-col sm:flex-row gap-3 max-w-md"
    >
      {submitted ? (
        <p className="text-sm text-muted">
          Thanks for the interest — email signup isn't connected yet, but it's coming soon.
        </p>
      ) : (
        <>
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white"
          />
          <button
            type="submit"
            className="bg-ink text-paper px-5 py-3 rounded-xl text-sm font-medium hover:bg-ink/90 transition whitespace-nowrap"
          >
            Notify me
          </button>
        </>
      )}
    </form>
  )
}
