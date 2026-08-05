'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How often are tour listings updated?',
    a: "Every artist page gets rechecked and updated when we write or revise it — there's no fixed schedule, but the \"Updated\" date on each page tells you exactly when it was last verified against official sources."
  },
  {
    q: 'Do you sell tickets?',
    a: 'No. We link to official ticketing sources (artist websites, Ticketmaster, etc.) but never sell tickets ourselves or take a cut of sales.'
  },
  {
    q: "What's the difference between \"Confirmed\" and the other statuses?",
    a: '"Confirmed" means the dates come directly from an official announcement. Everything else — rumored, rescheduled, cancelled — is clearly labeled, and we separate real statements from artists out from pure fan speculation on every page.'
  },
  {
    q: 'Where does your information come from?',
    a: "Official artist and band websites, verified press releases, and reputable music press. We don't rely on fan forums, unverified social posts, or other \"tour tracker\" sites."
  },
  {
    q: "Can I request an artist you haven't covered?",
    a: 'Not yet through the site directly — check back as we expand coverage.'
  }
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div key={i} className="border border-black/10 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left px-5 py-4 font-medium hover:bg-black/[0.02] transition"
          >
            <span>{item.q}</span>
            <span className={`text-muted transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && <div className="px-5 pb-4 text-sm text-muted">{item.a}</div>}
        </div>
      ))}
    </div>
  )
}
