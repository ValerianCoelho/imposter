import { ArrowLeft } from 'lucide-react'
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
          className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-black hover:bg-neutral-200"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <h1 className="text-2xl font-extrabold tracking-wide text-black">
          Categories
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((category) => {
          const isSelected = categoryIds.includes(category.id)

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                isSelected
                  ? 'border-[#EFCA41] bg-[#F6D75C] text-black'
                  : 'border-neutral-200 bg-white text-black hover:bg-neutral-50'
              }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
