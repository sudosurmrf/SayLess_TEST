import { useState } from 'react';

const Game = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [showPlayerOneTurn, setPlayerOneTurn] = useState(true);
  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");

  const compareQuoteInput = () => {
    if (quote === playerTwoInput) {
      console.log('YOU WON')
    } else {
      console.log('Sorry, better luck next time.')
    }
  }

  return (
    <>
    { showPlayerOneTurn ?
      <>
      <h2> {quote} </h2>
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