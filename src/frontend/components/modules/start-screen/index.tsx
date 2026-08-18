import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../../ui/section-card'
import { Stepper } from '../../ui/stepper'
import { Toggle } from '../../ui/toggle'
import { CATEGORY_OPTIONS } from '../../../constants/categories'
import {
  MAX_IMPOSTER_COUNT,
  MIN_IMPOSTER_COUNT,
  useGameStore,
} from '../../../store/game-store'

const MIN_PLAYERS_TO_START = 3

export default function StartScreen() {
  const navigate = useNavigate()
  const playerNames = useGameStore((state) => state.playerNames)
  const categoryIds = useGameStore((state) => state.categoryIds)
  const imposterCount = useGameStore((state) => state.imposterCount)
  const hintEnabled = useGameStore((state) => state.hintEnabled)
  const incrementImposterCount = useGameStore(
    (state) => state.incrementImposterCount,
  )
  const decrementImposterCount = useGameStore(
    (state) => state.decrementImposterCount,
  )
  const setHintEnabled = useGameStore((state) => state.setHintEnabled)
  const startRound = useGameStore((state) => state.startRound)

  const filledPlayerNames = playerNames.filter((name) => name.trim())
  const playersPreview =
    filledPlayerNames.length > 0
      ? filledPlayerNames.join(', ')
      : 'Add players'

  const selectedCategoryLabels = CATEGORY_OPTIONS.filter((category) =>
    categoryIds.includes(category.id),
  ).map((category) => category.label)
  const categoriesPreview =
    selectedCategoryLabels.length > 0
      ? selectedCategoryLabels.join(', ')
      : 'Select categories'

  const canStart =
    filledPlayerNames.length >= MIN_PLAYERS_TO_START &&
    selectedCategoryLabels.length > 0

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-7 px-6 py-12">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-black">
          🕵️ Imposter
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Find out who doesn't know the word.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <SectionCard
          label="Players"
          preview={playersPreview}
          onClick={() => navigate('/players')}
          emoji="👥"
          tint="#D6E9FC"
        />
        <SectionCard
          label="Categories"
          preview={categoriesPreview}
          onClick={() => navigate('/categories')}
          emoji="🗂️"
          tint="#F0DEC8"
        />
      </div>

      <div className="flex flex-col gap-1 rounded-3xl bg-white px-4 py-2 shadow-sm">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FBD8D2] text-2xl">
              🎭
            </div>
            <p className="text-base font-extrabold text-black">Imposters</p>
          </div>
          <Stepper
            value={imposterCount}
            onIncrement={incrementImposterCount}
            onDecrement={decrementImposterCount}
            minDisabled={imposterCount <= MIN_IMPOSTER_COUNT}
            maxDisabled={imposterCount >= MAX_IMPOSTER_COUNT}
          />
        </div>

        <div className="h-px bg-neutral-100" />

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FDF1B8] text-2xl">
              💡
            </div>
            <p className="text-base font-extrabold text-black">Show hint</p>
          </div>
          <Toggle
            checked={hintEnabled}
            onChange={setHintEnabled}
            label="Show hint"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          startRound()
          navigate('/game')
        }}
        disabled={!canStart}
        className="rounded-full bg-[#F6D75C] px-5 py-4 text-center text-base font-extrabold tracking-wide text-black shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:-translate-y-0.5 enabled:hover:bg-[#EFCA41] enabled:hover:shadow-lg"
      >
        START GAME
      </button>
      {!canStart && (
        <p className="-mt-4 text-center text-xs text-neutral-500">
          Add at least {MIN_PLAYERS_TO_START} players and select a category to
          start.
        </p>
      )}
    </div>
  )
}
