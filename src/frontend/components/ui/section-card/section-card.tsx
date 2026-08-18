import { ChevronRight } from 'lucide-react'

interface SectionCardProps {
  label: string
  preview: string
  onClick: () => void
  emoji: string
  tint: string
}

export default function SectionCard({
  label,
  preview,
  onClick,
  emoji,
  tint,
}: SectionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-3xl bg-white px-4 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        style={{ backgroundColor: tint }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
      >
        {emoji}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-base font-extrabold text-black">{label}</p>
        <p className="truncate text-sm text-neutral-500">{preview}</p>
      </div>

      <ChevronRight size={20} className="shrink-0 text-neutral-300" />
    </button>
  )
}
