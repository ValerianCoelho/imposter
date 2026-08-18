import { Route, Routes } from 'react-router-dom'
import StartScreen from './frontend/components/modules/start-screen'
import PlayersScreen from './frontend/components/modules/start-screen/players-screen'
import CategoriesScreen from './frontend/components/modules/start-screen/categories-screen'
import GameScreen from './frontend/components/modules/game-screen'

function App() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/players" element={<PlayersScreen />} />
        <Route path="/categories" element={<CategoriesScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </div>
  )
}

export default App
