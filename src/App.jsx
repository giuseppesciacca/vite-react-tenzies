import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import useWindowSize from "@rooks/use-window-size";
import Confetti from 'react-confetti';
import Die from "./components/Die";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();

  // <Die /> component loop
  const diceEl = dice.map(die =>
    <Die key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} value={die.value} />
  );

  useEffect(() => {
    const allIsHeld = dice.every(die => die.isHeld === true);
    const allIsEqualValue = dice.every(die => die.value === dice[0].value);

    if (allIsHeld && allIsEqualValue) {
      setTenzies(true)
    }
  }, [dice])

  /**
   * 
   * @returns die object
   */
  function dieBluePrint() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  /**
   * roll dice or start new game
   */
  function rollDice() {

    if (tenzies) {
      setDice(allNewDice);
      setTenzies(false)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die :
          dieBluePrint()
      }))
    }
  }

  /**
   * 
   * @returns arrayDice [10 nums]
   */
  function allNewDice() {
    const arrayDice = [];

    for (let i = 0; i < 10; i++) {
      arrayDice.push(
        dieBluePrint()
      )
    }
    return arrayDice
  }

  /**
   * 
   * @param {string} id 
   */
  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        {
          ...die,
          isHeld: !die.isHeld
        } :
        die
    }))
  }

  return (
    <main className="d-flex justify-content-center align-items-center p-3"
    >
      <div className="board rounded-3 p-3 d-flex justify-content-around align-items-center flex-column">
        {tenzies && <Confetti
          width={innerWidth}
          height={innerHeight}
        />}

        <h1 className="fw-bold">Tenzies</h1>
        <p className="fs-5 text-center">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="dice_container p-3 gap-3">

          {diceEl}

        </div>

        <button onClick={rollDice} className="btn btn-primary border-0 btn_roll"> {!tenzies ? 'Roll' : 'New Game'}
        </button>
      </div>

    </main>

    /* ./board */
  )
}

export default App