import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { pickWeightedIndices } from '../lib/weighted-sample'

const MIN_IMPOSTER_COUNT = 1
const MAX_IMPOSTER_COUNT = 4

const IMPOSTER_WEIGHT_PENALTY = 0.5
const NON_IMPOSTER_WEIGHT_RECOVERY = 1.15
const MIN_WEIGHT = 0.15
const MAX_WEIGHT = 3

export interface GameRound {
  players: string[]
  imposterIndices: number[]
  startingPlayerIndex: number
}

interface GameState {
  playerNames: string[]
  categoryIds: string[]
  imposterCount: number
  hintEnabled: boolean
  imposterWeights: number[]
  currentRound: GameRound | null

  updatePlayerName: (index: number, name: string) => void
  removePlayer: (index: number) => void

  toggleCategory: (categoryId: string) => void

  incrementImposterCount: () => void
  decrementImposterCount: () => void

  setHintEnabled: (enabled: boolean) => void

  startRound: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerNames: [],
      categoryIds: [],
      imposterCount: MIN_IMPOSTER_COUNT,
      hintEnabled: false,
      imposterWeights: [],
      currentRound: null,

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

      startRound: () => {
        const state = get()
        const players = state.playerNames
          .map((name) => name.trim())
          .filter(Boolean)

        const weights =
          state.imposterWeights.length === players.length
            ? state.imposterWeights
            : players.map(() => 1)

        const imposterCount = Math.min(
          state.imposterCount,
          Math.max(players.length - 1, 1),
        )
        const imposterIndices = pickWeightedIndices(weights, imposterCount)

        const nextWeights = weights.map((weight, index) =>
          imposterIndices.includes(index)
            ? Math.max(weight * IMPOSTER_WEIGHT_PENALTY, MIN_WEIGHT)
            : Math.min(weight * NON_IMPOSTER_WEIGHT_RECOVERY, MAX_WEIGHT),
        )

        const eligibleStarters = state.hintEnabled
          ? players.map((_, index) => index)
          : players
              .map((_, index) => index)
              .filter((index) => !imposterIndices.includes(index))
        const startingPlayerIndex =
          eligibleStarters[Math.floor(Math.random() * eligibleStarters.length)]

        set({
          imposterWeights: nextWeights,
          currentRound: { players, imposterIndices, startingPlayerIndex },
        })
      },
    }),
    {
      name: 'imposter-game-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        playerNames: state.playerNames,
        categoryIds: state.categoryIds,
        imposterCount: state.imposterCount,
        hintEnabled: state.hintEnabled,
      }),
    },
  ),
)

export { MIN_IMPOSTER_COUNT, MAX_IMPOSTER_COUNT }
