import { useState, useEffect } from 'react';
import { getRandomQuote, famousQuotes } from './Quotes.jsx';
import io from 'socket.io-client';

// TODO need to adjust where this connects to later likely
const socket = io.connect("http://localhost:3001");

const Game = () => {
  const [allQuotes, setAllQuotes] = useState([]);
  const [quote, setQuote] = useState("");

  const [maxLengthVariable, setMaxLengthVariable] = useState(20);

  const [showLobby, setShowLobby] = useState(true);
  const [showPlayerOneTurn, setShowPlayerOneTurn] = useState(false);
  const [showPlayerTwoWait, setShowPlayerTwoWait] = useState(false);
  const [showPlayerTwoTurn, setShowPlayerTwoTurn] = useState(false);
  const [showPlayerOneWait, setShowPlayerOneWait] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);

  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");
  const [winOrLose, setWinOrLose] = useState("");

  useEffect(()=>{
    setAllQuotes(famousQuotes)
    setQuote(getRandomQuote(allQuotes));

    socket.on("p1start", () => {
      setShowLobby(false);
      setShowPlayerOneTurn(true);
    });

    socket.on("p2wait", () => {
      setShowLobby(false);
      setShowPlayerTwoWait(true);
    });

    socket.on("p2start", ({ data }) => {
      setQuote(data.quote);
      setPlayerOneInput(data.playerOneInput);
      setShowPlayerOneTurn(false);
      setShowPlayerTwoWait(false);
      setShowPlayerTwoTurn(true);
    });

    socket.on("p1wait", () => {
      setShowPlayerOneTurn(false);
      setShowPlayerTwoWait(false);
      setShowPlayerOneWait(true);
    });

    socket.on("p2won", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setWinOrLose("You won.");
      setShowPlayerTwoTurn(false);
      setShowPlayerOneWait(false);
      setShowGameResult(true);
    });

    socket.on("p2lose", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setShowPlayerTwoTurn(false);
      setShowPlayerOneWait(false);
      setShowGameResult(true);
      setWinOrLose('Sorry, better luck next time.')
    });

    socket.on("backtolobby", () => {
      setQuote(getRandomQuote(allQuotes));
      setPlayerOneInput("");
      setPlayerTwoInput("");
      setShowLobby(true);
      setShowPlayerOneTurn(false);
      setShowPlayerTwoTurn(false);
      setShowPlayerTwoWait(false);
      setShowPlayerOneWait(false);
      setShowGameResult(false);
    });

  },[allQuotes])

  const countWordsEasy = (text) => {
    let noVowels = text.replace(/[aeiou]/g,'');
    return noVowels.length;
  }

  const countWordsIntermediate = (text) =>{
    let noVowelsNoSpace = text.replace(/[aeiou\s]/g,'');
    return noVowelsNoSpace.length;
  }

  const countWordsExtreme = (text) => {
    let wordsArray = text.split(" ");
    return wordsArray.length;
  } 

  const setMaxEasy = () =>{
    setMaxLengthVariable(countWordsEasy(quote));
  }

  const setMaxIntermediate = () =>{
    setMaxLengthVariable(countWordsIntermediate(quote));
  }

  const setMaxExtreme = () => {
    setMaxLengthVariable(countWordsExtreme(quote));
  }

  const gameStart = () =>{
    socket.emit("lobbysend");
  }

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

      { showLobby ?
        <>
          <h2 className="game-h2"> Welcome to Say Less </h2>
          <button className="game-p1" onClick={() => {gameStart()}} type="button">Click Here to be Player One</button>
        </>
        :
        <></>
      }

      { showPlayerOneTurn ?
        <>
          <h2> Player 1 Turn: {quote} </h2>
          <button className="game-quote" onClick={() => {setQuote(getRandomQuote(allQuotes))}} type="button">Give me a Better Quote!</button> <br />
          <button onClick={() => {setMaxEasy()}} type="button">Easy Difficulty</button>
          <button onClick={() => {setMaxIntermediate()}} type="button">Intermediate Difficulty</button>
          <button onClick={() => {setMaxExtreme()}} type="button">Extreme Difficulty</button> <br />
          <form>
            <input value={playerOneInput} minLength="2" maxLength={maxLengthVariable} onChange={(event) => setPlayerOneInput(event.target.value)} type="text" placeholder="Shorten The Quote Here" required /> <br />
            <button className="game-shortening" onClick={() => {playerOneTurnOver()}} type="button">Submit Your Shortening</button>
          </form>
        </>
        :
        <></>
      }

      { showPlayerTwoWait ?
        <>
          <h2> Its Player One's Turn, Please Wait Patiently </h2>
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

      { showPlayerOneWait ?
        <>
          <h2> Its Player Two's Turn, Please Wait Patiently </h2>
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