import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateUserDetails from './updateUserDetails';
import axios from 'axios';

const Account = () => {
    const [username, setUsername] = useState("");
    const [gamesWon, setGamesWon] = useState(0);
    const [gamesLost, setGamesLost] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [winBadges, setWinBadges] = ([]);
    const [playBadges, setPlayBadges] = ([]);
    const navigate = useNavigate();

    useEffect(() => {
      const getUserData = async () =>{
        const token = localStorage.getItem('token');

        // double check axios import when pulled
        try {
          const response = await axios.get('/api/v1/users/userdetails', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if(response.ok) {
            const { data } = response
            console.log(data)

            // if we were using axios we would deconstruct it so you'd get const { user, customQuotes, userWinBadges, userWlayBadges  } = data
            setUsername(data.user.username);
            setGamesWon(data.user.wins)
            setGamesLost(data.user.losses);
            // setGamesPlayed() this is going to be more complicated
            // not tracking custom quotes yet but I'll leave this here data.customQuotes[0].text
            // setWinBadges(data.userWinBadges.winBadges);
            // setPlayBadges(data.userPlayBadges.playBadges);
          }
        } catch (error){
          console.log('Unable to get data', error)
          // navigate('/Login');
        };   
      }
    getUserData()
  },[navigate]);

  const logOut = () => {
    // clear the token
  };

  return (
    <>
      {username? <h1> Welome {username}</h1> : <h1>Getting Your data</h1> } 

        <h1>Your Account History</h1> <br /><br />

        <section id="account-user-details"> 
          <h3 className="account-played">Games Played: {gamesPlayed} </h3>
            <h3 className="account-won">Games Won: {gamesWon} </h3>
            <h3 className="account-lost">Games Lost: {gamesLost} </h3>
            <h3 className="account-ratio">W/L Ratio: {}% </h3>
           <br /> <br />

          {/* <h3>Your Badges:
            <ol>
            { winBadges.map((badge)=> {<li>{badge.name}</li>})}
              {playBadges.map((badge)=> {<li>{badge.name}</li>})}
            </ol>
          </h3> */}
        </section>
                                       
        <UpdateUserDetails />

        <button onClick={() => {logOut()}}>Log Out</button>
    </>
  )
}

export default Account;