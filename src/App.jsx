import { useState, useEffect, useRef } from 'react'
import './App.css'
import Die from './components/Die'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice() {
    const diceArr = []
    for (let i = 0; i < 10; i++) {
      let rand = Math.ceil(Math.random() * 6);
      diceArr.push({
        value: rand,
        isHeld: false,
        id: i
      })
    }
    return diceArr
  }

  function hold(id) {
    if (!gameWon) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          if (die.id === id) {
            return { ...die, isHeld: !die.isHeld }
          } else {
            return die
          }
        })
      })
    } else {
      setDice(generateAllNewDice());
    }
  }
  function rollDice() {
    setDice((oldDice => oldDice.map((die) => {
      if (die.isHeld === false) {
        return { ...die, value: Math.ceil(Math.random() * 6) }
      } else {
        return die
      }
    })
    ));
  }

  const diceElem = dice.map((die) => {
    return <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)} />
  })

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElem}
      </div>
      <button ref={buttonRef} className='roll-dice' onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  )

}

export default App
