import { ArrowLeft, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../../../../store/game-store'

const AVATAR_TINTS = [
  '#D8E1F5',
  '#FBD6D6',
  '#D7F0E0',
  '#FBEAC0',
  '#E3DEF5',
  '#FBE3C6',
]

export default function PlayersScreen() {
  const navigate = useNavigate()
  const playerNames = useGameStore((state) => state.playerNames)
  const updatePlayerName = useGameStore((state) => state.updatePlayerName)
  const removePlayer = useGameStore((state) => state.removePlayer)

  const hasTrailingEmptyRow =
    playerNames.length > 0 && !playerNames[playerNames.length - 1].trim()
  const rows = hasTrailingEmptyRow ? playerNames : [...playerNames, '']

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 py-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-neutral-100"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide text-black">
            Players
          </h1>
          <p className="text-sm text-neutral-500">Who's playing this round?</p>
        </div>
      </div>

      <div className="divide-y divide-neutral-100 overflow-hidden rounded-3xl bg-white shadow-sm">
        {rows.map((name, index) => {
          const isVirtualRow = index >= playerNames.length

          return (
            <div key={index} className="flex items-center gap-4 px-4 py-2">
              <div
                style={{
                  backgroundColor: AVATAR_TINTS[index % AVATAR_TINTS.length],
                }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-black"
              >
                {name.trim() ? name.trim()[0].toUpperCase() : index + 1}
              </div>

              <input
                value={name}
                onChange={(event) => updatePlayerName(index, event.target.value)}
                placeholder={`Player ${index + 1}`}
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm font-bold text-black outline-none placeholder:text-neutral-400"
              />

              {!isVirtualRow && (
                <button
                  type="button"
                  onClick={() => removePlayer(index)}
                  aria-label="Remove player"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-black"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
