import { useState, useEffect} from 'react';
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
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/userdetails`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response.data)

          setUsername(response.data.userInfo.username);
          setGamesWon(response.data.userInfo.wins)
          setGamesLost(response.data.userInfo.losses);
          // setGamesPlayed() this is going to be more complicated
          // not tracking custom quotes yet but I'll leave this here data.customQuotes[0].text
          // setWinBadges(data.userWinBadges.winBadges);
          // setPlayBadges(data.userPlayBadges.playBadges);
        
        } catch (error){
          console.log('Unable to get data', error)
          // navigate('/Login');
        };   
      };

    getUserData();
  },[navigate]);
  

  return (
    <>
      {username ? <h1> Welome {username}</h1> : <h1>Getting Your data</h1> } 

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
    </>
  )
}

export default Account;