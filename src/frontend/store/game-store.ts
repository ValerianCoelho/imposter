import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const MIN_IMPOSTER_COUNT = 1
const MAX_IMPOSTER_COUNT = 4

interface GameState {
  playerNames: string[]
  categoryIds: string[]
  imposterCount: number
  hintEnabled: boolean

  updatePlayerName: (index: number, name: string) => void
  removePlayer: (index: number) => void

  toggleCategory: (categoryId: string) => void

  incrementImposterCount: () => void
  decrementImposterCount: () => void

  setHintEnabled: (enabled: boolean) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      playerNames: [],
      categoryIds: [],
      imposterCount: MIN_IMPOSTER_COUNT,
      hintEnabled: false,

      updatePlayerName: (index, name) =>
        set((state) => ({
          playerNames:
            index >= state.playerNames.length
              ? [...state.playerNames, name]
              : state.playerNames.map((existing, i) =>
                  i === index ? name : existing,
                ),
        })),

      removePlayer: (index) =>
        set((state) => ({
          playerNames: state.playerNames.filter((_, i) => i !== index),
        })),

      toggleCategory: (categoryId) =>
        set((state) => ({
          categoryIds: state.categoryIds.includes(categoryId)
            ? state.categoryIds.filter((id) => id !== categoryId)
            : [...state.categoryIds, categoryId],
        })),

      incrementImposterCount: () =>
        set((state) => ({
          imposterCount: Math.min(state.imposterCount + 1, MAX_IMPOSTER_COUNT),
        })),

      decrementImposterCount: () =>
        set((state) => ({
          imposterCount: Math.max(state.imposterCount - 1, MIN_IMPOSTER_COUNT),
        })),

      setHintEnabled: (enabled) => set({ hintEnabled: enabled }),
    }),
    {
      name: 'imposter-game-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { MIN_IMPOSTER_COUNT, MAX_IMPOSTER_COUNT }
