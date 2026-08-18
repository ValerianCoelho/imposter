import { PlayerCard } from './frontend/components/ui/PlayerCard'

function App() {
  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center gap-8 bg-neutral-100 p-8">
      <PlayerCard playerNumber={1} color={0} variant="word" word="SUNSET" />
      <PlayerCard playerNumber={2} color={1} variant="imposter" />
      <PlayerCard
        playerNumber={3}
        color={2}
        variant="imposter"
        hint="It's something you'd see at the beach."
      />
    </div>
  )
}

export default App
