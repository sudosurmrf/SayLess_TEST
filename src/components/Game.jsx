import { useState, useEffect } from 'react';
import { getRandomQuote, famousQuotes } from './Quotes.jsx';
import io from 'socket.io-client';

// TODO need to adjust where this connects to later likely
const socket = io.connect("http://localhost:3001");

const Game = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [showPlayerOneTurn, setPlayerOneTurn] = useState(true);
  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");

  useEffect(()=>{
    setAllQuotes(famousQuotes)
    setQuote(getRandomQuote(allQuotes));

    socket.on("p1complete", ({ data }) => {
      setQuote(data.quote);
      setPlayerOneInput(data.playerOneInput);
      setPlayerOneTurn(false);
    });

    // more functionality will be added to each of these
    socket.on("p2won", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
    });

    socket.on("p2lose", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
    });

  },[allQuotes])

  const playerOneTurnOver = () => {
    socket.emit("p1send", { quote, playerOneInput });
  };

  const playerTwoTurnOver = () => {
    if (quote === playerTwoInput.toLowerCase()) {
      socket.emit("p2sendwin", { playerTwoInput });
    } else {
      socket.emit("p2sendlose", { playerTwoInput });
    }
    // this will need to do an API call besides the usual socket stuff to update the user table for win or loss
  };

  return (
    <>
    { showPlayerOneTurn ?
      <>
      <h2> {quote} </h2>
      <button onClick={() => {setQuote(getRandomQuote(allQuotes))}} type="button">Change Quote</button> <br />
      <form>
        <input value={playerOneInput} onChange={(event) => setPlayerOneInput(event.target.value)} type="text" placeholder="Shorten The Quote Here" required /> <br />
        <button onClick={() => {playerOneTurnOver()}} type="button">Submit Your Shortening</button>
      </form>
      </>
      :
      <>
      <h2>{playerOneInput}</h2>
      <form>
      <input value={playerTwoInput} onChange={(event) => setPlayerTwoInput(event.target.value)} type="text" placeholder="Guess the Original Quote" required /> <br />
      <button onClick={() => {playerTwoTurnOver()}} type="button"> Submit Your Guess</button>
      </form>
      </>
    }
    </>
  )
}

export default Game 