import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const [username, setUsername] = useState("");
    const [gamesWon, setGamesWon] = useState(0);
    const [gamesLost, setGamesLost] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [winBadges, setWinBadges] = (null);
    const [playBadges, setPlayBadges] = (null);
    const navigate = useNavigate();

    useEffect(() => {
      const getUserData = async () =>{
        const token = localStorage.getItem('token');

        try {
            // api call to get user account, gameplay history,badges

        } catch (error){
          console.log('Unable to get data', error)
          navigate('Login');
        };   
      }
    getUserData()
  },[navigate]);

  const logOut = () => {
    // clear the token
  };

  return (
    <>
      {username? <h1> Welome {username}</h1> : <h1>Getting Your data</h1> } <br /> <br />

        <h1>Your Account History</h1> <br /><br />

        <h3>Games Played: {gamesPlayed} <br />
          Games Won: {gamesWon} <br />
          Games Lost: {gamesLost} <br/>
          W/L Ratio: {}%
        </h3> <br /> <br />

        <h3>Your Badges:
          <ol>
            {winBadges.map((badge)=> {<li>{badge.name}</li>})}
            {playBadges.map((badge)=> {<li>{badge.name}</li>})}
          </ol>
        </h3>

        <button onClick={() => {logOut()}}>Log Out</button>
    </>
  )
}

export default Account;