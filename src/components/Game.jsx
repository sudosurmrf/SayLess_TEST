import { useState, useEffect } from 'react';
import { getRandomQuote, famousQuotes } from './Quotes.jsx';

const Game = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [showPlayerOneTurn, setPlayerOneTurn] = useState(true);
  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");

  useEffect(()=>{
    setAllQuotes(famousQuotes)
    setQuote(getRandomQuote(allQuotes));
  },[allQuotes])

  const compareQuoteInput = () => {
    if (quote === playerTwoInput.toLowerCase()) {
      console.log('YOU WON')
    } else {
      console.log('Try again.')
    }
  }

  return (
    <>
    { showPlayerOneTurn ?
      <>
      <h2> {quote} </h2>
      <button onClick={() => {setQuote(getRandomQuote(allQuotes))}} type="button">Change Quote</button> <br />
      <form>
        <input value={playerOneInput} onChange={(event) => setPlayerOneInput(event.target.value)} type="text" placeholder="Shorten The Quote Here" required /> <br />
        <button onClick={() => {setPlayerOneTurn(false)}} type="button">Submit Your Shortening</button>
      </form>
      </>
      :
      <>
      <h2>{playerOneInput}</h2>
      <form>
      <input value={playerTwoInput} onChange={(event) => setPlayerTwoInput(event.target.value)} type="text" placeholder="Guess the Original Quote" required /> <br />
      <button onClick={() => {compareQuoteInput()}} type="button"> Submit Your Guess</button>
      </form>
      </>
    }
    </>
  )
}

export default Game 