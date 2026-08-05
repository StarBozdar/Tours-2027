'use client'

import { useState } from 'react'
import { homepageFaqs as faqs } from '@/lib/homepageFaqs'

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
