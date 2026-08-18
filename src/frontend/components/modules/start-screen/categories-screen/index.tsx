import { ArrowLeft, CircleCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { CATEGORY_OPTIONS } from '../../../../constants/categories'
import { useGameStore } from '../../../../store/game-store'

export default function CategoriesScreen() {
  const navigate = useNavigate()
  const categoryIds = useGameStore((state) => state.categoryIds)
  const toggleCategory = useGameStore((state) => state.toggleCategory)

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
            Categories
          </h1>
          <p className="text-sm text-neutral-500">Pick where the word comes from</p>
        </div>
      </div>

      <div className="divide-y divide-neutral-100 overflow-hidden rounded-3xl bg-white shadow-sm">
        {CATEGORY_OPTIONS.map((category) => {
          const isSelected = categoryIds.includes(category.id)

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-neutral-50"
            >
              <div
                style={{ backgroundColor: category.tint }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
              >
                {category.emoji}
              </div>

              <span className="flex-1 text-sm font-bold text-black">
                {category.label}
              </span>

              {isSelected && (
                <CircleCheck
                  size={20}
                  className="shrink-0 fill-[#F6D75C] text-black"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
