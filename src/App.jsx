import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import useWindowSize from "@rooks/use-window-size";
import Confetti from 'react-confetti';
import Die from "./components/Die";
import Count from "./components/Count";
import Timer from "./components/Timer";
import Record from "./components/Record";

function App() {
  const [dice, setDice] = useState(allNewDice);
  const [tenzies, setTenzies] = useState(false);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [lastTimer, setLastTimer] = useState(null);
  const [result, setResult] = useState(JSON.parse(localStorage.getItem("result")) || [])

  const { innerWidth, innerHeight } = useWindowSize();

  // <Die /> component loop
  const diceEl = dice.map(die =>
    <Die key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} value={die.value} />
  );

  /**
   * 
   */
  useEffect(() => {

    const allIsHeld = dice.every(die => die.isHeld === true);
    const allIsEqualValue = dice.every(die => die.value === dice[0].value);

    if (allIsHeld && allIsEqualValue) {
      setTenzies(true)
      setLastTimer(timer)

      const newResult = {
        "timer": timer,
        "count": count,
      };

      setResult(oldResult => [...oldResult, newResult])
    };

  }, [dice])

  /**
   * load to localStorage the new result
   */
  useEffect(() => {
    localStorage.setItem("result", JSON.stringify(result))

    return () => {
      localStorage.removeItem("result")
    };
  }, [result])

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

    if (!timer) {
      setInterval(() => {
        setTimer(oldTimer => oldTimer + 1)
      }, 1000)
    }

    if (tenzies) {
      setDice(allNewDice);
      setTenzies(false)
      setCount(1)
      setTimer(0)
      setLastTimer(0)
    } else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die :
          dieBluePrint()
      }))
      setCount(oldCount => oldCount + 1)
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
      {tenzies && <Confetti
        width={innerWidth}
        height={innerHeight}
      />}

      <div className="board rounded-3 p-3 d-flex justify-content-around align-items-center flex-column">

        <Count count={count} />

        <Record result={result} />

        <Timer timer={timer} lastTimer={lastTimer} />

        <h1 className="fw-bold">Tenzies</h1>
        <p className="fs-5 text-center">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="dice_container p-3 gap-3">

          {count > 0 && diceEl}

        </div>

        <button onClick={rollDice} className="btn btn-primary border-0 btn_roll">
          {!count > 0 || tenzies ?
            'New Game' :
            'Roll'}
        </button>
      </div>

    </main>

    /* ./board */
  )
}

export default App