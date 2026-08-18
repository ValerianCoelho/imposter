import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { pickWeightedIndices } from '../lib/weighted-sample'
import wordBank from '../../database/word-bank.json'

const MIN_IMPOSTER_COUNT = 1
const MAX_IMPOSTER_COUNT = 4

const IMPOSTER_WEIGHT_PENALTY = 0.5
const NON_IMPOSTER_WEIGHT_RECOVERY = 1.15
const MIN_WEIGHT = 0.15
const MAX_WEIGHT = 3

const DEFAULT_CATEGORY_IDS = ['everyday-objects', 'famous-people', 'foods-drinks']

const WORD_BANK: Record<string, { word: string; hint: string }[]> = wordBank

export interface GameRound {
  players: string[]
  imposterIndices: number[]
  startingPlayerIndex: number
  word: string
  hint: string
}

interface GameState {
  playerNames: string[]
  categoryIds: string[]
  imposterCount: number
  hintEnabled: boolean
  imposterWeights: number[]
  usedWords: string[]
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
      categoryIds: DEFAULT_CATEGORY_IDS,
      imposterCount: MIN_IMPOSTER_COUNT,
      hintEnabled: false,
      imposterWeights: [],
      usedWords: [],
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

        const wordPool = state.categoryIds.flatMap(
          (categoryId) => WORD_BANK[categoryId] ?? [],
        )
        const unusedEntries = wordPool.filter(
          (entry) => !state.usedWords.includes(entry.word),
        )
        const wordCandidates = unusedEntries.length > 0 ? unusedEntries : wordPool
        const chosenEntry =
          wordCandidates[Math.floor(Math.random() * wordCandidates.length)]

        set({
          imposterWeights: nextWeights,
          usedWords:
            chosenEntry && unusedEntries.length > 0
              ? [...state.usedWords, chosenEntry.word]
              : chosenEntry
                ? [chosenEntry.word]
                : state.usedWords,
          currentRound: {
            players,
            imposterIndices,
            startingPlayerIndex,
            word: chosenEntry?.word ?? '',
            hint: chosenEntry?.hint ?? '',
          },
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
