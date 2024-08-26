import { useState, useEffect } from 'react';
import { getRandomQuote, famousQuotes } from './Quotes.jsx';
import io from 'socket.io-client';

// TODO need to adjust where this connects to later likely
const socket = io.connect("http://localhost:3001");

const Game = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");

  // const [showLobby, setShowLobby] = useState(true);
  const [showPlayerOneTurn, setShowPlayerOneTurn] = useState(true);
  const [showPlayerTwoTurn, setShowPlayerTwoTurn] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);

  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");
  const [winOrLose, setWinOrLose] = useState("");

  useEffect(()=>{
    setAllQuotes(famousQuotes)
    setQuote(getRandomQuote(allQuotes));

    socket.on("p1complete", ({ data }) => {
      setQuote(data.quote);
      setPlayerOneInput(data.playerOneInput);
      setShowPlayerOneTurn(false);
      setShowPlayerTwoTurn(true);
    });


    socket.on("p2won", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setWinOrLose("You won.");
      setShowPlayerTwoTurn(false);
      setShowGameResult(true);
    });

    socket.on("p2lose", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setShowPlayerTwoTurn(false);
      setShowGameResult(true);
      setWinOrLose('Sorry, better luck next time.')
    });

    socket.on("resetgame", () => {
      setQuote(getRandomQuote(allQuotes));
      setPlayerOneInput("");
      setPlayerTwoInput("");
      setShowPlayerOneTurn(true);
      setShowPlayerTwoTurn(false);
      setShowGameResult(false);
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

  const playAgain = () => {
    socket.emit("playagain");
  }

  return (
    <>

      { showPlayerOneTurn ?
        <>
          <h2> Player 1 Turn: {quote} </h2>
          <button onClick={() => {setQuote(getRandomQuote(allQuotes))}} type="button">Give me a Better Quote!</button> <br />
          <form>
            <input value={playerOneInput} minLength="5" onChange={(event) => setPlayerOneInput(event.target.value)} type="text" placeholder="Shorten The Quote Here" required /> <br />
            <button onClick={() => {playerOneTurnOver()}} type="button">Submit Your Shortening</button>
          </form>
        </>
        :
        <></>
      }

      { showPlayerTwoTurn ?
        <>
          <h2> Player 2 Turn: {playerOneInput} </h2>
            <form>
              <input value={playerTwoInput} onChange={(event) => setPlayerTwoInput(event.target.value)} type="text" placeholder="Guess the Original Quote" required /> <br />
              <button onClick={() => {playerTwoTurnOver()}} type="button"> Submit Your Guess</button>
            </form>
        </>
        :
        <></>
      }

      { showGameResult ?
        <>
          <h1> The Original Quote was `{quote}`</h1> <br />
          <h3>  Player 1 shortened it to `{playerOneInput}`. <br />
                Player 2 guessed `{playerTwoInput}`. <br />
              {winOrLose}
          </h3> <br />
          <button onClick={() => {playAgain()}} type="button">Play Again?</button>
        </>
        : 
        <></>
      }

    </>
  )
}

export default Game 