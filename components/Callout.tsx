import type { ReactNode } from 'react'

type CalloutType = 'confirmed' | 'rumor' | 'speculation' | 'warning'

const styles: Record<CalloutType, { border: string; bg: string; title: string; label: string }> = {
  confirmed: {
    border: 'border-green-500',
    bg: 'bg-green-50',
    title: 'text-green-800',
    label: '✅ Confirmed'
  },
  rumor: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    title: 'text-amber-800',
    label: '⚠️ Rumor'
  },
  speculation: {
    border: 'border-gray-400',
    bg: 'bg-gray-50',
    title: 'text-gray-700',
    label: '🔍 Speculation'
  },
  warning: {
    border: 'border-accent',
    bg: 'bg-red-50',
    title: 'text-accent',
    label: '⚠️ Watch out'
  }
}

export default function Callout({
  type,
  title,
  children
}: {
  type: CalloutType
  title?: string
  children: ReactNode
}) {
  const s = styles[type]
  return (
    <div className={`not-prose border-l-4 ${s.border} ${s.bg} rounded-r-lg p-5 my-6`}>
      <p className={`font-semibold ${s.title} mb-2`}>{title || s.label}</p>
      <div className="text-sm text-ink/80 space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1">
        {children}
      </div>
    </div>
  )
}
