import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerCard } from '../../ui/PlayerCard'
import { useGameStore } from '../../../store/game-store'

export default function GameScreen() {
  const navigate = useNavigate()
  const currentRound = useGameStore((state) => state.currentRound)
  const hintEnabled = useGameStore((state) => state.hintEnabled)

  const [cardIndex, setCardIndex] = useState(0)
  const [hasRevealed, setHasRevealed] = useState(false)

  useEffect(() => {
    if (!currentRound) {
      navigate('/')
    }
  }, [currentRound, navigate])

  if (!currentRound) {
    return null
  }

  const { players, imposterIndices, startingPlayerIndex, word, hint } = currentRound
  const isLastCard = cardIndex === players.length - 1
  const isRoundComplete = cardIndex >= players.length

  if (isRoundComplete) {
    return (
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-6 py-10 text-center">
        <p className="text-lg font-bold text-black">Everyone's seen their card</p>

        <div className="flex flex-col items-center gap-1 rounded-3xl bg-white px-8 py-6 shadow-sm">
          <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            Starts first
          </p>
          <p className="text-2xl font-extrabold text-black">
            {players[startingPlayerIndex]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-full bg-[#F6D75C] px-6 py-3 text-sm font-extrabold tracking-wide text-black shadow-md transition-colors hover:bg-[#EFCA41]"
        >
          BACK HOME
        </button>
      </div>
    )
  }

  const isImposter = imposterIndices.includes(cardIndex)

  const goToNextCard = () => {
    setCardIndex((index) => index + 1)
    setHasRevealed(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-6 py-10">
      <p className="text-sm font-bold text-neutral-500">
        {cardIndex + 1} / {players.length}
      </p>

      {isImposter ? (
        <PlayerCard
          key={cardIndex}
          playerNumber={cardIndex + 1}
          playerName={players[cardIndex]}
          color={cardIndex}
          variant="imposter"
          hint={hintEnabled ? hint : undefined}
          onReveal={() => setHasRevealed(true)}
        />
      ) : (
        <PlayerCard
          key={cardIndex}
          playerNumber={cardIndex + 1}
          playerName={players[cardIndex]}
          color={cardIndex}
          variant="word"
          word={word}
          onReveal={() => setHasRevealed(true)}
        />
      )}

      {hasRevealed && (
        <button
          type="button"
          onClick={goToNextCard}
          className="rounded-full bg-[#F6D75C] px-6 py-3 text-sm font-extrabold tracking-wide text-black shadow-md transition-colors hover:bg-[#EFCA41]"
        >
          {isLastCard ? "LET'S START" : 'NEXT PLAYER'}
        </button>
      )}
    </div>
  )
}
