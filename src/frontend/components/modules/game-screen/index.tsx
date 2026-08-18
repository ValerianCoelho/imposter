import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function GameScreen() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-6 py-10 text-center">
      <button
        type="button"
        onClick={() => navigate('/')}
        aria-label="Back"
        className="self-start flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-black hover:bg-neutral-200"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
      </button>

      <p className="text-lg font-bold text-black">Game coming soon</p>
      <p className="text-sm text-neutral-500">
        This is where player reveal cards will be dealt.
      </p>
    </div>
  )
}
