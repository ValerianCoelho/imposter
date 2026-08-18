import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionCardProps {
  label: string
  preview: string
  onClick: () => void
  icon?: ReactNode
}

export default function SectionCard({
  label,
  preview,
  onClick,
  icon,
}: SectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition-colors hover:bg-neutral-50"
    >
      {icon}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-black">{label}</p>
        <p className="truncate text-sm text-neutral-500">{preview}</p>
      </div>

      <ChevronRight size={20} className="shrink-0 text-neutral-400" />
    </button>
  )
}
