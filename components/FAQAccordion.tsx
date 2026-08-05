'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { homepageFaqs as faqs } from '@/lib/homepageFaqs'

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border border-black/10 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-medium hover:bg-black/[0.02] transition-colors"
            >
              <span>{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-accordion-open' : 'grid-rows-accordion-closed'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 text-sm text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
