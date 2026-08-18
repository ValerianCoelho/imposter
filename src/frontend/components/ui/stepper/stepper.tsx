import { Minus, Plus } from 'lucide-react'

interface StepperProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  minDisabled?: boolean
  maxDisabled?: boolean
}

export default function Stepper({
  value,
  onIncrement,
  onDecrement,
  minDisabled = false,
  maxDisabled = false,
}: StepperProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onDecrement}
        disabled={minDisabled}
        aria-label="Decrease"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-neutral-200"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>

      <span className="w-6 text-center text-lg font-extrabold text-black">
        {value}
      </span>

      <button
        type="button"
        onClick={onIncrement}
        disabled={maxDisabled}
        aria-label="Increase"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F6D75C] text-black transition-colors disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-[#EFCA41]"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
