import { ArrowLeft, Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../../../store/game-store'

export default function PlayersScreen() {
  const navigate = useNavigate()
  const playerNames = useGameStore((state) => state.playerNames)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const updatePlayerName = useGameStore((state) => state.updatePlayerName)
  const removePlayer = useGameStore((state) => state.removePlayer)

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 py-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-black hover:bg-neutral-200"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="text-2xl font-extrabold tracking-wide text-black">
          Players
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        {playerNames.map((name, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 shadow-sm"
          >
            <input
              value={name}
              onChange={(event) => updatePlayerName(index, event.target.value)}
              placeholder={`Player ${index + 1}`}
              className="min-w-0 flex-1 bg-transparent py-2 text-sm font-medium text-black outline-none placeholder:text-neutral-400"
            />
            <button
              type="button"
              onClick={() => removePlayer(index)}
              disabled={playerNames.length <= 1}
              aria-label="Remove player"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors disabled:cursor-not-allowed disabled:opacity-30 enabled:hover:bg-neutral-100 enabled:hover:text-black"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addPlayer}
        className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-neutral-50"
      >
        <Plus size={18} strokeWidth={2.5} />
        Add player
      </button>
    </div>
  )
}
