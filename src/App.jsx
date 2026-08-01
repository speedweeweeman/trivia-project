import { useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import Game from './components/Game.jsx'
import './index.css'

export default function App() {
  const [didGameStart, setDidGameStart] = useState(false)

  function startGame() {
    setDidGameStart(prev => !prev)
  }

  return (
    <main>
      {didGameStart ? 
        <Game /> :
        <StartScreen startGame={startGame} />
      }
    </main>
  )
}