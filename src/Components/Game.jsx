import { useState, useEffect } from 'react';
import { getRandomQuote, famousQuotes } from './Quotes.jsx';
import io from 'socket.io-client';
import axios from 'axios';


// TODO need to adjust where this connects to later likely


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
  
  const [seconds, setSeconds] = useState(0);
  
  const [playerOneInput, setPlayerOneInput] = useState("");
  const [playerTwoInput, setPlayerTwoInput] = useState("");
  const [winOrLose, setWinOrLose] = useState("");
  const [socket, setSocket] = useState(null);
  
  const apiURL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    // const newSocket = io.connect(`${import.meta.env.VITE_API_URL}:${import.meta.env.SOCKET_PORT}`);
    const newSocket = io.connect(`https://sayless.onrender.com`, {
      withCredentials: true,
      transports: ['websocket'],
    });
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [apiURL]);

  useEffect(()=> {
    setAllQuotes(famousQuotes)
    setQuote(getRandomQuote(allQuotes));
  },[allQuotes])

  useEffect(() =>{
    if (seconds <= 0) return;

    const intervalId = setInterval(() =>{
      setSeconds(prevSeconds => Math.max(prevSeconds - 1, 0))
    }, 1000);

    return (()=>{clearInterval(intervalId)});
  },[seconds])

  useEffect(()=>{
    if (!socket) return; //added this for when socket is null on first load since you guys are using useStates and not useRef


    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
  
    socket.on('disconnect', () => {
      console.warn('Socket disconnected');
    });
  
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    socket.on("p1start", () => {
      setShowLobby(false);
      setShowPlayerOneTurn(true);
      setSeconds(60);
      setTimeout(playerOneTurnOver, 60000);
    });

    socket.on("p2wait", () => {
      setShowLobby(false);
      setShowPlayerTwoWait(true);
      setSeconds(60);
    });

    socket.on("p2start", ({ data }) => {
      setQuote(data.quote);
      setPlayerOneInput(data.playerOneInput);
      setShowPlayerOneTurn(false);
      setShowPlayerTwoWait(false);
      setShowPlayerTwoTurn(true);
      setSeconds(60);
      setTimeout(playerTwoTurnOver, 60000);
    });

    socket.on("p1wait", () => {
      setShowPlayerOneTurn(false);
      setShowPlayerTwoWait(false);
      setShowPlayerOneWait(true);
      setSeconds(60);
    });

    socket.on("p2won", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setWinOrLose("You won.");
      setShowPlayerTwoTurn(false);
      setShowPlayerOneWait(false);
      setShowGameResult(true);
      playerUpdate('win');
    });

    socket.on("p2lose", ({ data }) =>{
      setPlayerTwoInput(data.playerTwoInput);
      setShowPlayerTwoTurn(false);
      setShowPlayerOneWait(false);
      setShowGameResult(true);
      setWinOrLose('Sorry, better luck next time.');
      playerUpdate('lose');
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

    return (() => {
      socket.off('disconnect')
    });
  },[socket])

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

  const gameStart = () => {
    console.log("gameStart function called");
    if (socket) {
      console.log("Socket is defined, emitting 'lobbysend'");
      socket.emit("lobbysend");
    } else {
      console.error("Socket is not defined");
    }
  };
  

  const playerOneTurnOver = () => {
    socket.emit("p1send", { quote, playerOneInput });
  };

  const playerTwoTurnOver = () => {
    if (quote === playerTwoInput.toLowerCase()) {
      socket.emit("p2sendwin", { playerTwoInput });
    } else {
      socket.emit("p2sendlose", { playerTwoInput });
    }
  };

  const playerUpdate = async (winLose) =>{
    const token = localStorage.getItem('token');
      if ((token !== undefined)){
        try{
          const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/users/player-${winLose}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok){
            console.log('User record updated.');
          }
        } catch (error) {
          throw new error('No account, anonymous player.');
        };
      };
  };

  const playAgain = () => {
    socket.emit("playagain");
  }

  return (
    <>

      { showLobby ?
        <>
          <h2 className="game-h2"> Welcome to Say Less </h2>
          <button className="game-p1" onClick={() => {gameStart()}} type="button">Click Here to  be Player One</button>
        </>
        :
        <></>
      }

      { showPlayerOneTurn ?
        <>
          <h2> Player 1 Turn: {quote} </h2>
          <h2> Time Remaining: {seconds}</h2>
          <button className="game-quote" onClick={() => {setQuote(getRandomQuote(allQuotes))}} type="button">Give me a Better Quote!</button> <br />
          <div className="game-difficulty-wrap">
            <button className="game-difficulty" onClick={() => {setMaxEasy()}} type="button">Easy Difficulty</button>
            <button className="game-difficulty" onClick={() => {setMaxIntermediate()}} type="button">Intermediate Difficulty</button>
            <button className="game-difficulty" onClick={() => {setMaxExtreme()}} type="button">Extreme Difficulty</button> <br />
          </div>
          <form>
            <input className="game-input" value={playerOneInput} minLength="2" maxLength={maxLengthVariable} onChange={(event) => setPlayerOneInput(event.target.value)} type="text" placeholder="Shorten The Quote Here" required /> <br />
            <button className="game-shortening" onClick={() => {playerOneTurnOver()}} type="button">Submit Your Shortend Phrase</button>
          </form>
        </>
        :
        <></>
      }

      { showPlayerTwoWait ?
        <>
          <h2> Its Player One's Turn, Please Wait Patiently </h2>
          <h2> Time Remaining: {seconds}</h2>
        </>
        :
        <></>
      }

      { showPlayerTwoTurn ?
        <>
          <h2> Player 2 Turn: {playerOneInput} </h2>
          <h2> Time Remaining: {seconds}</h2>
            <form>
              <input className="game-input" value={playerTwoInput} onChange={(event) => setPlayerTwoInput(event.target.value)} type="text" placeholder="Guess the Original Quote" required /> <br />
              <button className="game-shortening" onClick={() => {playerTwoTurnOver()}} type="button"> Submit Your Guess</button>
            </form>
        </>
        :
        <></>
      }

      { showPlayerOneWait ?
        <>
          <h2> Its Player Two's Turn, Please Wait Patiently </h2>
          <h2> Time Remaining: {seconds}</h2>
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
          <button className="game-p1" onClick={() => {playAgain()}} type="button">Play Again?</button>
        </>
        : 
        <></>
      }

    </>
  )
};

export default Game 