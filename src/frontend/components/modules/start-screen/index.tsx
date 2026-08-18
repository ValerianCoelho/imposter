import { Tags, Users } from 'lucide-react'
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
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-extrabold tracking-wide text-black">
        IMPOSTER
      </h1>

      <div className="flex flex-col gap-3">
        <SectionCard
          label="Players"
          preview={playersPreview}
          onClick={() => navigate('/players')}
          icon={<Users size={22} className="shrink-0 text-black" />}
        />
        <SectionCard
          label="Categories"
          preview={categoriesPreview}
          onClick={() => navigate('/categories')}
          icon={<Tags size={22} className="shrink-0 text-black" />}
        />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-black">Imposters</p>
          <Stepper
            value={imposterCount}
            onIncrement={incrementImposterCount}
            onDecrement={decrementImposterCount}
            minDisabled={imposterCount <= MIN_IMPOSTER_COUNT}
            maxDisabled={imposterCount >= MAX_IMPOSTER_COUNT}
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-black">Show hint</p>
          <Toggle
            checked={hintEnabled}
            onChange={setHintEnabled}
            label="Show hint"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/game')}
        disabled={!canStart}
        className="rounded-2xl bg-[#F6D75C] px-5 py-4 text-center text-base font-extrabold tracking-wide text-black shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 enabled:hover:bg-[#EFCA41]"
      >
        START GAME
      </button>
      {!canStart && (
        <p className="-mt-3 text-center text-xs text-neutral-500">
          Add at least {MIN_PLAYERS_TO_START} players and select a category to
          start.
        </p>
      )}
    </div>
  )
}
