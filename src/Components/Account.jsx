import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { selectAvatar } from './Avatars.jsx';
import { selectBadges, winBadgesArray, playBadgesArray } from './Badges.jsx';
import UpdateUserDetails from './UpdateUserDetails';

const Account = ({ setLoginMessage }) => {
  const [username, setUsername] = useState("");
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [WLRatio, setWLRatio] = useState(0);
  const [userWinBadgesInfo, setUserWinBadgesInfo] = useState([]);
  const [userPlayBadgesInfo, setUserPlayBadgesInfo] = useState([]);
  const [userAvatarId, setUserAvatarId] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [userQuotes, setUserQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () =>{
      const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/userdetails`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });

          const data = await response.json();

          setUsername(data.userInfo.username);
          setGamesWon(data.userInfo.wins)
          setGamesLost(data.userInfo.losses);
          setGamesPlayed((gamesWon + gamesLost));
          setWLRatio((gamesWon / gamesLost).toFixed(2));
          setUserWinBadgesInfo(data.userWinBadges.winBadges);
          setUserPlayBadgesInfo(data.userPlayBadges.playBadges);
          setUserAvatarId(data.userInfo.avatarId)
          setUserQuotes(data.customQuotes);
        
        } catch (error){
          console.log('Unable to get data', error)
          setLoginMessage(token);
          navigate('/Login');
        };   
      };

    getUserData();
  },[navigate]);

  useEffect(()=>{
    setAvatar(selectAvatar(userAvatarId));
  },[userAvatarId])

  const wBadges = selectBadges(winBadgesArray,userWinBadgesInfo)
  const pBadges = selectBadges(playBadgesArray,userPlayBadgesInfo)

  return (
    <>

      {username ? <h1> Welcome {username} {<img className={avatar.className} src={avatar.image}/>}</h1>  : <h1>Getting Your Data</h1> } 

        <h1>Your Account History</h1> <br /><br />

        <section>

          <section id="account-user-details"> 
            <h3 className="account-played">Games Played: {gamesPlayed} </h3>
              <h3 className="account-won">Games Won: {gamesWon} </h3>
              <h3 className="account-lost">Games Lost: {gamesLost} </h3>
              <h3 className="account-ratio">W/L Ratio: {WLRatio}% </h3>
              <br /> <br />
          </section>

          <section id="user-badges">
            <h3>Your Badges:
              <ul>
                {wBadges.map((badge)=>{
                  return <li key={badge.id}>
                    <img className={badge.className} src={badge.image} alt={badge.alt}/>
                  </li>})}
                {pBadges.map((badge)=>{
                  return <li key={badge.id}>
                    <img className={badge.className} src={badge.image} alt={badge.alt}/>
                  </li>})}
                </ul>
            </h3>
          </section>
        </section>
        <UpdateUserDetails />
    </>
  )
}

export default Account;